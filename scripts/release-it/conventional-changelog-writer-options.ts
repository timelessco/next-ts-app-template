import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getGithubCommits } from "./get-commits-since-last-release";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface RemoteCommit {
	login: string;
	shortHash: string;
}

// Create an empty array with the correct type inference
let remoteCommits: RemoteCommit[] = [];

/**
 * Cache for remote commits to avoid multiple API calls
 * @returns {Promise<RemoteCommit[]>} Array of remote commits with shortHash and optional login properties
 */
async function getRemoteCommits(): Promise<RemoteCommit[]> {
	if (remoteCommits.length === 0) {
		remoteCommits = await getGithubCommits();
	}

	return remoteCommits;
}

const owner =
	"{{#if this.owner}}{{~this.owner}}{{else}}{{~@root.owner}}{{/if}}";
const host = "{{~@root.host}}";
const repository =
	"{{#if this.repository}}{{~this.repository}}{{else}}{{~@root.repository}}{{/if}}";
const issuePrefixes = ["#"];

interface TypeEntry {
	scope?: string;
	section: string;
	type: string;
}

const types: TypeEntry[] = [
	{ section: "⭐ New Features", type: "feat" },
	{ section: "🐞 Bug Fixes", type: "fix" },
	{
		section: "♻️  Code Refactoring",
		type: "refactor",
	},
	{
		section: "⚡️  Performance Improvements",
		type: "perf",
	},
	{
		section: "📔 Documentation Changes",
		type: "docs",
	},
	{ section: "🧪 Test Updates", type: "test" },
	{ section: "🛠️ Build Updates", type: "build" },
	{ section: "💚 CI Changes", type: "ci" },
	{ section: "⏪️ Reverted Changes", type: "revert" },
	{
		section: "🔨 Maintenance Updates",
		type: "chore",
	},
	{ section: "🎨 Code Style Changes", type: "style" },
];

interface CommitArgument {
	revert?: boolean;
	scope?: string;
	type?: string;
}

/**
 * Finds a type entry in the types array that matches the commit's type and scope
 * @param {TypeEntry[]} typesArgument - Array of type definitions
 * @param {CommitArgument} commitArgument - Commit object with type, scope, and revert properties
 * @returns {TypeEntry | undefined} Matching type entry or undefined if not found
 */
function findTypeEntry(
	typesArgument: TypeEntry[],
	commitArgument: CommitArgument,
): TypeEntry | undefined {
	const typeKey = (
		commitArgument.revert ? "revert" : (commitArgument.type ?? "")
	).toLowerCase();

	return typesArgument.find((entry) => {
		return (
			entry.type === typeKey &&
			(!entry.scope || entry.scope === commitArgument.scope)
		);
	});
}

/**
 * Expands a simple mustache-style template with context values
 * @param {string} templateArgument - Template string with mustache-style placeholders
 * @param {Record<string, string>} context - Object with key-value pairs to replace in the template
 * @returns {string} Expanded template with all placeholders replaced with their values
 */
function expandTemplate(
	templateArgument: string,
	context: Record<string, string>,
): string {
	let expanded = templateArgument;

	for (const key of Object.keys(context)) {
		expanded = expanded.replaceAll(
			// Escape the curly braces to treat them as literal characters in the regex
			new RegExp(`\\{\\{${key}\\}\\}`, "gu"),
			context[key],
		);
	}

	return expanded;
}

const commitUrlFormat = expandTemplate(
	"{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
	{
		host,
		owner,
		repository,
	},
);

interface RepoContext {
	hasNotableChanges?: boolean;
	hasOtherNotableChanges?: boolean;
	host: string;
	notableChanges?: NotableChange[];
	notableChangesTitle?: string;
	otherNotableChanges?: NotableChange[];
	otherNotableChangesTitle?: string;
	owner: string;
	repository: string;
}

