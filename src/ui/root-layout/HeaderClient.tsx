"use client";

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ComponentProps,
	type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { DisclosureProvider, useDisclosureContext } from "@ariakit/react";
import { useIntersectionObserver } from "@react-hookz/web";

import {
	StyledNextLink,
	type StyledNextLinkProps,
} from "@/components/link/StyledLink";
import { useIsMediaFromSm } from "@/hooks/useMediaQuery";

type HeaderWrapperProps = ComponentProps<"header">;

export function HeaderWrapper(props: HeaderWrapperProps) {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();
	const isAbout = pathname === "/about";
	const intersection = useIntersectionObserver(elementRef, {
		rootMargin: "50px",
	});
	const isScrolled = intersection ? !intersection.isIntersecting : false;

	return (
		<>
			<div className="absolute inset-1 h-1 w-1 opacity-0" ref={elementRef} />
			<header data-about={isAbout} data-scrolled={isScrolled} {...props} />
		</>
	);
}

interface MobileDisclosureProviderProps {
	children: ReactNode;
}

export function MobileDisclosureProvider(props: MobileDisclosureProviderProps) {
	const { children } = props;
	const [open, setOpen] = useState(true);
	const isMediaFromSm = useIsMediaFromSm();

	useEffect(() => {
		// eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
		setOpen(isMediaFromSm ? true : false);
	}, [isMediaFromSm]);

	return (
		<DisclosureProvider open={open} setOpen={setOpen}>
			{children}
		</DisclosureProvider>
	);
}

type NavLinkProps = StyledNextLinkProps;

export function NavLink(props: NavLinkProps) {
	const isMediaFromSm = useIsMediaFromSm();
	const disclosure = useDisclosureContext();
	const pathname = usePathname();
	if (!disclosure) {
		throw new Error("NavLink must be used within a MobileDisclosureProvider");
	}
	const isAbout = pathname === "/about";

	const handleClick = useCallback(() => {
		if (isMediaFromSm) return;

		disclosure.setOpen(false);
	}, [isMediaFromSm, disclosure]);

	return (
		<StyledNextLink data-about={isAbout} onClick={handleClick} {...props} />
	);
}
