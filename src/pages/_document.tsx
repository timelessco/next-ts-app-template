import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	public render() {
		return (
			<Html
				className="min-h-full antialiased inter-display optimizeLegibility"
				lang="en"
			>
				<Head>
					{/* Fonts Preload */}
					<link
						as="font"
						crossOrigin="anonymous"
						href="/fonts/Inter.var-english.woff2"
						rel="preload"
						type="font/woff2"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
