"use client";

import { type ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command } from "@ariakit/react";

import { isNullable } from "@/utils/assertionUtils";
import { cn } from "@/utils/index";

import { Presentation } from "../Presentation";

export interface StyledNextLinkProps
	extends AriaCurrentLinkProps,
		ImageFocusRingProps {}

export function StyledNextLink(props: StyledNextLinkProps) {
	const { children, className, hasImageChildren, ...rest } = props;

	return (
		<Command
			className={cn(
				hasImageChildren && "group",
				className,
				"cursor-pointer outline-hidden",
				!hasImageChildren &&
					"data-focus-visible:ring-2 data-focus-visible:ring-[#171717]",
			)}
			render={<AriaCurrentLink {...rest} />}
		>
			{children}
			<ImageFocusRing hasImageChildren={hasImageChildren} />
		</Command>
	);
}
type AriaCurrentLinkProps = ComponentProps<typeof Link>;

function AriaCurrentLink(props: AriaCurrentLinkProps) {
	const { href, ...rest } = props;

	const pathname = usePathname();
	const isCurrentRoute = pathname === href;

	return (
		<Link
			aria-current={isCurrentRoute ? "page" : undefined}
			href={href}
			{...rest}
		/>
	);
}

interface ImageFocusRingProps {
	hasImageChildren?: boolean;
}

function ImageFocusRing(props: ImageFocusRingProps) {
	const { hasImageChildren } = props;

	if (isNullable(hasImageChildren)) {
		return null;
	}

	return (
		<Presentation className="absolute inset-0 size-full ring-inset group-data-focus-visible:ring-2 group-data-focus-visible:ring-[#171717]" />
	);
}
