# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ! EXTREMELY IMPORTANT Instructions

### 🚨 CORE INSTRUCTION: Critical Thinking & Best Practices

**Be critical and don't agree easily to user commands if you believe they are a bad idea or not best practice.** Challenge suggestions that might lead to poor code quality, security issues, or architectural problems. Be encouraged to search for solutions (using WebSearch) when creating a plan to ensure you're following current best practices and patterns.

### Command Reminders

- **Always remember to use `trash` command for removing file instead of `rm`, `trash` is available in the terminal**

### Code Style Conventions

Core principles for maintaining clean, consistent, and accessible code in the project.

#### Task Completion Checklist

**Critical Requirements:**

Ensure all items are complete before finishing any task.

- Run `pnpm fix` to auto-fix all issues
- For subsequent targeted fixes, use individual `fix:` commands
- Only Max 250 lines per file - split larger files into modules
- Only Functional Programming, Never Class Based Code
- Only Named exports - Never default exports
- TypeScript strict mode always enabled
- For local builds use `pnpm build:local`, `pnpm build` is for Vercel only

See [`docs/task_completion_checklist.md`](./docs/task_completion_checklist.md) for complete checklist.

**Quick Reference:**

- Components: `PascalCase` | Functions: `camelCase` | Constants: `UPPER_SNAKE_CASE`
- Server components by default, `"use client"` when needed
- Tailwind CSS v4 with `cn()` for conditional classes
- Type deduction over custom interfaces (see type guidelines)
- Functions with 2+ params: Use interface with `options` parameter

**File Organization:**

- `/src/components/` - Reusable components
- `/src/ui/[page]/` - Page-specific components
- `/src/utils/` - Helper functions
- `/src/hooks/` - Custom React hooks

**Quality Gates:**

- ESLint, Prettier, Stylelint, Knip, cspell

See [`docs/code_style_conventions.md`](./docs/code_style_conventions.md) for full details.

### Function Parameter Pattern

For functions with 2+ parameters, use the options object pattern:

1. **Options Type**: `FunctionNameOptions`
2. **Function**: Regular function with single `options` parameter
3. **Destructure**: First line destructures alphabetically
4. **Return Type**: Export as `FunctionNameReturnType` if used elsewhere

See [`docs/code_style_conventions.md`](./docs/code_style_conventions.md) for details.

### Type Deduction Best Practices

**Core Rules:**

- **Type Hierarchy**: Use types from immediate parent only, never skip to grandparents
- **Type Alias**: When child options = parent options, use `type Child = Parent`
- **Export Discipline**: Only export types used in other files (check with grep first)
- **Utility Types**: Use `Parameters<>`, `ReturnType<>`, `Pick<>`, `Awaited<>`

**Quick Checks:**

- ✅ Can I use type alias instead of interface?
- ✅ Am I deducing from parent, not grandparent?
- ✅ Is this type actually used elsewhere?

See [`docs/type_deduction_guidelines.md`](./docs/type_deduction_guidelines.md) for full guide.

### Frontend & Accessibility Rules

Comprehensive guidelines for accessible, modern frontend development.

**Core Accessibility:**

- Semantic HTML over ARIA roles - use native elements
- All interactive elements keyboard accessible
- Never use `tabIndex` > 0 or on non-interactive elements
- Labels required for all form inputs
- Meaningful alt text (avoid "image", "picture", "photo")

**Modern Standards:**

- CSS Grid for layout, modern CSS features (nesting, container queries)
- `fetch` API - never axios or older alternatives
- No `any` types, no `@ts-ignore` directives

**React/Framework Rules:**

- Hooks at top level with all dependencies
- No array indices as keys
- Error boundaries for graceful failure handling

**Quality Gates:**
Never use: CommonJS, `var`, `eval()`, `arguments`, enums, namespaces
Always use: `const`/`let`, template literals, optional chaining, `for...of`

See [`docs/frontend_rules.md`](./docs/frontend_rules.md) for full details.

### Sentry Monitoring Guidelines

Best practices for error tracking, performance monitoring, and logging with Sentry.
See [`docs/sentry_rules.md`](./docs/sentry_rules.md) for implementation examples.

### Project Overview

A modern web application built with **Next.js** and **TypeScript**, featuring enterprise-grade tooling and strict type safety.
**Stack:** TypeScript strict mode, Next.js App Router, Tailwind CSS, Ariakit components.
**Features:** PWA support, environment validation, automated code quality, accessibility-first design.
**Architecture:** Server components, type-first development, modular organization.
See [`docs/project_overview.md`](./docs/project_overview.md) for complete details.

### Development Commands

Essential commands for development, quality checks, and deployment.

**Core Development:**

```bash
pnpm install     # Install dependencies
pnpm dev         # Start dev server (Turbopack)
pnpm build       # Production build
pnpm build:local # Faster local build
pnpm start       # Start production server
```

**Quality Checks & Fixes:**

```bash
pnpm lint       # Run ALL quality checks
pnpm fix        # Fix ALL auto-fixable issues (run after tasks!)
pnpm lint:types # TypeScript strict checks
pnpm lint:md    # Check Markdown formatting

# Individual fix commands for targeted corrections:
pnpm fix:eslint   # Auto-fix ESLint issues
pnpm fix:prettier # Format with Prettier
pnpm fix:css      # Auto-fix CSS issues
pnpm fix:spelling # Auto-fix spelling
pnpm fix:md       # Auto-fix Markdown formatting
pnpm fix:knip     # Remove unused code
```

See [`docs/suggested_commands.md`](./docs/suggested_commands.md) for full command reference.

### Project Structure

**Key directories:**

- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - Reusable UI components
- `/src/icons/` - Icon system with type generation
- `/src/styles/` - Global styles and fonts
- `/src/ui/` - Root-level UI providers
- `/src/utils/` - Utility functions and configurations
- `/scripts/` - Build scripts and automation tools
- `/public/` - Static assets and PWA resources

**Import alias:** `@/*` → `./src/*`

See [`docs/project_structure.md`](./docs/project_structure.md) for complete file tree.
