// References:
// - https://github.com/lerna-lite/lerna-lite/blob/main/packages/version/src/conventional-commits/get-github-commits.ts
// - https://github.com/lerna-lite/lerna-lite/blob/main/packages/version/src/conventional-commits/get-commits-since-last-release.ts
// - https://github.com/lerna-lite/lerna-lite/blob/main/packages/version/src/git-clients/github-client.ts

import { Octokit } from "@octokit/core";
import { config } from "dotenv";
import { execa } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";

config();

const QUERY_PAGE_SIZE = 100; // GitHub API max limit per query

interface CommitNode {
	author?: {
		user?: {
			login?: string;
		};
	};
	oid: string;
}

interface PageInfo {
	endCursor: string;
	hasNextPage: boolean;
}

interface HistoryData {
	nodes?: CommitNode[];
	pageInfo?: PageInfo;
}

interface CommitInfo {
	login: string;
	shortHash: string;
}

interface OldestCommitResult {
	commitDate: string;
	commitHash: string;
	commits: string[];
}

function getQueryString(afterCursorString: string): string {
	return `
      query getCommits($repo: String!, $owner: String!, $branchName: String!, $pageSize: Int!, $since: GitTimestamp!) {
                repository(name: $repo, owner: $owner) {
                  ref(qualifiedName: $branchName) {
                    target { ... on Commit {
                        history(first: $pageSize, since: $since ${afterCursorString}) {
                          nodes { oid, author { user { login }}}
                          pageInfo { hasNextPage, endCursor }
              }}}}}}
    `;
}

async function getOldestCommitSinceLastTag(): Promise<OldestCommitResult> {
	try {
		// First try to get the latest tag
		const { stdout: latestTag } = await execa("git", [
			"describe",
			"--tags",
			"--abbrev=0",
		]).catch(() => ({ stdout: "" }));

		const gitCommandArguments = [
			"log",
			latestTag ? `${latestTag}..HEAD` : "HEAD",
			'--format="%h %aI"',
			"--reverse",
		];

		const { stdout } = await execa("git", gitCommandArguments);

		if (!stdout) {
			// If no stdout, try getting the tag details instead
			const tagOutput = await execa("git", [
				"log",
				"-1",
				"--format=%h %aI",
				latestTag,
			]).catch(() => ({ stdout: "" }));
			if (tagOutput.stdout) {
				const [, commitHash, commitDate] =
					/^"?([\da-f]+)\s([\d+:T\\|-]*)"?$/u.exec(tagOutput.stdout) ?? [];

				return { commitDate, commitHash, commits: [tagOutput.stdout] };
			}

			return { commitDate: "", commitHash: "", commits: [] };
		}

		const [commitResult] = stdout.split("\n");
		const [, commitHash, commitDate] =
			/^"?([\da-f]+)\s([\d+:T\\|-]*)"?$/u.exec(commitResult) ?? [];

		return { commitDate, commitHash, commits: stdout.split("\n") };
	} catch (error) {
		console.error(
			"Error getting commits:",
			error instanceof Error ? error.message : String(error),
		);
		return { commitDate: "", commitHash: "", commits: [] };
	}
}

/**
 * Fetches GitHub commits since the last release tag
 * @returns {Promise<Array<CommitInfo>>} Array of commit information with GitHub usernames and short commit hashes
 */
export async function getGithubCommits(): Promise<CommitInfo[]> {
	const originUrl = await gitRemoteOriginUrl();
	const { commitDate } = await getOldestCommitSinceLastTag();

	if (!commitDate) {
		throw new Error(
			'Invalid "since" date - required to fetch GitHub commits since last release',
		);
	}

	// Parse the git URL to get owner and repo name
	const repo = gitUrlParse(originUrl);
	const remoteCommits: CommitInfo[] = [];
	let afterCursor = "";
	let hasNextPage = false;

	const octokit = new Octokit({
		auth: `token ${process.env.GITHUB_TOKEN}`,
	});

	do {
		const afterCursorString = afterCursor ? `, after: "${afterCursor}"` : "";
		const queryString = getQueryString(afterCursorString);

		const response = await octokit.graphql(queryString, {
			afterCursor,
			branchName: "main",
			owner: repo.owner,
			pageSize: QUERY_PAGE_SIZE,
			repo: repo.name,
			since: commitDate,
		});

		const properties = "repository.ref.target.history".split(".");

		let result: unknown = response;
		for (const property of properties) {
			result = (result as Record<string, unknown>)[property];
		}

		const historyData = result as HistoryData;
		const pageInfo = historyData.pageInfo;
		hasNextPage = pageInfo?.hasNextPage ?? false;
		afterCursor = pageInfo?.endCursor ?? "";

		if (historyData.nodes) {
			for (const commit of historyData.nodes) {
				if (commit.oid && commit.author) {
					remoteCommits.push({
						login: commit.author.user?.login ?? "",
						shortHash: commit.oid.slice(0, 7),
					});
				}
			}
		}
	} while (hasNextPage);

	return remoteCommits;
}
