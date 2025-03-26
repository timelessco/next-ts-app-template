import { defaultCache } from "@serwist/next/worker";
import { Serwist, type PrecacheEntry, type SerwistGlobalConfig } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		__SW_MANIFEST: Array<PrecacheEntry | string> | undefined;
	}
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
	clientsClaim: true,
	fallbacks: {
		entries: [
			{
				// TODO: Offline doesn't work check back again later - https://github.com/serwist/serwist/issues/79
				matcher({ request }) {
					// Or whatever else you want to check for in a request.
					return request.destination === "document";
				},
				url: "/~offline",
			},
		],
	},
	navigationPreload: true,
	precacheEntries: self.__SW_MANIFEST,
	runtimeCaching: defaultCache,
	skipWaiting: true,
});

serwist.addEventListeners();
