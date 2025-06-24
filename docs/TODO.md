## TODO

### High Priority (Immediate)

- Added BlurHash to images - Implement BlurHash for all images to improve perceived loading speed and user experience
- Properly handle image sizes
- Add GTM - Google Tag Manager - Install Google Tag Manager for better tracking and analytics management
- Add Google Search Console - Verify site ownership and submit sitemap for indexing

### Medium Priority (Short-term)

- Move Maps API from personal to dev-timeless

### Low Priority (Long-term)

- Add Vercel Speed Insights - Install @vercel/speed-insights package and add SpeedInsights component to root layout for Core Web Vitals monitoring (LCP, FID, CLS)
- Add Vercel Analytics - Install @vercel/analytics package and add Analytics component to root layout for user behavior tracking and conversion insights
- Create page-specific OpenGraph images - Design unique 1200x630px images for each page (Home, About, Contact, Process) to improve social media sharing visibility

## DONE

### SEO Improvements

- Enhanced robots.ts - Added /~offline to disallow list and maintains environment-aware configuration
- Improved sitemap.ts - Added priority values (Home: 1.0, Contact: 0.9, About: 0.8, Process: 0.7) and varied changeFrequency
- Verified PWA Configuration - manifest.ts configured, all icons present, service worker via Serwist
- Updated all images with descriptive alt text for better accessibility and SEO
- Added ImageObject schema to portfolio items - Enhanced CreativeWork schema with detailed image metadata for better image search optimization (handles Next.js dynamic image URLs)
- Expand meta descriptions to 150-160 characters - Current descriptions are short; expanded them to use full character limit for better CTR in search results
- Expand internal linking strategy - Added contextual links between related pages and services to improve crawlability and user navigation
- Implement breadcrumb structured data - Added BreadcrumbList schema to all pages (Home, About, Contact, Process) with proper hierarchy for improved SERP display

### Previously Completed

- Added proper sitemap
- Added Schema.org structured data (comprehensive implementation with Organization, LocalBusiness, WebSite, Service, Review, CreativeWork)
- Migrated contact page map to improve performance
- Optimize package exports in nextjs
