# Project Directives

## Stack

- **Framework:** Astro 5 with React 19 islands for interactive components
- **Styling:** Native CSS with [Open Props](https://open-props.style/) design tokens (sizes, fonts, easings, borders) + `modern-normalize` for CSS reset. Scoped `<style>` blocks in Astro components
- **Interactive components:** `@radix-ui/react-dialog` installed for future use. Pattern: Radix primitives styled with native CSS via `[data-*]` attribute selectors
- **Package manager:** npm (not yarn)
- **TypeScript:** Strict mode, extends `astro/tsconfigs/strict`
- **Linting:** ESLint 10 flat config (`eslint.config.js`), not `.eslintrc.*`
- **Formatting:** Prettier 3 with `prettier-plugin-astro`

## Astro Conventions

- Static pages go in `src/pages/` as `.astro` files
- Layouts go in `src/layouts/` — `BaseLayout.astro` is the default HTML shell
- React components that need client-side interactivity use `client:only="react"` (not `client:load`) to avoid SSR issues with browser APIs like `localStorage`
- Astro components for static content, React components only when interactivity is required
- Extract components only when reused across pages, not preemptively

## Theme System

- Themes defined as CSS custom properties in `src/styles/theme.css`
- Theme applied via `data-theme` attribute on `<html>`
- Adding a new theme = adding a `[data-theme="name"]` CSS block with variable overrides
- All color references use `var(--color-*)` tokens, never hardcoded values
- `BaseLayout.astro` has an inline `<script>` in `<head>` that sets theme before first paint (prevents flash of wrong theme)
- User preference persisted to `localStorage`

## Deployment

- GitHub Pages via `actions/deploy-pages` (not `gh-pages` npm package)
- Static output goes to `dist/`
- `public/CNAME` must be preserved for judemorrissey.com

## Domains

- **judemorrissey.com** — primary domain
- **heyjude.dev** — CNAME to judemorrissey.com
- DNS on Squarespace
