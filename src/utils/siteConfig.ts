export const SITE_NAME = "Timeless";
export const SITE_DESCRIPTION =
	"We build brands, products and apps with premium design and engineering.";
export const SITE_EMAIL = "hello@timeless.co";
export const SITE_PHONE_NUMBER = "+91 9688888222";
export const SITE_AUTHOR = "Timeless Team";
export const SITE_SOCIAL_MEDIA_LINKS = {
	github: "https://github.com/timelessco",
	twitter: "https://twitter.com/timelessco",
} as const;
export const SITE_SOCIAL_MEDIA_IDS = {
	twitter: "@timelessco",
} as const;

const productionUrl =
	process.env.NEXT_PUBLIC_SITE_URL ??
	`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
const vercelUrl =
	process.env.VERCEL_ENV === "preview" ||
	process.env.VERCEL_ENV === "development"
		? `https://${process.env.VERCEL_BRANCH_URL}`
		: productionUrl;
export const BASE_URL =
	process.env.NODE_ENV === "development"
		? `http://localhost:${process.env.PORT ?? 3000}`
		: vercelUrl;

// Company Information
export const COMPANY_INFO = {
	areaServed: "Worldwide",
	description: SITE_DESCRIPTION,
	email: SITE_EMAIL,
	inLanguage: "en-US",
	legalName: SITE_NAME,
	name: SITE_NAME,
	priceRange: "$$",
	telephone: SITE_PHONE_NUMBER,
} as const;

// Address Information
export const COMPANY_ADDRESS = {
	addressCountry: "IN",
	addressLocality: "Velachery",
	addressRegion: "Tamil Nadu",
	postalCode: "600042",
	streetAddress: "4th Floor, WorkEZ Helix, Velachery Rd",
} as const;

// Geographic Coordinates
export const COMPANY_GEO = {
	latitude: "12.991479",
	longitude: "80.219008",
} as const;

// Business Hours
export const BUSINESS_HOURS = {
	closes: "18:00",
	dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
	opens: "09:00",
} as const;

// Company Logo function
export const GET_COMPANY_LOGO = () =>
	({
		height: "512",
		url: `${BASE_URL}/icon.svg`,
		width: "512",
	}) as const;

// Services Offered
export const SERVICES_OFFERED = [
	"UI/UX Design",
	"Web Development",
	"Mobile App Development",
	"Brand Design",
	"Product Design",
	"Frontend Development",
] as const;

// Service Definitions
export const SERVICE_DEFINITIONS = [
	{
		description: "Premium user interface and user experience design services",
		id: "ui-design",
		name: "UI/UX Design",
		serviceType: "UI/UX Design",
	},
	{
		description: "Frontend and full-stack web development services",
		id: "web-development",
		name: "Web Development",
		serviceType: "Web Development",
	},
	{
		description: "Mobile application development services",
		id: "app-development",
		name: "Mobile App Development",
		serviceType: "Mobile App Development",
	},
] as const;

// Testimonials
export const TESTIMONIALS = [
	{
		authorJobTitle: "CEO",
		authorName: "Ryan McInerney",
		companyName: "Bluematter",
		id: "1",
		reviewText:
			"We've engaged Timeless many times over several years and I have never had anything but the highest quality work done by the most professional people, on time and with excellent communication.",
	},
	{
		authorJobTitle: "Founder & CEO",
		authorName: "Vasanth Kamath",
		companyName: "Smallcase",
		id: "2",
		reviewText:
			"We've engaged Timeless for our product design at smallcase, and have super delighted with the work done. Very smart, professional & flexible. Would love to collaborate again.",
	},
	{
		authorJobTitle: "Marketing Director",
		authorName: "Justin Young",
		companyName: "Slavic401k",
		id: "3",
		reviewText:
			"Timeless delivers the highest quality user experiences on time and on budget. Sandeep's team is second to none!",
	},
	{
		authorJobTitle: "CEO",
		authorName: "Mikael Uusitalo",
		companyName: "Thrillism",
		id: "4",
		reviewText:
			"We have worked with Timeless multiple times over the years and they have always delivered exceptionally well with a keen eye for detail",
	},
	{
		authorJobTitle: "CEO",
		authorName: "Greg Osuri",
		companyName: "Overclock Labs",
		id: "5",
		reviewText:
			"We hired Timeless for helping with our product needs. The result was beyond good and exceeded my exceptions.",
	},
] as const;

// Portfolio Items
export const PORTFOLIO_ITEMS = [
	{
		description: "Rethinking the online payroll experience",
		genre: "Web Application Design",
		id: "atlantic-payroll",
		name: "Atlantic Payroll",
		url: "https://atlanticpayroll.tmls.dev/",
	},
	{
		description: "Stock investing for everyone",
		genre: "Mobile App Design",
		id: "smallcase",
		name: "Smallcase",
		url: "https://smallcase.tmls.dev/",
	},
	{
		description: "Solving America's marketing woes",
		genre: "Web Application Design",
		id: "bluematter",
		name: "Bluematter",
		url: "https://bluematter.tmls.dev/",
	},
	{
		description: "Disrupting the cloud infrastructure",
		genre: "Platform Design",
		id: "photon",
		name: "Photon",
		url: "https://photon.tmls.dev/",
	},
] as const;
