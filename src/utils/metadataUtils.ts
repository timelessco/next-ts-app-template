// Thanks to https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields

import { type Metadata, type Viewport } from "next";

import { splashScreens } from "@/ui/root-layout/splashScreens";
import {
	BASE_URL,
	SERVICES_OFFERED,
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_SOCIAL_MEDIA_IDS,
} from "@/utils/siteConfig";

export const rootViewport = {
	colorScheme: "dark light",
	themeColor: [
		{ color: "#000000", media: "(prefers-color-scheme: dark)" },
		{ color: "#171717", media: "(prefers-color-scheme: light)" },
	],
} satisfies Viewport;

export const sharedMetadata = {
	appleWebApp: {
		capable: true,
		// https://progressier.com/pwa-icons-and-ios-splash-screen-generator
		startupImage: splashScreens,
		statusBarStyle: "default",
		title: SITE_NAME,
	},
	applicationName: SITE_NAME,
	authors: [{ name: SITE_AUTHOR, url: BASE_URL }],
	category: "technology",
	creator: SITE_AUTHOR,
	formatDetection: {
		address: false,
		email: false,
		telephone: false,
	},
	generator: "Next.js",
	keywords: SERVICES_OFFERED.map((service) => service.toLowerCase()),
	manifest: `/manifest.webmanifest`,
	// https://github.com/vercel/next.js/issues/74524
	// https://stackoverflow.com/a/79380945/10858781
	// This is a workaround to enable PWA splash screen on iOS
	other: { "apple-mobile-web-app-capable": "yes" },
	publisher: "Vercel",
	referrer: "origin-when-cross-origin",
	robots:
		process.env.VERCEL_ENV === "production"
			? {
					follow: true,
					index: true,
				}
			: {
					follow: false,
					index: false,
				},
} satisfies Partial<Metadata>;

interface GeneratePageMetadataProps {
	description: null | string;
	imageHeight: number;
	imageUrl: string;
	imageWidth: number;
	title: string;
	url: string;
}

export function generatePageMetadata(
	props: Partial<GeneratePageMetadataProps>,
): Metadata {
	const {
		description,
		imageHeight = 1260,
		imageUrl = "/opengraph-image.jpg",
		imageWidth = 2400,
		title,
		url: pageUrl = BASE_URL,
	} = props;
	const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

	return {
		...sharedMetadata,
		alternates: {
			canonical: pageUrl,
		},
		description,
		metadataBase: new URL(BASE_URL),
		openGraph: {
			description: description ?? SITE_DESCRIPTION,
			images: [
				{
					alt: title ?? SITE_NAME,
					height: imageHeight,
					url: imageUrl,
					width: imageWidth,
				},
			],
			locale: "en-US",
			siteName: SITE_NAME,
			title: pageTitle,
			type: "website",
			url: pageUrl,
		},
		title: {
			default: title ?? SITE_NAME,
			template: `%s | ${SITE_NAME}`,
		},
		twitter: {
			card: "summary_large_image",
			creator: SITE_SOCIAL_MEDIA_IDS.twitter,
			description: description ?? SITE_DESCRIPTION,
			images: [
				{
					alt: title ?? SITE_NAME,
					height: imageHeight,
					url: imageUrl,
					width: imageWidth,
				},
			],
			title: pageTitle,
		},
	};
}

export const rootMetaData = generatePageMetadata({});
