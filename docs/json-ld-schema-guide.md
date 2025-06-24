# JSON-LD Schema Implementation Guide

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [Implementation Patterns](#implementation-patterns)
- [Best Practices](#best-practices)
- [Common Schema Types](#common-schema-types)
- [Quick Reference](#quick-reference)
- [Code Examples](#code-examples)
- [Testing and Validation](#testing-and-validation)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

## Overview

JSON-LD (JavaScript Object Notation for Linked Data) is a method for encoding structured data using JSON syntax. When implemented correctly, it helps search engines understand your content better, potentially improving SEO and enabling rich snippets in search results.

### What You'll Learn

- How to implement JSON-LD schemas in Next.js applications
- Best practices for type-safe schema implementation using TypeScript
- Common schema patterns for business websites
- Security considerations and XSS prevention
- Testing and validation techniques

### Prerequisites

- Basic understanding of JSON and TypeScript
- Familiarity with Next.js App Router
- Knowledge of React components and props

## Getting Started

### Installation

First, install the required dependencies:

```bash
npm install schema-dts
# or
pnpm add schema-dts
# or
yarn add schema-dts
```

### Basic Setup

Create a schema utilities file to centralize your JSON-LD logic:

```typescript
// utils/schemaUtils.ts

import type { Organization, WithContext } from "schema-dts";

export function createSchemaScript(
	schema: WithContext<any> | WithContext<any>[],
): { type: string; dangerouslySetInnerHTML: { __html: string } } {
	return {
		type: "application/ld+json",
		dangerouslySetInnerHTML: {
			// XSS protection: replace < with \u003c as recommended by Next.js
			__html: JSON.stringify(schema).replace(/</g, "\\u003c"),
		},
	};
}
```

## Core Concepts

### Schema.org Vocabulary

Schema.org provides a collection of shared vocabularies that webmasters can use to mark up their pages. The most common types include:

- **Organization**: Company or business information
- **LocalBusiness**: Physical business with location details
- **WebSite**: Website-level information
- **WebPage**: Individual page information
- **Service**: Services offered by a business
- **Review**: Customer testimonials and reviews
- **CreativeWork**: Portfolio items, articles, or creative content

### WithContext Type

The `WithContext` type from schema-dts ensures your schemas include the required `@context` field:

```typescript
import type { Organization, WithContext } from "schema-dts";

const organizationSchema: WithContext<Organization> = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Example Company",
	// ... other properties
};
```

### Schema IDs and References

Use unique IDs to create relationships between different schema objects:

```typescript
const SCHEMA_IDS = {
	organization: "#organization",
	website: "#website",
	webpage: "#webpage",
} as const;

// Reference from one schema to another
const websiteSchema: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${siteUrl}/${SCHEMA_IDS.website}`,
	publisher: {
		"@id": `${siteUrl}/${SCHEMA_IDS.organization}`,
	},
};
```

## Implementation Patterns

### 1. Constants-Based Approach

Extract reusable information into constants to maintain consistency:

```typescript
// Schema constants
const SCHEMA_CONTEXT = "https://schema.org" as const;

const COMPANY_INFO = {
	name: "Example Company",
	description: "We create amazing products and services.",
	email: "contact@example.com",
	telephone: "+1-555-0123",
} as const;

const COMPANY_ADDRESS = {
	"@type": "PostalAddress" as const,
	addressCountry: "US",
	addressLocality: "San Francisco",
	addressRegion: "CA",
	postalCode: "94105",
	streetAddress: "123 Main Street",
} satisfies PostalAddress;
```

### 2. Helper Functions

Create utility functions for common schema patterns:

```typescript
const getSchemaId = (identifier: string) => `${BASE_URL}/#${identifier}`;

const createService = (
	id: string,
	name: string,
	description: string,
): WithContext<Service> => ({
	"@context": SCHEMA_CONTEXT,
	"@id": getSchemaId(`service-${id}`),
	"@type": "Service",
	name,
	description,
	provider: { "@id": getSchemaId("organization") },
});
```

### 3. Data-Driven Schemas

Use arrays and mapping functions for repetitive content:

```typescript
const services = [
	{ id: "web-dev", name: "Web Development", description: "..." },
	{ id: "design", name: "UI/UX Design", description: "..." },
];

export function getServiceSchemas(): WithContext<Service>[] {
	return services.map((service) =>
		createService(service.id, service.name, service.description),
	);
}
```

## Best Practices

### Security Considerations

Always sanitize JSON-LD content to prevent XSS attacks:

```typescript
export function createSchemaScript(schema: WithContext<any>) {
	return {
		type: "application/ld+json",
		dangerouslySetInnerHTML: {
			// Replace < with \u003c to prevent XSS
			__html: JSON.stringify(schema).replace(/</g, "\\u003c"),
		},
	};
}
```

### TypeScript Integration

Leverage schema-dts for type safety:

```typescript
import type {
	GeoCoordinates,
	Organization,
	PostalAddress,
	WithContext,
} from "schema-dts";

// Type-safe schema construction
const address: PostalAddress = {
	"@type": "PostalAddress",
	addressCountry: "US", // TypeScript will validate this
	// ... other properties
};
```

### Performance Optimization

1. **Minimize Schema Size**: Only include necessary properties
2. **Reuse Objects**: Share common objects like addresses across schemas
3. **Lazy Loading**: Generate schemas only when needed

### SEO Best Practices

1. **Consistent Information**: Ensure schema data matches visible page content
2. **Complete Schemas**: Include all required properties for your schema type
3. **Proper Relationships**: Use `@id` references to link related schemas
4. **Relevant Types**: Choose the most specific schema type that applies

## Common Schema Types

### Organization Schema

```typescript
export function getOrganizationSchema(): WithContext<Organization> {
	return {
		"@context": "https://schema.org",
		"@id": getSchemaId("organization"),
		"@type": "Organization",
		name: COMPANY_INFO.name,
		description: COMPANY_INFO.description,
		email: COMPANY_INFO.email,
		telephone: COMPANY_INFO.telephone,
		address: COMPANY_ADDRESS,
		logo: {
			"@type": "ImageObject",
			url: `${BASE_URL}/logo.png`,
			width: "512",
			height: "512",
		},
		sameAs: [
			"https://twitter.com/company",
			"https://linkedin.com/company/company",
		],
	};
}
```

### LocalBusiness Schema

```typescript
export function getLocalBusinessSchema(): WithContext<LocalBusiness> {
	return {
		"@context": "https://schema.org",
		"@id": getSchemaId("localbusiness"),
		"@type": "LocalBusiness",
		name: COMPANY_INFO.name,
		address: COMPANY_ADDRESS,
		geo: {
			"@type": "GeoCoordinates",
			latitude: "37.7749",
			longitude: "-122.4194",
		},
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "09:00",
			closes: "17:00",
		},
		priceRange: "$$",
	};
}
```

### WebPage Schema

```typescript
interface PageContext {
	title: string;
	description: string;
	url: string;
}

export function getWebPageSchema(context: PageContext): WithContext<WebPage> {
	return {
		"@context": "https://schema.org",
		"@id": `${context.url}#webpage`,
		"@type": "WebPage",
		name: context.title,
		description: context.description,
		url: context.url,
		isPartOf: { "@id": getSchemaId("website") },
		about: { "@id": getSchemaId("organization") },
		primaryImageOfPage: {
			"@type": "ImageObject",
			url: `${BASE_URL}/og-image.jpg`,
		},
	};
}
```

### Review Schema

```typescript
interface ReviewData {
	id: string;
	author: string;
	rating: number;
	text: string;
	company?: string;
}

export function createReviewSchema(review: ReviewData): WithContext<Review> {
	return {
		"@context": "https://schema.org",
		"@id": getSchemaId(`review-${review.id}`),
		"@type": "Review",
		author: {
			"@type": "Person",
			name: review.author,
			...(review.company && {
				worksFor: {
					"@type": "Organization",
					name: review.company,
				},
			}),
		},
		reviewRating: {
			"@type": "Rating",
			ratingValue: review.rating,
			bestRating: 5,
		},
		reviewBody: review.text,
		itemReviewed: { "@id": getSchemaId("organization") },
	};
}
```

## Testing and Validation

### Development Testing

1. **Rich Results Test**: Use Google's [Rich Results Test](https://search.google.com/test/rich-results)
2. **Schema Markup Validator**: Use the [Schema.org validator](https://validator.schema.org/)
3. **JSON-LD Playground**: Test at [json-ld.org/playground](https://json-ld.org/playground/)

### Automated Testing

```typescript
// Example test using Jest
describe("Schema Generation", () => {
	it("should generate valid organization schema", () => {
		const schema = getOrganizationSchema();

		expect(schema["@context"]).toBe("https://schema.org");
		expect(schema["@type"]).toBe("Organization");
		expect(schema.name).toBeDefined();
		expect(schema.address).toBeDefined();
	});

	it("should include required properties", () => {
		const schema = getOrganizationSchema();
		const requiredProps = ["@context", "@type", "name"];

		requiredProps.forEach((prop) => {
			expect(schema).toHaveProperty(prop);
		});
	});
});
```

### Runtime Validation

```typescript
function validateSchema(schema: any): boolean {
	const required = ["@context", "@type"];
	return required.every((prop) => prop in schema);
}

export function createSchemaScript(schema: WithContext<any>) {
	if (!validateSchema(schema)) {
		console.warn("Invalid schema detected:", schema);
	}

	return {
		type: "application/ld+json",
		dangerouslySetInnerHTML: {
			__html: JSON.stringify(schema).replace(/</g, "\\u003c"),
		},
	};
}
```

## Troubleshooting

### Common Issues

#### Schema Not Appearing in Search Results

**Problem**: Your JSON-LD is valid but not showing in search results.

**Solutions**:

- Ensure schema data matches visible page content
- Wait for Google to re-crawl your pages (can take weeks)
- Check Google Search Console for schema errors
- Verify you're using the most specific schema type

#### TypeScript Errors with schema-dts

**Problem**: Type errors when creating schema objects.

**Solutions**:

```typescript
// Use type assertions for complex schemas
const organization = {
	"@context": "https://schema.org",
	"@type": "Organization" as const,
	// ... properties
} satisfies WithContext<Organization>;

// Or extend types for custom properties
type ExtendedOrganization = Organization & {
	customProperty?: string;
};
```

#### XSS Vulnerabilities

**Problem**: User input in schemas could cause XSS attacks.

**Solution**:

```typescript
function sanitizeForSchema(input: string): string {
	return input
		.replace(/</g, "\\u003c")
		.replace(/>/g, "\\u003e")
		.replace(/"/g, '\\"');
}
```

### Debugging Tips

1. **Check JSON Validity**: Use `JSON.parse()` to verify your generated JSON
2. **Validate Required Properties**: Each schema type has required fields
3. **Test Incremental Changes**: Add schemas one at a time to isolate issues
4. **Monitor Search Console**: Watch for schema-related errors in GSC

## Resources

### Official Documentation

- [Schema.org](https://schema.org/) - Official schema vocabulary
- [JSON-LD Specification](https://www.w3.org/TR/json-ld11/) - W3C standard
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Next.js specific implementation

### Tools and Validators

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [JSON-LD Playground](https://json-ld.org/playground/)
- [Google Search Console](https://search.google.com/search-console/)

### TypeScript Resources

- [schema-dts npm package](https://www.npmjs.com/package/schema-dts)
- [schema-dts GitHub repository](https://github.com/google/schema-dts)

### SEO and Best Practices

- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731)

## Quick Reference

### Essential TypeScript Imports

```typescript
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
```

### Base Script Creator

```typescript
export function createSchemaScript(
	schema: WithContext<any> | WithContext<any>[],
): { type: string; dangerouslySetInnerHTML: { __html: string } } {
	return {
		type: "application/ld+json",
		dangerouslySetInnerHTML: {
			__html: JSON.stringify(schema).replace(/</g, "\\u003c"),
		},
	};
}
```

### Common Schema Patterns

#### Constants Pattern

```typescript
const SCHEMA_CONTEXT = "https://schema.org" as const;

const COMPANY_INFO = {
	name: "Company Name",
	description: "Company description",
	email: "contact@company.com",
	telephone: "+1-555-0123",
} as const;

const COMPANY_ADDRESS = {
	"@type": "PostalAddress" as const,
	streetAddress: "123 Main St",
	addressLocality: "City",
	addressRegion: "State",
	postalCode: "12345",
	addressCountry: "US",
} satisfies PostalAddress;
```

#### Helper Functions Pattern

```typescript
const getSchemaId = (identifier: string) => `#${identifier}`;
const getOrganizationId = () => getSchemaId("organization");

const createService = (
	id: string,
	name: string,
	description: string,
): WithContext<Service> => ({
	"@context": SCHEMA_CONTEXT,
	"@id": getSchemaId(`service-${id}`),
	"@type": "Service",
	name,
	description,
	provider: { "@id": getOrganizationId() },
});
```

#### Data-Driven Pattern

```typescript
const SERVICE_DEFINITIONS = [
	{
		id: "web-dev",
		name: "Web Development",
		description: "Custom web applications",
	},
	{ id: "design", name: "UI/UX Design", description: "User interface design" },
] as const;

export function getServiceSchemas(): WithContext<Service>[] {
	return SERVICE_DEFINITIONS.map((service) =>
		createService(service.id, service.name, service.description),
	);
}
```

### Schema Type Quick Reference

| Schema Type   | Use Case          | Required Properties             | Placement      |
| ------------- | ----------------- | ------------------------------- | -------------- |
| Organization  | Company info      | `@type`, `name`                 | Site-wide      |
| LocalBusiness | Physical business | `@type`, `name`, `address`      | Contact page   |
| WebSite       | Website info      | `@type`, `name`, `url`          | Root layout    |
| WebPage       | Page info         | `@type`, `name`, `url`          | Each page      |
| Service       | Business services | `@type`, `name`, `provider`     | Services page  |
| Review        | Testimonials      | `@type`, `author`, `reviewBody` | Home page      |
| CreativeWork  | Portfolio items   | `@type`, `name`, `creator`      | Portfolio page |
| AboutPage     | About page        | `@type`, `mainEntity`           | About page     |

## Code Examples

### Next.js Implementation Examples

#### Basic Page with Schema

```typescript
// app/page.tsx
import { createSchemaScript, getOrganizationSchema } from "@/utils/schemaUtils";

export default function HomePage() {
  return (
    <>
      <main>
        {/* Page content */}
      </main>

      <script {...createSchemaScript(getOrganizationSchema())} />
    </>
  );
}
```

#### Multiple Schemas on One Page

```typescript
// app/about/page.tsx
import {
  createSchemaScript,
  getOrganizationSchema,
  getAboutPageSchema,
  getWebPageSchema,
} from "@/utils/schemaUtils";

export default function AboutPage() {
  return (
    <>
      <main>
        {/* Page content */}
      </main>

      <script {...createSchemaScript(getOrganizationSchema())} />
      <script {...createSchemaScript(getAboutPageSchema())} />
      <script {...createSchemaScript(getWebPageSchema({
        title: "About Us",
        description: "Learn about our company",
        url: "https://website.com/about",
      }))} />
    </>
  );
}
```

#### Dynamic Schema Generation

```typescript
interface BlogPost {
	title: string;
	content: string;
	author: string;
	publishedAt: Date;
}

function createBlogPostSchema(post: BlogPost): WithContext<any> {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		articleBody: post.content,
		author: {
			"@type": "Person",
			name: post.author,
		},
		datePublished: post.publishedAt.toISOString(),
		publisher: { "@id": "#organization" },
	};
}
```

### Complete Schema Examples

#### Organization Schema Example

```typescript
export function getOrganizationSchema(): WithContext<
	Organization & { geo?: GeoCoordinates }
> {
	return {
		"@context": "https://schema.org",
		"@id": "#organization",
		"@type": "Organization",
		name: "Company Name",
		legalName: "Company Legal Name LLC",
		description: "Brief company description",
		email: "contact@company.com",
		telephone: "+1-555-0123",
		url: "https://company.com",
		address: {
			"@type": "PostalAddress",
			streetAddress: "123 Main St",
			addressLocality: "City",
			addressRegion: "State",
			postalCode: "12345",
			addressCountry: "US",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: "40.7128",
			longitude: "-74.0060",
		},
		logo: {
			"@type": "ImageObject",
			url: "https://company.com/logo.png",
			width: "512",
			height: "512",
		},
		sameAs: [
			"https://twitter.com/company",
			"https://linkedin.com/company/company",
		],
	};
}
```

#### LocalBusiness Schema Example

```typescript
export function getLocalBusinessSchema(): WithContext<LocalBusiness> {
	return {
		"@context": "https://schema.org",
		"@id": "#localbusiness",
		"@type": "LocalBusiness",
		name: "Business Name",
		address: {
			"@type": "PostalAddress",
			streetAddress: "123 Business St",
			addressLocality: "City",
			addressRegion: "State",
			postalCode: "12345",
			addressCountry: "US",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: "40.7128",
			longitude: "-74.0060",
		},
		telephone: "+1-555-0123",
		email: "contact@business.com",
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "09:00",
			closes: "17:00",
		},
		priceRange: "$$",
	};
}
```

#### Review Schema Example

```typescript
interface ReviewData {
	id: string;
	author: string;
	rating: number;
	text: string;
	company?: string;
}

export function createReviewSchema(review: ReviewData): WithContext<Review> {
	return {
		"@context": "https://schema.org",
		"@id": `#review-${review.id}`,
		"@type": "Review",
		author: {
			"@type": "Person",
			name: review.author,
			...(review.company && {
				worksFor: {
					"@type": "Organization",
					name: review.company,
				},
			}),
		},
		reviewRating: {
			"@type": "Rating",
			ratingValue: review.rating,
			bestRating: 5,
		},
		reviewBody: review.text,
		itemReviewed: { "@id": "#organization" },
	};
}
```

### Validation Examples

#### Runtime Validation Functions

```typescript
function validateRequiredFields<T extends Record<string, any>>(
	schema: T,
	required: (keyof T)[],
): boolean {
	return required.every((field) => field in schema && schema[field] != null);
}

function validateSchemaInDevelopment(schema: any): void {
	if (process.env.NODE_ENV === "development") {
		const required = ["@context", "@type"];
		if (!validateRequiredFields(schema, required)) {
			console.warn("Invalid schema structure:", schema);
		}
	}
}
```

#### Type Guards

```typescript
function isValidSchema(obj: any): obj is WithContext<any> {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"@context" in obj &&
		"@type" in obj &&
		obj["@context"] === "https://schema.org"
	);
}
```

### Quick Implementation Checklist

#### Setup Checklist

- [ ] Install `schema-dts` package
- [ ] Create schema utility functions
- [ ] Implement XSS protection in script creation
- [ ] Use TypeScript types for validation
- [ ] Extract constants for reusable data

#### Implementation Checklist

- [ ] Add schemas to appropriate pages
- [ ] Test with Google Rich Results Test
- [ ] Validate with Schema.org validator
- [ ] Monitor Google Search Console for errors
- [ ] Ensure schema data matches page content

#### Schema-Specific Checklists

**Organization Schema:**

- [ ] Include required `name` property
- [ ] Add contact information (`email`, `telephone`)
- [ ] Include business address
- [ ] Add logo with proper dimensions
- [ ] Include social media links in `sameAs`

**LocalBusiness Schema:**

- [ ] Include geographic coordinates
- [ ] Add opening hours specification
- [ ] Include price range if applicable
- [ ] Ensure address is complete and accurate

**WebPage Schema:**

- [ ] Match page title and description
- [ ] Include proper page URL
- [ ] Link to website and organization schemas
- [ ] Add primary image if available

## Conclusion

Implementing JSON-LD schemas effectively requires careful planning, type safety, and adherence to best practices. By following the patterns and guidelines in this documentation, you can create robust, maintainable schema implementations that improve your site's SEO and enable rich search results.

Remember to:

- Keep schemas up-to-date with page content
- Test regularly using validation tools
- Monitor search console for issues
- Follow security best practices
- Use TypeScript for better development experience

For questions or updates to this documentation, please refer to your team's documentation guidelines and review process.
