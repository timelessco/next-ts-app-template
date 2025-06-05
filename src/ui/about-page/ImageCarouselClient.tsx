"use client";

import { useCallback, useEffect, useRef, type ComponentProps } from "react";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import {
	useInView,
	useMotionValue,
	useMotionValueEvent,
	useScroll,
} from "motion/react";

type EmblaCarouselWrapperProps = ComponentProps<"div">;

const SCROLL_SPEED = 2500;

interface CarouselState {
	dragStartLocation: number;
	isDragging: boolean;
	isInMomentum: boolean;
	momentumRAF: null | number;
}

// Keeps baseOffset in sync with current carousel position and scroll progress
function createSyncBaseOffset(
	emblaApi: ReturnType<typeof useEmblaCarousel>[1] | undefined,
	baseOffset: ReturnType<typeof useMotionValue<number>>,
	lastScrollProgress: ReturnType<typeof useMotionValue<number>>,
) {
	return (logMessage?: string) => {
		if (!emblaApi) return;

		const engine = emblaApi.internalEngine();
		const currentLocation = engine.location.get();
		const scrollProgress = lastScrollProgress.get();
		const expectedLocation = -(scrollProgress * SCROLL_SPEED);
		const newOffset = currentLocation - expectedLocation;

		if (process.env.NODE_ENV === "development" && logMessage) {
			console.log(logMessage, {
				currentLocation: currentLocation.toFixed(1),
				expectedLocation: expectedLocation.toFixed(1),
				newOffset: newOffset.toFixed(1),
				scrollProgress: scrollProgress.toFixed(3),
			});
		}

		baseOffset.set(newOffset);
	};
}

function useCarouselScrollHandling(
	emblaApi: ReturnType<typeof useEmblaCarousel>[1],
	isInView: boolean,
) {
	const { scrollYProgress } = useScroll();

	// Change that are reactive
	const baseOffset = useMotionValue(0);
	const lastScrollProgress = useMotionValue(0);

	// State that are not reactive
	const stateRef = useRef<CarouselState>({
		dragStartLocation: 0,
		isDragging: false,
		isInMomentum: false,
		momentumRAF: null,
	});

	const syncBaseOffset = createSyncBaseOffset(
		emblaApi,
		baseOffset,
		lastScrollProgress,
	);

	const handleScroll = useCallback(
		(progress: number) => {
			// If the carousel is not in view, or the user is dragging, or the carousel is not in momentum, we don't need to update the scroll position
			if (!emblaApi || stateRef.current.isDragging || !isInView) {
				return;
			}

			const engine = emblaApi.internalEngine();

			// Check if carousel is in momentum from drag flick that needs to be stopped
			const isAnimating = stateRef.current.isInMomentum;
			if (isAnimating) {
				if (process.env.NODE_ENV === "development") {
					console.log("🛑 Stopping momentum/animation for scroll takeover", {
						isInMomentum: stateRef.current.isInMomentum,
						velocity: engine.scrollBody.velocity().toFixed(2),
					});
				}
				stateRef.current.isInMomentum = false;

				if (stateRef.current.momentumRAF) {
					cancelAnimationFrame(stateRef.current.momentumRAF);
					stateRef.current.momentumRAF = null;
				}

				// Kill momentum by setting 0 friction to stop the carousel from trying to settle after the scrolling stopped immediately
				engine.scrollBody.useFriction(0);
			}
			// Get the current animating position from carousel and sync with scroll for smooth transition from drag flick animation to scroll without waiting for the animation to settle
			const targetPosition = -(progress * SCROLL_SPEED) + baseOffset.get();
			const currentPosition = engine.location.get();
			const distance = targetPosition - currentPosition;

			if (process.env.NODE_ENV === "development") {
				console.log("🟢 Scroll update", {
					baseOffset: baseOffset.get().toFixed(1),
					currentPosition: currentPosition.toFixed(1),
					distance: distance.toFixed(1),
					progress: progress.toFixed(3),
					targetPosition: targetPosition.toFixed(1),
				});
			}

			// TODO: Fix issue of negative item hidden when scrolling backwards
			// Happens only when reloaded with carousel already scrolled
			// Ref: https://github.com/davidjerleke/embla-carousel/blob/08818826cb413d988e53bd64d7c71d7c10c5f93e/packages/embla-carousel-docs/src/components/Sandbox/React/SandboxFilesSrc/IosPicker/EmblaCarouselIosPickerItem.tsx#L74
			engine.scrollTo.distance(distance, false);
			engine.location.set(targetPosition);
			engine.translate.to(targetPosition);

			lastScrollProgress.set(progress);
		},
		[emblaApi, isInView, baseOffset, lastScrollProgress],
	);

	useMotionValueEvent(scrollYProgress, "change", handleScroll);

	// Sync initial baseOffset when emblaApi is ready
	useEffect(() => {
		if (emblaApi) {
			// Store the current scroll progress on mount
			// To prevent the carousel from jumping when the page is loaded with carousel already scrolled
			const currentProgress = scrollYProgress.get();
			lastScrollProgress.set(currentProgress);
			syncBaseOffset("🔄 Initial sync on mount");

			if (process.env.NODE_ENV === "development") {
				console.log("📍 Initial state", {
					baseOffset: baseOffset.get().toFixed(1),
					scrollProgress: currentProgress.toFixed(3),
				});
			}
		}
	}, [
		emblaApi,
		syncBaseOffset,
		scrollYProgress,
		lastScrollProgress,
		baseOffset,
	]);

	return { baseOffset, lastScrollProgress, stateRef, syncBaseOffset };
}

