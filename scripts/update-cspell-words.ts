/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable import-x/no-named-as-default-member */

import path from "node:path";
import { fileURLToPath } from "node:url";

import { $ } from "execa";
import fsExtra from "fs-extra";

import { vet } from "./utils/try.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CSpellConfig {
	[key: string]: unknown;
	words?: string[];
}

async function readCspellConfig(path: string): Promise<CSpellConfig> {
	const readResult = await vet(() => fsExtra.readFile(path, "utf8"));
	if (readResult.isErr()) {
		console.error(`Failed to read cspell config ${path}`);
		throw readResult.error;
	}

	const parseResult = vet(() => JSON.parse(readResult.value) as CSpellConfig);
	if (parseResult.isErr()) {
		console.error(`Failed to parse cspell config ${path}`);
		throw parseResult.error;
	}

	return parseResult.value;
}

async function writeCspellConfig(
	path: string,
	config: CSpellConfig,
): Promise<void> {
	const writeResult = await vet(() =>
		fsExtra.writeFile(path, `${JSON.stringify(config, undefined, "\t")}\n`),
	);

	if (writeResult.isErr()) {
		console.error(`Failed to write cspell config ${path}`);
		throw writeResult.error;
	}
}

async function updateWordsInConfig(
	path: string,
	words: string[],
): Promise<void> {
	const config = await readCspellConfig(path);
	config.words = words;
	await writeCspellConfig(path, config);
}

async function updateCspellWords(): Promise<void> {
	const cspellPath = path.join(__dirname, "..", "cspell.json");

	// Clear existing words
	await updateWordsInConfig(cspellPath, []);

	// Run cspell command and get output
	const cspellResult = await vet(async () => {
		const result = await $({
			reject: false,
		})`cspell --words-only --unique --gitignore --cache --dot **/*`;

		return result.stdout;
	});

	if (cspellResult.isErr()) {
		console.error("Failed to run cspell command");

		throw cspellResult.error;
	}

	const newWords = cspellResult.value
		.trim()
		.split("\n")
		.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

	// Update with new words
	await updateWordsInConfig(cspellPath, newWords);
}

await updateCspellWords();
