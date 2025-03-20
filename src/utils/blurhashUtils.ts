import { decode } from "blurhash";
import sharp from "sharp";

import { isNullable } from "./assertionUtils";

export interface GenerateBlurhashURIProps {
	hash: null | string;
	height?: number;
	options?: {
		quality: number;
		size: number;
	};
	width?: number;
}

export async function generateBlurhashURI(props: GenerateBlurhashURIProps) {
	const {
		hash,
		height = 32,
		options = {
			quality: 40,
			size: 16,
		},
		width = 32,
	} = props;

	if (isNullable(hash)) {
		return null;
	}

	const hashWidth = options.size;
	const hashHeight = Math.round(hashWidth * (height / width));

	const pixels = decode(hash, hashWidth, hashHeight);

	const resizedImageBuf = await sharp(Buffer.from(pixels), {
		raw: {
			channels: 4,
			height: hashHeight,
			width: hashWidth,
		},
	})
		// Here also possible to do whatever with your image, e.g. save it or something else.
		.jpeg({
			overshootDeringing: true,
			quality: 40,
		})
		.toBuffer();

	return `data:image/jpeg;base64,${resizedImageBuf.toString("base64")}`;
}
