import type { IconName } from "@/icons/icon-name";

import { Container } from "./Container";
import { Icon } from "./Icon";

const WHAT_WE_DO_SECTION_ID = "common__section--what-we-do";

export default function WhatWeDoSection() {
	return (
		<section
			aria-labelledby={WHAT_WE_DO_SECTION_ID}
			className="pt-12 pb-8 md:py-20 lg:py-28"
		>
			<Container>
				<div className="mx-auto max-w-[950px] text-center">
					<h2
						className="text-[0.8125rem] leading-none font-bold tracking-[1.97px] text-[#07122C]/55 uppercase md:text-[0.9375rem]"
						id={WHAT_WE_DO_SECTION_ID}
					>
						What we do
					</h2>
					<h3 className="mt-[25px] mb-4 font-lyon text-[2rem] leading-[1.08] font-light tracking-[0.4px] text-black md:text-[2.5rem] lg:text-[2.875rem]">
						We are committed to create digital products that people love to use.
					</h3>
					<div className="flex flex-wrap justify-center gap-12 pt-8 md:justify-between md:gap-0 md:pt-[90px]">
						{whatWeDoItems.map((item) => {
							const { iconName, listItems, title } = item;

							return (
								<WhatwedoSectionItem
									iconName={iconName}
									key={title}
									listItems={listItems}
									title={title}
								/>
							);
						})}
					</div>
				</div>
			</Container>
		</section>
	);
}

interface WhatWeDoItemProps {
	iconName: IconName;
	listItems: string[];
	title: string;
}

const whatWeDoItems = [
	{
		iconName: "strategy",
		listItems: [
			"UI Research / Analysis",
			"UX Consultancy",
			"Information Architecture",
			"User Testing",
		],
		title: "Strategy",
	},
	{
		iconName: "what-we-do-design",
		listItems: [
			"User Experience",
			"Interface Design",
			"Illustration / Animation",
			"Brand Development",
		],
		title: "Design",
	},
	{
		iconName: "execute",
		listItems: [
			"HTML / CSS / Javascript",
			"React / Vue",
			"PHP / NodeJS",
			"DevOps",
		],
		title: "Technology",
	},
] satisfies WhatWeDoItemProps[];

export function WhatwedoSectionItem(props: WhatWeDoItemProps) {
	const { iconName, listItems, title } = props;

	return (
		<div className="w-full text-center md:max-w-[225px] md:text-left">
			<Icon className="text-[34px] text-white" name={iconName} />
			<h4 className="my-[15px] text-xl leading-[1.2] font-semibold md:mt-[25px] md:mb-5 md:text-start md:text-[1.625rem]">
				{title}
			</h4>
			<ul className="text-xl leading-[1.85] text-[#07122C]/65 md:text-start">
				{listItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
}
