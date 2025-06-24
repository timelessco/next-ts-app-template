// https://svgo.dev/docs/preset-default/

export default {
	multipass: true, // boolean. false by default
	// datauri: "enc", // 'base64' (default), 'enc' or 'unenc'.
	// js2svg: {
	// 	pretty: false, // boolean, false by default
	// },
	plugins: [
		"preset-default", // includes most plugins from v3
		// Plugins that were in your config but NOT in preset-default:
		"convertStyleToAttrs", // Style to attributes
		"removeRasterImages", // Remove raster images
		"cleanupListOfValues", // Round/rewrite number lists
		"removeViewBox", // Remove viewBox
		"removeTitle", // Remove <title>
		"reusePaths", // Replace duplicate elements with links
		"removeDimensions", // Prefer viewBox to width/height
	],
};
