# Task Completion Checklist

When finishing any development task, ensure you complete the following steps:

## 1. Code Quality Checks

- [ ] Run `pnpm lint` to check all linting rules pass
- [ ] Run `pnpm lint:types` to ensure TypeScript types are correct
- [ ] Run `pnpm fix` to auto-fix any linting issues if needed

## 2. Testing & Verification

- [ ] Verify functionality works as expected in development (`pnpm dev`)
- [ ] Check responsive design on different screen sizes
- [ ] Test keyboard navigation and screen reader compatibility
- [ ] Verify no console errors or warnings

## 3. Build Verification

- [ ] Run `pnpm build` to ensure production build succeeds
- [ ] Run `pnpm start` to test production build locally
- [ ] Check bundle size impact with `pnpm build:analyze` if adding new dependencies

## 4. Code Review Preparation

- [ ] Ensure all TypeScript types are properly defined (no `any` types)
- [ ] Verify components use named exports
- [ ] Check that client components are properly marked with `"use client"`
- [ ] Confirm images use NextImage component with blurhash
- [ ] Verify links use StyledLink component
- [ ] Ensure business data uses centralized siteConfig

## 5. Documentation

- [ ] Update any affected documentation
- [ ] Add new words to cspell dictionary if needed (`pnpm fix:spelling`)
- [ ] Ensure component props have TypeScript interfaces

## 6. Git Commit

- [ ] Stage changes with `git add`
- [ ] Commit with conventional commit message format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `chore:` for maintenance tasks
  - `docs:` for documentation changes
- [ ] Pre-commit hooks will run automatically

## Quick Commands Summary

```bash
# Run all checks
pnpm lint

# Auto-fix issues
pnpm fix

# Build and test
pnpm build && pnpm start

# Check bundle size
pnpm build:analyze
```

## Common Issues to Check

- No hardcoded values - use siteConfig for company info
- Accessibility attributes on interactive elements
- Proper error handling for async operations
- Environment variables validated with Zod schemas
- No CSS-in-JS - use Tailwind utilities
- Icons added to sprite (`pnpm build:icons`)
