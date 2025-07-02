# Code Style Conventions

## TypeScript Standards

### Strictness Level: MAXIMUM

- **Strict Mode**: Fully enabled with all flags
- **No `any` Types**: Use `unknown` if type is truly unknown
- **No Type Assertions**: Use type guards instead of `as` casting
- **Readonly Props**: Use `readonly` for component props
- **Null Safety**: Proper null checking with type guards

### Type Patterns

```typescript
// Component Props Pattern
export interface ComponentProps {
	readonly children?: ReactNode;
	readonly className?: string;
}

// Utility Type Examples
export type NonEmptyArray<T> = [T, ...T[]];

// Type Guards
export function isNonNullable<T>(value: T): value is NonNullable<T> {
	return value != null;
}
```

## Naming Conventions

### Files & Directories

- **Components**: `PascalCase.tsx` (e.g., `StyledButton.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `assertionUtils.ts`)
- **Types**: `PascalCase` with descriptive names
- **Constants**: `UPPER_SNAKE_CASE` for site config

### Code Naming

```typescript
// Functions: camelCase with descriptive verbs
const getUserProfile = () => {};
const validateEmailAddress = () => {};

// Types: PascalCase with clear purpose
interface UserProfile extends BaseProfile {}
type ApiResponse<T> = Success<T> | Error;

// Constants: UPPER_SNAKE_CASE
const SITE_NAME = "Next TS App";
const API_BASE_URL = "https://api.example.com";
```

## Component Patterns

### Standard Component Structure

```typescript
import { type ReactNode } from "react";
import { cn } from "@/utils/index";

export interface ComponentProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export function Component(props: ComponentProps) {
  const { children, className, ...rest } = props;

  return (
    <div className={cn("base-styles", className)} {...rest}>
      {children}
    </div>
  );
}
```

### Composition Patterns

```typescript
// Extend existing components rather than recreate
export function StyledButton(props: StyledButtonProps) {
  const { className, ...rest } = props;
  return (
    <Button
      className={cn(baseButtonStyles, className)}
      {...rest}
    />
  );
}

// Use render props for complex composition
<Command render={<AriaCurrentLink {...linkProps} />}>
  {children}
</Command>
```

## Import/Export Conventions

### Path Aliases (Required)

```typescript
// Always use path aliases for internal imports
import { Component } from "@/components/Component";
import { utility } from "@/utils/utility";
import { CONFIG } from "@/utils/siteConfig";

// Not: import { Component } from "../../components/Component";
```

### Import Order (Auto-sorted by Prettier)

1. Built-in Node.js modules
2. React/Next.js framework modules
3. Third-party packages
4. Internal modules (by priority):
   - `@/lib/*`
   - `@/ui/*`
   - `@/components/*`
   - `@/hooks/*`
   - `@/stores/*`
   - `@/icons/*`
   - `@/utils/*`
   - `@/styles/*`
   - `@/app/*`
5. Relative imports
6. CSS files

### Export Patterns

```typescript
// Named exports preferred
export { Component, type ComponentProps };

// Barrel exports in index files
export * from "./Component";
export * from "./utils";

// Default exports only for pages and layouts
export default function Page() {}
```

## CSS and Styling

### TailwindCSS Patterns

```typescript
// Use cn() utility for class composition
import { cn } from "@/utils/index";

const styles = cn(
	"base-styles",
	"responsive-modifier:style",
	condition && "conditional-style",
	className,
);
```

### Custom CSS (when needed)

```css
/* BEM methodology for custom CSS */
.component__element--modifier {
	/* Properties in clean order (via Stylelint) */
}

/* CSS variables for theming */
@theme {
	--color-primary: hsl(210 100% 50%);
	--font-sans: var(--font-inter);
}
```

## Accessibility Standards

### Built-in ARIA Support

```typescript
// Proper ARIA handling in components
const ariaProps = ariaLabel
  ? { role: "img", "aria-label": ariaLabel }
  : { "aria-hidden": "true", focusable: "false" };

return <svg {...ariaProps} />;
```

### Semantic HTML

- Use semantic HTML elements
- Provide proper heading hierarchy
- Include alternative text for images
- Ensure keyboard navigation

## Error Handling

### Type-Safe Error Handling

```typescript
// Use Result types instead of throwing
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Graceful degradation in components
if (!data) {
  return <div>Loading...</div>;
}
```

## Code Organization

### Utility Functions

- **Pure Functions**: No side effects when possible
- **Single Responsibility**: Each function has one clear purpose
- **Type Guards**: Proper TypeScript type narrowing
- **Immutable**: Work with immutable data structures

### Component Organization

- **Small Components**: Focus on single responsibility
- **Composition**: Build complex UI through composition
- **Props Interface**: Clear, readonly prop definitions
- **Default Exports**: Only for pages, use named exports elsewhere

## Performance Considerations

### Bundle Optimization

- **Dynamic Imports**: Use for large components
- **Image Optimization**: Use Next.js Image component
- **Bundle Analysis**: Regular bundle size monitoring

### React Patterns

- **Functional Components**: Use hooks over class components
- **Memo Usage**: Only when performance measurement shows benefit
- **Avoid Premature Optimization**: Profile before optimizing

## Quality Assurance

### ESLint Rules Enforced

- Strict TypeScript checking
- React hooks validation
- Import organization
- Accessibility compliance
- No unused variables
- Consistent naming

### Automated Formatting

- **Prettier**: Handles all code formatting
- **Import Sorting**: Automatic import organization
- **TailwindCSS**: Class sorting for consistency

### Git Practices

- **Conventional Commits**: Enforced commit message format
- **Pre-commit Hooks**: Automatic formatting and spell checking
- **Linear History**: Prefer rebase over merge commits

This coding style ensures consistency, maintainability, and high code quality across the entire project.
