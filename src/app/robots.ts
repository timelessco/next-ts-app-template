import { type MetadataRoute } from "next";

import { siteConfig } from "@/utils/siteConfig";

export default function robots(): MetadataRoute.Robots {
	return {
		host: siteConfig.url,
		// Allow all requests except for api
		// rules: {
		// 	allow: "/",
		// 	disallow: "/api/",
		// 	userAgent: "*",
		// },
		// Block all requests
		rules: {
			disallow: "/",
			userAgent: "*",
		},
		sitemap: `${siteConfig.url}/sitemap.xml`,
	};
}
