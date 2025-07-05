/**
 * Configuration for syncing changes from this template repository
 * to derived projects.
 */
export const config = {
	// Target repositories to sync changes to
	targetRepos: [
		{
			branch: "main",
			name: "timelessco-nextjs",
			owner: "timelessco",
		},
		{
			branch: "main",
			name: "timeless-labs",
			owner: "timelessco",
		},
	],
	// Files to exclude from syncing
	excludeFiles: ["pnpm-lock.yaml", "CLAUDE.md"],
};

export default config;