/**
 * Generates a URL for a commit hash based on the provided context.
 * @param {RepoContext} context - The context object containing host, owner, and repository information.
 * @param {string} commitHash - The commit hash for which to generate the URL.
 * @returns {string} The URL for the specified commit hash.
 */
function generateCommitUrl(context: RepoContext, commitHash: string): string {
	return `${context.host}/${context.owner}/${context.repository}/commit/${commitHash}`;
}

interface CommitWithScope {
	scope?: string;
}

/**
 * Returns the title-cased scope of a commit, if it exists.
 * @param {CommitWithScope} commit - The commit object to extract the scope from.
 * @returns {string | undefined} The title-cased scope of the commit, or undefined if it does not exist.
 */
function getTitleCasedScope(commit: CommitWithScope): string | undefined {
	const scope = commit.scope?.toUpperCase();
	return scope ?? undefined;
}

interface CommitReference {
	issue: string;
	owner?: string;
	prefix: string;
	repository?: string;
}

interface NotableChange {
	body: string;
	hashUrl: string;
	scope?: string;
	shortHash?: string;
	subject?: string;
}

interface CommitNote {
	body?: string;
	hashUrl: string;
	header: string;
	scope?: string;
	shortHash?: string;
	subject?: string;
	text?: string;
	title: string;
}

interface Commit {
	authorName?: string;
	body?: string;
	hash: string;
	header: string;
	references: CommitReference[];
	scope?: string;
	shortHash?: string;
	subject?: string;
	type?: string;
}

interface CommitPatch {
	body?: string;
	notes?: CommitNote[];
	references?: CommitReference[];
	scope?: string;
	shortHash?: string;
	subject?: string;
	type?: string;
	userLogin?: string;
}

/**
 * Transforms a commit object for changelog generation by adding additional information and formatting.
 * @param {Commit} commit - The commit object to transform
 * @param {RepoContext} context - The context object containing repository information and changelog state
 * @returns {Promise<CommitPatch>} The transformed commit patch
 */
