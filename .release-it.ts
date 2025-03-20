import { type Config } from "release-it";

import {
	commitGroupsSort,
	commitPartial,
	mainTemplate,
	transform,
} from "./scripts/release-it/conventional-changelog-writer-options";

export default {
	git: {
		requireBranch: "main",
		requireCommits: true,
		// requireCleanWorkingDir: false,

		commitArgs: ["--no-verify", "-S"],
		commitMessage: "🚀 Release v${version}",
		tagArgs: ["-s"],
	},
	github: {
		comments: { submit: true },
		release: true,
		releaseName: "Release v${version}",
	},
	hooks: { "before:init": ["pnpm lint"] },
	npm: { publish: false },
	plugins: {
		"@release-it/conventional-changelog": {
			infile: "CHANGELOG.md",
			preset: { name: "conventionalcommits" },
			// ignoreRecommendedBump: true,
			gitRawCommitsOpts: {
				format:
					"%B%n-hash-%n%H%n-shortHash-%n%h%n-gitTags-%n%d%n-committerDate-%n%ci%n-authorName-%n%an%n-authorEmail-%n%ae%n",
			},
			writerOpts: {
				commitGroupsSort,
				commitPartial,
				mainTemplate,
				transform,
			},
		},
	},
} satisfies Config;
