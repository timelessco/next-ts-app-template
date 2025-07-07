/**
 * Clean Script - Remove build artifacts and dependencies
 *
 * This script provides a cleaning utility for Next.js projects using Effect TS.
 * It can clean .next build output, node_modules dependencies, and .turbo cache directories.
 *
 * Architecture:
 * - Built with Effect TS for type-safe error handling and dependency injection
 * - Uses @effect/cli for command-line interface with subcommands
 * - Service-based architecture with CleanService for core operations
 *
 * Usage Patterns:
 *
 * 1. Quick shortcuts (main command):
 *    pnpm clean --next              # Clean .next directory
 *    pnpm clean --turbo             # Clean .turbo directory
 *    pnpm clean --all               # Clean everything
 *    pnpm clean --next --force      # Skip confirmation
 *
 * 2. Explicit paths (subcommand):
 *    pnpm clean run .next node_modules         # Clean specific paths
 *    pnpm clean run .next --force              # Clean without confirmation
 *
 * Options:
 * - Target options: --all, --next, --node-modules, --turbo
 * - Behavior options: --force, --parallel
 * - Use --help for detailed information
 *
 * Safety Features:
 * - Confirmation prompt by default (bypass with --force)
 * - Explicit path requirements for subcommands
 * - Comprehensive error handling with proper exit codes
 *
 * Note: Program execution starts at the bottom of this file with NodeRuntime.runMain()
 * Follow the code flow from bottom to top to understand the architecture:
 * 1. Bottom: Entry point with NodeRuntime.runMain()
 * 2. Middle: Command definitions and composition
 * 3. Top: Service implementations and type definitions
 */

import { Args, Command, Options } from "@effect/cli";
import { FileSystem, Path } from "@effect/platform";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import type { PlatformError } from "@effect/platform/Error";
import { Array, Console, Duration, Effect, Match, Option } from "effect";

// Constants
const NEXT = ".next";
const NODE_MODULES = "node_modules";
const TURBO = ".turbo";

// Type definitions

interface CleanOptions {
	readonly parallel: boolean;
}

interface CleanResult {
	readonly cleaned: readonly string[];
	readonly duration: Duration.Duration;
	readonly failed: ReadonlyArray<{ error: unknown; path: string }>;
}

// Helper function to find all node_modules directories recursively
const findNodeModules = (
	fs: FileSystem.FileSystem,
	path: Path.Path,
	dir: string,
): Effect.Effect<readonly string[]> =>
	Effect.gen(function* () {
		const entries = yield* fs
			.readDirectory(dir)
			.pipe(Effect.catchAll(() => Effect.succeed([])));

		const getNodePaths = (entry: string) =>
			Effect.gen(function* () {
				const fullPath = path.join(dir, entry);
				const stat = yield* fs
					.stat(fullPath)
					.pipe(Effect.catchAll(() => Effect.succeed(null)));

				if (stat && stat.type === "Directory") {
					if (entry === NODE_MODULES) {
						return [fullPath];
					} else if (
						entry !== ".git" &&
						!entry.startsWith(".") &&
						entry !== NODE_MODULES
					) {
						const subPaths = yield* findNodeModules(fs, path, fullPath);
						return subPaths;
					}
				}
				return [];
			});

		const nodePaths = yield* Effect.forEach(entries, getNodePaths, {
			concurrency: "unbounded",
		}).pipe(Effect.map((results) => results.flat()));

		return nodePaths;
	});

// Helper to check if a path exists and return it in an array
const getPathIfExists = (
	fs: FileSystem.FileSystem,
	targetPath: string,
): Effect.Effect<readonly string[], PlatformError> =>
	Effect.gen(function* () {
		const exists = yield* fs.exists(targetPath);

		return exists ? [targetPath] : [];
	});

