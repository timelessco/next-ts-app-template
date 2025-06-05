// Thanks to https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields

import { type Metadata, type Viewport } from "next";

import { splashScreens } from "@/ui/root-layout/splashScreens";
import { siteConfig } from "@/utils/siteConfig";

const { author, description, links, name, socials, url } = siteConfig;

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
		title: name,
	},
	applicationName: name,
	authors: [{ name: author, url: links.timeless }],
	category: "entertainment",
	creator: author,
	formatDetection: {
		address: false,
		email: false,
		telephone: false,
	},
	generator: "Next.js",
	keywords: [
		"react",
		"typescript",
		"nextjs",
		"tailwindcss",
		"portfolio",
		"timelessco",
		"timeless",
		"timelessco-nextjs",
		"timelessco-nextjs-portfolio",
	],
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
		description: pageDescription = description,
		imageHeight = 1260,
		imageUrl = "/opengraph-image.jpg",
		imageWidth = 2400,
		title,
		url: pageUrl = url,
	} = props;
	const pageTitle = title ? `${title} | ${name}` : name;

	return {
		...sharedMetadata,
		alternates: {
			canonical: pageUrl,
		},
		description: pageDescription,
		metadataBase: new URL(url),
		openGraph: {
			description: pageDescription ?? description,
			images: [
				{
					alt: title ?? name,
					height: imageHeight,
					url: imageUrl,
					width: imageWidth,
				},
			],
			locale: "en-US",
			siteName: name,
			title: pageTitle,
			type: "website",
			url: pageUrl,
		},
		title: {
			default: title ?? name,
			template: `%s | ${name}`,
		},
		twitter: {
			card: "summary_large_image",
			creator: socials.twitter,
			description: pageDescription ?? description,
			images: [
				{
					alt: title ?? name,
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
