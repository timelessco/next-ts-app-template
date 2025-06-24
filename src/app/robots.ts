import { type MetadataRoute } from "next";

import { BASE_URL } from "@/utils/siteConfig";

export default function robots(): MetadataRoute.Robots {
	return {
		host: BASE_URL,
		rules:
			process.env.NODE_ENV === "production"
				? {
						allow: "/",
						disallow: ["/api/", "/~offline"],
						userAgent: "*",
					}
				: {
						disallow: "/",
						userAgent: "*",
					},
		sitemap: `${BASE_URL}/sitemap.xml`,
	};
}
