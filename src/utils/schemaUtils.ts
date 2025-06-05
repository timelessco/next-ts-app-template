import type {
	AboutPage,
	CreativeWork,
	GeoCoordinates,
	ImageObject,
	LocalBusiness,
	OpeningHoursSpecification,
	Organization,
	Person,
	PostalAddress,
	Rating,
	Review,
	Service,
	WebPage,
	WebSite,
	WithContext,
} from "schema-dts";

import {
	BASE_URL,
	BUSINESS_HOURS,
	COMPANY_ADDRESS,
	COMPANY_GEO,
	COMPANY_INFO,
	GET_COMPANY_LOGO,
	PORTFOLIO_ITEMS,
	SERVICE_DEFINITIONS,
	SERVICES_OFFERED,
	SITE_DESCRIPTION,
	SITE_SOCIAL_MEDIA_LINKS,
	TESTIMONIALS,
} from "./siteConfig";

// TypeScript interfaces for schema data
export interface CompanyInfo {
	areaServed: string;
	description: string;
	email: string;
	inLanguage: string;
	legalName: string;
	name: string;
	priceRange: string;
	telephone: string;
}

export interface ServiceDefinition {
	description: string;
	id: string;
	name: string;
	serviceType: string;
}

export interface TestimonialData {
	authorJobTitle: string;
	authorName: string;
	companyName: string;
	id: string;
	reviewText: string;
}

export interface PortfolioItem {
	description: string;
	genre: string;
	id: string;
	name: string;
	url: string;
}

export interface SchemaContext {
	description?: string;
	title?: string;
	url?: string;
}

// Schema Context Constants
const SCHEMA_CONTEXT = "https://schema.org" as const;

// Schema ID Helpers
const getSchemaId = (identifier: string) => `${BASE_URL}/#${identifier}`;
const getOrganizationId = () => getSchemaId("organization");
const getWebsiteId = () => getSchemaId("website");
const getLocalBusinessId = () => getSchemaId("localbusiness");

/**
 * Generic organization schema generator
 * @param {CompanyInfo} config - Company information configuration
 * @param {PostalAddress} address - Company postal address
 * @param {GeoCoordinates} [geo] - Geographic coordinates (optional)
 * @param {ImageObject} [logo] - Company logo (optional)
 * @param {string[]} [services] - Array of services offered
 * @param {string[]} [socialLinks] - Array of social media links
 * @returns {WithContext<Organization>} Organization schema object for JSON-LD
 */
export function createOrganizationSchema(
	config: CompanyInfo,
	address: PostalAddress,
	geo?: GeoCoordinates,
	logo?: ImageObject,
	services?: readonly string[],
	socialLinks?: readonly string[],
): WithContext<Organization & { geo?: GeoCoordinates }> {
	return {
		"@context": SCHEMA_CONTEXT,
		"@id": getOrganizationId(),
		"@type": "Organization",
		address,
		areaServed: config.areaServed,
		description: config.description,
		email: config.email,
		...(geo && { geo }),
		...(services && { knowsAbout: services }),
		legalName: config.legalName,
		...(logo && { logo }),
		name: config.name,
		...(socialLinks && { sameAs: socialLinks }),
		telephone: config.telephone,
		url: BASE_URL,
	};
}

/**
 * Generic LocalBusiness schema generator
 * @param {CompanyInfo} config - Company information configuration
 * @param {PostalAddress} address - Company postal address
 * @param {GeoCoordinates} geo - Geographic coordinates
 * @param {OpeningHoursSpecification} hours - Business hours specification
 * @returns {WithContext<LocalBusiness>} LocalBusiness schema object for JSON-LD
 */
export function createLocalBusinessSchema(
	config: CompanyInfo,
	address: PostalAddress,
	geo: GeoCoordinates,
	hours: OpeningHoursSpecification,
): WithContext<LocalBusiness> {
	return {
		"@context": SCHEMA_CONTEXT,
		"@id": getLocalBusinessId(),
		"@type": "LocalBusiness",
		address,
		email: config.email,
		geo,
		name: config.name,
		openingHoursSpecification: hours,
		priceRange: config.priceRange,
		telephone: config.telephone,
		url: BASE_URL,
	};
}

/**
 * Generic Website schema generator
 * @param {CompanyInfo} config - Company information configuration
 * @returns {WithContext<WebSite>} WebSite schema object for JSON-LD
 */
