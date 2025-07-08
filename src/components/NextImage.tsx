import Image, { type ImageProps } from "next/image";

import { isNullable } from "@/utils/assertionUtils";

export type NextImageProps = ImageProps;

export function NextImage(props: NextImageProps) {
	const { alt, src, ...rest } = props;

	if (isNullable(src)) {
		return null;
	}

	return <Image alt={alt} src={src} title={alt} {...rest} />;
}
