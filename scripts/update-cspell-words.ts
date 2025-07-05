/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable import-x/no-named-as-default-member */

import path from "node:path";
import { fileURLToPath } from "node:url";

import { $ } from "execa";
import fsExtra from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CSpellConfig {
	[key: string]: unknown;
	words?: string[];
}

async function readCspellConfig(path: string): Promise<CSpellConfig> {
	return JSON.parse(await fsExtra.readFile(path, "utf8")) as CSpellConfig;
}

async function writeCspellConfig(
	path: string,
	config: CSpellConfig,
): Promise<void> {
	await fsExtra.writeFile(path, `${JSON.stringify(config, undefined, "\t")}\n`);
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
	const { stdout } = await $({
		reject: false,
	})`cspell --words-only --unique --gitignore --cache --dot **/*`;

	const newWords = stdout
		.trim()
		.split("\n")
		.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

	// Update with new words
	await updateWordsInConfig(cspellPath, newWords);
}

await updateCspellWords();
