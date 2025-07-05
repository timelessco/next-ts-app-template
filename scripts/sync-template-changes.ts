/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable import-x/no-named-as-default-member */

import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkbox, confirm, input } from "@inquirer/prompts";
import { $ } from "execa";
import fsExtra from "fs-extra";
import { z } from "zod";

import { vet } from "./utils/try.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "..");

// Configuration schema
const _ConfigSchema = z.object({
	excludeFiles: z.array(z.string()).optional().default(["pnpm-lock.yaml"]),
	targetRepos: z.array(
		z.object({
			branch: z.string().default("main"),
			name: z.string(),
			owner: z.string(),
		}),
	),
});

type Config = z.infer<typeof _ConfigSchema>;

// Prompt for configuration
async function promptForConfig(): Promise<Config> {
	console.log(
		"No configuration file found. Let's set up your sync configuration.",
	);

	const targetRepos: Config["targetRepos"] = [];
	let addMore = true;

	// Prompt for target repositories
	while (addMore) {
		const ownerResult = await vet(() =>
			input({
				message: "Repository owner (GitHub username or organization):",
				validate: (value) => value.trim() !== "" || "Owner is required",
			}),
		);

		if (ownerResult.isErr()) {
			console.error("Failed to get Repository Owner");
			throw ownerResult.error;
		}

		const nameResult = await vet(() =>
			input({
				message: "Repository name:",
				validate: (value) =>
					value.trim() !== "" || "Repository name is required",
			}),
		);

		if (nameResult.isErr()) {
			console.error("Failed to get Repository Name");
			throw nameResult.error;
		}

		const branchResult = await vet(() =>
			input({
				default: "main",
				message: "Target branch:",
			}),
		);

		if (branchResult.isErr()) {
			console.error("Failed to get Target Branch");
			throw branchResult.error;
		}

		targetRepos.push({
			branch: branchResult.value.trim(),
			name: nameResult.value.trim(),
			owner: ownerResult.value.trim(),
		});

		const addMoreResult = await vet(() =>
			confirm({
				default: false,
				message: "Add another repository?",
			}),
		);

		addMore = addMoreResult.unwrapOr(false);
	}

	return { excludeFiles: ["pnpm-lock.yaml"], targetRepos };
}

// Load configuration
async function loadConfig(): Promise<Config> {
	const configPath = path.join(PROJECT_ROOT, "template-sync.config.ts");

	const existsResult = await vet(() => fsExtra.pathExists(configPath));
	if (existsResult.unwrapOr(false)) {
		console.log(`Loading configuration from ${configPath}`);
		const importResult = await vet(async () => {
			const configModule = (await import(configPath)) as { config: Config };
			return configModule.config;
		});

		if (importResult.isOk()) {
			return importResult.value;
		}

		if (importResult.isErr()) {
			console.error(`Failed to load config: ${importResult.error.message}`);
		}

		const usePromptResult = await vet(() =>
			confirm({
				default: true,
				message: "Would you like to configure sync settings interactively?",
			}),
		);

		if (!usePromptResult.unwrapOr(false)) {
			console.error(
				"Configuration required. Please fix the config file or use interactive setup.",
			);
			// Since this is not from a vet() result, we create a minimal error
			throw new Error("Configuration required");
		}

		const config = await promptForConfig();
		return config;
	}

	// No config file found, prompt for configuration
	return promptForConfig();
}

// Helper function for operations that need cleanup
async function withTempDirectory<T>(
	tempDir: string,
	operation: () => Promise<T>,
): Promise<T> {
	try {
		return await operation();
	} finally {
		// Always cleanup, even if operation fails
		const cleanupResult = await vet(async () => {
			const result = await $`rm -rf ${tempDir}`;
			return result;
		});
		if (cleanupResult.isErr()) {
			console.error(
				`Failed to cleanup ${tempDir}: ${cleanupResult.error.message}\nYou may need to manually remove the directory using \`rm -rf ${tempDir}\``,
			);
		}
	}
}

// Get commits from template repository
interface Commit {
	author: string;
	date: string;
	files: string[];
	message: string;
	sha: string;
}

