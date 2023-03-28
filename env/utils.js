/**
 * @template T
 * @param {T} x
 * @returns {x is NonNullable<T>}
 */
const isNonNullable = (x) => {
	if (x === null || x === undefined || Number.isNaN(x)) {
		return false;
	}

	return true;
};

/**
 * @param {import('zod').ZodFormattedError<Map<string,string>,string>} errors
 * @returns {string}
 */
export const formatErrors = (errors) => {
	if (!errors) {
		return "";
	}

	return Object.entries(errors)
		.map(([name, value]) => {
			if (Array.isArray(value)) {
				return `${name}: ${value.join(", ")}\n`;
			}

			if (typeof value === "string") {
				return `${name}: ${value}\n`;
			}

			if (typeof value === "object") {
				return `${name}: ${formatErrors(value)}`;
			}

			return null;
		})
		.filter(isNonNullable)
		.join("");
};
