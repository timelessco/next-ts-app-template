import * as motion from "motion/react-client";

import { TestimonialCarousel } from "@/ui/home-page/TestimonialCarousel";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { NextImage } from "@/components/image/NextImage";
import { StyledNextLink } from "@/components/link/StyledLink";
import { getFadeInWhenVisibleMotionProps } from "@/utils/index";
import { generatePageMetadata } from "@/utils/metadataUtils";
import {
	createSchemaScript,
	getCreativeWorkSchema,
	getOrganizationSchema,
	getReviewSchema,
	getServiceSchema,
	getWebPageSchema,
	getWebsiteSchema,
} from "@/utils/schemaUtils";
import { PORTFOLIO_ITEMS, SITE_NAME } from "@/utils/siteConfig";

import atlanticPayrollImage from "../images/home-page/atlantic-payroll.png";
import bluematterImage from "../images/home-page/bluematter.jpg";
import photonImage from "../images/home-page/photon.png";
import smallcaseImage from "../images/home-page/smallcase.png";

const HOME_PAGE_DESCRIPTION = "We build brands, products and apps.";

// Map portfolio IDs to their images
const PORTFOLIO_IMAGES = {
	"atlantic-payroll": atlanticPayrollImage,
	bluematter: bluematterImage,
	photon: photonImage,
	smallcase: smallcaseImage,
} as const;

// Get portfolio items with their images
const atlanticPayroll = PORTFOLIO_ITEMS.find(
	(item) => item.id === "atlantic-payroll",
)!;
const smallcase = PORTFOLIO_ITEMS.find((item) => item.id === "smallcase")!;
const bluematter = PORTFOLIO_ITEMS.find((item) => item.id === "bluematter")!;
const photon = PORTFOLIO_ITEMS.find((item) => item.id === "photon")!;

export const metadata = generatePageMetadata({
	description: HOME_PAGE_DESCRIPTION,
	title: SITE_NAME,
});

const HERO_SECTION_ID = "homepage__section--hero-heading";
const ATLANTIC_PAYROLL_SECTION_ID = "homepage__section--hero-atlantic-payroll";
const SMALLCASE_SECTION_ID = "homepage__section--smallcase";
const BLUEMATTER_SECTION_ID = "homepage__section--bluematter";
const PHOTON_SECTION_ID = "homepage__section--photon";

