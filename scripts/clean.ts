import { parseArgs } from "node:util";

import { select } from "@inquirer/prompts";
import { $ } from "execa";

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

const args = parseArgs({
	allowPositionals: false,
	options: {
		all: { short: "a", type: "boolean" },
		next: { short: "n", type: "boolean" },
		"node-modules": { short: "m", type: "boolean" },
		turbo: { short: "t", type: "boolean" },
	},
}).values as ArgValues;

// Run with args if provided, otherwise show prompt
let value: string;
if (Object.keys(args).length > 0) {
	if (args.all) value = "all";
	else if (args.next) value = NEXT;
	else if (args["node-modules"]) value = NODE_MODULES;
	else if (args.turbo) value = TURBO;
	else value = ""; // Default empty value to handle type safety
} else {
	value = await select({
		choices: options,
		message: "Select what to clean",
	});
}

const $$ = $({ stdio: "inherit" });

switch (value) {
	case "all": {
		await Promise.all([
			$$`rimraf ./.next`,
			$$`rimraf --glob **/node_modules`,
			$$`rimraf ./.turbo`,
		]);
		console.log("✓ Cleaned next, node_modules and turbo directories");
		break;
	}

	case NEXT: {
		await $$`rimraf ./.next`;
		console.log("✓ Cleaned next directory");
		break;
	}

	case NODE_MODULES: {
		await $$`rimraf --glob **/node_modules`;
		console.log("✓ Cleaned all node_modules");
		break;
	}

	case TURBO: {
		await $$`rimraf ./.turbo`;
		console.log("✓ Cleaned turbo directory");
		break;
	}
}
