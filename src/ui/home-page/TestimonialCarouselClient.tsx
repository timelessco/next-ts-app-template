"use client";

import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ComponentProps,
	type RefObject,
} from "react";
import { useIntersectionObserver } from "@react-hookz/web";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";

import {
	StyledButton,
	type StyledButtonProps,
} from "@/components/StyledButton";
import { useEmblaSelectEvent } from "@/hooks/useEmblaCarouselEvents";
import { createContext } from "@/utils/createContext";

interface TestimonialEmblaCarouselContextType {
	emblaApi: ReturnType<typeof useEmblaCarousel>[1];
	emblaRef: null | ReturnType<typeof useEmblaCarousel>[0];
}

// eslint-disable-next-line @eslint-react/naming-convention/context-name
const [TestimonialEmblaCarouselContext, useTestimonialEmblaCarousel] =
	createContext<TestimonialEmblaCarouselContextType>({
		defaultValue: {
			emblaApi: undefined,
			emblaRef: null,
		},
		hookName: "useTestimonialEmblaCarousel",
		name: "TestimonialEmblaCarouselContext",
		providerName: "<TestimonialEmblaCarouselSection />",
	});

const AUTOPLAY_DURATION = 4000;

type TestimonialEmblaCarouselSectionProps = ComponentProps<"section">;

export function TestimonialEmblaCarouselSection(
	props: TestimonialEmblaCarouselSectionProps,
) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay({ delay: AUTOPLAY_DURATION, playOnInit: false }),
		ClassNames(),
	]);

	const sectionRef = useRef<HTMLDivElement>(null);
	useTestimonialEmblaCarouselAutoplay(emblaApi, sectionRef);

	const contextValue = useMemo(
		() => ({ emblaApi, emblaRef }),
		[emblaApi, emblaRef],
	);

	return (
		<TestimonialEmblaCarouselContext value={contextValue}>
			<section ref={sectionRef} {...props} />
		</TestimonialEmblaCarouselContext>
	);
}

type TestimonialEmblaCarouselWrapperProps = ComponentProps<"div">;

export function TestimonialEmblaCarouselWrapper(
	props: TestimonialEmblaCarouselWrapperProps,
) {
	const { emblaRef } = useTestimonialEmblaCarousel();

	return <div ref={emblaRef} {...props} />;
}

interface TestimonialEmblaCarouselDotButtonProps extends StyledButtonProps {
	index: number;
}

export function TestimonialEmblaCarouselDotButton(
	props: TestimonialEmblaCarouselDotButtonProps,
) {
	const { index, ...rest } = props;
	const { emblaApi } = useTestimonialEmblaCarousel();
	const [selectedIndex, setSelectedIndex] = useState(index);
	const isSelected = selectedIndex === index;

	const handleEmblaSelectEvent: Parameters<typeof useEmblaSelectEvent>[1] =
		useCallback((emblaApi) => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		}, []);

	useEmblaSelectEvent(emblaApi, handleEmblaSelectEvent);

	const handleClick = useCallback(() => {
		if (index !== -1) {
			emblaApi?.scrollTo(index);
		}
	}, [index, emblaApi]);

	return (
		<StyledButton data-selected={isSelected} onClick={handleClick} {...rest} />
	);
}

function useTestimonialEmblaCarouselAutoplay(
	emblaApi: TestimonialEmblaCarouselContextType["emblaApi"],
	sectionRef: RefObject<HTMLDivElement | null>,
) {
	const intersection = useIntersectionObserver(sectionRef);
	const { isIntersecting } = intersection ?? {};

	useEffect(() => {
		const autoplay = emblaApi?.plugins().autoplay;
		if (!autoplay) return;

		if (isIntersecting && !autoplay.isPlaying()) {
			autoplay.play();
		}
		if (!isIntersecting && autoplay.isPlaying()) {
			autoplay.stop();
		}
	}, [isIntersecting, emblaApi]);
}