async function getCommits(count = 20): Promise<Commit[]> {
	console.log(`Fetching last ${count} commits from template repository...`);

	const commitListResult = await vet(async () => {
		const result =
			await $`git log --format=%H|%s|%an|%ad --date=short -${count}`;
		return result;
	});

	if (commitListResult.isErr()) {
		console.error(`Failed to get commits: ${commitListResult.error.message}`);
		return [];
	}

	if (!commitListResult.value.stdout) {
		console.error("No output from git log command");
		return [];
	}

	const commits: Commit[] = [];

	for (const line of commitListResult.value.stdout.split("\n")) {
		if (!line) continue;

		const [sha, message, author, date] = line.split("|");

		// Get changed files for this commit
		const filesResult = await vet(async () => {
			const result =
				await $`git diff-tree --no-commit-id --name-only -r ${sha.trim()}`;
			return result;
		});
		if (filesResult.isErr()) {
			console.warn(
				`Failed to get files for commit ${sha.slice(0, 7)}: ${filesResult.error.message}`,
			);
		}

		const files = filesResult.isOk()
			? filesResult.value.stdout.split("\n").filter(Boolean)
			: [];

		commits.push({
			author: author.trim(),
			date: date.trim(),
			files,
			message: message.trim(),
			sha: sha.trim(),
		});
	}

	return commits;
}

// Create PR in target repository
async function createPR(
	targetRepo: Config["targetRepos"][0],
	branch: string,
	commits: Commit[],
	tempDir: string,
) {
	const repoPath = `${targetRepo.owner}/${targetRepo.name}`;

	console.log(`Creating PR in ${repoPath}...`);

	// Get template repo info
	const remoteUrlResult = await vet(async () => {
		const result = await $`git config --get remote.origin.url`;
		return result;
	});

	let templateRepoUrl = "https://github.com/timelessco/next-ts-app-template";
	let templateRepoName = "next-ts-app-template";

	if (remoteUrlResult.isOk() && remoteUrlResult.value.stdout) {
		const remoteUrl = remoteUrlResult.value.stdout.trim();
		// Extract repo URL and name from git remote
		if (remoteUrl.includes("github.com")) {
			// Handle both SSH and HTTPS URLs
			const regex = /github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/;
			const match = regex.exec(remoteUrl);
			if (match) {
				templateRepoUrl = `https://github.com/${match[1]}/${match[2]}`;
				templateRepoName = match[2];
			}
		}
	}

	// Prepare PR body
	let prBody = `## Template Sync

This PR syncs the following changes from the template repository: [${templateRepoName}](${templateRepoUrl})

### Synced Commits:
`;

	for (const commit of commits) {
		prBody += `- ${commit.sha.slice(0, 7)}: ${commit.message}\n`;
	}

	prBody += `
### Review Notes:
- Please review all changes carefully
- Check that no project-specific customizations were overwritten
- Run tests to ensure everything still works

Created by template sync tool`;

	const prResult = await vet(async () => {
		const result = await $({
			cwd: tempDir,
		})`gh pr create --repo ${repoPath} --title ${`chore(template-sync): Update from ${templateRepoName}`} --body ${prBody} --base ${targetRepo.branch} --head ${branch}`;
		return result;
	});

	if (prResult.isOk()) {
		const prUrl =
			typeof prResult.value.stdout === "string"
				? prResult.value.stdout.trim()
				: String(prResult.value.stdout);
		console.log(`PR created: ${prUrl}`);
		return prUrl;
	}

	if (prResult.isErr()) {
		console.error(
			`Failed to create PR in ${targetRepo.owner}/${targetRepo.name} ${targetRepo.branch}`,
		);
		throw prResult.error;
	}
}

