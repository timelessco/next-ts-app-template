const plugins = [
	"prettier-plugin-packagejson",
	"prettier-plugin-curly",
	"prettier-plugin-sh",
	"@ianvs/prettier-plugin-sort-imports",
	"prettier-plugin-tailwindcss",
];
/**
 * @see https://prettier.io/docs/en/configuration.html
 */
module.exports = {
	importOrder: [
		"",
		"<BUILTIN_MODULES>",
		"",
		"",
		"^(react/(.*)$)|^(react$)",
		"^(next/(.*)$)|^(next$)",
		"<THIRD_PARTY_MODULES>",
		"",
		"^types$",
		"^@/lib/(.*)$",
		"^@/ui/(.*)$",
		"^@/components/(.*)$",
		"^@/hooks/(.*)$",
		"^@/stores/(.*)$",
		"^@/icons/(.*)$",
		"^@/utils/(.*)$",
		"^@/styles/(.*)$",
		"^@/app/(.*)$",
		"^@(/.*)$",
		"",
		"^[../]",
		"",
		"^[./]",
		"",
		String.raw`^.+\.s?css$`,
	],
	importOrderParserPlugins: [
		"typescript",
		"jsx",
		"decorators-legacy",
		"importAssertions",
	],
	overrides: [
		{ files: ".nvmrc", options: { parser: "yaml" } },
		{ files: ".npmrc", options: { parser: "yaml" } },
		{
			files: ["*.jsonc"],
			options: {
				trailingComma: "none",
			},
		},
		// Fixes [prettier-plugin-sort-imports]: import sorting aborted due to babel parsing error in markdown files
		{
			files: ["*.md"],
			importOrder: undefined,
			importOrderParserPlugins: undefined,
			options: { plugins },
		},
	],
	plugins,
	tailwindFunctions: ["cn"],
	tailwindStylesheet: "./src/styles/global.css",
	useTabs: true,
};
