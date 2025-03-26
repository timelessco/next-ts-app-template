// Thanks to https://github.com/t3-oss/create-t3-app/

import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 */
export const serverEnvironment = {
	NODE_ENV: process.env.NODE_ENV,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
	NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
	// Needed for sitemap generation
	NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 */
export const clientEnvironment = {
	NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
	// Needed for sitemap generation
	NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};