// Process a single repository
async function processRepository(
	targetRepo: Config["targetRepos"][0],
	selectedCommits: Commit[],
	tempDir: string,
	config: Config,
) {
	// Clone target repository
	console.log("Cloning target repository...");
	const rmResult = await vet(async () => {
		const result = await $`rm -rf ${tempDir}`;
		return result;
	});
	if (rmResult.isErr()) {
		console.error(`Failed to remove existing temp dir ${tempDir}`);
		throw rmResult.error;
	}

	const cloneResult = await vet(async () => {
		const result =
			await $`gh repo clone ${targetRepo.owner}/${targetRepo.name} ${tempDir}`;
		return result;
	});
	if (cloneResult.isErr()) {
		console.error(
			`Failed to clone repository ${targetRepo.owner}/${targetRepo.name}: ${cloneResult.error.message}`,
		);
		throw cloneResult.error;
	}

	// Verify the directory exists
	const dirExistsResult = await vet(() => fsExtra.pathExists(tempDir));
	if (!dirExistsResult.unwrapOr(false)) {
		throw new Error(`Clone succeeded but directory ${tempDir} does not exist`);
	}

	// Create new branch
	const branchName = `template-sync-${Date.now()}`;
	const checkoutResult = await vet(async () => {
		const result = await $({ cwd: tempDir })`git checkout -b ${branchName}`;
		return result;
	});
	if (checkoutResult.isErr()) {
		console.error(`Failed to create branch ${branchName}`);
		throw checkoutResult.error;
	}

	// Add template as remote
	const addRemoteResult = await vet(async () => {
		const result = await $({
			cwd: tempDir,
		})`git remote add template ${PROJECT_ROOT}`;
		return result;
	});
	if (addRemoteResult.isErr()) {
		console.error(`Failed to add template remote`);
		throw addRemoteResult.error;
	}

	const fetchResult = await vet(async () => {
		// Use --tags --force to handle tag conflicts
		const result = await $({ cwd: tempDir })`git fetch template --tags --force`;
		return result;
	});
	if (fetchResult.isErr()) {
		console.error(`Failed to fetch template`);
		throw fetchResult.error;
	}

	// Apply all selected commits at once
	console.log(`Applying ${selectedCommits.length} commits...`);

	// Cherry-pick all commits without committing
	let hasChanges = false;
	const failedCommits: string[] = [];

	for (const commit of selectedCommits) {
		console.log(`Cherry-picking ${commit.sha.slice(0, 7)}: ${commit.message}`);

		const cherryPickResult = await vet(async () => {
			const result = await $({
				cwd: tempDir,
			})`git cherry-pick ${commit.sha} --no-commit --strategy=recursive -X theirs`;
			return result;
		});

		if (cherryPickResult.isOk()) {
			hasChanges = true;
		} else {
			// Handle conflicts by taking all changes from template
			console.warn(`Resolving conflicts for ${commit.sha.slice(0, 7)}...`);

			const statusResult = await vet(async () => {
				const result = await $({ cwd: tempDir })`git status --porcelain`;
				return result;
			});

			if (statusResult.isOk()) {
				const status = statusResult.value.stdout;
				let hasConflicts = false;

				for (const line of status.split("\n")) {
					if (line.startsWith("UU ") || line.startsWith("AA ")) {
						hasConflicts = true;
						const file = line.slice(3);
						// Take template version
						const checkoutResult = await vet(async () => {
							const result = await $({
								cwd: tempDir,
							})`git checkout --theirs -- ${file}`;
							return result;
						});
						if (checkoutResult.isOk()) {
							const addResult = await vet(async () => {
								const result = await $({ cwd: tempDir })`git add ${file}`;
								return result;
							});
							if (addResult.isOk()) {
								hasChanges = true;
							}
						}
					}
				}

				if (!hasConflicts) {
					// No conflicts, but cherry-pick failed for another reason
					failedCommits.push(`${commit.sha.slice(0, 7)}: ${commit.message}`);
					// Reset to clean state
					await vet(async () => {
						const result = await $({ cwd: tempDir })`git reset --hard`;
						return result;
					});
				}
			}
		}
	}

	if (failedCommits.length > 0) {
		console.warn(
			`Failed to apply ${failedCommits.length} commits:`,
			failedCommits,
		);
	}

	if (!hasChanges) {
		console.warn(
			`No changes applied to ${targetRepo.owner}/${targetRepo.name}.`,
		);
		return;
	}

	// Reset excluded files to their original state first
	console.log("Excluding configured files...");
	for (const excludedFile of config.excludeFiles) {
		const resetResult = await vet(async () => {
			const result = await $({
				cwd: tempDir,
			})`git checkout HEAD -- ${excludedFile}`;
			return result;
		});
		if (resetResult.isOk()) {
			console.log(`Excluded ${excludedFile} from sync`);
		}
	}

	// Run pnpm fix if available to ensure code follows target repo's standards
	console.log("Running code fixes on final set of files...");
	const pnpmExistsResult = await vet(() =>
		fsExtra.pathExists(path.join(tempDir, "package.json")),
	);

	if (pnpmExistsResult.unwrapOr(false)) {
		// Check if fix script exists in package.json
		const packageJsonResult = await vet(async () => {
			const content = await fsExtra.readFile(
				path.join(tempDir, "package.json"),
				"utf8",
			);
			return JSON.parse(content) as { scripts?: Record<string, string> };
		});

		if (packageJsonResult.isOk() && packageJsonResult.value.scripts?.fix) {
			// First ensure dependencies are installed
			console.log("Installing dependencies...");
			const installResult = await vet(async () => {
				const result = await $({
					cwd: tempDir,
					reject: false,
				})`pnpm install`;
				return result;
			});

			if (installResult.isErr()) {
				console.warn(
					"Failed to install dependencies:",
					installResult.error.message,
				);
			} else {
				console.log("Dependencies installed successfully");
			}

			console.log("Found 'fix' script, running pnpm fix...");
			const fixResult = await vet(async () => {
				const result = await $({
					cwd: tempDir,
					reject: false, // Don't throw on non-zero exit codes
					stdio: "inherit", // Show the output so we can see what's happening
				})`pnpm fix`;
				return result;
			});

			if (fixResult.isOk()) {
				console.log("Successfully ran pnpm fix");
			} else {
				console.warn(
					"pnpm fix failed, continuing anyway:",
					fixResult.error.message,
				);
			}
		} else {
			console.log("No 'fix' script found in package.json, skipping code fixes");
		}
	}

	// Check if there are any changes to commit
	const finalStatusResult = await vet(async () => {
		const result = await $({ cwd: tempDir })`git status --porcelain`;
		return result;
	});

	if (!finalStatusResult.isOk() || !finalStatusResult.value.stdout.trim()) {
		console.warn("No changes to commit after excluding files");
		return;
	}

	// Add all changes
	const addAllResult = await vet(async () => {
		const result = await $({ cwd: tempDir })`git add -A`;
		return result;
	});

	if (addAllResult.isErr()) {
		console.error("Failed to stage changes");
		throw addAllResult.error;
	}

	// Create a single commit with all changes
	const commitMessages = selectedCommits
		.map((c) => `- ${c.sha.slice(0, 7)}: ${c.message}`)
		.join("\n");
	const commitMessage = `chore(template-sync): sync changes from template

Synced commits:
${commitMessages}`;

	const commitResult = await vet(async () => {
		const result = await $({
			cwd: tempDir,
		})`git commit -m ${commitMessage}`;
		return result;
	});

	if (commitResult.isErr()) {
		console.error("Failed to commit changes");
		throw commitResult.error;
	}

	console.log("Created single commit with all synced changes");

	// Update lockfile if needed
	const lockfileExists = await vet(() =>
		fsExtra.pathExists(path.join(tempDir, "pnpm-lock.yaml")),
	);
	if (lockfileExists.unwrapOr(false)) {
		const diffResult = await vet(async () => {
			const result = await $({ cwd: tempDir })`git diff --name-only HEAD~1`;
			return result;
		});

		if (diffResult.isOk()) {
			const stdout =
				typeof diffResult.value.stdout === "string"
					? diffResult.value.stdout
					: "";
			const packageJsonChanged = stdout.includes("package.json");

			if (packageJsonChanged) {
				console.log("Updating pnpm lockfile...");
				const installResult = await vet(async () => {
					const result = await $({
						cwd: tempDir,
					})`pnpm install --lockfile-only`;
					return result;
				});
				if (installResult.isErr()) {
					console.error(`Failed to update lockfile in ${tempDir}`);
					throw installResult.error;
				}

				// Check if lockfile actually changed
				const lockfileStatusResult = await vet(async () => {
					const result = await $({
						cwd: tempDir,
					})`git status --porcelain pnpm-lock.yaml`;
					return result;
				});

				if (
					lockfileStatusResult.isOk() &&
					lockfileStatusResult.value.stdout.trim()
				) {
					console.log("Lockfile was modified, committing changes...");

					const addLockResult = await vet(async () => {
						const result = await $({ cwd: tempDir })`git add pnpm-lock.yaml`;
						return result;
					});
					if (addLockResult.isErr()) {
						console.error(`Failed to add lockfile in ${tempDir}`);
						throw addLockResult.error;
					}

					const commitResult = await vet(async () => {
						const result = await $({
							cwd: tempDir,
						})`git commit -m ${"chore(deps): update lockfile after template sync"}`;
						return result;
					});
					if (commitResult.isErr()) {
						console.error(`Failed to commit lockfile in ${tempDir}`);
						throw commitResult.error;
					}
				} else {
					console.log("Lockfile was not modified, skipping additional commit");
				}
			}
		}
	}

	// Push changes
	console.log("Pushing changes...");
	const pushResult = await vet(async () => {
		const result = await $({ cwd: tempDir })`git push origin ${branchName}`;
		return result;
	});
	if (pushResult.isErr()) {
		console.error(
			`Failed to push changes to ${targetRepo.owner}/${targetRepo.name}`,
		);
		throw pushResult.error;
	}

	// Create PR
	await createPR(targetRepo, branchName, selectedCommits, tempDir);
}

