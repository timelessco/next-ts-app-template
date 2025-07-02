# Project Overview

## Purpose

This is a **Next.js TypeScript Application Template** designed for building modern, production-ready web applications. It serves as a comprehensive starting point with enterprise-grade tooling, strict type safety, and modern development practices.

## Tech Stack

### Core Framework

- **Next.js 15.3.4** with App Router
- **React 19.1.0** with TypeScript in strict mode
- **TypeScript 5.8.3** with maximum strictness enabled
- **Node.js** ^20.19.0 || ^22.12.0

### Styling & UI

- **TailwindCSS 4.1.10** with PostCSS
- **Ariakit** for accessible components
- Custom icon system with automated SVG builds
- Progressive image loading with Blurhash

### Build & Development Tools

- **Turbopack** for development (fast builds)
- **Webpack** for production builds
- **pnpm** as package manager (v10.12.3)
- **Turbo** for monorepo-style task orchestration

### Code Quality & Standards

- **ESLint** (15+ plugins) with TypeScript strict rules
- **Prettier** with import sorting and multiple formatters
- **Stylelint** for CSS with BEM methodology
- **Husky** + **lint-staged** for Git hooks
- **Commitlint** for conventional commits

### Additional Features

- **PWA Support** with Serwist service worker
- **Sentry Integration** (configured but commented out)
- **Bundle Analysis** with webpack-bundle-analyzer
- **Environment Validation** with Zod schemas
- **Spell Checking** with CSpell
- **Dead Code Detection** with Knip

## Architecture

### High-Level Structure

- **App Router Architecture**: Modern Next.js routing with server components
- **Strict TypeScript**: Maximum type safety with no escape hatches
- **Component Composition**: Reusable, accessible components using Ariakit
- **Utility-First Styling**: TailwindCSS with custom configuration
- **Modular Organization**: Clear separation of concerns across directories

### Key Patterns

- **Type-First Development**: Schema validation with Zod
- **Accessibility-First**: Built-in ARIA support and semantic HTML
- **Performance-Optimized**: Image optimization, service workers, bundle analysis
- **Developer Experience**: Hot reloading, source maps, comprehensive linting
- **Production-Ready**: Environment-specific configurations and optimizations

### Quality Standards

- **Zero `any` Types**: Strict TypeScript with proper type definitions
- **Comprehensive Linting**: Multiple layers of code quality checks
- **Automated Formatting**: Consistent code style with Prettier
- **Test-Ready**: Structure supports TDD patterns
- **Accessibility Compliant**: WCAG guidelines built into components

This template represents a mature, enterprise-grade foundation for building scalable React applications with Next.js, emphasizing developer experience, code quality, and production readiness.
