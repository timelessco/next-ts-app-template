import { Icon } from "@/components/Icon";
import { StyledNextLink } from "@/components/StyledNextLink";

export default function Home() {
	return (
		<div className="grid min-h-dvh grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
			<header className="row-start-1">
				<nav>
					<StyledNextLink
						className="flex items-center gap-2 rounded-md px-1 text-4xl hover:underline hover:underline-offset-4"
						href="https://www.timeless.co/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<Icon className="text-5xl" name="timeless" />
						Timeless
					</StyledNextLink>
				</nav>
			</header>
			<main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
				<ol className="list-inside list-decimal text-center text-base/6 sm:text-left">
					<li className="mb-2 tracking-[-.01em]">
						Get started by editing{" "}
						<code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
							src/app/page.tsx
						</code>
						.
					</li>
					<li className="tracking-[-.01em]">
						Save and see your changes instantly.
					</li>
				</ol>
			</main>
			<footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
				<StyledNextLink
					className="flex items-center gap-2 rounded-md px-1 hover:underline hover:underline-offset-4"
					href="https://www.timeless.co/"
					rel="noopener noreferrer"
					target="_blank"
				>
					<Icon className="text-xl" name="timeless" />
					Go to timeless.co →
				</StyledNextLink>
			</footer>
		</div>
	);
}
