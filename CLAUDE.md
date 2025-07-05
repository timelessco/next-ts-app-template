# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ! EXTREMELY IMPORTANT

### Code Quality Checks

**ALWAYS run the following commands before completing any task:**

1. Automatically use the IDE's built-in diagnostics tool to check for linting and type errors:

- Run `mcp__ide__getDiagnostics` to check all files for diagnostics
- Fix any linting or type errors before considering the task complete
- Do this for any file you create or modify

This is a CRITICAL step that must NEVER be skipped when working on any code-related task

### File Size Limits

- **Maximum 250 lines per file** - If a file exceeds this limit:
  - Extract large sections into separate component files
  - Move related functionality into dedicated modules
  - Split complex components into smaller, focused components
- This ensures maintainability and better code organization

### Command Reminders

- **Always remember to use `trash` command for removing file instead of `rm`, `trash` is available in the terminal**

## Development Commands

### Core Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm build:start` - Build and start production server

### Code Quality & Linting

- `pnpm lint` - Run all linters (Prettier, ESLint, TypeScript, Knip, Markdown, Spell check, CSS)
- `pnpm lint:types` - TypeScript type checking
- `pnpm lint:eslint` - ESLint linting
- `pnpm lint:prettier` - Prettier formatting check
- `pnpm fix` - Auto-fix ESLint issues
- `pnpm fix:prettier` - Auto-format with Prettier

### Testing & Analysis

- `pnpm build:analyze` - Bundle analysis with webpack-bundle-analyzer
- `pnpm build:sourcemap` - Build with source maps and analysis
- `pnpm lint:knip` - Check for unused dependencies, exports, and types

### Maintenance

- `pnpm clean` - Clean build artifacts and caches
- `pnpm check:update` - Interactive dependency updates
- `pnpm check:packages` - Check for duplicate packages

## Architecture Overview

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19 with TypeScript in strict mode
- **Styling**: TailwindCSS 4 with PostCSS
- **Build Tool**: Turbopack (development), Webpack (production)
- **Package Manager**: pnpm
- **PWA**: Serwist service worker
- **Error Tracking**: Sentry (configured but commented out)
- **Development Tools**: Turbo monorepo tooling

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components
- `src/ui/` - Root-level UI components (Providers, TailwindIndicator)
- `src/utils/` - Utility functions and configurations
- `src/styles/` - Global styles and font configurations
- `src/icons/` - SVG icon system with automated builds
- `scripts/` - Build scripts and automation tools

### Key Configurations

- **TypeScript**: Strict mode enabled with path aliases (@/components/_, @/utils/_, etc.)
- **ESLint**: Comprehensive setup with React, TypeScript, accessibility, and Next.js rules
- **Build**: Turbopack for development, configurable Sentry and bundle analysis
- **PWA**: Service worker disabled in development/local, enabled in production

### Development Patterns

- Uses App Router with TypeScript strict mode
- Path aliases for clean imports (@/components/, @/utils/, etc.)
- Automated icon building system
- Comprehensive linting with Turbo pipeline orchestration
- Environment-specific configurations (development vs production)

### Environment Variables

Required environment variables are validated at build time unless `SKIP_ENV_VALIDATION=true`.

### Code Quality Tools

The project uses a comprehensive toolchain:

- ESLint with React, TypeScript, and accessibility rules
- Prettier for code formatting
- Stylelint for CSS
- Markdownlint for documentation
- CSpell for spell checking
- Knip for dead code elimination
- Commitlint for conventional commits

## Project Documentation

Important documentation files are maintained in the `docs/` directory. When starting work on this project, please load these memory files:

- **`docs/project_overview.md`** - Project purpose, tech stack, and architecture
- **`docs/suggested_commands.md`** - All development commands organized by category
- **`docs/code_style_conventions.md`** - TypeScript, React, and styling standards
- **`docs/frontend_rules.md`** - Comprehensive accessibility and frontend code quality rules
- **`docs/task_completion_checklist.md`** - Quality gates and completion requirements
- **`docs/project_structure.md`** - Directory layout and key files explanation

These files contain essential information for understanding and working with the codebase effectively.
