import { type MetadataRoute } from "next";

import { siteConfig } from "@/utils/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
	// "" - HomePage
	const routes = [""];
	const routesInSitemapFormat = routes.map((route) => {
		return {
			changeFrequency: "yearly",
			lastModified: new Date().toISOString().split("T")[0],
			url: `${siteConfig.url}/${route}`,
		} satisfies MetadataRoute.Sitemap[0];
	});

	return routesInSitemapFormat;
}
