import * as Sentry from "@sentry/nextjs";

// Move this to the root of the project when using Sentry
export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		await import("../../sentry.server.config");
	}

	if (process.env.NEXT_RUNTIME === "edge") {
		await import("../../sentry.edge.config");
	}
}

export const onRequestError = Sentry.captureRequestError;