export function createWebsiteSchema(config: CompanyInfo): WithContext<WebSite> {
	return {
		"@context": SCHEMA_CONTEXT,
		"@id": getWebsiteId(),
		"@type": "WebSite",
		description: config.description,
		inLanguage: config.inLanguage,
		name: config.name,
		publisher: {
			"@id": getOrganizationId(),
		},
		url: BASE_URL,
	};
}

/**
 * Generic WebPage schema generator
 * @param {SchemaContext} context - Schema context with page-specific information
 * @param {CompanyInfo} config - Company information configuration
 * @returns {WithContext<WebPage>} WebPage schema object for JSON-LD
 */
export function createWebPageSchema(
	context: SchemaContext,
	config: CompanyInfo,
): WithContext<WebPage> {
	const {
		description = SITE_DESCRIPTION,
		title = config.name,
		url = BASE_URL,
	} = context;

	const primaryImage: ImageObject = {
		"@type": "ImageObject",
		url: `${BASE_URL}/opengraph-image.jpg`,
	};

	return {
		"@context": SCHEMA_CONTEXT,
		"@id": `${url}/#webpage`,
		"@type": "WebPage",
		about: {
			"@id": getOrganizationId(),
		},
		description,
		inLanguage: config.inLanguage,
		isPartOf: {
			"@id": getWebsiteId(),
		},
		name: title,
		primaryImageOfPage: primaryImage,
		url,
	};
}

/**
 * Generic Service schema generator
 * @param {ServiceDefinition[]} services - Array of service definitions
 * @param {CompanyInfo} config - Company information configuration
 * @returns {WithContext<Service>[]} Array of Service schema objects for JSON-LD
 */
export function createServiceSchema(
	services: readonly ServiceDefinition[],
	config: CompanyInfo,
): Array<WithContext<Service>> {
	return services.map((service) => ({
		"@context": SCHEMA_CONTEXT,
		"@id": getSchemaId(`service-${service.id}`),
		"@type": "Service",
		areaServed: config.areaServed,
		description: service.description,
		name: service.name,
		provider: {
			"@id": getOrganizationId(),
		},
		serviceType: service.serviceType,
	}));
}

/**
 * Generic Review schema generator
 * @param {TestimonialData[]} reviewData - Array of testimonial data
 * @returns {WithContext<Review>[]} Array of Review schema objects for JSON-LD
 */
export function createReviewSchema(
	reviewData: readonly TestimonialData[],
): Array<WithContext<Review>> {
	const createReview = (testimonial: TestimonialData): WithContext<Review> => {
		const author: Person = {
			"@type": "Person",
			jobTitle: testimonial.authorJobTitle,
			name: testimonial.authorName,
			worksFor: {
				"@type": "Organization",
				name: testimonial.companyName,
			},
		};

		const rating: Rating = {
			"@type": "Rating",
			bestRating: 5,
			ratingValue: 5,
		};

		return {
			"@context": SCHEMA_CONTEXT,
			"@id": getSchemaId(`review-${testimonial.id}`),
			"@type": "Review",
			author,
			itemReviewed: {
				"@id": getOrganizationId(),
			},
			reviewBody: testimonial.reviewText,
			reviewRating: rating,
		};
	};

	return reviewData.map((testimonial) => createReview(testimonial));
}

/**
 * Generic CreativeWork schema generator
 * @param {PortfolioItem[]} items - Array of portfolio/creative work items
 * @returns {WithContext<CreativeWork>[]} Array of CreativeWork schema objects for JSON-LD
 */
export function createCreativeWorkSchema(
	items: readonly PortfolioItem[],
): Array<WithContext<CreativeWork>> {
	const createWork = (item: PortfolioItem): WithContext<CreativeWork> => ({
		"@context": SCHEMA_CONTEXT,
		"@id": getSchemaId(`work-${item.id}`),
		"@type": "CreativeWork",
		creator: {
			"@id": getOrganizationId(),
		},
		description: item.description,
		genre: item.genre,
		name: item.name,
		url: item.url,
	});

	return items.map((item) => createWork(item));
}

/**
 * Generic AboutPage schema generator
 * @param {string} description - About page description
 * @param {string} title - About page title
 * @returns {WithContext<AboutPage>} AboutPage schema object for JSON-LD
 */
export function createAboutPageSchema(
	description: string,
	title: string,
): WithContext<AboutPage> {
	return {
		"@context": SCHEMA_CONTEXT,
		"@id": `${BASE_URL}/about/#aboutpage`,
		"@type": "AboutPage",
		description,
		isPartOf: {
			"@id": getWebsiteId(),
		},
		mainEntity: {
			"@id": getOrganizationId(),
		},
		name: title,
		url: `${BASE_URL}/about`,
	};
}