export async function transform(
	commit: Commit,
	context: RepoContext,
): Promise<CommitPatch> {
	const patch: CommitPatch = {};
	const issues: string[] = [];

	// Set new values in patch instead of modifying commit
	if (commit.authorName === "renovate[bot]") {
		patch.body = "";
	}

	const entry = findTypeEntry(types, commit);
	if (entry) {
		patch.type = entry.section;
	}

	// Handle breaking changes
	const breakingHeaderPatternRegex = /^\w*(?:\(.*\))?!: (.*)$/u;
	const match = breakingHeaderPatternRegex.exec(commit.header);
	if (match) {
		patch.notes = [
			{
				body: commit.body,
				hashUrl: generateCommitUrl(context, commit.hash),
				header: match[1],
				scope: getTitleCasedScope(commit),
				shortHash: commit.shortHash,
				subject: commit.subject,
				text: undefined,
				title: " BREAKING CHANGE",
			},
		];
		patch.body = undefined;
	}

	// Handle notable changes
	if (/^(?:feat|fix)\(.+:\s.*$/u.test(commit.header) && commit.body) {
		context.notableChanges ??= [];
		context.notableChanges.push({
			body: commit.body,
			hashUrl: generateCommitUrl(context, commit.hash),
			scope: getTitleCasedScope(commit),
			shortHash: commit.shortHash,
			subject: commit.subject,
		});
	}

	// Handle other notable changes
	if (/^(?:refactor|perf|docs)\(.+:\s.*$/u.test(commit.header) && commit.body) {
		context.otherNotableChanges ??= [];
		context.otherNotableChanges.push({
			body: commit.body,
			hashUrl: generateCommitUrl(context, commit.hash),
			scope: getTitleCasedScope(commit),
			shortHash: commit.shortHash,
			subject: commit.subject,
		});
	}

	// Update context flags
	context.hasNotableChanges = (context.notableChanges ?? []).length > 0;
	context.hasOtherNotableChanges =
		(context.otherNotableChanges ?? []).length > 0;
	context.notableChangesTitle = " Notable Changes";
	context.otherNotableChangesTitle = " Other Notable Changes";

	if (commit.scope === "*") {
		patch.scope = "";
	}

	if (typeof commit.hash === "string") {
		patch.shortHash = commit.hash.slice(0, 7);
	}

	// Handle issue links
	if (typeof commit.subject === "string") {
		// Issue URLs.
		const issueRegEx = `(${issuePrefixes.join("|")})(\\d+)`;
		const re = new RegExp(issueRegEx, "gu");

		patch.subject = commit.subject.replaceAll(re, (_, prefix, issue) => {
			issues.push(String(prefix) + String(issue));

			// Ensure all values are strings to avoid unsafe assignments
			const templateContext = {
				host: String(context.host || ""),
				id: String(issue),
				owner: String(context.owner || ""),
				repository: String(context.repository || ""),
			};

			const url = expandTemplate(
				"{{host}}/{{owner}}/{{repository}}/issues/{{id}}",
				templateContext,
			);

			return `[${String(prefix)}${String(issue)}](${url})`;
		});

		// Handle user links
		if (typeof patch.subject === "string") {
			patch.subject = patch.subject.replaceAll(
				/\B@([a-z\d](?:-?[a-z\d/]){0,38})/gu,
				(_, user) => {
					const userStr = String(user);
					if (userStr.includes("/")) {
						return `@${userStr}`;
					}

					const usernameUrl = expandTemplate("{{host}}/{{user}}", {
						host: String(context.host || ""),
						user: userStr,
					});

					return `[@${userStr}](${usernameUrl})`;
				},
			);
		}
	}

	// Remove references that already appear in the subject
	if (Array.isArray(commit.references)) {
		patch.references = commit.references.filter((reference) => {
			const refId = String(reference.prefix) + String(reference.issue);
			return !issues.includes(refId);
		});
	}

	// Add GitHub user info
	const commits = await getRemoteCommits();
	const matchedRemoteCommit = commits.find(
		(remoteCommit) => remoteCommit.shortHash === commit.shortHash,
	);
	if (matchedRemoteCommit?.login) {
		patch.userLogin = matchedRemoteCommit.login;
	}

	return patch;
}

export const mainTemplate = readFileSync(
	path.resolve(__dirname, "./templates/template.hbs"),
	"utf8",
);

const commitTemplate = readFileSync(
	path.resolve(__dirname, "./templates/commit.hbs"),
	"utf8",
);

const issueUrlFormat = expandTemplate(
	"{{host}}/{{owner}}/{{repository}}/issues/{{id}}",
	{
		host,
		id: "{{this.issue}}",
		owner,
		repository,
	},
);

export const commitPartial = commitTemplate
	.replaceAll("{{commitUrlFormat}}", commitUrlFormat)
	.replaceAll("{{issueUrlFormat}}", issueUrlFormat);

interface CommitGroup {
	title: string;
}

/**
 * Sorts commit groups based on predefined order for changelog presentation
 * @param {CommitGroup} a - First commit group with title property
 * @param {CommitGroup} b - Second commit group with title property
 * @returns {number} Sort order value (-1 or 1) determining the relative position of the groups
 */
export function commitGroupsSort(a: CommitGroup, b: CommitGroup): number {
	const commitGroupOrder = [
		"🎨 Code Style Changes",
		"💚 CI Changes",
		"🔨 Maintenance Updates",
		"🧪 Test Updates",
		"🛠️ Build Updates",
		"⏪️ Reverted Changes",
		"📔 Documentation Changes",
		"⚡️  Performance Improvements",
		"♻️  Code Refactoring",
		"🐞 Bug Fixes",
		"⭐ New Features",
	];
	const gRankA = commitGroupOrder.indexOf(a.title);
	const gRankB = commitGroupOrder.indexOf(b.title);

	return gRankA >= gRankB ? -1 : 1;
}
