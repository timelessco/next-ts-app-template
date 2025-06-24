# Project Overview

## Purpose

Timeless Co Portfolio - A modern web application showcasing the portfolio of Timeless Co, a company that builds brands, products and apps with premium design and engineering. The site demonstrates their work in UI/UX design, web development, mobile app development, and brand design.

## Tech Stack

- **Language**: TypeScript (v5.8.3) with strict mode
- **Framework**: Next.js 15.3.4 with App Router
- **UI Framework**: React 19.1.0
- **Styling**:
  - Tailwind CSS v4 via @tailwindcss/postcss
  - Custom fonts: Equitan Sans and Lyon Display Web
  - PostCSS for CSS processing
- **State Management**: React state and context (no external state library)
- **Package Manager**: pnpm (v10.12.2)
- **Node Version**: v20.11.0 or v22.0.0
- **Build Tools**: Turbopack for development, Turbo for task orchestration

## Architecture

- **Next.js App Router**: Using the new App Router architecture with `src/app` directory
- **Server Components**: Default to server components with client components marked explicitly
- **Progressive Web App**: Service worker support via Serwist for offline functionality
- **Type Safety**: Full TypeScript with strict mode and comprehensive type checking
- **Environment Validation**: Zod schemas for environment variable validation
- **Modular Structure**: Clear separation between components, UI, utilities, and pages

## Key Features

- Portfolio showcase with case studies
- Contact form with Google Maps integration
- Company information and process pages
- Offline support with PWA capabilities
- Performance optimized with image optimization and lazy loading
- Accessibility focused with proper ARIA attributes
- SEO optimized with structured data and metadata

## Development Philosophy

- TypeScript strict mode for maximum type safety
- Component-based architecture with clear separation of concerns
- Progressive enhancement approach
- Performance and accessibility as core priorities
- Consistent code style enforced through extensive linting setup
