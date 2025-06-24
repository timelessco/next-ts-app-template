# Code Style Conventions

## TypeScript Conventions

- **Strict Mode**: Always enabled, no exceptions
- **Type Safety**:
  - No `any` types
  - No type assertions unless absolutely necessary
  - No `@ts-ignore` without explicit explanation
  - Use `unknown` instead of `any` when type is truly unknown
- **Imports**: Organized with specific order (see prettier config)
- **File Extensions**: `.tsx` for React components, `.ts` for utilities

## Naming Conventions

- **Components**: PascalCase (e.g., `HeaderNavigation.tsx`)
- **Functions/Hooks**: camelCase (e.g., `useMediaQuery`, `getFadeInProps`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `SITE_NAME`)
- **Files**: kebab-case for non-component files
- **CSS Classes**: Use Tailwind utilities, custom classes in kebab-case

## React/Next.js Patterns

- **Exports**: Named exports only (no default exports)

  ```typescript
  export const ComponentName = () => { ... }
  ```

- **Component Structure**:
  - Server components by default
  - Client components explicitly marked with `"use client"`
  - Separate files for server/client versions (e.g., `Component.tsx` and `ComponentClient.tsx`)
- **Props**: Always define TypeScript interfaces

  ```typescript
  interface ComponentProps {
  	title: string;
  	isActive?: boolean;
  }
  ```

## Styling Guidelines

- **Tailwind CSS v4**: Primary styling method
- **className Utility**: Use `cn()` helper for conditional classes

  ```typescript
  cn("base-class", isActive && "active-class");
  ```

- **No CSS-in-JS**: Avoid runtime styling solutions
- **Custom CSS**: Only in global.css when absolutely necessary

## File Organization

- **Components**: Generic reusable components in `/src/components/`
- **UI Components**: Page-specific components in `/src/ui/[page-name]/`
- **Utilities**: Helper functions in `/src/utils/`
- **Hooks**: Custom React hooks in `/src/hooks/`
- **Images**: Static images in `/src/images/[page-name]/`

## Best Practices

- **Images**: Use NextImage component with blurhash placeholders
- **Links**: Use StyledLink component for consistent styling
- **Icons**: Add to `/src/icons/svg/` and build sprite
- **Config**: Centralize all business data in `siteConfig.ts`
- **Environment Variables**: Validate with Zod schemas
- **Metadata**: Use metadataUtils for consistent SEO

## Code Quality Tools

- **ESLint**: Extensive rule set for React, TypeScript, accessibility
- **Prettier**: Auto-formatting with specific import order
- **Stylelint**: CSS linting for consistency
- **TypeScript**: Strict mode with all checks enabled
- **Knip**: Detect unused code and dependencies
- **cspell**: Spell checking across codebase

## Git Conventions

- **Commits**: Conventional commits format (enforced by commitlint)
  - `feat:` for features
  - `fix:` for bug fixes
  - `chore:` for maintenance
  - `docs:` for documentation
- **Pre-commit**: Automatic linting via husky and lint-staged
- **PR Titles**: Must follow conventional commits format
