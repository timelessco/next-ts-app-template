import { Icon, type IconProps } from "@/components/Icon";

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
							<p className="text-[1.75rem] leading-[1.5] font-light md:text-[2rem]">
								{desc}
							</p>
							<FooterArrowIcon className="text-[1.25rem] transition-transform group-hover:translate-x-3 md:text-[1.375rem]" />
						</div>
					</div>
				</Container>
			</StyledNextLink>
		</footer>
	);
}

type FooterArrowIconProps = IconProps;

function FooterArrowIcon(props: FooterArrowIconProps) {
	return (
		<Icon viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M13.293.293a1 1 0 0 1 1.338-.068l.076.068 7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L18.586 9H1a1 1 0 1 1 0-2h17.586l-5.293-5.293-.068-.076a1 1 0 0 1 .068-1.338Z"
				fill="currentColor"
			/>
		</Icon>
	);
}
