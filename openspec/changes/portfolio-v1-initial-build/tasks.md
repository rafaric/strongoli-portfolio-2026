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
- Next.js 15 project boots with `next dev`
- TypeScript strict mode active with all extra flags
- `app/layout.tsx` renders without errors
- `app/globals.css` has Tailwind v4 `@import "tailwindcss"`
- Path alias `@/` works for imports

### T02: Configure Tailwind v4 Dark Mode + Theme Colors
**Batch**: 1
**Depends on**: T01
**Effort**: S
**Files**: `app/globals.css`
**Description**: Set up Tailwind v4 CSS-first configuration. Add `@custom-variant dark (&:where(.dark, .dark *))` for next-themes compatibility. Define all CSS custom properties in `:root` (light) and `.dark` (dark) using HSL values from the design. Add `@theme inline` block mapping CSS vars to Tailwind semantic colors. Add `prefers-reduced-motion` CSS fallback.
**Acceptance criteria**:
- Dark mode class-based switching works via `.dark` on `<html>`
- All semantic tokens (primary, secondary, accent, muted, etc.) resolve correctly in both light and dark
- `bg-primary`, `text-foreground`, `border-border` etc. work as Tailwind classes
- Reduced motion CSS rule present

### T03: Install & Configure shadcn/ui
**Batch**: 1
**Depends on**: T01
**Effort**: S
**Files**: `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/avatar.tsx`, `components/ui/badge.tsx`, `components/ui/tooltip.tsx`, `components/ui/separator.tsx`, `lib/utils.ts`
**Description**: Initialize shadcn/ui with `npx shadcn@latest init` (style: default, base color: slate, CSS variables: true). Install all needed components: Button, Card, Input, Textarea, Avatar, Badge, Tooltip, Separator. Verify `cn()` utility works in `lib/utils.ts`.
**Acceptance criteria**:
- All 8 shadcn/ui components installed and importable
- `cn()` utility in `lib/utils.ts`
- Components render correctly with theme colors
- No TypeScript errors

### T04: Install Additional Dependencies + Theme Provider
**Batch**: 1
**Depends on**: T01
**Effort**: S
**Files**: `package.json`, `components/custom/theme-provider.tsx`, `components/custom/theme-toggle.tsx`, `app/layout.tsx`
**Description**: Install `framer-motion`, `next-themes`, `lucide-react`, `zod`, `server-only`. Create `ThemeProvider` component wrapping next-themes `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`, `disableTransitionOnChange`. Create `ThemeToggle` component cycling system → light → dark. Wrap `layout.tsx` with `ThemeProvider`.
**Acceptance criteria**:
- `framer-motion`, `next-themes`, `lucide-react`, `zod`, `server-only` installed
- ThemeProvider wraps layout children
- ThemeToggle cycles through themes (system → light → dark)
- No flash of wrong theme on load (SSR-safe)
- Lucide icons render correctly

### T05: Create Base Types, Constants, and Data Layer
**Batch**: 1
**Depends on**: T01, T03
**Effort**: M
**Files**: `lib/types.ts`, `lib/constants.ts`, `lib/data/projects.ts`, `lib/data/skills.ts`, `lib/data/services.ts`, `lib/data/nav-links.ts`, `lib/schemas/contact.ts`
**Description**: Create all shared TypeScript types (`Project`, `Skill`, `Service`, `NavLink`, `ActionResult`, `FadeInProps`, branded types). Create constants (`SKILL_CATEGORIES`, `SKILL_LEVELS`, `SITE_METADATA`, `NAV_LINKS`). Create static data files with `as const satisfies` pattern. Create Zod 4 contact schema with `safeParse` and `error` param (not `message`). Use real data: 3 projects + 1 placeholder, 9 skills, 4 services, 6 nav links.
**Acceptance criteria**:
- All types export correctly with no `any`
- `ActionResult<T>` discriminated union compiles with exhaustive checking
- Zod schema validates valid and rejects invalid contact data
- `as const satisfies` pattern used for static data
- Data imports work from Server Components

---

## Batch 2: Layout, Navigation & Hero

### T06: Create Root Layout with Metadata, Fonts, JSON-LD
**Batch**: 2
**Depends on**: T02, T04
**Effort**: M
**Files**: `app/layout.tsx`, `app/(sections)/page.tsx`
**Description**: Configure root `layout.tsx` with `Inter` font via `next/font/google` (weights 400, 600, 700, display: swap). Add comprehensive `Metadata` export (title, description, OG, Twitter, robots). Add JSON-LD Person schema in a `<script>` tag. Create basic `page.tsx` under `(sections)` route group that composes all section imports (placeholder comments for now). Set `<html lang="es">` with `suppressHydrationWarning`.
**Acceptance criteria**:
- Inter font loaded with display: swap
- Full metadata present (title, description, OG, Twitter)
- JSON-LD Person schema renders in page source
- `<html lang="es" suppressHydrationWarning>` set
- `(sections)` route group active with basic page