// Service implementation using Effect.Service
class CleanService extends Effect.Service<CleanService>()("CleanService", {
	dependencies: [NodeContext.layer],
	effect: Effect.gen(function* () {
		const fs = yield* FileSystem.FileSystem;
		const path = yield* Path.Path;

		// Helper function to convert targets to paths
		const convertTargetsToPaths = (
			targets: ReadonlyArray<"all" | "next" | "node_modules" | "turbo">,
		): Effect.Effect<readonly string[]> =>
			Effect.gen(function* () {
				const pathArrays = yield* Effect.forEach(targets, (target) =>
					Match.value(target).pipe(
						Match.when("all", () =>
							convertTargetsToPaths(["next", "node_modules", "turbo"]),
						),
						Match.when("next", () => getPathIfExists(fs, path.join(".", NEXT))),
						Match.when("node_modules", () => findNodeModules(fs, path, ".")),
						Match.when("turbo", () =>
							getPathIfExists(fs, path.join(".", TURBO)),
						),
						Match.orElse(() => Effect.succeed([target])),
					),
				);

				return pathArrays.flat();
			}).pipe(Effect.catchAll(() => Effect.succeed([] as string[])));

		return {
			convertTargetsToPaths,

			listPaths: (paths: readonly string[]) =>
				Effect.gen(function* () {
					const results = yield* Effect.forEach(
						paths,
						(targetPath) =>
							fs
								.exists(targetPath)
								.pipe(
									Effect.map((exists) =>
										exists ? Option.some(targetPath) : Option.none(),
									),
								),
						{ concurrency: "unbounded" },
					);

					return Array.getSomes(results);
				}),

			performClean: (
				targets: readonly string[],
				options: CleanOptions,
			): Effect.Effect<CleanResult> =>
				Effect.gen(function* () {
					const startTime = yield* Effect.sync(() => Date.now());

					const cleaned: string[] = [];
					const failed: Array<{ error: unknown; path: string }> = [];

					const cleanTarget = (targetPath: string) =>
						Effect.gen(function* () {
							yield* fs.remove(targetPath, { recursive: true });
							cleaned.push(targetPath);
						}).pipe(
							Effect.catchAll((error) =>
								Effect.sync(() => {
									failed.push({ error, path: targetPath });
								}),
							),
						);

					yield* Effect.forEach(targets, cleanTarget, {
						concurrency: options.parallel ? "unbounded" : 1,
						discard: true,
					});

					const endTime = yield* Effect.sync(() => Date.now());
					const duration = Duration.millis(endTime - startTime);

					return {
						cleaned,
						duration,
						failed,
					};
				}),
		};
	}),
}) {}

// Run command - actually performs the cleaning
const runCommand = Command.make(
	"run",
	{
		force: Options.boolean("force").pipe(
			Options.withAlias("f"),
			Options.withDescription("Skip confirmation prompt"),
		),
		parallel: Options.boolean("parallel").pipe(
			Options.withAlias("p"),
			Options.withDefault(true),
			Options.withDescription("Clean targets in parallel"),
		),
		paths: Args.text({ name: "path" }).pipe(
			Args.repeated,
			Args.withDescription("Paths to clean"),
		),
	},
	({ force, parallel, paths }) =>
		Effect.gen(function* () {
			const service = yield* CleanService;

			// Require at least one path
			if (paths.length === 0) {
				return yield* Effect.fail(
					"No paths specified. Usage: clean run <path> [<path>...] [options]\n\nExample:\n  clean run .next node_modules --force",
				);
			}

			// List paths first
			const targets = yield* service.listPaths(paths);

			if (targets.length === 0) {
				return yield* Effect.fail(
					"No valid paths found to clean: " + paths.join(", "),
				);
			}

			// Show what will be cleaned
			yield* Console.log("\nPaths to be cleaned:");
			yield* Effect.forEach(
				targets,
				(targetPath) => Console.log(`  • ${targetPath}`),
				{ discard: true },
			);

			// Confirm unless forced
			if (!force) {
				const confirm = yield* Effect.tryPromise({
					catch: (error) =>
						`Failed to prompt for confirmation: ${String(error)}`,
					try: async () => {
						const { confirm } = await import("@inquirer/prompts");
						return confirm({
							default: false,
							message: "Proceed with cleaning?",
						});
					},
				});

				if (!confirm) {
					return yield* Effect.fail("Operation cancelled by user");
				}
			}

			// Perform cleaning
			yield* Console.log("\nCleaning...");
			const result = yield* service.performClean(targets, {
				parallel,
			});

			// Report results
			yield* Console.log("\n✅ Cleaning complete!");
			yield* Console.log(`  • Cleaned: ${result.cleaned.length} items`);
			yield* Console.log(`  • Failed: ${result.failed.length} items`);
			yield* Console.log(
				`  • Duration: ${Duration.toMillis(result.duration)}ms`,
			);

			if (result.failed.length > 0) {
				yield* Console.log("\n❌ Failed to clean:");
				yield* Effect.forEach(
					result.failed,
					(failure) =>
						Console.log(`  • ${failure.path}: ${String(failure.error)}`),
					{ discard: true },
				);
			}
		}),
).pipe(Command.withDescription("Clean build artifacts and dependencies"));

