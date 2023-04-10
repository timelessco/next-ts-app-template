import { type AppProps } from "next/app";

import { inter } from "../utils/font";

import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => (
	<>
		{/* eslint-disable-next-line react/no-unknown-property */}
		<style global jsx>{`
			* {
				--font-inter: ${inter.style.fontFamily};
			}
		`}</style>
		<Component {...pageProps} />
	</>
);

export default App;
