// https://svgo.dev/docs/preset-default/

export default {
	multipass: true, // boolean. false by default
	// datauri: "enc", // 'base64' (default), 'enc' or 'unenc'.
	// js2svg: {
	// 	pretty: false, // boolean, false by default
	// },
	plugins: [
		// Remove doctype
		"removeDoctype",
		// Remove XML instructions
		// "removeXMLProcInst",
		// Remove comments
		"removeComments",
		// Remove metadata
		"removeMetadata",
		// Remove xmlns
		// "removeXMLNS",
		// Remove editor data
		"removeEditorsNSData",
		// Clean up attribute whitespace
		"cleanupAttrs",
		// Merge styles
		"mergeStyles",
		// Inline styles
		"inlineStyles",
		// Minify styles
		"minifyStyles",
		// Style to attributes
		"convertStyleToAttrs",
		// Remove unused IDs
		"cleanupIds",
		// Remove raster images
		"removeRasterImages",
		// Remove unused defs
		"removeUselessDefs",
		// Round/rewrite numbers
		"cleanupNumericValues",
		// Round/rewrite number lists
		"cleanupListOfValues",
		// Minify colours
		"convertColors",
		// Remove unknowns & defaults
		"removeUnknownsAndDefaults",
		// Remove unneeded group attrs
		"removeNonInheritableGroupAttrs",
		// Remove useless stroke & fill
		"removeUselessStrokeAndFill",
		// Remove viewBox
		"removeViewBox",
		// Remove/tidy enable-background
		"cleanupEnableBackground",
		// Remove hidden elements
		// "removeHiddenElems",
		// Remove empty text
		"removeEmptyText",
		// Shapes to (smaller) paths
		"convertShapeToPath",
		// Move attrs to parent group
		"moveElemsAttrsToGroup",
		// Move group attrs to elements
		"moveGroupAttrsToElems",
		// Collapse useless groups
		"collapseGroups",
		// Round/rewrite paths
		"convertPathData",
		// Convert non-eccentric <ellipse> to <circle>
		"convertEllipseToCircle",
		// Round/rewrite transforms
		"convertTransform",
		// Remove empty attrs
		"removeEmptyAttrs",
		// Remove empty containers
		"removeEmptyContainers",
		// Merge paths
		"mergePaths",
		// Remove unused namespaces
		"removeUnusedNS",
		// Replace duplicate elements with links
		"reusePaths",
		// Sort attrs
		"sortAttrs",
		// Sort children of <defs>
		"sortDefsChildren",
		// Remove <title>
		"removeTitle",
		// Remove <desc>
		"removeDesc",
		// Prefer viewBox to width/height
		"removeDimensions",
		// Remove style elements
		// "removeStyleElement",
		// Remove script elements
		// "removeScriptElement",
		// Remove out-of-bounds paths
		// "removeOffCanvasPaths",
	],
};
