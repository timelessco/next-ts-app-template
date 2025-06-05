# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run all linting checks (uses Turbo)
- `pnpm fix` - Auto-fix all linting issues

### Specific Linting

- `pnpm lint:eslint` - Run ESLint
- `pnpm lint:prettier` - Check formatting
- `pnpm lint:types` - TypeScript type checking
- `pnpm lint:css` - Stylelint for CSS
- `pnpm lint:spelling` - Spell checking with cspell

### Build Variants

- `pnpm build:analyze` - Build with bundle analyzer
- `pnpm build:icons` - Build icon sprites from /src/icons/svg
- `pnpm build:local` - Local build with Turbopack

### Other Commands

- `pnpm update-cspell` - Update cspell dictionary with new words
- `pnpm clean` - Clean build artifacts and caches
- `pnpm release` - Interactive release process

## Architecture

This is a Next.js 15 application using:

- **App Router** with `src/app` directory structure
- **React 19.1.0** with Next.js 15.3.2
- **TypeScript** with strict mode
- **Tailwind CSS v4** via @tailwindcss/postcss
- **pnpm** as package manager (required, v10.11.0)
- **Node.js** v22.x required

### Project Structure

```tree
src/
├── app/                 # Next.js App Router pages
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── process/        # Process page
│   └── ~offline/       # Offline page
├── components/         # Shared UI components
│   ├── image/         # Image components (NextImage, BlurhashImage)
│   └── link/          # Link components (StyledLink)
├── ui/                # Page-specific components
│   ├── about-page/    # About page components
│   ├── contact-page/  # Contact page components
│   ├── home-page/     # Home page components
│   ├── process-page/  # Process page components
│   └── root-layout/   # Layout components (Header, Providers)
├── hooks/             # Custom React hooks
├── icons/             # SVG icons built into sprite
├── images/            # Static images organized by page
├── styles/            # CSS files (global, fonts)
└── utils/             # Utilities (siteConfig, metadata, etc.)
```

### Important Patterns

1. **Components**:

   - Use named exports, not default exports
   - Separate server and client components (e.g., `Component.tsx` and `ComponentClient.tsx`)
   - TypeScript interfaces for all component props

2. **Images**:

   - Use NextImage component with blurhash placeholders
   - Static imports for optimization
   - Images organized by page in `/src/images/*`

3. **Links**:

   - Use StyledLink component for consistent styling
   - Internal links use Next.js Link component

4. **Icons**:

   - Add SVGs to /src/icons/svg and run `pnpm build:icons`
   - Access via `<Icon name="icon-name" />` component
   - Icons are built into a sprite sheet

5. **Environment Variables**:

   - Validated with Zod in src/utils/env/
   - Separate client/server schemas
   - Required: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Optional: `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_SITE_URL`

6. **Metadata**:

   - Use metadataUtils for consistent SEO
   - Site config in `/src/utils/siteConfig.ts`

7. **Styling**:

   - Tailwind CSS v4 with custom theme
   - `cn()` utility for className merging (clsx + tailwind-merge)
   - Custom fonts: Equitan Sans and Lyon Display Web
   - No CSS-in-JS, prefer Tailwind utilities

8. **Animation**:
   - Motion (Framer Motion v12) for animations
   - `getFadeInWhenVisibleMotionProps()` utility for consistent animations
   - Progressive enhancement approach

### Key Dependencies

- **Motion** (Motion v12) - Animations
- **Embla Carousel** - Image carousels
- **Serwist** - PWA/Service Worker support
- **@react-google-maps/api** - Google Maps
- **Sentry** - Error tracking (configured but commented out)
- **clsx + tailwind-merge** - className utilities
- **zod** - Schema validation
- **sharp** - Image optimization

### Git Workflow

- Uses conventional commits (enforced by commitlint)
- Pre-commit hooks run linting via lint-staged
- Branch naming: feature/_, fix/_, etc.
- Automated releases with release-it

### Testing & Quality

- No test framework currently configured
- Extensive linting setup (ESLint, Prettier, Stylelint, cspell)
- Type checking with TypeScript strict mode
- Dead code detection with Knip
- Bundle analysis available

### Performance & Build

- PWA with offline support
- Service Worker for caching
- Next.js Image optimization
- Bundle splitting and lazy loading
- Turbopack for fast local development
- Source maps in production (for Sentry)

### Development Tips

- Always run `pnpm lint` before committing
- Use `pnpm fix` to auto-fix linting issues
- Check bundle size with `pnpm build:analyze`
- Update cspell dictionary when adding new terms
- Follow the existing component patterns for consistency
