# Project Structure

## Root Directory

```tree
timelessco-nextjs/
├── .github/              # GitHub Actions, issue templates, contributing guides
├── .husky/               # Git hooks for pre-commit checks
├── .next/                # Next.js build output (gitignored)
├── docs/                 # Project documentation and memory files
├── node_modules/         # Dependencies (gitignored)
├── public/               # Static assets served directly
├── scripts/              # Build scripts and utilities
├── src/                  # Source code
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment variable template
├── .gitignore            # Git ignore patterns
├── .nvmrc                # Node version specification
├── .release-it.ts        # Release configuration
├── CLAUDE.md             # Instructions for Claude Code
├── eslint.config.js      # ESLint configuration
├── knip.json             # Knip configuration for dead code detection
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── pnpm-lock.yaml        # Lock file for pnpm
├── postcss.config.js     # PostCSS configuration
├── prettier.config.cjs   # Prettier formatting configuration
├── README.md             # Project documentation
├── sw.js                 # Service worker entry point
├── tsconfig.json         # TypeScript configuration
└── turbo.json            # Turbo configuration for task orchestration
```

## Source Directory (`/src`)

```tree
src/
├── app/                  # Next.js App Router pages
│   ├── ~offline/         # Offline fallback page
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── process/          # Process page
│   ├── error.tsx         # Error boundary
│   ├── global-error.tsx  # Global error handler
│   ├── layout.tsx        # Root layout
│   ├── not-found.tsx     # 404 page
│   ├── page.tsx          # Home page
│   └── sw.ts             # Service worker logic
├── components/           # Shared UI components
│   ├── image/            # Image components
│   │   ├── BlurhashImage.tsx
│   │   └── NextImage.tsx
│   └── link/             # Link components
│       └── StyledLink.tsx
├── hooks/                # Custom React hooks
│   ├── useInView.ts
│   ├── useMediaQuery.ts
│   └── useOptimistic.ts
├── icons/                # Icon management
│   ├── svg/              # SVG source files
│   ├── icon-names.ts     # Generated icon types
│   └── sprite.svg        # Generated sprite sheet
├── images/               # Static images by page
│   ├── about-page/
│   ├── common/
│   ├── contact-page/
│   ├── home-page/
│   └── process-page/
├── styles/               # Global styles
│   ├── equitan-sans-font.css
│   ├── global.css        # Main CSS with Tailwind
│   └── lyon-display-web-font.css
├── ui/                   # Page-specific components
│   ├── about-page/       # About page components
│   ├── contact-page/     # Contact page components
│   ├── home-page/        # Home page components
│   ├── process-page/     # Process page components
│   └── root-layout/      # Layout components
│       ├── HeaderNavigation.tsx
│       ├── HeaderNavigationClient.tsx
│       └── Providers.tsx
└── utils/                # Utility functions
    ├── env/              # Environment validation
    │   ├── client.ts
    │   ├── schema.ts
    │   └── server.ts
    ├── blurhash.ts       # Blurhash generation
    ├── cn.ts             # className utility
    ├── getFadeInWhenVisibleMotionProps.ts
    ├── metadataUtils.ts  # SEO metadata helpers
    └── siteConfig.ts     # Centralized site configuration
```

## Key Directories Explained

### `/src/app`

Next.js App Router pages using file-based routing. Each directory represents a route.

### `/src/components`

Reusable components used across multiple pages. Generic and self-contained.

### `/src/ui`

Page-specific components that are only used within a particular page context.

### `/src/utils`

Utility functions, helpers, and configuration. Includes the important `siteConfig.ts` for all business data.

### `/src/hooks`

Custom React hooks for shared logic like media queries and intersection observer.

### `/scripts`

Build-time scripts for tasks like icon sprite generation and cleaning.

### `/public`

Static assets served at the root URL. Includes generated service worker.

## Import Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/app/*` → `./src/app/*`
- `@/components/*` → `./src/components/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/icons/*` → `./src/icons/*`
- `@/lib/*` → `./src/lib/*`
- `@/styles/*` → `./src/styles/*`
- `@/ui/*` → `./src/ui/*`
- `@/utils/*` → `./src/utils/*`
