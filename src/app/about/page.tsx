import { ImageCarousel } from "@/ui/about-page/ImageCarousel";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { AboutPageIconGradients } from "@/components/IconGradients";
import { NextImage } from "@/components/image/NextImage";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import { generatePageMetadata } from "@/utils/metadataUtils";
import {
	createSchemaScript,
	getAboutPageSchema,
	getOrganizationSchema,
	getWebPageSchema,
} from "@/utils/schemaUtils";
import { BASE_URL } from "@/utils/siteConfig";

import aboutHeroCoverImage from "../../images/about-page/about-hero-cover.jpg";
import AnandImage from "../../images/about-page/anand.png";
import defaultImage from "../../images/about-page/default.png";
import FazilImage from "../../images/about-page/fazil.png";
import KarthikImage from "../../images/about-page/karthik.png";
import MohanImage from "../../images/about-page/mohan.png";
import PrasanthImage from "../../images/about-page/prasanth.png";
import PrasadImage from "../../images/about-page/prasath.png";
import PremImage from "../../images/about-page/prem.png";
import RiyazImage from "../../images/about-page/riyaz.png";
import SandeepImage from "../../images/about-page/sandeep.png";
import SriniImage from "../../images/about-page/srini.png";
import UdayImage from "../../images/about-page/uday.png";
import VigneshImage from "../../images/about-page/vignesh.png";
import YuvarajImage from "../../images/about-page/yuvaraj.png";
import ZaidImage from "../../images/about-page/zaid.png";

const ABOUT_PAGE_DESCRIPTION =
	"Solving business problems with user-centric design.";
const ABOUT_PAGE_TITLE = "About Us";
const ABOUT_PAGE_URL = `${BASE_URL}/about`;

export const metadata = generatePageMetadata({
	description: ABOUT_PAGE_DESCRIPTION,
	title: ABOUT_PAGE_TITLE,
	url: ABOUT_PAGE_URL,
});

const HERO_SECTION_ID = "about__section--hero-cover";
const MEET_THE_TEAM_SECTION_ID = "about__section--meet-the-team";