### T07: Build Navbar with Scroll Spy, Mobile Menu, Theme Toggle
**Batch**: 2
**Depends on**: T05, T06
**Effort**: L
**Files**: `components/custom/navbar.tsx`
**Description**: Build a sticky navbar with glassmorphism effect (`backdrop-blur`, `bg-background/80`). Implement scroll spy using `IntersectionObserver` to highlight active section. Add mobile hamburger menu with slide-in animation (Framer Motion `AnimatePresence`). Integrate `ThemeToggle` component. Smooth scroll with offset for sticky nav height. Full keyboard accessibility (Escape closes menu, focus trap). `aria-label="Main navigation"`, `aria-expanded` on hamburger.
**Acceptance criteria**:
- Navbar sticks to top with backdrop blur on scroll
- Scroll spy highlights active section link
- Mobile menu slides in/out with animation
- Escape closes mobile menu, focus trap when open
- Theme toggle works inside navbar
- Smooth scroll with offset for navbar height
- ARIA labels present on all interactive elements

### T08: Build Hero Section
**Batch**: 2
**Depends on**: T05, T06
**Effort**: L
**Files**: `components/custom/hero-section.tsx`
**Description**: Build premium hero section with `<section id="hero">` and `<h1>` heading. Include headline, subheadline in Spanish, 2 CTA buttons (primary: "Contactame" → #contact, secondary: "Proyectos" → #projects). Avatar with `next/image` priority and blur placeholder. Animated gradient background using CSS (respects `prefers-reduced-motion`). Wrap content in `FadeIn` component. Responsive layout: stacked mobile, 2-col desktop.
**Acceptance criteria**:
- `<h1>` contains headline text
- 2 CTAs render with correct links and shadcn Button variants
- Avatar loads with `priority` and `placeholder="blur"`
- Gradient background animates (CSS or Framer Motion)
- Respects `prefers-reduced-motion` — static fallback
- Correct heading hierarchy (`<h1>` only here)
- `aria-labelledby="hero-heading"` on section

---

## Batch 3: Content Sections (About, Projects)

### T09: Build About Section
**Batch**: 3
**Depends on**: T05, T06
**Effort**: S
**Files**: `components/custom/about-section.tsx`
**Description**: Build about section with client-oriented bio (under 150 words). Responsive 2-column layout (text + photo on desktop, stacked on mobile). Professional photo with `next/image`. Wrap in `FadeIn`. `<section id="about">` with `<h2>` and `aria-labelledby`. Keep copy short, focused on what Rafael delivers for clients.
**Acceptance criteria**:
- About bio under 150 words, client-oriented
- 2-col desktop layout, stacked mobile
- Photo rendered with `next/image` (not priority)
- `FadeIn` animation on scroll
- `<h2 id="about-heading">` present
- `aria-labelledby` on section

### T10: Build FadeIn Animation Component
**Batch**: 3
**Depends on**: T04
**Effort**: S
**Files**: `components/custom/fade-in.tsx`
**Description**: Create reusable `FadeIn` Client Component. Import `motion` from `motion/react-client` (SSR-safe). Accept props: `direction` ("up"|"down"|"left"|"right"), `delay`, `duration`, `className`, `once`. Use `whileInView` with `viewport={{ once, amount: 0.2 }}`. Check `useReducedMotion()` — if true, render children without animation. Small offset values (40px) for subtlety.
**Acceptance criteria**:
- Import from `motion/react-client` (not `framer-motion`)
- `useReducedMotion()` returns true → no animation, children render immediately
- Direction prop works (up, down, left, right)
- `once` prop prevents re-animation
- Transition uses `ease: "easeOut"`
- TypeScript strict: no `any`

### T11: Build Projects Section
**Batch**: 3
**Depends on**: T05, T10
**Effort**: M
**Files**: `components/custom/projects-section.tsx`, `components/custom/project-card.tsx`
**Description**: Build projects section shell (Server Component) that maps over project data and renders `ProjectCard` components. Build `ProjectCard` (Client Component) with hover animations (scale + shadow via Framer Motion). Show project image, title, description (under 100 chars), tech tags (Badge components), live demo link, GitHub link. 4th project is a "Coming Soon" placeholder with null URLs. Responsive grid: 2-col desktop, 1-col mobile. Featured project gets visual highlight.
**Acceptance criteria**:
- 4 project cards render (3 real + 1 placeholder)
- Featured project visually distinct (highlighted border or larger)
- Hover: scale(1.02) + shadow elevation
- "Coming Soon" card has disabled/grayed links
- Responsive grid (2-col desktop, 1-col mobile)
- Tags rendered as shadcn Badge components
- `<article>` elements with ARIA
- `FadeIn` on section

---

## Batch 4: Skills, Services, Contact

### T12: Build Skills Section
**Batch**: 4
**Depends on**: T05, T10
**Effort**: S
**Files**: `components/custom/skills-section.tsx`, `components/custom/skill-badge.tsx`
**Description**: Build skills section with 3 category groups: Frontend (Next.js 15, React, TypeScript, Tailwind, shadcn/ui, Framer Motion), Tools (Supabase, OpenAI), Platform (Vercel). Each skill shows Lucide icon + name + proficiency level (expert/advanced/intermediate) as subtle visual indicator. Use `SkillBadge` (Server Component) for each skill. Staggered `FadeIn` animation per category group.
**Acceptance criteria**:
- 3 category groups render correctly
- 9 skills total with Lucide icons and names
- Proficiency level indicated visually
- Staggered animation (each group fades in with increasing delay)
- Responsive layout (3-col desktop, 2-col tablet, 1-col mobile)
- `<h2>` heading with `aria-labelledby`

### T13: Build Services Section
**Batch**: 4
**Depends on**: T05, T10
**Effort**: M
**Files**: `components/custom/services-section.tsx`, `components/custom/service-card.tsx`
**Description**: Build services section shell (Server) mapping service data to `ServiceCard` (Client). 4 services: Landing Pages de Conversión, Dashboards Administrativos, MVPs en 1-2 Semanas, Integración Ligera de IA. Each card: icon, title, description, 3-5 feature bullets. Hover: subtle translateY(-4px) + shadow increase. Pricing-like layout without prices. Responsive 2x2 grid (desktop), 1-col (mobile).
**Acceptance criteria**:
- 4 service cards render correctly
- Each card: icon, title, description, feature list
- Hover animation: translateY + shadow
- No pricing shown
- Responsive 2x2 grid (desktop), 1-col (mobile)
- `<article>` elements with ARIA
- `FadeIn` on section

### T14: Build Contact Section with Server Action
**Batch**: 4
**Depends on**: T03, T05
**Effort**: L
**Files**: `components/custom/contact-section.tsx`, `components/custom/contact-form.tsx`, `lib/actions/contact.ts`
**Description**: Build contact section shell (Server) with heading + direct links (WhatsApp with pre-filled message, Email with mailto:subject, LinkedIn). Build `ContactForm` (Client) using `useActionState` + Zod 4 validation. Name (min 2 chars), email (valid format), message (min 10 chars). Client-side `safeParse` for instant feedback. Server action re-validates with `safeParse`, returns `ActionResult<ContactFormData>`. v1 logs to console. Form states: idle, validating, submitting (spinner + disabled), success (clear + message), error (banner + retain values).
**Acceptance criteria**:
- Contact section has heading + 3 direct links (WhatsApp, Email, LinkedIn)
- Form validates client-side (Zod safeParse)
- Server action re-validates server-side
- `ActionResult<T>` discriminated union pattern
- Loading state: button shows spinner + "Enviando...", fields disabled
- Success state: form clears, shows "¡Mensaje enviado! Te respondo pronto."
- Error state: error banner, fields retain values
- Zod 4 uses `error` param (not `message`)
- Spanish error messages

---

## Batch 5: Footer, SEO & Polish

### T15: Build Footer Component
**Batch**: 5
**Depends on**: T05
**Effort**: S
**Files**: `components/custom/footer.tsx`, `components/custom/back-to-top-button.tsx`
**Description**: Build footer (Server Component) with dynamic copyright year (`© {year} Rafael Strongoli`), social links (GitHub, LinkedIn) with `target="_blank"` + `rel="noopener noreferrer"`, and `BackToTopButton` (Client Component) with smooth scroll to `#hero`. `<footer>` landmark element.
**Acceptance criteria**:
- Dynamic copyright year
- Social links open in new tab with security attributes
- Back-to-top button smooth scrolls to top
- `<footer>` element used (landmark)
- Lucide icons for social links

### T16: Compose Full Page - Wire All Sections
**Batch**: 5
**Depends on**: T06, T07, T08, T09, T11, T12, T13, T14, T15
**Effort**: M
**Files**: `app/(sections)/page.tsx`
**Description**: Compose all sections into the single `page.tsx`. Import all section Server Components and Client Components. Ensure proper section ordering: Hero → About → Projects → Skills → Services → Contact. Add `ScrollRestoration` or smooth scroll behavior. Verify all `id` anchors match nav links. Test full page renders without errors.
**Acceptance criteria**:
- All 6 sections + navbar + footer render
- Section IDs match nav link hrefs
- Smooth scroll works between sections
- Full page renders without console errors
- Semantic HTML: single `<h1>`, `<h2>` per section, `<main>`, `<nav>`, `<footer>`
- Server/Client component boundaries correct

### T17: SEO & Metadata Finalization
**Batch**: 5
**Depends on**: T06
**Effort**: S
**Files**: `app/layout.tsx`, `app/(sections)/page.tsx`
**Description**: Verify and finalize all SEO elements. Ensure `metadata` export in layout includes: title, description, OG tags (image, type, locale), Twitter card, robots. Ensure JSON-LD Person schema includes name, jobTitle, url, sameAs, knowsAbout. Create placeholder `public/images/og-image.png` (1200×630). Add `<link rel="icon">` for favicon.
**Acceptance criteria**:
- Full `Metadata` object with all fields
- OG image references `/images/og-image.png`
- Twitter card configured
- JSON-LD Person schema complete
- Favicon referenced
- `<html lang="es">` set

---

## Batch 6: Performance & Accessibility Audit

### T18: Image Optimization Pass
**Batch**: 6
**Depends on**: T08, T09, T11
**Effort**: S
**Files**: `components/custom/hero-section.tsx`, `components/custom/about-section.tsx`, `components/custom/project-card.tsx`, `public/images/*`
**Description**: Optimize all images. Hero avatar: `priority`, `sizes="(max-width: 768px) 100vw, 33vw"`, `placeholder="blur"` with blurDataURL. Project screenshots: lazy-loaded, `sizes="(max-width: 768px) 100vw, 50vw"`, explicit `width`/`height`. All images in WebP format. Verify next.config.ts has image optimization settings.
**Acceptance criteria**:
- Hero image has `priority` prop
- All images have explicit dimensions or `fill`
- WebP format used for all images
- `sizes` prop set appropriately
- No layout shifts (CLS < 0.1)

### T19: Accessibility & Reduced Motion Audit
**Batch**: 6
**Depends on**: T07, T10, T14
**Effort**: S
**Files**: Multiple components
**Description**: Audit all components for accessibility. Verify: ARIA labels on nav, sections, icon-only links; focus rings on all interactive elements; heading hierarchy (h1 → h2 → h3); color contrast (4.5:1 for body text, 3:1 for headings); `prefers-reduced-motion` respected everywhere; keyboard navigation works for all interactive elements; mobile menu has focus trap and Escape close.
**Acceptance criteria**:
- All sections have `aria-labelledby`
- Nav has `aria-label="Main navigation"`
- All form inputs have `<label htmlFor>`
- Focus rings visible (`focus-visible:ring-2`)
- Heading hierarchy: 1 × `<h1>`, 6 × `<h2>`, no skipped levels
- All animations have reduced-motion fallback
- Keyboard navigation works end-to-end
- Mobile menu: focus trap + Escape close

### T20: Performance Audit & Optimization
**Batch**: 6
**Depends on**: T16, T18
**Effort**: M
**Files**: `next.config.ts`, `app/layout.tsx`, various components
**Description**: Run Lighthouse audit (desktop). Target Performance ≥ 95, Accessibility ≥ 90. Verify: Client Components are minimal (~7), no unnecessary JS shipped; Server Components render as HTML; Framer Motion loaded only in Client Components via `motion/react-client`; Lucide icons tree-shaken; font loaded with `display: swap`. Check CWV targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.
**Acceptance criteria**:
- Lighthouse Performance ≥ 95 (desktop)
- Lighthouse Accessibility ≥ 90
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- Client bundle < 100KB gzipped
- No `any` in TypeScript strict mode

### T21: Final Integration Test & Polish
**Batch**: 7
**Depends on**: T16, T17, T18, T19, T20
**Effort**: S
**Files**: All components
**Description**: End-to-end test of all features. Verify: all sections render correctly on desktop and mobile; dark/light theme toggle works; smooth scroll navigation; contact form validation and submission; all links work; mobile menu opens/closes; back-to-top works; animations play on scroll and respect reduced motion; no console errors; responsive at all breakpoints (320px, 768px, 1024px, 1440px).
**Acceptance criteria**:
- All 6 sections visible and correct on all breakpoints
- Dark/light theme toggle cycles correctly with no flash
- Smooth scroll to all sections from navbar
- Contact form: valid data → success, invalid data → errors
- Mobile menu: open/close/escape/focus trap
- No console errors or warnings
- All animations play correctly
- Reduced motion: all animations have static fallback

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