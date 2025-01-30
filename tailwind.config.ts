import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

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
    },
  },
  plugins: [],
} satisfies Config;
