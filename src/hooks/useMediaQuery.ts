import { useMediaQuery } from "@react-hookz/web";

export function useIsMediaFromSm() {
	return useMediaQuery("(min-width: 640px)", { initializeWithValue: false });
}
