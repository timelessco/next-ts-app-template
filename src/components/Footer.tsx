import { ArrowIcon } from "./ArrowIcon";
import { Container } from "./Container";
import { StyledNextLink } from "./link/StyledLink";

const FOOTER_ID = "footer";

interface FooterProps {
	desc: string;
	href: string;
	title: string;
}

export function Footer(props: FooterProps) {
	const { desc, href, title } = props;

	return (
		<footer aria-labelledby={FOOTER_ID}>
			<StyledNextLink
				className="group block bg-black py-20 text-center transition-colors hover:bg-[#2D82E4] md:py-28 lg:py-40"
				href={href}
			>
				<Container>
					<div className="mx-auto max-w-180">
						<h2
							className="mb-[25px] font-lyon text-[2rem] leading-[1.08] font-light tracking-[0.4px] text-white md:text-[2.5rem] lg:text-[2.875rem]"
							id={FOOTER_ID}
						>
							{title}
						</h2>
						<div className="mb-0 flex items-center justify-center gap-2 text-[#2D82E4] transition-colors group-hover:text-white">
							<p className="text-[1.75rem] leading-normal font-light md:text-[2rem]">
								{desc}
							</p>
							<ArrowIcon className="text-[1.25rem] transition-transform group-hover:translate-x-3 md:text-[1.375rem]" />
						</div>
					</div>
				</Container>
			</StyledNextLink>
		</footer>
	);
}
