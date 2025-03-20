// https://svgo.dev/docs/preset-default/

export default {
	multipass: true, // boolean. false by default
	// datauri: "enc", // 'base64' (default), 'enc' or 'unenc'.
	// js2svg: {
	// 	pretty: false, // boolean, false by default
	// },
	plugins: [
		{
			// "Remove doctype"
			name: "removeDoctype",
		},
		// {
		// 	// "Remove XML instructions"
		// 	name: "removeXMLProcInst",
		// },
		{
			// "Remove comments"
			name: "removeComments",
		},
		{
			// "Remove <metadata>"
			name: "removeMetadata",
		},
		// {
		// 	// "Remove xmlns"
		// 	name: "removeXMLNS",
		// },
		{
			// "Remove editor data"
			name: "removeEditorsNSData",
		},
		{
			// "Clean up attribute whitespace"
			name: "cleanupAttrs",
		},
		{
			// "Merge styles"
			name: "mergeStyles",
		},
		{
			// "Inline styles"
			name: "inlineStyles",
		},
		{
			// "Minify styles"
			name: "minifyStyles",
		},
		{
			// "Style to attributes"
			name: "convertStyleToAttrs",
		},
		{
			// "Removes unused IDs, and minify IDs that are referenced by other elements."
			name: "cleanupIds",
		},
		{
			// "Remove raster images"
			name: "removeRasterImages",
		},
		{
			// "Remove unused defs"
			name: "removeUselessDefs",
		},
		{
			// "Round/rewrite numbers"
			name: "cleanupNumericValues",
		},
		{
			// "Round/rewrite number lists"
			name: "cleanupListOfValues",
		},
		{
			// "Minify colours"
			name: "convertColors",
		},
		{
			// "Remove unknowns & defaults"
			name: "removeUnknownsAndDefaults",
		},
		{
			// "Remove unneeded group attrs"
			name: "removeNonInheritableGroupAttrs",
		},
		{
			// "Remove useless stroke & fill"
			name: "removeUselessStrokeAndFill",
		},
		{
			// "Remove viewBox"
			name: "removeViewBox",
		},
		{
			// "Remove/tidy enable-background"
			name: "cleanupEnableBackground",
		},
		// {
		// 	// "Remove hidden elements"
		// 	name: "removeHiddenElems",
		// },
		{
			// "Remove empty text"
			name: "removeEmptyText",
		},
		{
			// "Shapes to (smaller) paths"
			name: "convertShapeToPath",
		},
		{
			// "Move attrs to parent group"
			name: "moveElemsAttrsToGroup",
		},
		{
			// "Move group attrs to elements"
			name: "moveGroupAttrsToElems",
		},
		{
			// "Collapse useless groups"
			name: "collapseGroups",
		},
		{
			// "Round/rewrite paths"
			name: "convertPathData",
		},
		{
			// "Convert non-eccentric <ellipse> to <circle>"
			name: "convertEllipseToCircle",
		},
		{
			// "Round/rewrite transforms"
			name: "convertTransform",
		},
		{
			// "Remove empty attrs"
			name: "removeEmptyAttrs",
		},
		{
			// "Remove empty containers"
			name: "removeEmptyContainers",
		},
		{
			// "Merge paths"
			name: "mergePaths",
		},
		{
			// "Remove unused namespaces"
			name: "removeUnusedNS",
		},
		{
			// "Replace duplicate elements with links"
			name: "reusePaths",
		},
		{
			// "Sort attrs"
			name: "sortAttrs",
		},
		{
			// "Sort children of <defs>"
			name: "sortDefsChildren",
		},
		{
			// "Remove <title>"
			name: "removeTitle",
		},
		{
			// "Remove <desc>"
			name: "removeDesc",
		},
		{
			// "Prefer viewBox to width/height"
			name: "removeDimensions",
		},
		// {
		// 	// "Remove style elements"
		// 	name: "removeStyleElement",
		// },
		// {
		// 	// "Remove script elements"
		// 	name: "removeScriptElement",
		// },
		// {
		// 	// "Remove out-of-bounds paths"
		// 	name: "removeOffCanvasPaths",
		// },
	],
};
