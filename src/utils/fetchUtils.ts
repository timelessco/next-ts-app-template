import kyDefault from "ky";
import { type z } from "zod";

export interface FetchDataWithZodValidationProps<T extends z.Schema> {
	options?: Parameters<typeof kyDefault>[1];
	schema: T;
	url: string;
}

export async function fetchDataWithZodValidation<T extends z.Schema>(
	props: FetchDataWithZodValidationProps<T>,
): Promise<Awaited<z.infer<T>>> {
	const { options, schema, url } = props;

	const responseData = await ky(url, options).json<z.infer<T>>();

	return (await schema.parseAsync(responseData)) as Promise<z.infer<T>>;
}

class HTTPError extends Error {}

export const ky = kyDefault.extend({
	hooks: {
		afterResponse: [
			async (_, _1, response) => {
				if (!response.ok) {
					if (
						response.headers.get("content-type")?.includes("application/json")
					) {
						if (process.env.NODE_ENV === "development") {
							const errorResponseJson = await response.json();

							if (
								errorResponseJson &&
								typeof errorResponseJson === "object" &&
								"message" in errorResponseJson
							) {
								console.error(errorResponseJson.message);
							} else {
								console.error(errorResponseJson);
							}
						}

						// Always throw the error, even in development
						throw new HTTPError(
							`Fetch error ${response.status}: ${response.statusText} in ${response.url} failed`,
						);
					}

					const errorResponseText = await response.text();

					if (process.env.NODE_ENV === "development") {
						console.error(errorResponseText);
					}

					// Always throw the error, even in development
					throw new HTTPError(
						`Fetch error ${response.status}: ${response.statusText} in ${response.url} failed`,
					);
				}
			},
		],
	},
});
