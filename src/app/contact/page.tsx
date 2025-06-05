import { GoogleMapComponent } from "@/ui/contact-page/GoogleMaps";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { generatePageMetadata } from "@/utils/metadataUtils";
import {
	createSchemaScript,
	getLocalBusinessSchema,
	getOrganizationSchema,
	getWebPageSchema,
} from "@/utils/schemaUtils";
import { BASE_URL, COMPANY_ADDRESS, COMPANY_INFO } from "@/utils/siteConfig";

const CONTACT_PAGE_DESCRIPTION = "We’d love to hear from you.";
const CONTACT_PAGE_TITLE = "Contact Us";
const CONTACT_PAGE_URL = `${BASE_URL}/contact`;

export const metadata = generatePageMetadata({
	description: CONTACT_PAGE_DESCRIPTION,
	title: CONTACT_PAGE_TITLE,
	url: CONTACT_PAGE_URL,
});

const HERO_SECTION_ID = "contact__section--hero-heading";
const MAPS_SECTION_ID = "contact__section--maps";

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
							We’d love to hear from you
						</h1>
					</Container>
				</section>
				<section
					aria-labelledby={MAPS_SECTION_ID}
					className="relative mt-6 md:mt-18 lg:mt-26 lg:py-60"
				>
					<div className="flex h-[500px] items-center justify-center lg:absolute lg:inset-0 lg:h-full">
						<GoogleMapComponent />
					</div>

					<div className="relative bg-white p-8 text-center lg:mr-10 lg:ml-auto lg:w-124 lg:rounded-[9px] lg:p-12 lg:text-left lg:shadow-[0_0_1px_0_rgba(0,0,0,0.20),0_1px_2px_0_rgba(0,0,0,0.07),0_1px_5px_0_rgba(0,0,0,0.09)] xl:mr-50">
						<h2
							className="pt-2.5 text-[0.8125rem] leading-[1.2] font-bold tracking-[1.97] text-[#07122C]/55 uppercase sm:mb-2 sm:text-[0.9375rem] lg:pt-5"
							id={MAPS_SECTION_ID}
						>
							Address
						</h2>
						<h3 className="mx-auto pb-2.5 text-[1.375rem] leading-10 font-bold tracking-[-0.05] text-[#07122C] md:mb-4 md:max-w-1/2 lg:mx-0 lg:max-w-85 lg:pb-5 lg:text-[1.6875rem]">
							{COMPANY_ADDRESS.streetAddress}, {COMPANY_ADDRESS.addressLocality}
							, {COMPANY_ADDRESS.addressRegion}, {COMPANY_ADDRESS.postalCode}
						</h3>
						<h2 className="pt-2.5 text-[0.8125rem] leading-[1.2] font-bold tracking-[1.97] text-[#07122C]/55 uppercase sm:mb-2 sm:text-[0.9375rem] lg:pt-5">
							Email
						</h2>
						<h3 className="mx-auto mb-4 pb-2.5 text-[1.375rem] leading-10 font-bold tracking-[-0.05] text-[#07122C] md:max-w-1/2 md:pb-5 lg:mx-0 lg:text-[1.6875rem]">
							{COMPANY_INFO.email}
						</h3>
						<h2 className="pt-2.5 text-[0.8125rem] leading-[1.2] font-bold tracking-[1.97] text-[#07122C]/55 uppercase sm:mb-2 sm:text-[0.9375rem] lg:pt-5">
							Phone
						</h2>
						<h3 className="mx-auto mb-4 pb-2.5 text-[1.375rem] leading-10 font-bold tracking-[-0.05] text-[#07122C] md:max-w-1/2 md:pb-5 lg:mx-0 lg:text-[1.6875rem]">
							{COMPANY_INFO.telephone}
						</h3>
					</div>
				</section>
			</main>

			{/* Schema markup for SEO */}
			<script {...createSchemaScript(getOrganizationSchema())} />
			<script {...createSchemaScript(getLocalBusinessSchema())} />
			<script
				{...createSchemaScript(
					getWebPageSchema({
						description: CONTACT_PAGE_DESCRIPTION,
						title: CONTACT_PAGE_TITLE,
						url: CONTACT_PAGE_URL,
					}),
				)}
			/>

			<Footer
				desc="Send us an email"
				href={`mailto:${COMPANY_INFO.email}`}
				title="Let's build something if you are convinced"
			/>
		</>
	);
}
