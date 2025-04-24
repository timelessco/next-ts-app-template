import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const FADE_IN_WHEN_VISIBLE_MOTION_PROPS = {
	// This is a fallback for non-JavaScript environments to show hidden elements
	// "no-js" class is added by the script in RootLayout and removed by the script in RootLayout
	className: "motion--initial-hidden",
	initial: "hidden",
	transition: {
		default: { duration: 1.2, ease: "ease" },
		transform: { bounce: 0.25, type: "spring", visualDuration: 1 },
	},
	variants: {
		hidden: { opacity: 0, transform: "translateY(30px)" },
		visible: {
			opacity: 1,
			transform: "translateY(0px)",
		},
	},
	viewport: { once: true },
	whileInView: "visible",
};
