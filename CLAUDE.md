# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Memory Files

For comprehensive project documentation, see the memory files in the `docs/` directory:

- [`docs/project_overview.md`](./docs/project_overview.md) - Purpose, tech stack, architecture
- [`docs/suggested_commands.md`](./docs/suggested_commands.md) - All important commands organized by category
- [`docs/code_style_conventions.md`](./docs/code_style_conventions.md) - Coding standards and patterns
- [`docs/task_completion_checklist.md`](./docs/task_completion_checklist.md) - What to do when finishing tasks
- [`docs/project_structure.md`](./docs/project_structure.md) - Directory layout and key files

## Quick Reference

See the memory files in the `docs/` directory for detailed information about:

- Tech stack and architecture
- All available commands
- Code style and conventions
- Task completion checklist
- Project structure

## Key Points

- **Required**: Node.js v20.11.0 or v22.0.0, pnpm v10.12.2
- **Framework**: Next.js 15.3.4 with App Router, React 19.1.0
- **Styling**: Tailwind CSS v4 with `cn()` utility
- **Components**: Named exports only, TypeScript interfaces for props
- **Config**: All business data in `/src/utils/siteConfig.ts`
- **Quality**: Run `pnpm lint` before commits, `pnpm fix` to auto-fix
