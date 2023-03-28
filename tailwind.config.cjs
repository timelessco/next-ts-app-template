const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	future: {
		relativeContentPathsByDefault: true,
		hoverOnlyWhenSupported: true,
	},
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"InterVar",
					"Adjusted Arial Fallback",
					...defaultTheme.fontFamily.sans,
				],
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				".inter-display": {
					"font-variation-settings": `"opsz" 32`,
				},
			});
			addUtilities({
				".optimizeLegibility": {
					"text-rendering": "optimizeLegibility",
				},
			});
		}),
	],
};
