import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	public render() {
		return (
			<Html
				className="min-h-full antialiased inter-display optimizeLegibility"
				lang="en"
			>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
