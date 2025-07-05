import { parseArgs } from "node:util";

import { select } from "@inquirer/prompts";
import { $ } from "execa";

import { vet } from "./utils/try.ts";

const NEXT = "next";
const NODE_MODULES = "node_modules";
const TURBO = "turbo";

interface CleanOption {
	description: string;
	name: string;
	value: string;
}

const options: CleanOption[] = [
	{
		description: "Removes ./next directory",
		name: `${NEXT} - Remove next directory`,
		value: NEXT,
	},
	{
		description: "Removes all node_modules directories",
		name: `${NODE_MODULES} - Remove all node_modules`,
		value: NODE_MODULES,
	},
	{
		description: "Removes .turbo directory",
		name: `${TURBO} - Remove turbo directory`,
		value: TURBO,
	},
	{
		description: "Runs all clean commands",
		name: "all - Clean everything",
		value: "all",
	},
];

interface ArgValues {
	all?: boolean;
	next?: boolean;
	"node-modules"?: boolean;
	turbo?: boolean;
}

const argsResult = vet(
	() =>
		parseArgs({
			allowPositionals: false,
			options: {
				all: { short: "a", type: "boolean" },
				next: { short: "n", type: "boolean" },
				"node-modules": { short: "m", type: "boolean" },
				turbo: { short: "t", type: "boolean" },
			},
		}).values as ArgValues,
);

if (argsResult.isErr()) {
	console.error(`Failed to parse arguments`);
	throw argsResult.error;
}

const args = argsResult.value;

// Run with args if provided, otherwise show prompt
let value: string;
if (Object.keys(args).length > 0) {
	if (args.all) value = "all";
	else if (args.next) value = NEXT;
	else if (args["node-modules"]) value = NODE_MODULES;
	else if (args.turbo) value = TURBO;
	else value = ""; // Default empty value to handle type safety
} else {
	const selectResult = await vet(() =>
		select({
			choices: options,
			message: "Select what to clean",
		}),
	);

	if (selectResult.isErr()) {
		console.error(`Selection cancelled or failed`);
		throw selectResult.error;
	}

	value = selectResult.value;
}

const $$ = $({ stdio: "inherit" });

// Note: Individual clean operations log errors but don't throw to allow graceful completion.
// The script only throws for critical failures (arg parsing, selection) that prevent execution.
switch (value) {
	case "all": {
		const results = await Promise.all([
			vet(() => $$`rimraf ./.next`),
			vet(() => $$`rimraf --glob **/node_modules`),
			vet(() => $$`rimraf ./.turbo`),
		]);

		const errors = results.filter((r) => r.isErr());
		if (errors.length > 0) {
			console.error("Some clean operations failed:");
			for (const e of errors) {
				console.error(`  - ${e.error.message}`);
			}
		} else {
			console.log("✓ Cleaned next, node_modules and turbo directories");
		}
		break;
	}

	case NEXT: {
		const result = await vet(() => $$`rimraf ./.next`);
		if (result.isErr()) {
			console.error("Failed to clean next directory:", result.error.message);
		} else {
			console.log("✓ Cleaned next directory");
		}
		break;
	}

	case NODE_MODULES: {
		const result = await vet(() => $$`rimraf --glob **/node_modules`);
		if (result.isErr()) {
			console.error("Failed to clean node_modules:", result.error.message);
		} else {
			console.log("✓ Cleaned all node_modules");
		}
		break;
	}

	case TURBO: {
		const result = await vet(() => $$`rimraf ./.turbo`);
		if (result.isErr()) {
			console.error("Failed to clean turbo directory:", result.error.message);
		} else {
			console.log("✓ Cleaned turbo directory");
		}
		break;
	}
}
