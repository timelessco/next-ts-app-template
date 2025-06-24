import { type NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
// import { withSentryConfig } from "@sentry/nextjs";
import withSerwistInit from "@serwist/next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
if (process.env.SKIP_ENV_VALIDATION == null) {
	// eslint-disable-next-line unicorn/prefer-top-level-await
	void (async () => {
		await import("./scripts/env/server.js");
	})();
}

const nextConfig: NextConfig = {
	// https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
	// reactStrictMode: false, // default: true

	images: {
		formats: ["image/avif", "image/webp"],
	},

	// Turn on fetch and it's data cache logging when debugging rsc fetches
	logging: {
		fetches: {
			fullUrl: true,
			hmrRefreshes: true,
		},
	},

	// Do not run ESLint on production
	...(process.env.NODE_ENV === "production" && {
		eslint: {
			ignoreDuringBuilds: true,
		},
		typescript: {
			ignoreBuildErrors: true,
		},
	}),

	// Enable the below option only when you are debugging sourceamp
	productionBrowserSourceMaps: process.env.SOURCEMAP === "true",
	serverExternalPackages: ["@sentry/nextjs"],
};

const isDevOrLocal =
	process.env.NODE_ENV === "development" || process.env.LOCAL === "true";

const withSerwist = withSerwistInit({
	// Note: This is only an example. If you use Pages Router,
	// use something else that works, such as "service-worker/index.ts".
	cacheOnNavigation: true,
	disable: isDevOrLocal,
	reloadOnOnline: true,
	swDest: "public/sw.js",
	swSrc: "src/app/sw.ts",
});

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

// const sentryOptions = {
// 	// * Add your Sentry organization name here
// 	org: "",
// 	// * Add your Sentry project name here
// 	project: "",
// 	// An auth token is required for uploading source maps.
// 	authToken: process.env.SENTRY_AUTH_TOKEN,

// 	// Only print logs for uploading source maps in CI
// 	silent: !process.env.CI,

// 	// Automatically tree-shake Sentry logger statements to reduce bundle size
// 	disableLogger: true,

// 	// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// 	// See the following for more information:
// 	// https://docs.sentry.io/product/crons/
// 	// https://vercel.com/docs/cron-jobs
// 	automaticVercelMonitors: true,

// 	// For all available options, see:
// 	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/
// };

// // These configs conflict with the dev mode turbopack
// // They are only enabled during production build
// const webpackConfig: NextConfig = {
// 	...nextConfig,

// 	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/#tree-shaking-with-nextjs
// 	webpack: (config, { webpack }) => {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
// 		config.plugins.push(
// 			// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
// 			new webpack.DefinePlugin({
// 				__RRWEB_EXCLUDE_IFRAME__: true,
// 				__RRWEB_EXCLUDE_SHADOW_DOM__: true,
// 				__SENTRY_DEBUG__: false,
// 				__SENTRY_EXCLUDE_REPLAY_WORKER__: true,
// 				__SENTRY_TRACING__: false,
// 			}),
// 		);

// 		// return the modified config
// 		return config as unknown as NextConfig;
// 	},
// };

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
const nextConfigWithExtensions = isDevOrLocal
	? nextConfig
	: withSerwist(bundleAnalyzer(nextConfig));
// Uncomment below line with respective sentry options to enable Sentry
// : withSentryConfig(withSerwist(bundleAnalyzer(webpackConfig)), sentryOptions);

export default nextConfigWithExtensions;
