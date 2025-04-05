import { type ComponentProps } from "react";

import { isNonNullable } from "@/utils/assertionUtils";
import { cn } from "@/utils/index";

import { type IconName } from "../icons/icon-name";

export interface IconProps extends ComponentProps<"svg"> {
	/**
	 * If it has a label, the icon will be given a role of "img" for accessibility
	 * If it does not have a label, the icon will be hidden from screen readers
	 */
	ariaLabel?: string;
	name?: IconName;
}

// For accessibility - https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/
// Default: aria hidden props are used as the majority of icons are decorative
export function Icon(props: IconProps) {
	const { "aria-label": ariaLabel, children, className, name, ...rest } = props;
	const ariaLabelProps: AriaHiddenProps | AriaLabelProps = isNonNullable(
		ariaLabel,
	)
		? {
				role: "img",
			}
		: {
				"aria-hidden": "true",
				focusable: "false",
			};

	return (
		<svg
			className={cn(
				"inline-block size-[1em] shrink-0 align-middle leading-[1em]",
				className,
			)}
			xmlns="http://www.w3.org/2000/svg"
			{...ariaLabelProps}
			{...rest}
		>
			{isNonNullable(ariaLabel) ? <title>{ariaLabel}</title> : null}
			{name ? <use href={`/svg/sprite.svg#${name}`} /> : children}
		</svg>
	);
}

interface AriaLabelProps {
	role: ComponentProps<"svg">["role"];
}

interface AriaHiddenProps {
	"aria-hidden": ComponentProps<"svg">["aria-hidden"];
	focusable: ComponentProps<"svg">["focusable"];
}
