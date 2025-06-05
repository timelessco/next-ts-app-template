import { ProcessCard } from "@/ui/process-page/ProcessCard";
import { WhyTimelessContent } from "@/ui/process-page/WhyTimeless";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { ProcessPageIconGradients } from "@/components/IconGradients";
import { NextImage } from "@/components/image/NextImage";
import { StyledNextLink } from "@/components/link/StyledLink";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import type { IconName } from "@/icons/icon-name";
import { generatePageMetadata } from "@/utils/metadataUtils";
import {
	createSchemaScript,
	getOrganizationSchema,
	getServiceSchema,
	getWebPageSchema,
} from "@/utils/schemaUtils";
import { BASE_URL } from "@/utils/siteConfig";

import EvolveArrowImage from "../../images/process-page/evolve-arrow.png";
import MeasureArrowImage from "../../images/process-page/measure-arrow.png";
import ProcessCoverImage from "../../images/process-page/process-cover.png";

const PROCESS_PAGE_DESCRIPTION = "Data driven design decisions";
const PROCESS_PAGE_TITLE = "Process";
const PROCESS_PAGE_URL = `${BASE_URL}/process`;

export const metadata = generatePageMetadata({
	description: PROCESS_PAGE_DESCRIPTION,
	title: PROCESS_PAGE_TITLE,
	url: PROCESS_PAGE_URL,
});

const HERO_SECTION_ID = "process__section--hero-heading";
const WHY_TIMELESS_SECTION_ID = "process__section--why-timeless";
const OUR_PROCESS_SECTION_ID = "process__section--our-process";

