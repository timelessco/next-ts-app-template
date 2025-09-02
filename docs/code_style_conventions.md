# Code Style Conventions

## Code Quality Checks

**ALWAYS run the following commands before completing any task:**

1. Automatically use the IDE's built-in diagnostics tool to check for linting and type errors:
   - Fix any linting or type errors before considering the task complete
   - Do this for any file you create or modify

This is a CRITICAL step that must NEVER be skipped when working on any code-related task

## File Size Limits

- **Maximum 250 lines per file** - If a file exceeds this limit:
  - Extract large sections into separate component files
  - Move related functionality into dedicated modules
  - Split complex components into smaller, focused components
- This ensures maintainability and better code organization

## Naming Conventions

- **Components**: PascalCase (e.g., `HeaderNavigation.tsx`)
- **Functions/Hooks**: camelCase (e.g., `useMediaQuery`, `getFadeInProps`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `SITE_NAME`)
- **Files**: kebab-case for non-component files
- **CSS Classes**: Use Tailwind utilities, custom classes in kebab-case

## React/Next.js Patterns

- **Exports**: Named exports only (no default exports) (no array function for the exports)

  ```typescript
  export function ComponentName () { ... }
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

## Function Parameter Pattern

**For functions with 2 or more parameters, use the options object pattern:**

### Required Elements

1. **Options Type**: Name it `FunctionNameOptions`
2. **Function Signature**: Use regular functions with single `options` parameter
3. **Destructuring**: First line must destructure options alphabetically
4. **Return Type**: Export complex return types as `FunctionNameReturnType`

### Simple Example

```typescript
// Define options interface
export interface ProcessDataOptions {
	connection: DatabaseConnection;
	logger: Logger;
	timeout?: number;
}

// Regular function with options parameter
export async function processData(
	options: ProcessDataOptions,
): Promise<ProcessResult> {
	const { connection, logger, timeout = 5000 } = options; // Alphabetical destructuring
	// ... implementation
}

// Export return type if needed elsewhere
export type ProcessDataReturnType = Awaited<ReturnType<typeof processData>>;
```

### Benefits

- Clear parameter grouping
- Easy to add/remove parameters without changing call sites
- Consistent pattern across codebase

**For detailed TypeScript type rules, see [`docs/type_deduction_guidelines.md`](./type_deduction_guidelines.md)**

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

## Accessibility Guidelines

- **ARIA**: Use semantic HTML over ARIA roles when possible
- **Keyboard**: All interactive elements must be keyboard accessible
- **Alt Text**: Meaningful alt text for images (avoid "image", "picture", "photo")
- **Focus**: Don't use positive tabIndex values
- **Labels**: All form inputs must have associated labels
- **Language**: Include `lang` attribute on html element

## Frontend Best Practices

- **Next.js Images**: Use `next/image` instead of `<img>` tags
- **Head Management**: Use Next.js head management, not `<head>` tags
- **Security**: Always use `rel="noopener"` with `target="_blank"`
- **Keys**: Don't use array indices as React keys
- **Hooks**: Call hooks at top level, specify all dependencies
- **Error Boundaries**: Handle errors gracefully with error boundaries

See [`docs/frontend_rules.md`](./frontend_rules.md) for full frontend details.

## Git Conventions

- **Commits**: Conventional commits format (enforced by commitlint)
  - `feat:` for features
  - `fix:` for bug fixes
  - `chore:` for maintenance
  - `docs:` for documentation
- **Pre-commit**: Automatic linting via husky and lint-staged
- **PR Titles**: Must follow conventional commits format
