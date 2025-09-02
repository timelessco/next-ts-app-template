# Development Commands

## Package Management

```bash
# Install dependencies
pnpm install

# Check for duplicate packages
pnpm dedupe

# Clean build artifacts and dependencies
pnpm clean
```

## Development

```bash
# Start development server with Turbopack
pnpm dev

# Start development server with source maps enabled
pnpm dev:sourcemap

# Build for production but for local testing
# Faster with Turbopack
pnpm build:local

# Build for production
pnpm build

# Start production server
pnpm start

# Analyze bundle size
ANALYZE=true pnpm build
```

## Code Quality

```bash
# Run all quality checks
pnpm lint

# Fix all auto-fixable issues
pnpm fix

# Individual linting commands
pnpm lint:eslint   # ESLint checking
pnpm lint:prettier # Prettier formatting check
pnpm lint:css      # Stylelint CSS/PostCSS check
pnpm lint:md       # Markdown linting
pnpm lint:spelling # Spell checking with cspell
pnpm lint:types    # TypeScript type checking
pnpm lint:knip     # Find unused code and dependencies

# Fix individual tools
pnpm fix:eslint   # Auto-fix ESLint issues
pnpm fix:spelling # Auto-fix spelling issues
pnpm fix:prettier # Format with Prettier
pnpm fix:css      # Auto-fix CSS issues
pnpm fix:md       # Auto-fix Markdown issues
```

## Release & Deployment

```bash
# Create a new release
pnpm release
```

## Troubleshooting

```bash
# Clear Next.js cache
pnpm clean --next

# Clear all caches and reinstall
pnpm clean && pnpm install
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

### Package Management & Dependencies

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

All commands are optimized for performance using Turbo's caching and parallel execution capabilities.
