const {
  conventionalChangelogWriterOptsTransform,
  commitTemplate,
} = require("./release-it/conventionalChangelogWriterOptsTransform.cjs");

module.exports = {
  hooks: {
    "before:init": ["pnpm lint", "pnpm test"],
  },
  git: {
    requireBranch: "main",
    requireCommits: true,
    requireCleanWorkingDir: true,
    commitMessage: "🚀 Release v${version}",
    commitArgs: ["--no-verify", "-S"],
    tagArgs: ["-s"],
  },
  github: {
    release: true,
    releaseName: "Release v${version}",
  },
  npm: {
    publish: false,
  },
  plugins: {
    "@release-it/conventional-changelog": {
      ignoreRecommendedBump: true,
      infile: "CHANGELOG.md",
      gitRawCommitsOpts: {
        format:
          "%B%n-hash-%n%H%n-shortHash-%n%h%n-gitTags-%n%d%n-committerDate-%n%ci%n-authorName-%n%an%n-authorEmail-%n%ae%n-gpgStatus-%n%G?%n-gpgSigner-%n%GS",
      },
      writerOpts: {
        commitPartial: commitTemplate,
        transform: conventionalChangelogWriterOptsTransform,
      },
      preset: {
        name: "conventionalcommits",
      },
    },
  },
};
