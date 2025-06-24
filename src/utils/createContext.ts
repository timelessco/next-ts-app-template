"use client";

import { createContext as createReactContext, use, type Context } from "react";

export interface CreateContextOptions<T> {
	defaultValue?: T;
	errorMessage?: string;
	hookName?: string;
	name?: string;
	providerName?: string;
	strict?: boolean;
}

export type CreateContextReturn<T> = [Context<T>, () => T];

function getErrorMessage(hook: string, provider: string) {
	return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}

export function createContext<T>(options: CreateContextOptions<T> = {}) {
	const {
		defaultValue,
		errorMessage,
		hookName = "useContext",
		name,
		providerName = "Provider",
		strict = true,
	} = options;

	const Context = createReactContext<T | undefined>(defaultValue);

	Context.displayName = name;

	function useContext() {
		const context = use(Context);

		if (!context && strict) {
			const error = new Error(
				errorMessage ?? getErrorMessage(hookName, providerName),
			);
			error.name = "ContextError";
			Error.captureStackTrace(error, useContext);
			throw error;
		}

		return context;
	}

	return [Context, useContext] as CreateContextReturn<T>;
}
