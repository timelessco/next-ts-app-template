import { type MetadataRoute } from "next";

import { siteConfig } from "../utils/siteConfig";

const { description, name } = siteConfig;

export default function manifest(): MetadataRoute.Manifest {
	return {
		background_color: "#FFF",
		description,
		dir: "auto",
		display: "standalone",
		display_override: ["window-controls-overlay"],
		icons: [
			// Generated using https://cthedot.de/icongen/
			{
				sizes: "192x192",
				src: "/pwa/icons/android-chrome-192x192.png",
				type: "image/png",
			},
			{
				sizes: "512x512",
				src: "/pwa/icons/android-chrome-512x512.png",
				type: "image/png",
			},
			{
				purpose: "maskable",
				sizes: "192x192",
				src: "/pwa/icons/android-chrome-maskable-192x192.png",
				type: "image/png",
			},
			{
				purpose: "maskable",
				sizes: "512x512",
				src: "/pwa/icons/android-chrome-maskable-512x512.png",
				type: "image/png",
			},
		],
		id: "/?source=pwa",
		lang: "en-US",
		name,
		orientation: "portrait-primary",
		scope: "/",
		short_name: name,
		start_url: "/?source=pwa",
		theme_color: "#FFF",
	};
}
