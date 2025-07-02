# Suggested Commands

## Core Development Commands

### Start Development

```bash
pnpm dev           # Start development server with Turbopack
pnpm dev:sourcemap # Development with source maps enabled
```

### Build & Production

```bash
pnpm build       # Production build
pnpm start       # Start production server
pnpm build:start # Build and start production server
pnpm build:ci    # CI build (skips environment validation)
pnpm build:local # Local build with Turbopack
```

### Analysis & Debugging

```bash
pnpm build:analyze   # Build with bundle analysis + webpack-bundle-analyzer
pnpm build:sourcemap # Build with source maps and analysis
```

## Code Quality Commands

### Comprehensive Linting (Turbo-powered)

```bash
pnpm lint # Run ALL linters in parallel:
# - TypeScript type checking
# - ESLint code quality
# - Prettier formatting
# - Knip unused code detection
# - Markdown linting
# - Spell checking
# - CSS linting
```

### Individual Linting

```bash
pnpm lint:types    # TypeScript type checking
pnpm lint:eslint   # ESLint code quality checks
pnpm lint:prettier # Prettier formatting validation
pnpm lint:knip     # Unused dependencies/exports/types
pnpm lint:css      # Stylelint CSS linting
pnpm lint:md       # Markdown formatting
pnpm lint:spelling # Spell checking with CSpell
```

### Auto-fixing

```bash
pnpm fix          # Auto-fix ESLint issues (via Turbo)
pnpm fix:eslint   # ESLint auto-fix
pnpm fix:prettier # Auto-format with Prettier
pnpm fix:css      # Auto-fix CSS with Stylelint
pnpm fix:md       # Auto-fix Markdown formatting
pnpm fix:spelling # Update spell check dictionary
```

## Maintenance Commands

### Project Cleanup

```bash
pnpm clean # Clean build artifacts and caches
```

### Package Management

```bash
pnpm check:packages # Check for duplicate packages
pnpm check:update   # Interactive dependency updates
pnpm check:engine   # Verify package manager version
```

### Icons & Assets

```bash
pnpm build:icons # Generate icon components from SVGs
```

### Release Management

```bash
pnpm release               # Automated release with conventional changelog
pnpm contributors:add      # Add contributors
pnpm contributors:generate # Generate contributors list
```

## Task Completion Workflow

When finishing any development task, run these commands in order:

1. **Format Code**: `pnpm fix:prettier`
2. **Fix Linting**: `pnpm fix:eslint`
3. **Validate Everything**: `pnpm lint`
4. **Build Check**: `pnpm build` (optional but recommended)

## Development Workflow Tips

### Quick Quality Check

```bash
# Fast feedback loop for development
pnpm fix && pnpm lint:types
```

### Pre-commit Safety

```bash
# What runs automatically via husky + lint-staged
pnpm fix:prettier && pnpm fix:spelling
```

### Performance Analysis

```bash
# Analyze bundle size and composition
ANALYZE=true pnpm build:analyze
```

### Debug with Source Maps

```bash
# Generate source maps for debugging
SOURCEMAP=true pnpm dev
```

## Environment Variables

### Required for Production

- `NEXT_PUBLIC_SITE_URL` - Site URL for sitemap generation

### Optional

- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking
- `SKIP_ENV_VALIDATION=true` - Skip environment validation (CI builds)
- `ANALYZE=true` - Enable bundle analyzer
- `SOURCEMAP=true` - Generate source maps
- `LOCAL=true` - Local build mode

## Git Workflow Commands

```bash
# Conventional commits are enforced
git commit -m "feat: add new component"
git commit -m "fix: resolve type error"
git commit -m "refactor: improve performance"
```

All commands are optimized for performance using Turbo's caching and parallel execution capabilities.
