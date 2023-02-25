const fs = require("fs");
const remoteCommits = require("./remote-commits.json");

// expand on the simple mustache-style templates supported in
// configuration (we may eventually want to use handlebars for this).
function expandTemplate(template, context) {
  let expanded = template;
  Object.keys(context).forEach(key => {
    expanded = expanded.replace(new RegExp(`{{${key}}}`, "g"), context[key]);
  });
  return expanded;
}

function findTypeEntry(types, commit) {
  const typeKey = (commit.revert ? "revert" : commit.type || "").toLowerCase();
  return types.find(entry => {
    if (entry.type !== typeKey) {
      return false;
    }
    if (entry.scope && entry.scope !== commit.scope) {
      return false;
    }
    return true;
  });
}

const types = [
  { type: "feat", section: "Feature Updates" },
  { type: "fix", section: "Bug Fixes" },
  {
    type: "refactor",
    section: "Code Refactors",
  },
  {
    type: "docs",
    section: "Documentation Changes",
  },
  {
    type: "chore",
    section: "Maintanance Updates",
  },
  { type: "build", section: "Build Updates" },
  { type: "test", section: "Test Updates" },
  { type: "style", section: "Other Changes" },
  {
    type: "perf",
    section: "Performance Improvements",
  },
  { type: "ci", section: "CI Changes" },
  { type: "revert", section: "Updates Reverted" },
];

const conventionalChangelogWriterOptsTransform = (commit, context) => {
  const issues = [];
  const entry = findTypeEntry(types, commit);
  if (entry) commit.type = entry.section;

  if (typeof commit.subject === "string") {
    // eslint-disable-next-line no-useless-concat
    const issueRegEx = `([#].join("|"))` + `([0-9]+)`;
    const re = new RegExp(issueRegEx, "g");

    commit.subject = commit.subject.replace(re, (_, prefix, issue) => {
      issues.push(prefix + issue);
      const url = expandTemplate(
        "{{host}}/{{owner}}/{{repository}}/issues/{{id}}",
        {
          host: context.host,
          owner: context.owner,
          repository: context.repository,
          id: issue,
          prefix,
        },
      );
      return `[${prefix}${issue}](${url})`;
    });

    // User URLs.
    commit.subject = commit.subject.replace(
      /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
      (_, user) => {
        // TODO: investigate why this code exists.
        if (user.includes("/")) {
          return `@${user}`;
        }

        const usernameUrl = expandTemplate("{{host}}/{{user}}", {
          host: context.host,
          owner: context.owner,
          repository: context.repository,
          user,
        });

        return `[@${user}](${usernameUrl})`;
      },
    );
  }

  // remove references that already appear in the subject
  commit.references = commit.references.filter(reference => {
    if (issues.indexOf(reference.prefix + reference.issue) === -1) {
      return true;
    }

    return false;
  });

  const remoteCommit = remoteCommits.find(
    c => c.shortHash === commit.shortHash,
  );

  if (remoteCommit?.login) {
    commit.userLogin = remoteCommit.login;
  }
  return commit;
};

const owner =
  "{{#if this.owner}}{{~this.owner}}{{else}}{{~@root.owner}}{{/if}}";
const host = "{{~@root.host}}";
const repository =
  "{{#if this.repository}}{{~this.repository}}{{else}}{{~@root.repository}}{{/if}}";

const commitUrlFormat = expandTemplate(
  "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
  {
    host,
    owner,
    repository,
  },
);
const issueUrlFormat = expandTemplate(
  "{{host}}/{{owner}}/{{repository}}/issues/{{id}}",
  {
    host,
    owner,
    repository,
    id: "{{this.issue}}",
    prefix: "{{this.prefix}}",
  },
);
const commitTemplateString = fs
  .readFileSync("release-it/commit.hbs")
  .toString();
const commitTemplate = commitTemplateString
  .replace(/{{commitUrlFormat}}/g, commitUrlFormat)
  .replace(/{{issueUrlFormat}}/g, issueUrlFormat);

module.exports = { conventionalChangelogWriterOptsTransform, commitTemplate };