export default function Home() {
	return (
		<>
			<main>
				<section
					aria-labelledby={HERO_SECTION_ID}
					className="pt-12 md:pt-20 lg:pt-40"
				>
					<Container>
						<motion.h1
							className="motion--initial-hidden mx-auto max-w-120 pt-24 pb-16 text-center text-4xl leading-[1.05] font-light tracking-[-0.6px] text-black sm:mx-[initial] sm:text-left sm:text-5xl lg:py-8 lg:text-[3.625rem]"
							id={HERO_SECTION_ID}
							{...getFadeInWhenVisibleMotionProps()}
						>
							{HOME_PAGE_DESCRIPTION}
						</motion.h1>
					</Container>
				</section>
				<motion.section
					aria-labelledby={ATLANTIC_PAYROLL_SECTION_ID}
					className="motion--initial-hidden mt-7 lg:mt-10"
					{...getFadeInWhenVisibleMotionProps(0.25)}
				>
					<Container>
						<StyledNextLink
							className="flex flex-wrap items-center rounded bg-[linear-gradient(45deg,#34B1E0_0%,#A7E0F5_100%)] text-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] lg:mb-8 lg:flex-nowrap lg:justify-normal"
							href={atlanticPayroll.url}
							rel="noopener noreferrer"
							target="_blank"
						>
							<div className="mx-auto mt-8 flex max-w-80 flex-col text-center md:max-w-90 lg:mx-[initial] lg:mt-0 lg:max-w-120 lg:pl-24 lg:text-left xl:pl-30">
								<h2
									className="mb-4 text-xl leading-[1.2] font-light sm:mt-5 lg:mt-0 lg:mb-2 lg:text-[1.4375rem]"
									id={ATLANTIC_PAYROLL_SECTION_ID}
								>
									{atlanticPayroll.name}
								</h2>
								<h3 className="font-lyon text-[2rem] leading-[1.1] font-bold md:text-4xl lg:text-[3.125rem] lg:leading-none">
									{atlanticPayroll.description}
								</h3>
							</div>
							<div className="flex w-full">
								<div className="mx-auto max-w-[486px] lg:pt-14">
									<NextImage
										alt={atlanticPayroll.name}
										priority
										src={PORTFOLIO_IMAGES[atlanticPayroll.id]}
									/>
								</div>
							</div>
						</StyledNextLink>
					</Container>
				</motion.section>
				<motion.section
					aria-labelledby={SMALLCASE_SECTION_ID}
					className="motion--initial-hidden mt-14 lg:mt-18"
					{...getFadeInWhenVisibleMotionProps(0.25)}
				>
					<Container>
						<StyledNextLink
							className="flex flex-wrap items-center justify-center rounded bg-[linear-gradient(45deg,#19C391_0%,#49C07D_100%)] text-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] lg:flex-nowrap lg:justify-between"
							href={smallcase.url}
							rel="noopener noreferrer"
							target="_blank"
						>
							<div className="mx-auto mt-8 flex max-w-80 shrink-0 flex-col text-center sm:max-w-90 lg:mx-[initial] lg:mt-0 lg:max-w-120 lg:pl-24 lg:text-left xl:pl-30">
								<h2
									className="mb-4 text-xl leading-[1.2] font-light sm:mt-5 lg:mt-0 lg:mb-2 lg:text-[1.4375rem]"
									id={SMALLCASE_SECTION_ID}
								>
									{smallcase.name}
								</h2>
								<h3 className="font-lyon text-[2rem] leading-[1.1] font-bold md:text-4xl lg:text-[3.125rem] lg:leading-none">
									{smallcase.description}
								</h3>
							</div>
							<div className="flex w-full justify-end">
								<div className="mx-auto max-w-160 lg:mx-[initial] lg:pt-15">
									<NextImage
										alt={smallcase.name}
										src={PORTFOLIO_IMAGES[smallcase.id]}
									/>
								</div>
							</div>
						</StyledNextLink>
					</Container>
				</motion.section>
				<motion.section
					aria-labelledby={BLUEMATTER_SECTION_ID}
					className="motion--initial-hidden mt-14 lg:mt-18"
					{...getFadeInWhenVisibleMotionProps(0.25)}
				>
					<Container>
						<StyledNextLink
							className="relative block rounded py-54 text-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
							href={bluematter.url}
							rel="noopener noreferrer"
							target="_blank"
						>
							<NextImage
								alt={bluematter.name}
								className="object-cover object-top-right lg:object-center"
								fill
								src={PORTFOLIO_IMAGES[bluematter.id]}
							/>
							<div className="relative mx-auto flex max-w-95 flex-col text-center md:max-w-150 lg:mx-[initial] lg:pl-24 lg:text-left xl:pl-30">
								<h2
									className="mb-4 text-xl leading-[1.2] font-light sm:text-[1.4375rem] lg:mb-2"
									id={BLUEMATTER_SECTION_ID}
								>
									{bluematter.name}
								</h2>
								<h3 className="font-lyon text-[2rem] leading-[1.1] font-bold md:text-4xl lg:text-[3.125rem] lg:leading-none">
									{bluematter.description}
								</h3>
							</div>
						</StyledNextLink>
					</Container>
				</motion.section>
				<motion.section
					aria-labelledby={PHOTON_SECTION_ID}
					className="motion--initial-hidden mt-14 mb-18 lg:mt-18"
					{...getFadeInWhenVisibleMotionProps(0.25)}
				>
					<Container>
						<StyledNextLink
							className="flex flex-wrap justify-center rounded bg-[linear-gradient(45deg,#5B6AFF_0%,#919AFF_100%)] text-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] lg:flex-nowrap lg:justify-between"
							href={photon.url}
							rel="noopener noreferrer"
							target="_blank"
						>
							<div className="mx-auto mt-8 flex max-w-80 flex-col justify-center text-center sm:max-w-90 lg:mx-[initial] lg:mt-0 lg:max-w-120 lg:pl-24 lg:text-left xl:pl-30">
								<h2
									className="mb-4 text-xl leading-[1.2] font-light sm:mt-5 lg:mt-0 lg:mb-2 lg:text-[1.4375rem]"
									id={PHOTON_SECTION_ID}
								>
									{photon.name}
								</h2>
								<h3 className="font-lyon text-[2rem] leading-[1.1] font-bold md:text-4xl lg:mb-2 lg:text-[3.125rem] lg:leading-none">
									{photon.description}
								</h3>
							</div>
							<div className="flex w-full justify-end">
								<div className="mx-auto max-w-[635px] lg:mx-[initial] lg:pt-15">
									<NextImage
										alt={photon.name}
										src={PORTFOLIO_IMAGES[photon.id]}
									/>
								</div>
							</div>
						</StyledNextLink>
					</Container>
				</motion.section>

				<TestimonialCarousel />
			</main>

			{/* Schema markup for SEO */}
			<script {...createSchemaScript(getOrganizationSchema())} />
			<script {...createSchemaScript(getWebsiteSchema())} />
			<script
				{...createSchemaScript(
					getWebPageSchema({
						description: HOME_PAGE_DESCRIPTION,
						title: `Home | ${SITE_NAME}`,
					}),
				)}
			/>
			<script {...createSchemaScript(getServiceSchema())} />
			<script {...createSchemaScript(getReviewSchema())} />
			<script {...createSchemaScript(getCreativeWorkSchema())} />

			<Footer
				desc="Learn more about us"
				href="/about"
				title="Solving business problems with user-centric design"
			/>
		</>
	);
}
