// Octokit.js
// https://github.com/octokit/core.js#readme

import fs from "fs";
import { createRequire } from "node:module";
import { Octokit } from "@octokit/core";
import dedent from "dedent";
import { execa } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import GitUrlParse from "git-url-parse";

const require = createRequire(import.meta.url);
const packagejson = require("../package.json");

async function getOldestCommitSinceLastTag() {
  const gitCommandArgs = [
    "log",
    `v${packagejson.version}..HEAD`,
    '--format="%h %aI"',
    "--reverse",
  ];
  const { stdout } = await execa("git", gitCommandArgs);
  const [commitResult] = stdout.split("\n");
  const [, commitHash, commitDate] =
    /^"?([0-9a-f]+)\s([0-9\-|\\+T\\:]*)"?$/.exec(commitResult) || [];

  return { commitHash, commitDate };
}

(async () => {
  const octokit = new Octokit({
    auth: `token ${process.env.GITHUB_TOKEN}`,
  });

  // https://github.com/lerna-lite/lerna-lite/blob/32d06de5106675127ec8c3a8138d3e343a5912c9/packages/version/src/conventional-commits/get-github-commits.ts
  const originUrl = await gitRemoteOriginUrl();
  const { commitDate } = await getOldestCommitSinceLastTag();

  const repo = GitUrlParse(originUrl);
  const remoteCommits = [];
  let afterCursor = "";
  let hasNextPage = false;

  do {
    const afterCursorStr = afterCursor ? `, after: "${afterCursor}"` : "";
    const queryStr = dedent(
      `query getCommits($repo: String!, $owner: String!, $branchName: String!, $pageSize: Int!, $since: GitTimestamp!) {
          repository(name: $repo, owner: $owner) {
            ref(qualifiedName: $branchName) {
              target { ... on Commit {
                  history(first: $pageSize, since: $since ${afterCursorStr}) {
                    nodes { oid, author { user { login }}}
                    pageInfo { hasNextPage, endCursor }
        }}}}}}`,
    ).trim();

    // eslint-disable-next-line no-await-in-loop
    const response = await octokit.graphql(queryStr, {
      owner: repo.owner,
      repo: repo.name,
      afterCursor,
      branchName: "main",
      pageSize: 100,
      since: commitDate,
    });

    const historyData = "repository.ref.target.history"
      .split(".")
      .reduce((obj, prop) => obj?.[prop], response);
    const pageInfo = historyData?.pageInfo;
    hasNextPage = pageInfo?.hasNextPage ?? false;
    afterCursor = pageInfo?.endCursor ?? "";

    if (historyData?.nodes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const commit of historyData.nodes) {
        if (commit?.oid && commit?.author) {
          remoteCommits.push({
            shortHash: commit.oid.substring(0, 7),
            login: commit?.author?.user?.login ?? "",
          });
        }
      }
    }
  } while (hasNextPage);

  console.log(
    "Github found",
    remoteCommits.length,
    "commits since last release timestamp",
    "2022-08-04T09:16:39.000Z",
  );

  fs.writeFileSync(
    "release-it/remote-commits.json",
    JSON.stringify(remoteCommits),
  );
})();