export default function Page() {
	return (
		<>
			<main>
				<section
					aria-labelledby={HERO_SECTION_ID}
					className="relative bg-[#0E0E0F] pt-30 pb-12 text-center lg:pb-45 lg:text-left"
				>
					<NextImage
						alt="TIMELESS OFFICE"
						fetchPriority="high"
						priority
						src={aboutHeroCoverImage}
					/>
					<Container className="flex flex-wrap justify-center text-white lg:-mt-16 lg:flex-row lg:flex-nowrap lg:justify-between">
						<h1
							className="mb-2 max-w-120 px-[15px] pb-4 text-[2.5rem] leading-[1.05] font-light tracking-[-0.6px] lg:pb-0 lg:text-[3.625rem]"
							id={HERO_SECTION_ID}
						>
							Solving business problems with user-centric design
						</h1>
						<div className="max-w-145 px-[15px] text-lg leading-[1.25] font-light tracking-[0.27px] text-white/70 sm:text-[1.375rem] lg:text-[1.75rem]">
							<h2 className="pb-4 lg:pb-12">
								At Timeless, we believe that complex business problems have
								simple, well-designed solutions. We focus on creating
								tailor-made digital products that enrich user experience.
							</h2>
							<h3>
								We are a close team that believes in constant communication and
								prototyping over static screens. We look at business strategy
								and measurable results as an essential part of the design
								process and decisions.
							</h3>
						</div>
					</Container>
				</section>

				<AboutPageIconGradients />

				<WhatWeDoSection />

				<ImageCarousel />

				<section
					aria-labelledby={MEET_THE_TEAM_SECTION_ID}
					className="py-8 text-center md:py-14 lg:py-10"
				>
					<Container>
						<h2
							className="mb-[2.25em] text-[0.8125rem] leading-[1.2] font-bold tracking-[1.97px] text-[#07122C]/55 uppercase md:text-[0.9375rem]"
							id={MEET_THE_TEAM_SECTION_ID}
						>
							meet the team
						</h2>
						<h3 className="mx-auto mb-4 max-w-[645px] pb-4 font-lyon text-[2rem] leading-[1.08] font-light tracking-[0.4px] text-black md:text-[2.5rem] lg:pb-12 lg:text-[2.875rem]">
							We are problem-solvers at the core and obsess over every detail.
						</h3>
						<div className="mx-auto flex max-w-230 flex-wrap sm:pt-8 sm:pb-13">
							{teamMembers.map((member) => (
								<div
									className="group mx-auto w-full max-w-[145px] pb-8 min-[411px]:max-w-[190px] sm:mx-[initial] sm:max-w-1/2 sm:px-2.5 sm:pb-16 md:max-w-1/3 lg:max-w-1/4"
									key={member.id}
								>
									<div className="mx-auto my-[15px] size-16 rounded-full [--tw-shadow-color:rgba(0,0,0,0.15)] transition-all duration-250 ease-in-out group-hover:scale-[1.075] group-hover:shadow-[0px_6px_20px] min-[411px]:size-[74px] sm:my-[25px]">
										<NextImage
											alt={member.name}
											className="rounded-full transition-transform"
											src={member.image}
										/>
									</div>

									<h4 className="text-base leading-[1.2] min-[411px]:text-xl">
										{member.name}
									</h4>
									<h5 className="relative text-[0.9375rem] tracking-[0.3px] text-[#07122C]/65 min-[411px]:text-lg">
										{member.designation}
									</h5>
								</div>
							))}
							<a
								className="group mx-auto w-full max-w-[145px] pb-8 min-[411px]:max-w-[190px] sm:mx-[initial] sm:max-w-1/2 sm:px-2.5 sm:pb-16 md:max-w-1/3 lg:max-w-1/4"
								href="https://wellfound.com/company/timelessco/jobs"
								rel="noopener noreferrer"
								target="_blank"
							>
								<NextImage
									alt="You"
									className="mx-auto my-[15px] size-16 rounded-full min-[411px]:size-[74px] sm:my-[25px]"
									src={defaultImage}
								/>
								<h4 className="text-base leading-[1.2] min-[411px]:text-xl">
									You
								</h4>
								<h5 className="relative inline-block text-[0.9375rem] tracking-[0.3px] text-[#007BFF] group-hover:text-[#0056b3] min-[411px]:text-lg">
									See Careers
									<div className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-[#0056b3] opacity-0 transition-all ease-in group-hover:bottom-0 group-hover:opacity-100" />
								</h5>
							</a>
						</div>
					</Container>
				</section>
			</main>

			{/* Schema markup for SEO */}
			<script {...createSchemaScript(getOrganizationSchema())} />
			<script {...createSchemaScript(getAboutPageSchema())} />
			<script
				{...createSchemaScript(
					getWebPageSchema({
						description: ABOUT_PAGE_DESCRIPTION,
						title: ABOUT_PAGE_TITLE,
						url: ABOUT_PAGE_URL,
					}),
				)}
			/>

			<Footer
				desc="Look into our process"
				href="/process"
				title="Premium design and engineering, always on time and on budget."
			/>
		</>
	);
}

const teamMembers = [
	{
		designation: "Co-Founder",
		id: 1,
		image: PrasadImage,
		name: "Prasath Prabhakaran",
	},
	{
		designation: "Co-Founder",
		id: 2,
		image: UdayImage,
		name: "Udhaya Chandran",
	},
	{
		designation: "CEO",
		id: 3,
		image: SandeepImage,
		name: "Sandeep Prabhakaran",
	},
	{
		designation: "UI Designer",
		id: 4,
		image: AnandImage,
		name: "Anantha Krishnan",
	},
	{
		designation: "Frontend Engineer",
		id: 5,
		image: FazilImage,
		name: "Fazil Fahad",
	},
	{
		designation: "UI Designer",
		id: 6,
		image: PremImage,
		name: "Prem Dayal",
	},
	{
		designation: "UI Designer",
		id: 7,
		image: VigneshImage,
		name: "Vigneshwaran R.",
	},
	{
		designation: "Frontend Engineer",
		id: 8,
		image: MohanImage,
		name: "Mohana Prabhu",
	},
	{
		designation: "Frontend Engineer",
		id: 9,
		image: ZaidImage,
		name: "Khalid Zaid",
	},
	{
		designation: "Frontend Engineer",
		id: 10,
		image: PrasanthImage,
		name: "Prasanth K.",
	},
	{
		designation: "UI Designer",
		id: 11,
		image: SriniImage,
		name: "Srinivasan Rajan",
	},
	{
		designation: "Fullstack Engineer",
		id: 12,
		image: KarthikImage,
		name: "Karthik B.",
	},
	{
		designation: "Ecommerce Developer",
		id: 13,
		image: RiyazImage,
		name: "Riyaz Basher",
	},
	{
		designation: "Office Admin",
		id: 14,
		image: YuvarajImage,
		name: "Yuvaraj Elumalai",
	},
] as const;
