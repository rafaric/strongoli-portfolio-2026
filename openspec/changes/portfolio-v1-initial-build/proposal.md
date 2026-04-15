# Proposal: Portfolio v1 Initial Build

## Intent

Rafael Strongoli, freelance frontend developer specializing in Next.js 15 + shadcn/ui + Tailwind, needs a **premium one-page portfolio** that communicates professionalism, speed, and visual excellence to LatAm startup founders and entrepreneurs. The portfolio is a lead-generation tool — its primary business goal is converting visitors into clients by showcasing technical expertise, real projects, and a frictionless contact path. This is a greenfield build: no existing code, no constraints from legacy decisions.

## Scope

### In Scope
- **Project scaffolding**: Next.js 15 App Router project with TypeScript strict mode, Tailwind v4, shadcn/ui, Framer Motion, next-themes, and Lucide React
- **Theme system**: Dark mode default with blue/violet accent palette, system theme detection, smooth toggle via next-themes
- **Hero Section**: Impacting first-screen with avatar/photo, headline, subheadline, 2 clear CTAs (Contact + Projects)
- **About Section**: Short, client-oriented freelance bio
- **Featured Projects Section**: Grid of 3-4 project cards with premium hover effects, live demo links, and GitHub links
- **Stack & Skills Section**: Visual display using icons + badges (Next.js 15, React, TypeScript, Tailwind, shadcn/ui, Framer Motion, Supabase, OpenAI, Vercel)
- **Services Section**: 4 service cards (Landing pages de conversion, Dashboards administrativos, MVPs en 1-2 semanas, Integracion ligera de IA)
- **Contact Section**: Server Action form with Zod validation + direct links (WhatsApp, Email, LinkedIn, Calendly)
- **Smooth scroll navigation**: Sticky minimal navbar linking to all sections
- **Framer Motion animations**: Fade-ins on scroll, hover scales on cards, subtle hero parallax — all performance-conscious
- **SEO & metadata**: generateMetadata, Open Graph tags, JSON-LD (Person schema), proper semantic HTML
- **Accessibility foundation**: WCAG 2.1 AA contrast, ARIA labels, heading hierarchy, keyboard navigation
- **Performance**: Lighthouse 95+ target — Server Components by default, lazy loading below fold, optimized images
- **Responsive**: Mobile-first design, all sections fully usable on mobile

### Out of Scope
- Blog or CMS integration (future v2)
- Internationalization / i18n (future v2)
- CMS-driven project data (hardcoded data is fine for v1)
- Analytics/CDN deployment pipeline (separate change)
- Admin dashboard for managing content
- CMS or database backend — all content is static/hardcoded
- Authentication or user accounts
- E2E test suite (unit/component tests only in v1)
- Custom domain/DNS configuration

## Approach

### Architecture: Next.js 15 App Router with Route Groups

```
strongoli-portfolio-2026/
├── app/
│   ├── (sections)/          # Route group — no URL impact
│   │   └── page.tsx         # Single page composing all sections
│   ├── layout.tsx           # Root layout (ThemeProvider, fonts, metadata)
│   ├── globals.css          # Tailwind v4 + custom-variant + CSS vars
│   └── template.tsx         # Template for section transitions
├── components/
│   ├── ui/                  # shadcn/ui primitives (Button, Card, Badge, Input, Textarea, Avatar, Tooltip)
│   └── custom/              # Portfolio-specific components
│       ├── navbar.tsx       # Sticky nav with smooth scroll links
│       ├── theme-toggle.tsx # Dark/light toggle (client component)
│       ├── hero-section.tsx
│       ├── about-section.tsx
│       ├── projects-section.tsx
│       ├── project-card.tsx
│       ├── skills-section.tsx
│       ├── skill-badge.tsx
│       ├── services-section.tsx
│       ├── service-card.tsx
│       ├── contact-section.tsx
│       ├── contact-form.tsx # Client component with useActionState
│       └── footer.tsx
├── lib/
│   ├── utils.ts             # cn() and utilities
│   ├── actions/
│   │   └── contact.ts       # Server Action for contact form
│   └── data/
│       ├── projects.ts      # Static project data
│       ├── skills.ts        # Static skills data
│       └── services.ts      # Static services data
├── public/
│   └── images/              # Avatar, project screenshots
├── next.config.ts
├── tailwind.config.ts       # (Tailwind v4 uses CSS-first config, minimal JS config)
├── tsconfig.json            # Strict mode
└── package.json
```

### Key Technical Decisions

1. **Single page with route group** `(sections)`: Clean organization without URL complexity. All sections render on one page with `id` anchors for smooth scroll navigation.

2. **Server Components by default**: Only interactive elements become Client Components (`"use client"`): `Navbar`, `ThemeToggle`, `ContactForm`, and animation wrappers. ~80% of components remain Server Components for optimal bundle size.

3. **Framer Motion via `motion/react-client`**: SSR-safe import pattern. Wrap animated sections in a small `FadeIn` client component to keep parent sections as Server Components.

