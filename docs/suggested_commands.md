# Suggested Commands

## Development Commands

- `pnpm dev` - Start development server with Turbopack (<http://localhost:3000>)
- `pnpm dev:sourcemap` - Start dev server with source maps enabled
- `pnpm build:local` - Local build with Turbopack

## Build Commands

- `pnpm build` - Production build
- `pnpm start` - Start production server
- `pnpm build:start` - Build and start production server
- `pnpm build:analyze` - Build with bundle analyzer
- `pnpm build:sourcemap` - Build with source maps and analyze bundle
- `pnpm build:ci` - CI build (skips env validation)
- `pnpm build:icons` - Build SVG icon sprite from /src/icons/svg

## Linting & Code Quality

### Run All Checks

- `pnpm lint` - Run all linting checks (uses Turbo)
- `pnpm fix` - Auto-fix all linting issues

### Individual Linters

- `pnpm lint:eslint` - Run ESLint
- `pnpm fix:eslint` - Auto-fix ESLint issues
- `pnpm lint:prettier` - Check code formatting
- `pnpm fix:prettier` - Auto-fix formatting
- `pnpm lint:types` - TypeScript type checking
- `pnpm lint:css` - Stylelint for CSS files
- `pnpm fix:css` - Auto-fix CSS issues
- `pnpm lint:spelling` - Spell check with cspell
- `pnpm fix:spelling` - Update cspell dictionary
- `pnpm lint:md` - Markdown linting
- `pnpm fix:md` - Auto-fix markdown issues
- `pnpm lint:knip` - Check for unused dependencies/exports

## Dependency Management

- `pnpm install` - Install dependencies
- `pnpm check:packages` - Check for duplicate packages
- `pnpm check:update` - Interactive dependency updates
- `pnpm check:engine` - Check Node/pnpm versions

## Git & Release

- `pnpm release` - Interactive release process
- `pnpm contributors:add` - Add contributor
- `pnpm contributors:generate` - Update contributors list

## Utilities

- `pnpm clean` - Clean build artifacts and caches
- `pnpm prepare` - Set up git hooks (Husky)

## System Requirements

- Node.js: v20.11.0 or v22.0.0
- pnpm: v10.12.2 (latest recommended)
- Git: For version control
