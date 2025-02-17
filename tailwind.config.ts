import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        customGray: "rgba(0, 0, 0, 0.5)",
        customHoverGray: "rgba(0, 0, 0, 0.9)",
      },
      fontFamily: {
        sans: ["Equitan Sans W01", ...defaultTheme.fontFamily.serif],
        lyondisplayweb: ["Lyon Display Web", ...defaultTheme.fontFamily.serif],
      },
      screens: {
        hd: "1200px",
      },
      images: {
        domains: ["randomuser.me"],
      },
      fontSize: {
        xs: "0.75rem" /* 12px */,
        sm: "0.875rem" /* 14px */,
        base: "1rem" /* 16px */,
        lg: "1.125rem" /* 18px */,
        xl: "1.25rem" /* 20px */,
        "2xl": "1.5rem" /* 24px */,
        "3xl": "1.875rem" /* 30px */,
        "4xl": "2.25rem" /* 36px */,
        "5xl": "3rem" /* 48px */,
        "6xl": "3.75rem" /* 60px */,
        "7xl": "4.5rem" /* 72px */,
        "8xl": "6rem" /* 96px */,
        "9xl": "8rem" /* 128px */,
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        "*": {
          "text-wrap": "pretty",
        },
        "h1, h2, h3, h4, h5, h6": {
          "text-wrap": "balance",
        },
      });
    }),
    plugin(({ addComponents }) => {
      addComponents([
        {
          ".canister": {
            width: "100%",
            marginRight: "auto",
            marginLeft: "auto",
            paddingRight: "1rem",
            paddingLeft: "1rem",
            maxWidth: "540px",
          },
        },
        {
          [`@media (min-width: 768px)`]: {
            ".canister": {
              maxWidth: "720px",
            },
          },
        },
        {
          [`@media (min-width: 1024px)`]: {
            ".canister": {
              "max-width": "960px",
            },
          },
        },
        {
          [`@media (min-width: 1280px)`]: {
            ".canister": {
              "max-width": "1190px",
            },
          },
        },
      ]);
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".": {
          "text-rendering": "",
        },
      });
    }),
  ],
} satisfies Config;
