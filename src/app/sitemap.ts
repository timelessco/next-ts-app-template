import { type MetadataRoute } from "next";

import { BASE_URL } from "@/utils/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
	// Define routes with their specific priorities and change frequencies
	const routeConfig = [
		{ changeFrequency: "weekly" as const, priority: 1, route: "" }, // Homepage
		{ changeFrequency: "monthly" as const, priority: 0.8, route: "about" },
		{ changeFrequency: "monthly" as const, priority: 0.9, route: "contact" },
		{ changeFrequency: "yearly" as const, priority: 0.7, route: "process" },
	];

	const routesInSitemapFormat = routeConfig.map((config) => {
		return {
			changeFrequency: config.changeFrequency,
			lastModified: new Date().toISOString().split("T")[0],
			priority: config.priority,
			url: `${BASE_URL}/${config.route}`,
		} satisfies MetadataRoute.Sitemap[0];
	});

	return routesInSitemapFormat;
}