export default function Page() {
	return (
		<>
			<main>
				<section
					aria-labelledby={HERO_SECTION_ID}
					className="pt-12 md:pt-20 lg:pt-40"
				>
					<Container>
						<h1
							className="mx-auto max-w-120 pt-24 pb-16 text-center text-4xl leading-[1.05] font-light tracking-[-0.6px] sm:mx-[initial] sm:text-left sm:text-5xl lg:py-8 lg:text-[3.625rem]"
							id={HERO_SECTION_ID}
						>
							Data driven design decisions
						</h1>
					</Container>
				</section>

				<ProcessPageIconGradients />

				<section
					aria-label="process cover image section"
					className="mt-6 lg:mt-14"
				>
					<NextImage
						alt="process cover image"
						className="mx-auto"
						fetchPriority="high"
						priority
						src={ProcessCoverImage}
					/>
				</section>

				<section
					aria-labelledby={OUR_PROCESS_SECTION_ID}
					className="bg-[#F5F6F8] pt-12 pb-8 md:pt-14 md:pb-12 lg:pt-[170px] lg:pb-[186px]"
				>
					<Container>
						<div className="mx-auto max-w-[645px] pb-4 text-center lg:pb-12">
							<h2
								className="mb-[2.25em] text-[0.8125rem] leading-[1.2] font-bold tracking-[1.97px] text-[#07122C]/55 uppercase md:text-[0.9375rem]"
								id={OUR_PROCESS_SECTION_ID}
							>
								our process
							</h2>
							<p className="mb-4 font-lyon text-2xl leading-[1.333] font-light tracking-[0.5px] sm:text-3xl">
								We believe the key to a delightful user experience is an
								incremental process of measuring business success and aligning
								them with user goals.
							</p>
						</div>

						<div className="mx-auto flex max-w-80 flex-wrap justify-center py-4 sm:max-w-150 lg:max-w-230 lg:justify-between lg:py-10">
							<div className="-mb-[25px] w-110 sm:mb-0 sm:flex sm:justify-between sm:pb-20 lg:pb-12">
								<ProcessCard iconName="research" title="Research" />
								<ProcessCard iconName="strategy" title="Strategy" />
							</div>

							<div className="relative w-110 sm:flex sm:justify-between sm:pb-12">
								<div className="absolute top-[38%] left-[-35%] h-max w-full -rotate-90 sm:-top-10 sm:left-1/2 sm:w-[252px] sm:-translate-x-1/2 sm:rotate-0 lg:top-[-55px]">
									<NextImage alt="evolve arrow" src={EvolveArrowImage} />
									<div className="absolute top-[-15px] left-[40%] h-[35px] w-[110px] -translate-x-1/2 bg-[#f5f6f8] text-center text-xl text-[#07122c]/65 sm:left-1/2">
										Evolve
									</div>
								</div>

								<ProcessCard iconName="process-design" title="Design" />
								<ProcessCard iconName="execute" title="Execute" />

								<div className="absolute bottom-[48%] left-[34%] h-max w-full -rotate-90 sm:bottom-2.5 sm:left-1/2 sm:w-[252px] sm:-translate-x-1/2 sm:rotate-0 lg:bottom-[-5px]">
									<NextImage alt="measure arrow" src={MeasureArrowImage} />
									<div className="absolute bottom-[-15px] left-[40%] h-[35px] w-[110px] -translate-x-1/2 bg-[#f5f6f8] text-center text-xl text-[#07122c]/65 sm:left-1/2">
										Measure
									</div>
								</div>
							</div>
						</div>
					</Container>
				</section>

				<section
					aria-labelledby={WHY_TIMELESS_SECTION_ID}
					className="pt-16 pb-8 md:pb-16 lg:pt-40 lg:pb-48"
				>
					<Container className="flex flex-wrap justify-center text-center lg:justify-between lg:text-left">
						<div className="mb-12 max-w-[495px] lg:mb-0 lg:max-w-110">
							<h2
								className="text-[0.8125rem] leading-[1.2] font-bold tracking-[1.97px] text-[#07122C]/55 uppercase md:text-[0.9375rem]"
								id={WHY_TIMELESS_SECTION_ID}
							>
								Why Timeless
							</h2>
							<h3 className="mt-6 font-lyon text-[2rem] leading-[1.08] font-light tracking-[0.4px] text-black md:text-[2.5rem] lg:text-[2.875rem]">
								Premium design and engineering, always on time and on budget.
							</h3>
							<StyledNextLink
								className="group mt-6 flex items-center justify-center gap-2 font-light text-[#007bff] duration-300 ease-in-out lg:justify-start"
								href="/contact"
								rel="noopener noreferrer"
							>
								<h4 className="text-[1.75rem] md:text-[2rem]">
									Get in touch with us
								</h4>
								<ArrowIcon className="text-[1.25rem] transition-transform group-hover:translate-x-3 md:text-xl" />
							</StyledNextLink>
						</div>
						<div className="relative max-w-[495px] space-y-8 lg:mt-10 lg:max-w-110 lg:gap-y-22">
							{WHY_TIMELESS_CONTENTS.map((props) => {
								const { desc, iconName, sectionTitle } = props;

								return (
									<WhyTimelessContent
										desc={desc}
										iconName={iconName}
										key={sectionTitle}
										sectionTitle={sectionTitle}
									/>
								);
							})}
						</div>
					</Container>
				</section>

				<WhatWeDoSection />
			</main>

			{/* Schema markup for SEO */}
			<script {...createSchemaScript(getOrganizationSchema())} />
			<script {...createSchemaScript(getServiceSchema())} />
			<script
				{...createSchemaScript(
					getWebPageSchema({
						description: PROCESS_PAGE_DESCRIPTION,
						title: PROCESS_PAGE_TITLE,
						url: PROCESS_PAGE_URL,
					}),
				)}
			/>

			<Footer
				desc="Get in touch with us"
				href="/contact"
				title="We would love to work with you on your next big idea."
			/>
		</>
	);
}

export interface WhyTimelessContentType {
	desc: string;
	iconName: IconName;
	sectionTitle: string;
}

const WHY_TIMELESS_CONTENTS = [
	{
		desc: "We believe that a lot of digital products could use some much-needed polish and attention to detail. We achieve that with our refined design process that continuously measures & evolves to meet business and user goals.",
		iconName: "premium",
		sectionTitle: "Premium Design",
	},
	{
		desc: "We respect your time and strive to meet realistic deadlines. We believe that when work gets done on time, you get more time to think about your vision of the future you.",
		iconName: "on-time",
		sectionTitle: "Always on time",
	},
	{
		desc: "From our experience with 200+ clients in the last decade, we learnt that pricing is based on the value rendered to the client and not on the number of hours spent. So our pricing reflects exactly that.",
		iconName: "affordable",
		sectionTitle: "Affordable Pricing",
	},
] satisfies WhyTimelessContentType[];
