# Project Overview

## Purpose

A modern web application built with Next.js and TypeScript, featuring enterprise-grade tooling, strict type safety, and comprehensive development practices. This project provides a robust foundation for scalable, maintainable, and production-ready applications.

## Tech Stack

### Core Framework

- **Next.js** with App Router
- **React** with TypeScript in strict mode
- **TypeScript** with maximum strictness enabled
- **Node.js** (latest LTS versions)

### Styling & UI

- **Tailwind CSS** with PostCSS
- **Ariakit** for accessible components
- Custom icon system with automated SVG builds
- Progressive image loading with optimized strategies

### Build & Development Tools

- **Turbopack** for development (fast builds)
- **Webpack** for production builds
- **pnpm** as package manager
- **Turbo** for monorepo-style task orchestration

### Code Quality & Standards

- **ESLint** with TypeScript strict rules and extensive plugin ecosystem
- **Prettier** with import sorting and multiple formatters
- **Stylelint** for CSS with BEM methodology
- **Husky** + **lint-staged** for Git hooks
- **Commitlint** for conventional commits

### Additional Features

- **PWA Support** with Serwist service worker
- **Error Monitoring** (pre-configured for Sentry integration)
- **Bundle Analysis** with webpack-bundle-analyzer
- **Environment Validation** with Zod schemas
- **Spell Checking** with CSpell
- **Dead Code Detection** with Knip

## Architecture

### High-Level Structure

- **App Router Architecture**: Modern Next.js routing with server components
- **Strict TypeScript**: Maximum type safety with no escape hatches
- **Component Composition**: Reusable, accessible components using Ariakit
- **Utility-First Styling**: Tailwind CSS with custom configuration
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
