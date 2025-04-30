import * as motion from "motion/react-client";

import { TestimonialCarousel } from "@/ui/homepage/TestimonialCarousel";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { NextImage } from "@/components/image/NextImage";
import { StyledNextLink } from "@/components/link/StyledLink";
import { getFadeInWhenVisibleMotionProps } from "@/utils/index";

import atlanticPayrollImage from "../images/atlantic-payroll.png";
import bluematterImage from "../images/bluematter.jpg";
import photonImage from "../images/photon.png";
import smallcaseImage from "../images/smallcase.png";

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
							We build brands, products and apps.
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
							href="https://atlanticpayroll.tmls.dev/"
							rel="noopener noreferrer"
							target="_blank"
						>
							<div className="mx-auto mt-8 flex max-w-80 flex-col text-center md:max-w-90 lg:mx-[initial] lg:mt-0 lg:max-w-120 lg:pl-24 lg:text-left xl:pl-30">
								<h2
									className="mb-4 text-xl leading-[1.2] font-light sm:mt-5 lg:mt-0 lg:mb-2 lg:text-[1.4375rem]"
									id={ATLANTIC_PAYROLL_SECTION_ID}
								>
									Atlantic payroll
								</h2>
								<h3 className="font-lyon text-[2rem] leading-[1.1] font-bold md:text-4xl lg:text-[3.125rem] lg:leading-none">
									Rethinking the online payroll experience
								</h3>
							</div>
							<div className="flex w-full">
								<div className="mx-auto max-w-[486px] lg:pt-14">
									<NextImage
										alt="Atlantic Payroll"
										priority
										src={atlanticPayrollImage}
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
							href="https://smallcase.tmls.dev/"
							rel="noopener noreferrer"
							target="_blank"
						>
							<div className="mx-auto mt-8 flex max-w-80 shrink-0 flex-col text-center sm:max-w-90 lg:mx-[initial] lg:mt-0 lg:max-w-120 lg:pl-24 lg:text-left xl:pl-30">
								<h2
									className="mb-4 text-xl leading-[1.2] font-light sm:mt-5 lg:mt-0 lg:mb-2 lg:text-[1.4375rem]"
									id={SMALLCASE_SECTION_ID}
								>
									Smallcase
								</h2>
								<h3 className="font-lyon text-[2rem] leading-[1.1] font-bold md:text-4xl lg:text-[3.125rem] lg:leading-none">
									Stock investing for everyone
								</h3>
							</div>
							<div className="flex w-full justify-end">
								<div className="mx-auto max-w-160 lg:mx-[initial] lg:pt-15">
									<NextImage alt="smallcase image" src={smallcaseImage} />
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
							href="https://bluematter.tmls.dev/"
							rel="noopener noreferrer"
							target="_blank"
						>
							<NextImage
								alt="Bluematter image"
								className="object-cover object-right-top lg:object-center"
								fill
								src={bluematterImage}
							/>
							<div className="relative mx-auto flex max-w-95 flex-col text-center md:max-w-150 lg:mx-[initial] lg:pl-24 lg:text-left xl:pl-30">
								<h2
									className="mb-4 text-xl leading-[1.2] font-light sm:text-[1.4375rem] lg:mb-2"
									id={BLUEMATTER_SECTION_ID}
								>
									Bluematter
								</h2>
								<h3 className="font-lyon text-[2rem] leading-[1.1] font-bold md:text-4xl lg:text-[3.125rem] lg:leading-none">
									Solving America&apos;s marketing woes
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
							href="https://photon.tmls.dev/"
							rel="noopener noreferrer"
							target="_blank"
						>
							<div className="mx-auto mt-8 flex max-w-80 flex-col justify-center text-center sm:max-w-90 lg:mx-[initial] lg:mt-0 lg:max-w-120 lg:pl-24 lg:text-left xl:pl-30">
								<h2
									className="mb-4 text-xl leading-[1.2] font-light sm:mt-5 lg:mt-0 lg:mb-2 lg:text-[1.4375rem]"
									id={PHOTON_SECTION_ID}
								>
									Photon
								</h2>
								<h3 className="font-lyon text-[2rem] leading-[1.1] font-bold md:text-4xl lg:mb-2 lg:text-[3.125rem] lg:leading-none">
									Disrupting the cloud infrastructure
								</h3>
							</div>
							<div className="flex w-full justify-end">
								<div className="mx-auto max-w-[635px] lg:mx-[initial] lg:pt-15">
									<NextImage alt="photon image" src={photonImage} />
								</div>
							</div>
						</StyledNextLink>
					</Container>
				</motion.section>
				<TestimonialCarousel />
			</main>
			<Footer
				desc="Learn more about us"
				href="/about"
				title="Solving business problems with user-centric design"
			/>
		</>
	);
}
