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
					`var(--font-inter), ${defaultTheme.fontFamily.sans.join(", ")}`,
					{ fontVariationSettings: '"opsz" 32' },
				],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				".inter-display": {
					"font-optical-sizing": "auto",
				},
				".optimizeLegibility": {
					"text-rendering": "optimizeLegibility",
				},
			});
		}),
	],
};