function useCarouselEvents(
	emblaApi: ReturnType<typeof useEmblaCarousel>[1],
	stateRef: React.RefObject<CarouselState>,
	syncBaseOffset: (logMessage?: string) => void,
) {
	// Monitor momentum (drag flick) so that we can stop the animation at the right time and sync the scroll position
	const monitorMomentum = useCallback(() => {
		if (!emblaApi || !stateRef.current.isInMomentum) return;

		syncBaseOffset("🔵 Momentum monitoring");

		// Continue monitoring
		stateRef.current.momentumRAF = requestAnimationFrame(monitorMomentum);
	}, [emblaApi, stateRef, syncBaseOffset]);

	useEffect(() => {
		if (!emblaApi) return;

		const onPointerDown = () => {
			if (process.env.NODE_ENV === "development") {
				console.log("🔵 Pointer down - starting drag");
			}
			stateRef.current.isDragging = true;
			stateRef.current.isInMomentum = false;

			// This is used to detect if there was actual movement (drag distance > threshold)
			// So that we can start momentum monitoring only if there was actual movement
			const engine = emblaApi.internalEngine();
			stateRef.current.dragStartLocation = engine.location.get();

			// Cancel any ongoing momentum monitoring
			if (stateRef.current.momentumRAF) {
				cancelAnimationFrame(stateRef.current.momentumRAF);
				stateRef.current.momentumRAF = null;
			}
		};

		const onPointerUp = () => {
			if (process.env.NODE_ENV === "development") {
				console.log("🔵 Pointer up - ending drag");
			}
			stateRef.current.isDragging = false;

			// Only start momentum monitoring if there was actual movement (drag distance > threshold)
			const engine = emblaApi.internalEngine();
			const currentLocation = engine.location.get();
			const dragDistance = Math.abs(
				currentLocation - stateRef.current.dragStartLocation,
			);
			const MOVEMENT_THRESHOLD = 5; // pixels

			if (dragDistance > MOVEMENT_THRESHOLD) {
				if (process.env.NODE_ENV === "development") {
					console.log(
						"🔵 Detected actual drag movement, starting momentum monitoring",
					);
				}
				stateRef.current.isInMomentum = true;
				stateRef.current.momentumRAF = requestAnimationFrame(monitorMomentum);
			} else {
				if (process.env.NODE_ENV === "development") {
					console.log(
						"🔵 No significant movement detected, skipping momentum monitoring",
					);
				}
				stateRef.current.isInMomentum = false;
			}
		};

		const onSettle = () => {
			if (process.env.NODE_ENV === "development") {
				console.log("🔵 Carousel settled");
			}
			stateRef.current.isInMomentum = false;

			// Cancel momentum monitoring
			if (stateRef.current.momentumRAF) {
				cancelAnimationFrame(stateRef.current.momentumRAF);
				stateRef.current.momentumRAF = null;
			}

			syncBaseOffset("🔵 Sync after settle animation");
		};

		emblaApi.on("pointerDown", onPointerDown);
		emblaApi.on("pointerUp", onPointerUp);
		emblaApi.on("settle", onSettle);

		return () => {
			emblaApi.off("pointerDown", onPointerDown);
			emblaApi.off("pointerUp", onPointerUp);
			emblaApi.off("settle", onSettle);

			// Cleanup momentum RAF
			// eslint-disable-next-line react-hooks/exhaustive-deps
			const state = stateRef.current;
			if (state.momentumRAF) {
				cancelAnimationFrame(state.momentumRAF);
			}
		};
	}, [emblaApi, monitorMomentum, stateRef, syncBaseOffset]);
}

export function EmblaCarouselWrapper(props: EmblaCarouselWrapperProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			dragFree: true,
			loop: true,
		},
		[ClassNames()],
	);

	const isInView = useInView(containerRef, {
		// Start animating slightly before visible
		margin: "50px",
	});

	const { stateRef, syncBaseOffset } = useCarouselScrollHandling(
		emblaApi,
		isInView,
	);
	useCarouselEvents(emblaApi, stateRef, syncBaseOffset);

	// Merge refs for container
	const setRefs = useCallback(
		(node: HTMLDivElement | null) => {
			if (typeof emblaRef === "function") {
				emblaRef(node);
			}
			containerRef.current = node;
		},
		[emblaRef],
	);

	return <div ref={setRefs} {...props} />;
}
