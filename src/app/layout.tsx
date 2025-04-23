import { type ReactNode } from "react";
import { type Metadata, type Viewport } from "next";

import { Header } from "@/ui/root-layout/Header";
import { Providers } from "@/ui/root-layout/Providers";
import { TailwindIndicator } from "@/ui/root-layout/TailwindIndicator";
import { rootMetaData, rootViewport } from "@/utils/metadataUtils";

import "@/styles/global.css";

interface RootLayoutProps {
	readonly children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
	const { children } = props;

	return (
		<html
			className={`h-full antialiased inter-display optimize-legibility`}
			dir="ltr"
			lang="en"
		>
			{/* Enable this when we have a page that needs to be scanned */}
			{/* <head>
				<script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
			</head> */}
			<body className="relative min-h-full bg-white text-black">
				<Providers>
					<Header />
					{children}
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	);
}

export const metadata: Metadata = rootMetaData;
export const viewport: Viewport = rootViewport;
