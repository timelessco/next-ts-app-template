/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { fileURLToPath } from "node:url";

import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import react from "@eslint-react/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import-x";
import jsdoc from "eslint-plugin-jsdoc";
import jsonc from "eslint-plugin-jsonc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import node from "eslint-plugin-n";
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import * as reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as regexp from "eslint-plugin-regexp";
import unicorn from "eslint-plugin-unicorn";
import yml from "eslint-plugin-yml";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default tseslint.config(
	includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
	{
		ignores: [
			"pnpm-lock.yaml",
			"public/**/*",
			"CHANGELOG.md",
			"scripts/release-it/**/*",
		],
	},
	{ linterOptions: { reportUnusedDisableDirectives: "error" } },
	comments.recommended,
	perfectionist.configs["recommended-natural"],
	{
		rules: {
			"perfectionist/sort-imports": "off",
			"perfectionist/sort-modules": "off",
			"perfectionist/sort-named-imports": "off",
		},
		settings: {
			perfectionist: { partitionByComment: true, type: "natural" },
		},
	},
	regexp.configs["flat/recommended"],
	{
		extends: [node.configs["flat/recommended-script"]],
		ignores: ["src/**/*"],
		rules: {
			"n/no-missing-import": "off",
		},
	},
	js.configs.recommended,
	{
		extends: [
			importPlugin.flatConfigs.recommended,
			importPlugin.flatConfigs.typescript,
		],
		files: ["**/*.{js,cjs,jsx,ts,tsx}"],
		ignores: ["eslint.config.js", "**/*.md/*.{js,cjs,jsx,ts,tsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			parser: tsParser,
			sourceType: "module",
		},
		rules: {
			"import-x/no-dynamic-require": "warn",
			"no-unused-vars": "off",
		},
	},
	unicorn.configs.recommended,
	{
		rules: {
			"unicorn/filename-case": "off",
			"unicorn/no-array-callback-reference": "off",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-array-method-this-argument": "off",
			"unicorn/no-null": "off",
			"unicorn/prevent-abbreviations": "off",
		},
	},
	{
		extends: [
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
			react.configs["recommended-typescript"],
			reactHooks.configs["recommended-latest"],
			reactRefresh.configs.recommended,
			jsxA11y.flatConfigs.recommended,
		],
		files: ["**/*.{js,cjs,jsx,ts,tsx}"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					ignoreRestSiblings: true,
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowBoolean: true, allowNullish: true, allowNumber: true },
			],

			// Stylistic concerns that don't interfere with Prettier
			"logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
			"no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",

			// react refresh
			"react-refresh/only-export-components": [
				"warn",
				{
					allowExportNames: [
						"dynamic",
						"dynamicParams",
						"revalidate",
						"fetchCache",
						"runtime",
						"preferredRegion",
						"maxDuration",
						"config",
						"generateStaticParams",
						"metadata",
						"generateMetadata",
						"viewport",
						"generateViewport",
					],
				},
			],
		},
	},
	{
		name: "next",
		plugins: {
			"@next/next": next,
		},
		rules: {
			...next.configs.recommended.rules,
			...next.configs["core-web-vitals"].rules,
		},
	},
	jsdoc.configs["flat/recommended"],
	jsdoc.configs["flat/recommended-typescript"],
	jsdoc.configs["flat/recommended-typescript-flavor"],
	{
		rules: {
			"jsdoc/check-tag-names": ["warn", { typed: false }],
			"jsdoc/require-jsdoc": [
				"warn",
				{ require: { FunctionDeclaration: false } },
			],
		},
	},
	packageJson.configs.recommended,
	{
		extends: [
			jsonc.configs["flat/recommended-with-json"],
			jsonc.configs["flat/recommended-with-jsonc"],
			jsonc.configs["flat/prettier"],
		],
		rules: {
			"jsonc/no-comments": "off",
		},
	},
	{
		extends: [yml.configs["flat/standard"], yml.configs["flat/prettier"]],
		files: ["**/*.{yml,yaml}"],
		rules: {
			"yml/file-extension": ["off"],
			"yml/sort-keys": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
			"yml/sort-sequence-values": [
				"error",
				{ order: { type: "asc" }, pathPattern: "^.*$" },
			],
		},
	},
);