// Main sync function
async function syncTemplate() {
	// Check prerequisites
	const ghVersionResult = await vet(async () => {
		const result = await $`gh --version`;
		return result;
	});
	if (ghVersionResult.isErr()) {
		console.error("GitHub CLI (gh) is not installed. Please install it first.");
		throw ghVersionResult.error;
	}

	// Load configuration
	const config = await loadConfig();

	// Ask if user wants to save the configuration
	const configExistsResult = await vet(() =>
		fsExtra.pathExists(path.join(PROJECT_ROOT, "template-sync.config.ts")),
	);

	if (!configExistsResult.unwrapOr(false)) {
		const saveConfigResult = await vet(() =>
			confirm({
				default: true,
				message: "Would you like to save this configuration for future use?",
			}),
		);

		if (saveConfigResult.unwrapOr(false)) {
			const configContent = `/**
 * Configuration for syncing changes from this template repository
 * to derived projects.
 */
export const config = {
	// Target repositories to sync changes to
	targetRepos: ${JSON.stringify(config.targetRepos, null, "\t").replaceAll(/"([^"]+)":/g, "$1:")},
	// Files to exclude from syncing
	excludeFiles: ${JSON.stringify(config.excludeFiles)},
};

export default config;
`;

			const writeResult = await vet(() =>
				fsExtra.writeFile(
					path.join(PROJECT_ROOT, "template-sync.config.ts"),
					configContent,
					"utf8",
				),
			);

			if (writeResult.isOk()) {
				console.log("Configuration saved to template-sync.config.ts");
			}

			if (writeResult.isErr()) {
				console.error(
					`Failed to save configuration: ${writeResult.error.message}`,
				);
			}
		}
	}

	// Get commits (no filtering)
	const allCommits = await getCommits(30);

	if (allCommits.length === 0) {
		throw new Error("No commits found.");
	}

	// Let user select commits
	const selectedCommitsResult = await vet(() =>
		checkbox({
			choices: allCommits.map((commit) => ({
				name: `${commit.sha.slice(0, 7)}: ${commit.message} (${commit.date})`,
				value: commit,
			})),
			message: "Select commits to sync:",
		}),
	);

	if (selectedCommitsResult.isErr()) {
		throw new Error("Commit selection cancelled.");
	}

	const selectedCommits = selectedCommitsResult.value;

	if (selectedCommits.length === 0) {
		throw new Error("No commits selected.");
	}

	// Let user select target repositories
	const selectedReposResult = await vet(() =>
		checkbox({
			choices: config.targetRepos.map((repo) => ({
				name: `${repo.owner}/${repo.name}`,
				value: repo,
			})),
			message: "Select target repositories:",
		}),
	);

	if (selectedReposResult.isErr()) {
		throw new Error("Repository selection cancelled.");
	}

	const selectedRepos = selectedReposResult.value;

	if (selectedRepos.length === 0) {
		throw new Error("No repositories selected.");
	}

	// Confirm before proceeding
	const shouldProceedResult = await vet(() =>
		confirm({
			default: true,
			message: `Sync ${selectedCommits.length} commits to ${selectedRepos.length} repositories?`,
		}),
	);

	if (!shouldProceedResult.unwrapOr(false)) {
		throw new Error("Sync cancelled.");
	}

	// Process each repository
	for (const targetRepo of selectedRepos) {
		console.log(`\nSyncing to ${targetRepo.owner}/${targetRepo.name}...`);

		const tempDir = `/tmp/template-sync-${targetRepo.name}`;

		// Use withTempDirectory to ensure cleanup
		const processResult = await vet(() =>
			withTempDirectory(tempDir, () =>
				processRepository(targetRepo, selectedCommits, tempDir, config),
			),
		);

		if (processResult.isErr()) {
			console.error(
				`Failed to sync to ${targetRepo.owner}/${targetRepo.name}: ${processResult.error.message}`,
			);

			// Continue with next repository instead of failing the whole process
			continue;
		}
	}

	console.log("\nTemplate sync completed!");
}

// Run the sync
await syncTemplate();
