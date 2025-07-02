# Project Structure

## High-Level Directory Layout

```text
next-ts-app-template/
├── .github/              # GitHub workflows, templates, and configs
├── .next/               # Next.js build output (auto-generated)
├── docs/                # Project documentation and memory files
├── node_modules/        # Dependencies
├── public/              # Static assets
├── scripts/             # Build scripts and automation tools
├── src/                 # Source code (main application)
└── Configuration files  # Root-level config files
```

## Source Code Structure (`src/`)

### Core Application Structure

```text
src/
├── app/                 # Next.js App Router structure
│   ├── layout.tsx       # Root layout with providers
│   ├── page.tsx         # Home page
│   ├── error.tsx        # Error boundary
│   ├── not-found.tsx    # 404 page
│   ├── global-error.tsx # Global error handler
│   ├── manifest.ts      # PWA manifest
│   ├── robots.ts        # Robots.txt generation
│   ├── sitemap.ts       # Sitemap generation
│   ├── sw.ts           # Service worker configuration
│   └── ~offline/        # Offline fallback page
├── components/          # Reusable UI components
├── icons/              # Icon system with type generation
├── styles/             # Global styles and fonts
├── ui/                 # Root-level UI providers
└── utils/              # Utility functions and configurations
```

## Key Directories Explained

### `/src/app/` - Next.js App Router

- **File-based routing** with App Router conventions
- **Layout hierarchy** starting from root layout
- **Metadata API** for SEO optimization
- **Route handlers** and API routes
- **Special files**: error boundaries, loading states, not-found pages

**Key Files:**

- `layout.tsx` - Root layout with providers, fonts, and global setup
- `page.tsx` - Home page component
- `manifest.ts` - PWA manifest configuration
- `sw.ts` - Service worker setup with Serwist

### `/src/components/` - Reusable Components

```text
components/
├── Container.tsx        # Layout container component
├── Icon.tsx            # Icon system component
├── StyledButton.tsx    # Custom button component
├── image/              # Image-related components
│   ├── BlurhashImage.tsx  # Progressive image loading
│   └── NextImage.tsx      # Next.js image wrapper
└── link/               # Link-related components
    └── StyledLink.tsx     # Custom link component
```

**Component Patterns:**

- **Accessibility-first** design with ARIA support
- **Composition over inheritance**
- **TypeScript strict typing**
- **Ariakit integration** for complex components

### `/src/utils/` - Utility Functions

```text
utils/
├── index.ts            # Barrel exports
├── assertionUtils.ts   # Type guards and assertions
├── blurhashUtils.ts    # Image blurhash utilities
├── errorUtils.ts       # Error handling utilities
├── fetchUtils.ts       # HTTP request utilities
├── instrumentation.ts  # Performance instrumentation
├── metadataUtils.ts    # SEO metadata utilities
├── siteConfig.ts       # Site configuration constants
└── typeUtils.ts        # TypeScript utility types
```

**Utility Categories:**

- **Type Safety**: Assertion functions and type guards
- **Data Fetching**: HTTP utilities with proper error handling
- **SEO**: Metadata generation and optimization
- **Performance**: Instrumentation and monitoring
- **Configuration**: Site-wide constants and settings

### `/src/icons/` - Icon System

```text
icons/
├── README.md           # Icon system documentation
├── icon-name.d.ts      # Auto-generated TypeScript types
└── svg/               # Source SVG files
    └── timeless.svg   # Example icon
```

**Icon System Features:**

- **Type-safe icons** with auto-generated TypeScript types
- **SVG sprite optimization**
- **Build-time processing** with automated scripts
- **Accessibility built-in** with ARIA support

### `/src/styles/` - Styling System

```text
styles/
├── fonts.ts           # Font loading and configuration
└── global.css         # Global styles and TailwindCSS
```

**Styling Approach:**

- **TailwindCSS 4** with modern CSS features
- **Custom font loading** with `next/font`
- **CSS variables** for theming
- **PostCSS** processing pipeline

### `/src/ui/` - Root UI Providers

```text
ui/
└── root-layout/
    ├── Providers.tsx        # React context providers
    ├── TailwindIndicator.tsx # Development indicator
    └── splashScreens.ts     # PWA splash screen config
```

**UI Provider Functions:**

- **Context management** for global state
- **Theme providers** and styling context
- **Development tools** and indicators
- **PWA configuration** and splash screens

## Configuration Files Structure

### Root Configuration Files

```text
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── eslint.config.js      # ESLint rules and plugins
├── prettier.config.cjs   # Prettier formatting rules
├── stylelint.config.js   # CSS linting configuration
├── turbo.json           # Turbo task orchestration
├── tailwind.config.ts   # TailwindCSS configuration (if present)
├── postcss.config.js    # PostCSS plugins
├── svgo.config.js       # SVG optimization
└── cspell.json          # Spell checking configuration
```

### `/scripts/` - Build Scripts

```text
scripts/
├── build-icons.ts       # Icon generation script
├── clean.ts            # Cleanup script
├── update-cspell-words.ts # Spell check dictionary updates
├── env/                # Environment validation
└── release-it/         # Release automation
```

### `/public/` - Static Assets

```text
public/
├── pwa/                # PWA assets
│   ├── icons/          # App icons in various sizes
│   └── splash_screens/ # PWA splash screens
├── svg/               # Static SVG files
│   └── sprite.svg     # SVG sprite sheet
└── sw.js             # Generated service worker
```

## Path Aliases Configuration

TypeScript path mapping for clean imports:

```typescript
"@/app/*": ["./src/app/*"]
"@/components/*": ["./src/components/*"]
"@/hooks/*": ["./src/hooks/*"]
"@/icons/*": ["./src/icons/*"]
"@/lib/*": ["./src/lib/*"]
"@/styles/*": ["./src/styles/*"]
"@/ui/*": ["./src/ui/*"]
"@/utils/*": ["./src/utils/*"]
```

## Build Output Structure

### `.next/` - Next.js Build Artifacts

- **Optimized bundles** and code splitting
- **Static generation** output
- **Server-side rendering** artifacts
- **Asset manifests** and optimization data

## Development vs Production Structure

### Development Features

- **Hot reloading** with Turbopack
- **Source maps** for debugging
- **Development indicators** (TailwindIndicator)
- **Service worker disabled** for easier debugging

### Production Optimizations

- **Bundle optimization** and tree shaking
- **Image optimization** with multiple formats
- **Service worker enabled** for offline functionality
- **Source map generation** (configurable)

## Key Architectural Decisions

### File Organization Principles

1. **Feature-based grouping** within directories
2. **Flat component structure** to avoid deep nesting
3. **Clear separation** between utilities and components
4. **Configuration co-location** with related functionality

### Import Strategy

- **Path aliases** for all internal imports
- **Barrel exports** for clean public APIs
- **Type-only imports** where appropriate
- **Organized import order** (auto-sorted by Prettier)

### Build System Integration

- **Turbo orchestration** for parallel task execution
- **Cache optimization** for build performance
- **Static analysis** integration with build pipeline
- **Asset optimization** in build process

This structure supports scalable development with clear separation of concerns, strong typing, and comprehensive tooling integration.
