import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html
        className="min-h-full antialiased inter-display optimizeLegibility"
        lang="en"
      >
        <Head>
          {/* Fonts Preload */}
          <link
            rel="preload"
            href="/fonts/Inter.var-english.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
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
