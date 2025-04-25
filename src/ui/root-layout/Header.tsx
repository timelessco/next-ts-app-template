import { Disclosure, DisclosureContent } from "@ariakit/react";

import { Container } from "@/components/Container";
import { StyledNextLink } from "@/components/link/StyledLink";
import { StyledButton } from "@/components/StyledButton";

import { MobileDisclosureProvider, NavLinkSlot } from "./HeaderClient";
import { Logo } from "./Logo";

export function Header() {
	return (
		<header className="fixed top-0 z-20 min-w-full bg-white py-[15px]">
			<Container>
				<div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
					<StyledNextLink className="rounded-md py-0.5" href="/">
						<Logo aria-label="Timeless Logo" className="text-[38px]" />
					</StyledNextLink>

					{/* Visible only on Mobile */}
					<MobileDisclosureProvider>
						<Disclosure
							className="group inline-flex items-center justify-center rounded-md p-2 text-[22px] sm:hidden"
							render={<StyledButton />}
						>
							<svg
								className="inline-block h-[1em] w-[1em] shrink-0 align-middle leading-[1em]"
								fill="none"
								role="img"
								viewBox="0 0 16 14"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Nav links mobile menu icon</title>
								<rect
									className="transition group-aria-[expanded='true']:origin-[0%_30%] group-aria-[expanded='true']:rotate-45"
									fill="currentColor"
									height="2"
									rx="1"
									width="16"
								/>
								<rect
									className="transition group-aria-[expanded='true']:opacity-0"
									fill="currentColor"
									height="2"
									rx="1"
									width="16"
									y="6"
								/>
								<rect
									className="transition group-aria-[expanded='true']:origin-[10%_75%] group-aria-[expanded='true']:rotate-[-45deg]"
									fill="currentColor"
									height="2"
									rx="1"
									width="16"
									y="12"
								/>
							</svg>
						</Disclosure>

						{/*Using the same element for mobile and desktop for responsibly and simplicity*/}
						<DisclosureContent className="grid w-full grid-rows-[0fr] transition-all ease-in-out data-[enter=true]:grid-rows-[1fr]">
							{/* p-0 overflow-hidden does the magic with grid template rows for disclosure animation */}
							<nav className="overflow-hidden p-0 sm:overflow-visible sm:p-[initial]">
								<ul className="relative flex flex-col py-[5px] text-lg leading-[1.5] text-[rgba(0,0,0,0.5)] sm:flex-row sm:justify-center sm:space-x-4 sm:py-0">
									{LINK_DATA.map(({ label, path }) => (
										<li
											className="w-full py-[5px] text-center sm:w-auto sm:py-0"
											key={path}
										>
											<NavLinkSlot>
												<StyledNextLink
													className="block rounded-md py-2 hover:text-[rgba(0,0,0,0.9)] aria-[current=page]:text-black data-focus-visible:text-[rgba(0,0,0,0.9)] sm:px-2"
													href={path}
												>
													{label}
												</StyledNextLink>
											</NavLinkSlot>
										</li>
									))}
									<li className="w-full py-[5px] text-center sm:w-auto sm:py-0">
										<NavLinkSlot>
											<StyledNextLink
												className="block rounded-lg py-2 hover:text-[rgba(0,0,0,0.9)] aria-[current=page]:text-black data-focus-visible:text-[rgba(0,0,0,0.9)] sm:absolute sm:top-1/2 sm:right-0 sm:w-auto sm:-translate-y-1/2 sm:bg-[#F2F3F5] sm:px-2 sm:leading-[1] sm:hover:bg-black sm:hover:text-white sm:aria-[current=page]:bg-black sm:aria-[current=page]:text-white sm:data-focus-visible:bg-black sm:data-focus-visible:text-white"
												href="/contact"
											>
												Contact
											</StyledNextLink>
										</NavLinkSlot>
									</li>
								</ul>
							</nav>
						</DisclosureContent>
					</MobileDisclosureProvider>
				</div>
			</Container>
		</header>
	);
}

const LINK_DATA = [
	{ label: "Work", path: "/" },
	{ label: "About", path: "/about" },
	{ label: "Process", path: "/process" },
] as const;
