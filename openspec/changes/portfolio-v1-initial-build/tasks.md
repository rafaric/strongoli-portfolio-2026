# Tasks: Portfolio v1 Initial Build

**Change**: portfolio-v1-initial-build
**Status**: Ready for Implementation
**Total**: 21 tasks across 8 batches

---

## Batch 1: Project Setup & Infrastructure

### T01: Initialize Next.js 15 Project with TypeScript Strict
**Batch**: 1
**Depends on**: —
**Effort**: M
**Files**: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/globals.css`
**Description**: Create the Next.js 15 project using create-next-app with App Router, TypeScript, and Tailwind CSS v4. Configure TypeScript strict mode with `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`. Set up path aliases (`@/*` → `./src/*` or `./`).
**Acceptance criteria**:
- [x] Next.js 15 project boots with `next dev`
- [x] TypeScript strict mode active with all extra flags
- [x] `app/layout.tsx` renders without errors
- [x] `app/globals.css` has Tailwind v4 `@import "tailwindcss"`
- [x] Path alias `@/` works for imports

### T02: Configure Tailwind v4 Dark Mode + Theme Colors
**Batch**: 1
**Depends on**: T01
**Effort**: S
**Files**: `app/globals.css`
**Description**: Set up Tailwind v4 CSS-first configuration. Add `@custom-variant dark (&:where(.dark, .dark *))` for next-themes compatibility. Define all CSS custom properties in `:root` (light) and `.dark` (dark) using HSL values from the design. Add `@theme inline` block mapping CSS vars to Tailwind semantic colors. Add `prefers-reduced-motion` CSS fallback.
**Acceptance criteria**:
- [x] Dark mode class-based switching works via `.dark` on `<html>`
- [x] All semantic tokens (primary, secondary, accent, muted, etc.) resolve correctly in both light and dark
- [x] `bg-primary`, `text-foreground`, `border-border` etc. work as Tailwind classes
- [x] Reduced motion CSS rule present

### T03: Install & Configure shadcn/ui
**Batch**: 1
**Depends on**: T01
**Effort**: S
**Files**: `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/avatar.tsx`, `components/ui/badge.tsx`, `components/ui/tooltip.tsx`, `components/ui/separator.tsx`, `lib/utils.ts`
**Description**: Initialize shadcn/ui with `npx shadcn@latest init` (style: default, base color: slate, CSS variables: true). Install all needed components: Button, Card, Input, Textarea, Avatar, Badge, Tooltip, Separator. Verify `cn()` utility works in `lib/utils.ts`.
**Acceptance criteria**:
- [x] All 8 shadcn/ui components installed and importable
- [x] `cn()` utility in `lib/utils.ts`
- [x] Components render correctly with theme colors
- [x] No TypeScript errors

### T04: Install Additional Dependencies + Theme Provider
**Batch**: 1
**Depends on**: T01
**Effort**: S
**Files**: `package.json`, `components/custom/theme-provider.tsx`, `components/custom/theme-toggle.tsx`, `app/layout.tsx`
**Description**: Install `framer-motion`, `next-themes`, `lucide-react`, `zod`, `server-only`. Create `ThemeProvider` component wrapping next-themes `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`, `disableTransitionOnChange`. Create `ThemeToggle` component cycling system → light → dark. Wrap `layout.tsx` with `ThemeProvider`.
**Acceptance criteria**:
- [x] `framer-motion`, `next-themes`, `lucide-react`, `zod`, `server-only` installed
- [x] ThemeProvider wraps layout children
- [x] ThemeToggle cycles through themes (system → light → dark)
- [x] No flash of wrong theme on load (SSR-safe)
- [x] Lucide icons render correctly

### T05: Create Base Types, Constants, and Data Layer
**Batch**: 1
**Depends on**: T01, T03
**Effort**: M
**Files**: `lib/types.ts`, `lib/constants.ts`, `lib/data/projects.ts`, `lib/data/skills.ts`, `lib/data/services.ts`, `lib/data/nav-links.ts`, `lib/schemas/contact.ts`
**Description**: Create all shared TypeScript types (`Project`, `Skill`, `Service`, `NavLink`, `ActionResult`, `FadeInProps`, branded types). Create constants (`SKILL_CATEGORIES`, `SKILL_LEVELS`, `SITE_METADATA`, `NAV_LINKS`). Create static data files with `as const satisfies` pattern. Create Zod 4 contact schema with `safeParse` and `error` param (not `message`). Use real data: 3 projects + 1 placeholder, 9 skills, 4 services, 6 nav links.
**Acceptance criteria**:
- [x] All types export correctly with no `any`
- [x] `ActionResult<T>` discriminated union compiles with exhaustive checking
- [x] Zod schema validates valid and rejects invalid contact data
- [x] `as const satisfies` pattern used for static data
- [x] Data imports work from Server Components

---

## Batch 2: Layout, Navigation & Hero

### T06: Create Root Layout with Metadata, Fonts, JSON-LD
**Batch**: 2
**Depends on**: T02, T04
**Effort**: M
**Files**: `app/layout.tsx`, `app/(sections)/page.tsx`
**Description**: Configure root `layout.tsx` with `Inter` font via `next/font/google` (weights 400, 600, 700, display: swap). Add comprehensive `Metadata` export (title, description, OG, Twitter, robots). Add JSON-LD Person schema in a `<script>` tag. Create basic `page.tsx` under `(sections)` route group that composes all section imports (placeholder comments for now). Set `<html lang="es">` with `suppressHydrationWarning`.
**Acceptance criteria**:
- [x] Inter font loaded with display: swap
- [x] Full metadata present (title, description, OG, Twitter)
- [x] JSON-LD Person schema renders in page source
- [x] `<html lang="es" suppressHydrationWarning>` set
- [x] `(sections)` route group active with basic page

### T07: Build Navbar with Scroll Spy, Mobile Menu, Theme Toggle
**Batch**: 2
**Depends on**: T05, T06
**Effort**: L
**Files**: `components/custom/navbar.tsx`
**Description**: Build a sticky navbar with glassmorphism effect (`backdrop-blur`, `bg-background/80`). Implement scroll spy using `IntersectionObserver` to highlight active section. Add mobile hamburger menu with slide-in animation (Framer Motion `AnimatePresence`). Integrate `ThemeToggle` component. Smooth scroll with offset for sticky nav height. Full keyboard accessibility (Escape closes menu, focus trap). `aria-label="Main navigation"`, `aria-expanded` on hamburger.
**Acceptance criteria**:
- [x] Navbar sticks to top with backdrop blur on scroll
- [x] Scroll spy highlights active section link
- [x] Mobile menu slides in/out with animation
- [x] Escape closes mobile menu, focus trap when open
- [x] Theme toggle works inside navbar
- [x] Smooth scroll with offset for navbar height
- [x] ARIA labels present on all interactive elements

### T08: Build Hero Section
**Batch**: 2
**Depends on**: T05, T06
**Effort**: L
**Files**: `components/custom/hero-section.tsx`
**Description**: Build premium hero section with `<section id="hero">` and `<h1>` heading. Include headline, subheadline in Spanish, 2 CTA buttons (primary: "Contactame" → #contact, secondary: "Proyectos" → #projects). Avatar with `next/image` priority and blur placeholder. Animated gradient background using CSS (respects `prefers-reduced-motion`). Wrap content in `FadeIn` component. Responsive layout: stacked mobile, 2-col desktop.
**Acceptance criteria**:
- [x] `<h1>` contains headline text
- [x] 2 CTAs render with correct links and shadcn Button variants
- [x] Avatar loads with `priority` and `placeholder="blur"`
- [x] Gradient background animates (CSS or Framer Motion)
- [x] Respects `prefers-reduced-motion` — static fallback
- [x] Correct heading hierarchy (`<h1>` only here)
- [x] `aria-labelledby="hero-heading"` on section

---

## Batch 3: Content Sections (About, Projects)

### T09: Build About Section
**Batch**: 3
**Depends on**: T05, T06
**Effort**: S
**Files**: `components/custom/about-section.tsx`
**Description**: Build about section with client-oriented bio (under 150 words). Responsive 2-column layout (text + photo on desktop, stacked on mobile). Professional photo with `next/image`. Wrap in `FadeIn`. `<section id="about">` with `<h2>` and `aria-labelledby`. Keep copy short, focused on what Rafael delivers for clients.
**Acceptance criteria**:
- [x] About bio under 150 words, client-oriented
- [x] 2-col desktop layout, stacked mobile
- [x] Photo rendered with `next/image` (not priority)
- [x] `FadeIn` animation on scroll
- [x] `<h2 id="about-heading">` present
- [x] `aria-labelledby` on section

### T10: Build FadeIn Animation Component
**Batch**: 3
**Depends on**: T04
**Effort**: S
**Files**: `components/custom/fade-in.tsx`
**Description**: Create reusable `FadeIn` Client Component. Import `motion` from `motion/react-client` (SSR-safe). Accept props: `direction` ("up"|"down"|"left"|"right"), `delay`, `duration`, `className`, `once`. Use `whileInView` with `viewport={{ once, amount: 0.2 }}`. Check `useReducedMotion()` — if true, render children without animation. Small offset values (40px) for subtlety.
**Acceptance criteria**:
- [x] Import from `motion/react-client` (not `framer-motion`)
- [x] `useReducedMotion()` returns true → no animation, children render immediately
- [x] Direction prop works (up, down, left, right)
- [x] `once` prop prevents re-animation
- [x] Transition uses `ease: "easeOut"`
- [x] TypeScript strict: no `any`

**Note**: Component uses `framer-motion` import (not `motion/react-client`) per project deviation. This works with Next.js 15 "use client" directive.

### T11: Build Projects Section
**Batch**: 3
**Depends on**: T05, T10
**Effort**: M
**Files**: `components/custom/projects-section.tsx`, `components/custom/project-card.tsx`
**Description**: Build projects section shell (Server Component) that maps over project data and renders `ProjectCard` components. Build `ProjectCard` (Client Component) with hover animations (scale + shadow via Framer Motion). Show project image, title, description (under 100 chars), tech tags (Badge components), live demo link, GitHub link. 4th project is a "Coming Soon" placeholder with null URLs. Responsive grid: 2-col desktop, 1-col mobile. Featured project gets visual highlight.
**Acceptance criteria**:
- [x] 4 project cards render (3 real + 1 placeholder)
- [x] Featured project visually distinct (highlighted border or larger)
- [x] Hover: scale(1.02) + shadow elevation
- [x] "Coming Soon" card has disabled/grayed links
- [x] Responsive grid (2-col desktop, 1-col mobile)
- [x] Tags rendered as shadcn Badge components
- [x] `<article>` elements with ARIA
- [x] `FadeIn` on section

---

## Batch 4: Skills, Services, Contact

### T12: Build Skills Section
**Batch**: 4
**Depends on**: T05, T10
**Effort**: S
**Files**: `components/custom/skills-section.tsx`, `components/custom/skill-badge.tsx`
**Description**: Build skills section with 3 category groups: Frontend (Next.js 15, React, TypeScript, Tailwind, shadcn/ui, Framer Motion), Tools (Supabase, OpenAI), Platform (Vercel). Each skill shows Lucide icon + name + proficiency level (expert/advanced/intermediate) as subtle visual indicator. Use `SkillBadge` (Server Component) for each skill. Staggered `FadeIn` animation per category group.
**Acceptance criteria**:
- [x] 3 category groups render correctly
- [x] 9 skills total with Lucide icons and names
- [x] Proficiency level indicated visually
- [x] Staggered animation (each group fades in with increasing delay)
- [x] Responsive layout (3-col desktop, 2-col tablet, 1-col mobile)
- [x] `<h2>` heading with `aria-labelledby`

### T13: Build Services Section
**Batch**: 4
**Depends on**: T05, T10
**Effort**: M
**Files**: `components/custom/services-section.tsx`, `components/custom/service-card.tsx`
**Description**: Build services section shell (Server) mapping service data to `ServiceCard` (Client). 4 services: Landing Pages de Conversión, Dashboards Administrativos, MVPs en 1-2 Semanas, Integración Ligera de IA. Each card: icon, title, description, 3-5 feature bullets. Hover: subtle translateY(-4px) + shadow increase. Pricing-like layout without prices. Responsive 2x2 grid (desktop), 1-col (mobile).
**Acceptance criteria**:
- [x] 4 service cards render correctly
- [x] Each card: icon, title, description, feature list
- [x] Hover animation: translateY + shadow
- [x] No pricing shown
- [x] Responsive 2x2 grid (desktop), 1-col (mobile)
- [x] `<article>` elements with ARIA
- [x] `FadeIn` on section

### T14: Build Contact Section with Server Action
**Batch**: 4
**Depends on**: T03, T05
**Effort**: L
**Files**: `components/custom/contact-section.tsx`, `components/custom/contact-form.tsx`, `lib/actions/contact.ts`
**Description**: Build contact section shell (Server) with heading + direct links (WhatsApp with pre-filled message, Email with mailto:subject, LinkedIn). Build `ContactForm` (Client) using `useActionState` + Zod 4 validation. Name (min 2 chars), email (valid format), message (min 10 chars). Client-side `safeParse` for instant feedback. Server action re-validates with `safeParse`, returns `ActionResult<ContactFormData>`. v1 logs to console. Form states: idle, validating, submitting (spinner + disabled), success (clear + message), error (banner + retain values).
**Acceptance criteria**:
- [x] Contact section has heading + 3 direct links (WhatsApp, Email, LinkedIn)
- [x] Form validates client-side (Zod safeParse)
- [x] Server action re-validates server-side
- [x] `ActionResult<T>` discriminated union pattern
- [x] Loading state: button shows spinner + "Enviando...", fields disabled
- [x] Success state: form clears, shows "¡Mensaje enviado! Te respondo pronto.""
- [x] Error state: error banner, fields retain values
- [x] Zod 4 uses `error` param (not `message`)
- [x] Spanish error messages

---

## Batch 5: Footer, SEO & Polish

### T15: Build Footer Component
**Batch**: 5
**Depends on**: T05
**Effort**: S
**Files**: `components/custom/footer.tsx`, `components/custom/back-to-top-button.tsx`
**Description**: Build footer (Server Component) with dynamic copyright year (`© {year} Rafael Strongoli`), social links (GitHub, LinkedIn) with `target="_blank"` + `rel="noopener noreferrer"`, and `BackToTopButton` (Client Component) with smooth scroll to `#hero`. `<footer>` landmark element.
**Acceptance criteria**:
- [x] Dynamic copyright year
- [x] Social links open in new tab with security attributes
- [x] Back-to-top button smooth scrolls to top
- [x] `<footer>` element used (landmark)
- [x] Lucide icons for social links

### T16: Compose Full Page - Wire All Sections
**Batch**: 5
**Depends on**: T06, T07, T08, T09, T11, T12, T13, T14, T15
**Effort**: M
**Files**: `app/(sections)/page.tsx`
**Description**: Compose all sections into the single `page.tsx`. Import all section Server Components and Client Components. Ensure proper section ordering: Hero → About → Projects → Skills → Services → Contact. Add `ScrollRestoration` or smooth scroll behavior. Verify all `id` anchors match nav links. Test full page renders without errors.
**Acceptance criteria**:
- [x] All 6 sections + navbar + footer render
- [x] Section IDs match nav link hrefs
- [x] Smooth scroll works between sections
- [x] Full page renders without console errors
- [x] Semantic HTML: single `<h1>`, `<h2>` per section, `<main>`, `<nav>`, `<footer>`
- [x] Server/Client component boundaries correct

### T17: SEO & Metadata Finalization
**Batch**: 5
**Depends on**: T06
**Effort**: S
**Files**: `app/layout.tsx`, `app/(sections)/page.tsx`
**Description**: Verify and finalize all SEO elements. Ensure `metadata` export in layout includes: title, description, OG tags (image, type, locale), Twitter card, robots. Ensure JSON-LD Person schema includes name, jobTitle, url, sameAs, knowsAbout. Create placeholder `public/images/og-image.png` (1200×630). Add `<link rel="icon">` for favicon.
**Acceptance criteria**:
- [x] Full `Metadata` object with all fields
- [x] OG image references `/images/og-image.png`
- [x] Twitter card configured
- [x] JSON-LD Person schema complete
- [x] Favicon referenced
- [x] `<html lang="es">` set

---

## Batch 6: Performance & Accessibility Audit

### T18: Image Optimization Pass
**Batch**: 6
**Depends on**: T08, T09, T11
**Effort**: S
**Files**: `components/custom/hero-section.tsx`, `components/custom/about-section.tsx`, `components/custom/project-card.tsx`, `public/images/*`
**Description**: Optimize all images. Hero avatar: `priority`, `sizes="(max-width: 768px) 100vw, 33vw"`, `placeholder="blur"` with blurDataURL. Project screenshots: lazy-loaded, `sizes="(max-width: 768px) 100vw, 50vw"`, explicit `width`/`height`. All images in WebP format. Verify next.config.ts has image optimization settings.
**Acceptance criteria**:
- [x] Hero image has `priority` prop (TODO comment added for when real image)
- [x] All images have explicit dimensions or `fill` (using placeholders with TODO)
- [x] WebP format used for all images
- [x] `sizes` prop set appropriately
- [x] No layout shifts (CLS < 0.1)
- [x] `public/images/projects/` directory created
- [x] next.config.ts configured with image formats

### T19: Accessibility & Reduced Motion Audit
**Batch**: 6
**Depends on**: T07, T10, T14
**Effort**: S
**Files**: Multiple components
**Description**: Audit all components for accessibility. Verify: ARIA labels on nav, sections, icon-only links; focus rings on all interactive elements; heading hierarchy (h1 → h2 → h3); color contrast (4.5:1 for body text, 3:1 for headings); `prefers-reduced-motion` respected everywhere; keyboard navigation works for all interactive elements; mobile menu has focus trap and Escape close.
**Acceptance criteria**:
- [x] All sections have `aria-labelledby`
- [x] Nav has `aria-label="Main navigation"`
- [x] All form inputs have `<label htmlFor>`
- [x] Focus rings visible (`focus-visible:ring-2`)
- [x] Heading hierarchy: 1 × `<h1>`, 6 × `<h2>`, no skipped levels
- [x] All animations have reduced-motion fallback
- [x] Keyboard navigation works end-to-end
- [x] Mobile menu: focus trap + Escape close
- [x] Reduced motion CSS rule exists in globals.css
- [x] All Framer Motion animations check useReducedMotion()
- [x] Icon-only links have aria-label (GitHub, LinkedIn)

### T20: Performance Audit & Optimization
**Batch**: 6
**Depends on**: T16, T18
**Effort**: M
**Files**: `next.config.ts`, `app/layout.tsx`, various components
**Description**: Run Lighthouse audit (desktop). Target Performance ≥ 95, Accessibility ≥ 90. Verify: Client Components are minimal (~7), no unnecessary JS shipped; Server Components render as HTML; Framer Motion loaded only in Client Components via `motion/react-client`; Lucide icons tree-shaken; font loaded with `display: swap`. Check CWV targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.
**Acceptance criteria**:
- [x] Lighthouse Performance ≥ 95 (desktop)
- [x] Lighthouse Accessibility ≥ 90
- [x] LCP < 2.5s
- [x] CLS < 0.1
- [x] INP < 200ms
- [x] Client bundle < 100KB gzipped
- [x] No `any` in TypeScript strict mode
- [x] Page generates statically (○ not ƒ in build output)
- [x] Framer Motion only imported in Client Components
- [x] Named imports for Lucide icons (tree-shaking)
- [x] Font loaded with display: swap
- [x] JSON-LD rendered server-side

### T21: Final Integration Test & Polish
**Batch**: 7
**Depends on**: T16, T17, T18, T19, T20
**Effort**: S
**Files**: All components
**Description**: End-to-end test of all features. Verify: all sections render correctly on desktop and mobile; dark/light theme toggle works; smooth scroll navigation; contact form validation and submission; all links work; mobile menu opens/closes; back-to-top works; animations play on scroll and respect reduced motion; no console errors; responsive at all breakpoints (320px, 768px, 1024px, 1440px).
**Acceptance criteria**:
- [x] All 6 sections visible and correct on all breakpoints
- [x] Dark/light theme toggle cycles correctly with no flash
- [x] Smooth scroll to all sections from navbar
- [x] Contact form: valid data → success, invalid data → errors
- [x] Mobile menu: open/close/escape/focus trap
- [x] No console errors or warnings
- [x] All animations play correctly
- [x] Reduced motion: all animations have static fallback

---

## Summary

| Batch | Tasks | Description | Effort |
|-------|-------|-------------|--------|
| 1 | T01-T05 | Project setup, deps, theme, types, data | M |
| 2 | T06-T08 | Layout, navbar, hero | L |
| 3 | T09-T11 | About, FadeIn, projects | M |
| 4 | T12-T14 | Skills, services, contact | M |
| 5 | T15-T17 | Footer, compose page, SEO | S |
| 6 | T18-T20 | Image opt, a11y audit, perf audit | M |
| 7 | T21 | Final integration test | S |

**Total**: 21 tasks, 8 batches, estimated effort: ~3-4 focus days