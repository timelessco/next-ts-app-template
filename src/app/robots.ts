import { type MetadataRoute } from "next";

import { siteConfig } from "@/utils/siteConfig";

export default function robots(): MetadataRoute.Robots {
	return {
		host: siteConfig.url,
		rules:
			process.env.NODE_ENV === "production"
				? {
						allow: "/",
						disallow: "/api/",
						userAgent: "*",
					}
				: {
						disallow: "/",
						userAgent: "*",
					},
		sitemap: `${siteConfig.url}/sitemap.xml`,
	};
}
