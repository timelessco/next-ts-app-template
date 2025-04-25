import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFadeInWhenVisibleMotionProps(delay = 0) {
	return {
		initial: "hidden",
		transition: {
			default: { delay, duration: 0.5, ease: "ease" },
			transform: {
				bounce: 0.25,
				delay,
				type: "spring",
				visualDuration: 0.5,
			},
		},
		variants: {
			hidden: { opacity: 0, transform: "translateY(30px)" },
			visible: { opacity: 1, transform: "translateY(0px)" },
		},
		viewport: { once: true },
		whileInView: "visible",
	};
}
