import { useCallback, useEffect } from "react";
import { useSyncedRef } from "@react-hookz/web";
import type useEmblaCarousel from "embla-carousel-react";

import { isNonNullable, isNullable } from "@/utils/assertionUtils";

export type EmblaCarouselApi = ReturnType<typeof useEmblaCarousel>[1];

export function useEmblaSelectEvent(
	emblaCarouselApi: EmblaCarouselApi,
	callback: Parameters<typeof useEmblaEvent>[2],
) {
	const callbackRef = useSyncedRef(callback);

	// Need to be wrapped in useCallback to update the reference properly
	const onEmblaEventCallback: Parameters<typeof useEmblaEvent>[2] = useCallback(
		(emblaApi, event) => {
			callbackRef.current(emblaApi, event);
		},
		[callbackRef],
	);

	useEmblaEvent(emblaCarouselApi, "reInit", onEmblaEventCallback);
	useEmblaEvent(emblaCarouselApi, "select", onEmblaEventCallback);
}

export function useEmblaEvent(
	emblaCarouselApi: EmblaCarouselApi,
	emblaEventType: Parameters<Exclude<EmblaCarouselApi, undefined>["on"]>[0],
	callback: Parameters<Exclude<EmblaCarouselApi, undefined>["on"]>[1],
) {
	const callbackRef = useSyncedRef(callback);

	useEffect(() => {
		if (isNullable(emblaCarouselApi)) {
			return;
		}

		const currentCallback = callbackRef.current;
		currentCallback(emblaCarouselApi, emblaEventType);

		emblaCarouselApi.on(emblaEventType, currentCallback);

		return () => {
			if (isNonNullable(emblaCarouselApi)) {
				emblaCarouselApi.off(emblaEventType, currentCallback);
			}
		};
	}, [callbackRef, emblaCarouselApi, emblaEventType]);
}
