import Image, { type ImageProps } from "next/image";

import { isNonNullable, isNullable } from "@/utils/assertionUtils";

export interface NextImageProps extends ImageProps {
	readonly hash?: null | string;
}

export function NextImage(props: NextImageProps) {
	const { alt, fill, hash, height, src, width, ...rest } = props;

	if (isNullable(src)) {
		return null;
	}

	return (
		<Image
			alt={alt}
			blurDataURL={isNonNullable(hash) ? hash : undefined}
			placeholder={isNonNullable(hash) ? "blur" : undefined}
			src={src}
			title={alt}
			{...rest}
		/>
	);
}
