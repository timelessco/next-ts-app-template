const SITE = "Next TS App";

const productionUrl =
	process.env.NEXT_PUBLIC_SITE_URL ??
	`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
const vercelUrl =
	process.env.VERCEL_ENV === "production"
		? productionUrl
		: `https://${process.env.VERCEL_BRANCH_URL}`;

const BASE_URL =
	process.env.NODE_ENV === "development"
		? `http://localhost:${process.env.PORT ?? 3000}`
		: vercelUrl;

const SITE_DESCRIPTION = "Timeless Co Portfolio";
const GITHUB_URL = "https://github.com/timelessco/timelessco-nextjs/";
const TIMELESS_URL = "https://timeless.co/";
const AUTHOR = "Timeless Team";
const TIMELESS_TWITTER_ID = "@timelessco";

export const siteConfig = {
	author: AUTHOR,
	description: SITE_DESCRIPTION,
	links: {
		github: GITHUB_URL,
		timeless: TIMELESS_URL,
	},
	name: SITE,
	socials: {
		twitter: TIMELESS_TWITTER_ID,
	},
	title: SITE,
	url: BASE_URL,
};
