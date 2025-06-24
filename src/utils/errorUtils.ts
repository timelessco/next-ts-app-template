// Enable this to use Sentry
// import { captureException as captureExceptionSentry, flush } from "@sentry/nextjs";

// Enable this to use zod validation errors
// import { z } from "zod";
// import { fromZodError } from "zod-validation-error";

import { isNullable } from "./assertionUtils";

/**
 * Represents an error object with a message.
 */

interface ErrorWithMessage {
	message: string;
}

/**
 * Determines whether a value is an Error object.
 * @param {unknown} error - The value to test.
 * @returns {boolean} True if the value is an Error object, false otherwise.
 */
function isErrorObject(error: unknown): error is Error {
	return error !== null && typeof error === "object";
}

/**
 * Determines if an object is an ErrorWithMessage.
 * @param {unknown} error - The object to check.
 * @returns {boolean} True if the object is an ErrorWithMessage, false otherwise.
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		isErrorObject(error) &&
		"message" in error &&
		typeof (error as ErrorWithMessage).message === "string"
	);
}

/**
 * Converts an object to an ErrorWithMessage.
 * @param {unknown} maybeError - The object to convert.
 * @returns {ErrorWithMessage} An ErrorWithMessage object.
 */
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) {
		return maybeError;
	}

	try {
		return new Error(JSON.stringify(maybeError));
	} catch {
		// fallback in case there's an error stringification of the maybeError
		// like with circular references for example.
		return new Error(String(maybeError));
	}
}

/**
 * Gets the message property of an ErrorWithMessage object.
 * @param {unknown} error - The ErrorWithMessage object.
 * @returns {string} The message property of the ErrorWithMessage object.
 */
export function getErrorMessage(error: unknown): string {
	return toErrorWithMessage(error).message;
}

/**
 * Adds additional error message to the existing error message.
 * @param {unknown} error - The error object.
 * @param {string} errorMessage - The additional error message to be added.
 * @returns {string} - The updated error message.
 */
export function addAdditionalErrorMessage(
	error: unknown,
	errorMessage?: string,
): string {
	if (isNullable(errorMessage)) {
		return getErrorMessage(error);
	}

	return `${errorMessage}\n\nCause: ${getErrorMessage(error)}`;
}

interface CaptureExceptionProps {
	error?: unknown;
	errorMessage?: string;
	type?: "error" | "warn";
}

export function captureException(props: CaptureExceptionProps) {
	const { error, errorMessage, type = "error" } = props;

	if (type === "error") {
		if (process.env.NODE_ENV === "production") {
			// captureExceptionSentry(error, { extra: { errorMessage } });
			// Wait for Sentry to send the error report before shutting down
			// await flush(2000);
		} else {
			console.error(errorMessage, error);
		}
	} else {
		// if (error instanceof z.ZodError) {
		// 	const validationError = fromZodError(error, {
		// 		prefix: `Check if schema matches the provided data, either fix the zod schema or the data provided`,
		// 	});

		// 	console.warn(addAdditionalErrorMessage(validationError, errorMessage));
		// } else {
		console.warn(addAdditionalErrorMessage(error, errorMessage));
		// }
	}
}
