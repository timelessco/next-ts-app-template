import { type ComponentProps } from "react";

import { isNullable } from "../../utils/assertionUtils";
import { type GenerateBlurhashURIProps } from "../../utils/blurhashUtils";

export interface BlurhashImageProps
	extends Omit<ComponentProps<"img">, "height" | "width">,
		Pick<GenerateBlurhashURIProps, "hash" | "height" | "width"> {}

// Function Component version of `react-blurhash` BlurhashImage
export function BlurhashImage(props: BlurhashImageProps) {
	const { hash, ...rest } = props;

	if (isNullable(hash)) return null;

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			{...rest}
			alt={rest.alt ?? "Background blur image"}
			height={rest.height ?? 32}
			src={hash}
			width={rest.width ?? 32}
		/>
	);
}
