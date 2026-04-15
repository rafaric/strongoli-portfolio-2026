# Infrastructure Specification

## Purpose

Defines the project scaffolding, configuration, folder structure, and foundational tooling for the portfolio application. This domain covers everything that must be in place before feature development begins.

## Requirements

### Requirement: Next.js 15 App Router Scaffolding

The system MUST be initialized using `create-next-app@latest` with the App Router pattern, TypeScript, and Tailwind CSS v4 enabled. The project SHALL use the `(sections)` route group for organizing the single-page layout without impacting URL structure.

#### Scenario: Project initialization succeeds

- GIVEN a clean directory at `/Users/rafaric/proyectos/strongoli-portfolio-2026`
- WHEN `create-next-app` is executed with App Router, TypeScript, Tailwind v4, and ESLint enabled
- THEN the project MUST contain `app/layout.tsx`, `app/page.tsx`, `tsconfig.json`, and `next.config.ts`
- AND the `app/(sections)/` route group directory MUST exist for section composition

#### Scenario: TypeScript strict mode is enforced

- GIVEN the initialized Next.js project
- WHEN `tsconfig.json` is configured with strict mode
- THEN `strict: true`, `noUncheckedIndexedAccess`, `noImplicitOverride`, and `exactOptionalPropertyTypes` MUST all be enabled
- AND the project MUST NOT compile if any `any` types are introduced
- AND path aliases MUST map `@/*` to `./src/*`

---

### Requirement: shadcn/ui Component Library

The system MUST initialize shadcn/ui with the "default" style and configure it to place components in `components/ui/`. The component primitive set MUST include Button, Card, Input, Textarea, Avatar, Badge, Tooltip, and Separator as a minimum.

#### Scenario: shadcn/ui initialization and component installation

- GIVEN the initialized Next.js project
- WHEN `npx shadcn@latest init` and subsequent `add` commands are executed
- THEN `components/ui/` MUST contain at minimum: `button.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `avatar.tsx`, `badge.tsx`, `tooltip.tsx`, `separator.tsx`
- AND `lib/utils.ts` MUST export the `cn()` utility function
- AND all shadcn/ui components MUST be customize exclusively via Tailwind utility classes

#### Scenario: shadcn/ui components work in Server Components

- GIVEN a Server Component that imports a shadcn/ui Button
- WHEN the Button is rendered without `"use client"` in the parent
- THEN the Button MUST render correctly (shadcn/ui components that require interactivity internally handle their own `"use client"` boundary)
- AND no hydration mismatch SHALL occur

---

### Requirement: Tailwind CSS v4 Configuration

The system MUST configure Tailwind CSS v4 using CSS-first configuration in `app/globals.css`. The dark mode variant MUST use `@custom-variant dark (&:where(.dark, .dark *))` for next-themes compatibility.

#### Scenario: Dark mode variant works with next-themes

- GIVEN the Tailwind v4 configuration in `globals.css`
- WHEN a component uses `dark:bg-slate-900` and the `<html>` element has the `dark` class applied by next-themes
- THEN the dark variant styles MUST apply correctly
- AND no hydration mismatch SHALL occur on initial render

#### Scenario: CSS-first configuration replaces JS config

- GIVEN the Tailwind v4 setup
- WHEN the project is inspected
- THEN `globals.css` MUST contain `@import "tailwindcss"` (replacing `@tailwind` directives)
- AND `tailwind.config.ts` MUST NOT exist (or MUST be minimal — Tailwind v4 uses CSS-first config)
- AND custom theme values (colors, spacing, fonts) MUST be defined via CSS custom properties in `globals.css`

---

### Requirement: Theme Provider Setup

The system MUST wrap the root layout with a `ThemeProvider` using next-themes configured with `attribute="class"`, `defaultTheme="system"`, and `disableTransitionOnChange` for smooth toggling without layout shift.

#### Scenario: Theme persists across page reloads

- GIVEN a user who has selected "dark" theme
- WHEN the page is reloaded
- THEN the dark theme MUST be applied immediately (no flash of light theme)
- AND next-themes MUST persist the preference in localStorage

#### Scenario: System theme is detected on first visit

- GIVEN a first-time visitor whose OS is set to dark mode
- WHEN the portfolio loads
- THEN the dark theme MUST be applied automatically
- AND the theme toggle MUST reflect "system" as the active mode

#### Scenario: Theme toggle switches without layout shift

- GIVEN a user on the portfolio
- WHEN the theme toggle is clicked to switch between dark and light
- THEN the color scheme MUST change without causing visible layout shift
- AND `disableTransitionOnChange` MUST prevent transition flicker during the switch

---

### Requirement: Framer Motion Integration

The system MUST install Framer Motion `>=11` and use the `motion/react-client` import pattern for SSR compatibility. Animation wrapper components (`FadeIn`) MUST be Client Components that keep their parent Server Components intact.

#### Scenario: Framer Motion animations work in SSR context

- GIVEN a section component that uses the `FadeIn` animation wrapper
- WHEN the page is server-side rendered
- THEN no hydration mismatch SHALL occur
- AND animations MUST play correctly on client-side hydration

#### Scenario: Server Component boundary is preserved

- GIVEN a `hero-section.tsx` Server Component that imports `FadeIn`
- WHEN `FadeIn` is used to wrap animated content within the hero section
- THEN `hero-section.tsx` MUST NOT require the `"use client"` directive
- AND only `FadeIn` itself MUST be a Client Component

---

### Requirement: Folder Structure Convention

The project MUST follow the defined folder structure with clear separation between app routes, UI primitives, custom components, data, actions, and static assets.

#### Scenario: Directory structure matches specification

- GIVEN the initialized project
- WHEN the folder structure is inspected
- THEN the following directories MUST exist:
  - `app/(sections)/` — route group for section composition
  - `components/ui/` — shadcn/ui primitives
  - `components/custom/` — portfolio-specific components
  - `lib/data/` — static data files (projects, skills, services)
  - `lib/actions/` — Server Actions (contact form)
  - `lib/utils.ts` — cn() and shared utilities
  - `public/images/` — avatar, project screenshots, OG image

#### Scenario: Private folders exclude Route Segment params

- GIVEN folders prefixed with `_` (e.g., `_components`)
- WHEN Next.js routing is analyzed
- THEN those folders MUST be excluded from URL routing
- AND components inside MUST still be importable via relative or alias paths

---

### Requirement: Dependency Version Constraints

The system MUST install specific minimum versions for critical dependencies to ensure compatibility.

#### Scenario: Critical dependency versions meet minimums

- GIVEN the installed `package.json`
- WHEN dependency versions are inspected
- THEN the following minimum versions MUST be met:
  - `next` >= 15.0.0
  - `react` >= 19.0.0
  - `framer-motion` >= 11.0.0
  - `next-themes` >= 0.4.0
  - `lucide-react` (latest stable)
  - `zod` >= 4.0.0 (Zod 4 for `safeParse` + `discriminatedUnion`)
  - `tailwindcss` >= 4.0.0

---

### Requirement: Environment and Dev Tooling

The system MUST include ESLint, Prettier (or equivalent formatter), and strict TypeScript checking as part of the development workflow.

#### Scenario: Linting and type checking pass

- GIVEN the configured project
- WHEN `next lint` and `tsc --noEmit` are executed
- THEN zero linting errors and zero type errors MUST be reported
- AND `any` type usage MUST be prohibited by ESLint rule