"use client";

import { type ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command } from "@ariakit/react";

import { isNullable } from "@/utils/assertionUtils";
import { cn } from "@/utils/index";

export interface StyledNextLinkProps
	extends AriaCurrentLinkProps,
		ImageFocusRingProps {}

export function StyledNextLink(props: StyledNextLinkProps) {
	const { children, className, hasImageChildren, ...rest } = props;

	return (
		<Command
			className={cn(
				hasImageChildren && "group transition-all",
				"cursor-pointer outline-hidden",
				className,
				!hasImageChildren &&
					"data-focus-visible:ring-2 data-focus-visible:ring-[#171717] data-focus-visible:ring-offset-2",
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
		<div className="absolute inset-0 size-full transition-all ring-inset group-data-focus-visible:ring-2 group-data-focus-visible:ring-[#171717]" />
	);
}