const quickOptions = {
	all: Options.boolean("all").pipe(
		Options.withAlias("a"),
		Options.withDescription("Clean everything (next, node_modules, turbo)"),
	),
	force: Options.boolean("force").pipe(
		Options.withAlias("f"),
		Options.withDescription("Skip confirmation prompt"),
	),
	next: Options.boolean("next").pipe(
		Options.withAlias("n"),
		Options.withDescription("Clean .next directory"),
	),
	nodeModules: Options.boolean("node-modules").pipe(
		Options.withAlias("m"),
		Options.withDescription("Clean all node_modules directories"),
	),
	parallel: Options.boolean("parallel").pipe(
		Options.withAlias("p"),
		Options.withDefault(true),
		Options.withDescription("Clean targets in parallel"),
	),
	turbo: Options.boolean("turbo").pipe(
		Options.withAlias("t"),
		Options.withDescription("Clean .turbo directory"),
	),
};

// Main clean command
const cleanCommand = Command.make("clean", quickOptions, (opts) =>
	Effect.gen(function* () {
		const hasTargets = opts.all || opts.next || opts.nodeModules || opts.turbo;

		// Show help when no arguments provided
		if (!hasTargets) {
			yield* Console.log(
				"No targets specified. Use --wizard for guided mode or specify targets.",
			);
			yield* Console.log("\nTarget options:");
			yield* Console.log(
				"  --all, -a         Clean everything (.next, node_modules, .turbo)",
			);
			yield* Console.log("  --next, -n        Clean .next directory");
			yield* Console.log(
				"  --node-modules, -m Clean all node_modules directories",
			);
			yield* Console.log("  --turbo, -t       Clean .turbo directory");
			yield* Console.log("\nBehavior options:");
			yield* Console.log("  --force, -f       Skip confirmation prompt");
			yield* Console.log(
				"  --parallel, -p    Clean targets in parallel (default: true)",
			);
			yield* Console.log("  --wizard          Interactive mode");
			yield* Console.log("\nExamples:");
			yield* Console.log(
				"  pnpm clean --next --turbo        # Clean with confirmation",
			);
			yield* Console.log(
				"  pnpm clean --all --force         # Clean everything immediately",
			);
			yield* Console.log("\nOr use subcommand with explicit paths:");
			yield* Console.log("  clean run <path>...   Clean specific paths");
			return;
		}

		// Convert quick options to targets
		const targets = Array.getSomes([
			opts.all ? Option.some("all" as const) : Option.none(),
			!opts.all && opts.next ? Option.some("next" as const) : Option.none(),
			!opts.all && opts.nodeModules
				? Option.some("node_modules" as const)
				: Option.none(),
			!opts.all && opts.turbo ? Option.some("turbo" as const) : Option.none(),
		]);

		// Convert targets to paths
		const service = yield* CleanService;
		const paths = yield* service.convertTargetsToPaths(targets);

		if (paths.length === 0) {
			return yield* Effect.fail(
				`No valid paths found for the specified targets: ${targets.join(", ")}`,
			);
		}

		// Delegate to run command
		yield* runCommand.handler({
			force: opts.force,
			parallel: opts.parallel,
			paths: [...paths],
		});
	}),
).pipe(
	Command.withDescription("Clean build artifacts and dependencies"),
	Command.withSubcommands([runCommand]),
);

// Create the CLI application
const cli = Command.run(cleanCommand, {
	name: "Clean Build Artifacts",
	version: "2.0.0",
});

cli(process.argv).pipe(
	Effect.provide(CleanService.Default),
	Effect.provide(NodeContext.layer),
	NodeRuntime.runMain,
);
