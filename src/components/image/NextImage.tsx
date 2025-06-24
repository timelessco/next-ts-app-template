import Image, { type ImageProps } from "next/image";

import { isNonNullable, isNullable } from "@/utils/assertionUtils";
import { cn } from "@/utils/index";

export interface NextImageProps extends ImageProps {
	readonly hash?: null | string;
}

export function NextImage(props: NextImageProps) {
	const { alt, className, fill, hash, height, src, width, ...rest } = props;

	if (isNullable(src)) {
		return null;
	}

	// Must have "relative overflow-hidden w-full aspect-auto" in the parent element
	// Must have "block" on parent link element
	// If you don't want to use "fill" prop, you must have "sizes" prop clearly defined based on the screen sizes
	return (
		<Image
			alt={alt}
			blurDataURL={isNonNullable(hash) ? hash : undefined}
			className={cn(
				"absolute inset-0 size-full overflow-hidden object-cover",
				className,
			)}
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			fill={fill ?? isNullable(width) ?? isNullable(height)}
			height={!fill && isNonNullable(height) ? height : undefined}
			placeholder={isNonNullable(hash) ? "blur" : undefined}
			src={src}
			title={alt}
			width={!fill && isNonNullable(width) ? width : undefined}
			{...rest}
		/>
	);
}
