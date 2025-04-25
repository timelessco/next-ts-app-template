"use client";

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";
import { DisclosureProvider, useDisclosureContext } from "@ariakit/react";
import { useIntersectionObserver } from "@react-hookz/web";

import { Slot } from "@/components/Slot";
import { useIsMediaFromSm } from "@/hooks/useMediaQuery";

interface HeaderSlotProps {
	children: ReactNode;
}

export function HeaderSlot(props: HeaderSlotProps) {
	const { children } = props;
	const elementRef = useRef<HTMLDivElement | null>(null);

	const intersection = useIntersectionObserver(elementRef, {
		rootMargin: "50px",
		threshold: [0],
	});
	const isScrolled = intersection ? !intersection.isIntersecting : false;

	return (
		<>
			<div className="absolute inset-1 h-1 w-1 opacity-0" ref={elementRef} />
			<Slot data-scrolled={isScrolled}>{children}</Slot>
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

interface NavLinkSlotProps {
	children: ReactNode;
}

export function NavLinkSlot(props: NavLinkSlotProps) {
	const { children } = props;
	const isMediaFromSm = useIsMediaFromSm();
	const disclosure = useDisclosureContext();
	if (!disclosure) {
		throw new Error(
			"NavLinkSlot must be used within a MobileDisclosureProvider",
		);
	}

	const handleClick = useCallback(() => {
		if (isMediaFromSm) return;

		disclosure.setOpen(false);
	}, [isMediaFromSm, disclosure]);

	return <Slot onClick={handleClick}>{children}</Slot>;
}
