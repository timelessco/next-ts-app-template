# Template Sync Documentation

This document explains how to sync changes from the `next-ts-app-template` repository to derived projects.

## Overview

The template sync system provides a CLI tool for syncing updates from the template repository to projects that were created from it. The tool allows you to:

- Select specific commits to sync
- Choose target repositories
- Exclude specific files from syncing
- Automatically create PRs with the changes

## Quick Start

To sync recent changes to derived repositories:

```bash
# Run the interactive sync tool
pnpm sync:template

# Or use directly
pnpm tsx scripts/sync-template-changes.ts
```

The tool will guide you through:

1. Selecting commits to sync
2. Choosing target repositories
3. Creating PRs with the changes

## Configuration

### Template Repository Configuration

The template repository uses `template-sync.config.ts` to define:

```typescript
{
  targetRepos: [
    {
      owner: 'timelessco',
      name: 'timelessco-nextjs',
      branch: 'main'
    }
  ],
  excludeFiles: ['pnpm-lock.yaml', 'CLAUDE.md']
}
```

### Derived Repository Configuration

Files are synced from the template repository with specific exclusions defined in the template configuration. The `excludeFiles` array in the template configuration specifies which files should be preserved in derived repositories and not overwritten during sync.

## Usage Guide

### Running the Sync Tool

The sync tool is an interactive CLI script that guides you through the process:

```bash
# Run using the package.json script
pnpm sync:template

# Or run directly with tsx
pnpm tsx scripts/sync-template-changes.ts
```

### What the Tool Does

1. **Prerequisites Check**: Verifies that GitHub CLI (`gh`) is installed
2. **Configuration Loading**: Loads from `template-sync.config.ts` or prompts for setup
3. **Commit Selection**: Shows the last 30 commits for you to choose from
4. **Repository Selection**: Choose which target repositories to sync to
5. **Apply Changes**:
   - Clones each target repository
   - Creates a new branch
   - Cherry-picks selected commits
   - Excludes configured files
   - Runs `pnpm fix` to ensure code style consistency
   - Updates lockfile if needed
6. **Create PR**: Creates a pull request with all changes

### First-Time Setup

If no configuration exists, the tool will prompt you to:

1. Enter repository owner (GitHub username/organization)
2. Enter repository name
3. Enter target branch (defaults to "main")
4. Add additional repositories as needed
5. Save the configuration for future use

## What Gets Synced?

Files from the template repository are synced to derived repositories with configurable exclusions. By default, the following are excluded:

- `pnpm-lock.yaml` - Preserves project-specific dependency versions
- `CLAUDE.md` - Preserves project-specific Claude instructions

All other files are synced, including:

- Source code files
- Configuration files (except those excluded)
- Documentation
- Assets and public files
- Environment file templates
- Build and development tools
- GitHub workflows and actions

The sync process now includes automatic code formatting:

- After applying changes, `pnpm fix` is run if available
- This ensures synced code follows the target repository's coding standards
- Dependencies are installed before running fixes to ensure tools are available

## Handling Conflicts

When conflicts occur during syncing:

1. **Automated Resolution**: By default, template changes take precedence for non-excluded files
2. **Manual Resolution**: Review the PR and resolve conflicts in the GitHub UI
3. **Excluded Files**: Files listed in `excludeFiles` are automatically preserved from the target repository
4. **Code Formatting**: After resolving conflicts, code is automatically formatted using `pnpm fix`

## Best Practices

### Template Repository Guidelines

1. **Use Clear Commit Messages**: Follow conventional commits for better filtering
2. **Be Selective with Commits**: Only sync commits that should apply to all derived projects
3. **Group Related Changes**: Make related changes in single commits when possible
4. **Document Changes**: Update this documentation when changing sync behavior

### For Derived Projects

1. **Review All PRs**: Always review template sync PRs before merging
2. **Maintain Exclusions**: Add files to `excludeFiles` in template config if they should never be synced
3. **Test After Sync**: Run your test suite after merging template updates
4. **Trust Code Formatting**: The automatic `pnpm fix` ensures code follows your project's standards

## Advanced Usage

### Custom Sync Configuration

Create a custom configuration for complex scenarios:

```typescript
// template-sync.config.ts
export const config = {
	targetRepos: [
		{
			owner: "myorg",
			name: "myproject",
			branch: "develop",
		},
	],
	excludeFiles: [
		"pnpm-lock.yaml",
		"CLAUDE.md",
		"custom-config.json",
		".env.local",
	],
};
```

### Selective Commit Syncing

The tool shows the last 30 commits with their:

- SHA (first 7 characters)
- Commit message
- Date

You can select multiple commits using space bar and navigate with arrow keys.

### Syncing Process Details

The sync process:

1. Cherry-picks all selected commits using `--strategy=recursive -X theirs`
2. Automatically resolves conflicts by taking template changes
3. Excludes files listed in `excludeFiles` configuration
4. Creates a single commit with all changes
5. Runs `pnpm fix` if available in the target repository
6. Updates `pnpm-lock.yaml` if `package.json` was modified
7. Creates a PR with detailed information about synced commits

## Troubleshooting

### Common Issues

1. **GitHub CLI Not Found**
   - Install GitHub CLI: `brew install gh` (macOS) or see [installation guide](https://cli.github.com/)
   - Authenticate with: `gh auth login`

2. **Permission Denied**
   - Ensure you have push access to target repositories
   - Check GitHub CLI authentication: `gh auth status`

3. **Conflicts Not Resolving**
   - The tool uses `--strategy=recursive -X theirs` to prefer template changes
   - Manual resolution may be needed for complex conflicts

4. **Files Not Being Excluded**
   - Check the `excludeFiles` configuration in template repository
   - Excluded files are reset to their original state after cherry-picking

5. **PR Creation Fails**
   - Ensure branch protection rules allow PR creation
   - Check for existing PRs with same changes
   - Verify repository permissions

6. **Code Style Issues After Sync**
   - The sync process runs `pnpm fix` automatically if available
   - Dependencies are installed before running fixes
   - Check that the target repository has a `fix` script in package.json

### Debug Mode

The tool provides detailed logging throughout the process. If you encounter issues:

1. Check the console output for error messages
2. Verify the temporary directory (e.g., `/tmp/template-sync-{repo-name}`) if cleanup fails
3. Review the created PR for any unexpected changes

## Security Considerations

1. **Authentication**: The tool uses GitHub CLI authentication - ensure you're logged in with appropriate permissions
2. **Review Changes**: Always review PRs before merging
3. **Excluded Files**: Sensitive files like `.env` should be added to `excludeFiles`
4. **Branch Protection**: Enforce PR reviews on target repository branches

## FAQ

**Q: Can I exclude certain files from syncing?**
A: Yes, use the `excludeFiles` array in the template configuration. By default, `pnpm-lock.yaml` and `CLAUDE.md` are excluded.

**Q: How do I prevent a commit from being synced?**
A: Simply don't select that commit when running the sync tool. The sync process is entirely based on commit selection.

**Q: Can I sync to private repositories?**
A: Yes, ensure your GitHub token has appropriate permissions.

**Q: How do I handle breaking changes?**
A: Don't select commits with breaking changes during regular syncs. Handle them separately with careful review.

**Q: Will the sync process modify my code style?**
A: Yes, the sync process runs `pnpm fix` after applying changes to ensure consistent code style with your project's standards.

## Support

For issues or questions:

1. Check the [troubleshooting guide](#troubleshooting)
2. Review [existing issues](https://github.com/timelessco/next-ts-app-template/issues)
3. Create a new issue with the `template-sync` label
