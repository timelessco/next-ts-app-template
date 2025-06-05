import { type MetadataRoute } from "next";

import { BASE_URL } from "@/utils/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
	// "" - HomePage
	const routes = ["", "about", "contact", "process"];
	const routesInSitemapFormat = routes.map((route) => {
		return {
			changeFrequency: "yearly",
			lastModified: new Date().toISOString().split("T")[0],
			url: `${BASE_URL}/${route}`,
		} satisfies MetadataRoute.Sitemap[0];
	});

	return routesInSitemapFormat;
}