4. **Tailwind v4 with `@custom-variant dark`**: CSS-based dark mode config using `@custom-variant dark (&:where(.dark, .dark *))`, paired with next-themes `attribute="class"` for seamless theme switching.

5. **Contact form via Server Action + `useActionState`**: No API routes needed. Zod validates both client and server. Progressive enhancement baked in.

6. **Static data in `/lib/data/`**: Hardcoded TypeScript objects for projects, skills, services. Easy to migrate to CMS later — data layer is already separated.

7. **shadcn/ui as primitives**: Use Button, Card, Badge, Input, Textarea, Avatar, Tooltip from shadcn/ui. Customize exclusively via Tailwind utility classes.

8. **next-themes for dark/light**: ThemeProvider wrapping root layout, `defaultTheme="system"`, `attribute="class"`. Persistent across sessions.

### Component Boundary: Server vs Client

| Component | Rendering | Reason |
|-----------|-----------|--------|
| `layout.tsx` | Server | Static shell, ThemeProvider client wrapper |
| `page.tsx` | Server | Composes section Server Components |
| `hero-section` | Server | Static content |
| `about-section` | Server | Static content |
| `projects-section` | Server | Static content, child cards are Server |
| `project-card` | Client | Hover animations |
| `skills-section` | Server | Static content |
| `services-section` | Server | Static content |
| `service-card` | Client | Hover animations |
| `contact-section` | Server | Static shell, form is Client |
| `contact-form` | Client | `useActionState`, interactivity |
| `navbar` | Client | Scroll spy, mobile menu, theme toggle |
| `theme-toggle` | Client | next-themes hook |
| `FadeIn` | Client | Framer Motion animation wrapper |

### Performance Strategy

- Server Components for all static content (~80% of payload)
- `next/image` with `priority` on hero avatar (LCP)
- Lazy-load below-fold sections via dynamic imports or Intersection Observer
- Framer Motion `viewport` trigger for scroll animations (not on mount)
- Minimal Client Component boundary — animations and interactivity only where needed
- Target: Lighthouse Performance 95+, LCP < 2.5s, CLS < 0.1

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/` | New | Root layout, single page, globals.css — entire app directory |
| `components/ui/` | New | shadcn/ui primitives (8-10 components) |
| `components/custom/` | New | 10-12 portfolio-specific section and utility components |
| `lib/data/` | New | Static data files for projects, skills, services |
| `lib/actions/` | New | Contact form Server Action |
| `lib/utils.ts` | New | cn() utility |
| `public/images/` | New | Avatar, project screenshots, OG image |
| `next.config.ts` | New | Next.js configuration (image domains, etc.) |
| `tsconfig.json` | New | TypeScript strict mode config |
| `package.json` | New | Project dependencies |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Tailwind v4 + shadcn/ui compatibility issues | Medium | Pin exact versions; test early; fallback to Tailwind v3 if critical incompatibility found during build |
| Framer Motion SSR hydration mismatch | Low | Use `motion/react-client` import pattern; wrap in client components only; test in production build |
| Lighthouse < 95 on mobile | Medium | Profile from day 1; use Server Components aggressively; lazy-load animations; optimize images with next/image |
| Image assets not available (screenshots, avatar) | Medium | Use placeholder images initially; define size constraints early; provide blur placeholders |
| Contact form submission requires email service | Low | v1 uses Server Action with Zod validation; actual email sending can be added later (out of scope for now — forms log to console and show success) |

## Rollback Plan

Since this is a greenfield project, rollback is straightforward:
1. Delete the entire project directory
2. Re-scaffold with `npx create-next-app@latest`
3. No production environment or users affected

If issues arise after deployment:
1. Revert to last known good commit via `git revert`
2. Redeploy via Vercel — instant rollback
3. Each section is independent — can disable individual sections by commenting out imports in `page.tsx`

## Dependencies

- **Node.js 18+**: Runtime requirement for Next.js 15
- **shadcn/ui CLI**: `npx shadcn@latest init` for component scaffolding
- **Framer Motion**: Must be `>=11` for `motion/react-client` import
- **next-themes**: `>=0.4` for App Router compatibility
- **Image assets**: Need avatar photo and project screenshots (can start with placeholders)
- **Vercel account**: For deployment (separate change)
- **WhatsApp/Calendly links**: Provide real URLs for contact section

## Success Criteria

- [ ] All 6 sections render correctly on desktop and mobile
- [ ] Dark/light theme toggles smoothly with system detection
- [ ] Smooth scroll navigation from sticky navbar
- [ ] Framer Motion animations trigger on scroll (fade-ins, hover effects)
- [ ] Contact form validates with Zod and submits via Server Action
- [ ] Lighthouse Performance score >= 95 on desktop
- [ ] Lighthouse Accessibility score >= 90
- [ ] Typescript strict mode with zero `any` usage
- [ ] All components properly separated into Server/Client boundaries
- [ ] SEO metadata (OG tags, JSON-LD, semantic HTML) present and correct
- [ ] Mobile-first responsive — all sections fully usable on 375px+ viewports