// Convenience functions that use the imported data from siteConfig
/**
 * Organization schema using site configuration
 * @returns {WithContext<Organization>} Organization schema object for JSON-LD
 */
export function getOrganizationSchema(): WithContext<
	Organization & { geo?: GeoCoordinates }
> {
	const companyAddress: PostalAddress = {
		"@type": "PostalAddress",
		...COMPANY_ADDRESS,
	};

	const companyGeo: GeoCoordinates = {
		"@type": "GeoCoordinates",
		...COMPANY_GEO,
	};

	const companyLogo: ImageObject = {
		"@type": "ImageObject",
		...GET_COMPANY_LOGO(),
	};

	return createOrganizationSchema(
		COMPANY_INFO,
		companyAddress,
		companyGeo,
		companyLogo,
		SERVICES_OFFERED,
		Object.values(SITE_SOCIAL_MEDIA_LINKS) as readonly string[],
	);
}

/**
 * LocalBusiness schema using site configuration
 * @returns {WithContext<LocalBusiness>} LocalBusiness schema object for JSON-LD
 */
export function getLocalBusinessSchema(): WithContext<LocalBusiness> {
	const companyAddress: PostalAddress = {
		"@type": "PostalAddress",
		...COMPANY_ADDRESS,
	};

	const companyGeo: GeoCoordinates = {
		"@type": "GeoCoordinates",
		...COMPANY_GEO,
	};

	const businessHours: OpeningHoursSpecification = {
		"@type": "OpeningHoursSpecification",
		...BUSINESS_HOURS,
	};

	return createLocalBusinessSchema(
		COMPANY_INFO,
		companyAddress,
		companyGeo,
		businessHours,
	);
}

/**
 * Website schema using site configuration
 * @returns {WithContext<WebSite>} WebSite schema object for JSON-LD
 */
export function getWebsiteSchema(): WithContext<WebSite> {
	return createWebsiteSchema(COMPANY_INFO);
}

/**
 * WebPage schema using site configuration
 * @param {SchemaContext} context - Schema context with page-specific information
 * @returns {WithContext<WebPage>} WebPage schema object for JSON-LD
 */
export function getWebPageSchema(context: SchemaContext): WithContext<WebPage> {
	return createWebPageSchema(context, COMPANY_INFO);
}

/**
 * Service schema using site configuration
 * @returns {WithContext<Service>[]} Array of Service schema objects for JSON-LD
 */
export function getServiceSchema(): Array<WithContext<Service>> {
	return createServiceSchema(SERVICE_DEFINITIONS, COMPANY_INFO);
}

/**
 * Review schema using site configuration
 * @returns {WithContext<Review>[]} Array of Review schema objects for JSON-LD
 */
export function getReviewSchema(): Array<WithContext<Review>> {
	return createReviewSchema(TESTIMONIALS);
}

/**
 * CreativeWork schema using site configuration
 * @returns {WithContext<CreativeWork>[]} Array of CreativeWork schema objects for JSON-LD
 */
export function getCreativeWorkSchema(): Array<WithContext<CreativeWork>> {
	return createCreativeWorkSchema(PORTFOLIO_ITEMS);
}

/**
 * AboutPage schema using site configuration
 * @returns {WithContext<AboutPage>} AboutPage schema object for JSON-LD
 */
export function getAboutPageSchema(): WithContext<AboutPage> {
	return createAboutPageSchema(
		"Solving business problems with user-centric design.",
		"About Us | " + COMPANY_INFO.name,
	);
}

/**
 * Generic function to create script tag with JSON-LD following Next.js best practices
 * @param {WithContext<any> | WithContext<any>[]} schema - Schema object or array of schema objects
 * @returns {object} Script element props with JSON-LD content and XSS protection
 */
export function createSchemaScript(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
	schema: Array<WithContext<any>> | WithContext<any>,
): { dangerouslySetInnerHTML: { __html: string }; type: string } {
	return {
		dangerouslySetInnerHTML: {
			// XSS protection: replace < with \u003c as recommended by Next.js
			// https://nextjs.org/docs/app/guides/json-ld
			__html: JSON.stringify(schema).replaceAll("<", String.raw`\u003c`),
		},
		type: "application/ld+json",
	};
}
