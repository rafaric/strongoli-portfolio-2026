# Portfolio v1 Initial Build — Full Specification

**Change**: portfolio-v1-initial-build  
**Status**: Specification Complete  
**Type**: Greenfield (Full Specs — no existing baseline)

---

## Overview

Premium one-page portfolio for Rafael Strongoli, freelance frontend developer specializing in Next.js 15 + shadcn/ui + Tailwind. Built as a lead-generation tool targeting LatAm startup founders. Greenfield project with no legacy constraints.

**Stack**: Next.js 15 (App Router + Server Components), TypeScript (strict), Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide React, next-themes, Zod 4.

---

## Spec Domains

| Domain | Type | File | Requirements | Scenarios |
|--------|------|------|-------------|-----------|
| Infrastructure | New | `specs/infrastructure/spec.md` | 7 | 14 |
| Navigation | New | `specs/navigation/spec.md` | 5 | 12 |
| Hero | New | `specs/hero/spec.md` | 5 | 12 |
| About | New | `specs/about/spec.md` | 3 | 7 |
| Projects | New | `specs/projects/spec.md` | 5 | 12 |
| Skills | New | `specs/skills/spec.md` | 5 | 11 |
| Services | New | `specs/services/spec.md` | 5 | 10 |
| Contact | New | `specs/contact/spec.md` | 6 | 16 |
| Footer | New | `specs/footer/spec.md` | 4 | 6 |
| SEO & Performance | New | `specs/seo-performance/spec.md` | 7 | 16 |
| Data Shapes | New | `specs/infrastructure/data-shapes.md` | 6 | 12 |

**Totals**: 58 requirements, 128 scenarios

---

## Key Requirements Summary

### Infrastructure
- Next.js 15 App Router with `(sections)` route group
- TypeScript strict mode: `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`
- shadcn/ui init with Button, Card, Input, Textarea, Avatar, Badge, Tooltip, Separator
- Tailwind v4 CSS-first config with `@custom-variant dark` for next-themes
- Framer Motion `>= 11` using `motion/react-client` import pattern
- ThemeProvider: `attribute="class"`, `defaultTheme="system"`, `disableTransitionOnChange`

### Navigation
- Sticky navbar with glass morphism backdrop blur on scroll
- Smooth scroll with offset for sticky navbar height
- Mobile hamburger menu with slide-in/close animation
- Theme toggle cycling: system → light → dark
- Active section highlighting via scroll spy
- Full keyboard accessibility, ARIA labels

### Hero Section
- `<h1>` headline + `<p>` subheadline, client-oriented messaging
- 2 CTAs: primary (Contact) + secondary (Projects)
- Avatar as LCP image with `next/image` + `priority` + blur placeholder
- Animated background (gradient/parallax) — respects `prefers-reduced-motion`
- Semantic `<section id="hero">` with `aria-labelledby`

### About Section
- Short client-oriented bio (under 150 words)
- Professional photo with responsive layout (stacked mobile, 2-col desktop)
- Proper semantic `<section>` with heading hierarchy

### Projects Section
- Responsive card grid (2-col desktop, 1-col mobile)
- 4 project cards: 3 real + 1 placeholder ("Coming Soon")
- Featured project highlighting
- Hover effects: scale + shadow (Framer Motion, GPU-accelerated)
- Framer Motion viewport-triggered fade-in animations
- `<article>` elements with proper ARIA

### Skills Section
- Icon + label badges grouped by category (Frontend, Tools, Platform)
- Proficiency level indication (expert/advanced/intermediate)
- Core skills: Next.js 15, React, TypeScript, Tailwind, shadcn/ui, Framer Motion, Supabase, OpenAI, Vercel
- Staggered fade-in on scroll

### Services Section
- 4 service cards: Landing Pages, Dashboards, MVPs, AI Integration
- Icon + title + description + 3-5 features per card
- No prices (pricing-like layout without pricing)
- Subtle hover elevation (translateY + shadow)
- Responsive grid (2x2 desktop, 1-col mobile)

### Contact Section
- Form: name (min 2 chars), email (valid format), message (min 10 chars)
- Zod 4 validation with `safeParse` (never throws, uses `error` param not `message`)
- Server Action processes form, logs to console in v1
- `useActionState` for progressive enhancement
- Result type: discriminated union `{ success: true; data } | { success: false; error }`
- Direct links: WhatsApp (pre-filled message), Email (mailto with subject), LinkedIn
- Loading, success, and error states

### Footer
- Dynamic copyright year
- Social links (GitHub, LinkedIn) with `target="_blank"` + `rel="noopener noreferrer"`
- Back-to-top button with smooth scroll
- `<footer>` landmark element

### SEO & Performance
- `generateMetadata` with title, description, OG tags, Twitter cards
- JSON-LD Person schema (schema.org)
- Lighthouse Performance ≥ 95 desktop, ≥ 85 mobile
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Server Components by default — Client Components only for interactivity
- Hero image with `priority`, below-fold images lazy-loaded
- Client bundle < 100KB gzipped
- `prefers-reduced-motion` respected for ALL animations
- WCAG 2.1 AA compliance (4.5:1 contrast ratio for body text)

---

## Data Shapes

### Project
```typescript
interface Project {
  id: string;            // branded ProjectId recommended
  title: string;
  description: string;   // under 100 chars for cards
  image: string;          // relative to /public
  tags: readonly string[];
  liveUrl: string | null; // null for placeholder projects
  githubUrl: string | null;
  featured: boolean;
}
```

### Skill
```typescript
const SKILL_CATEGORIES = { frontend: "frontend", tools: "tools", platform: "platform" } as const;
type SkillCategory = (typeof SKILL_CATEGORIES)[keyof typeof SKILL_CATEGORIES];

const SKILL_LEVELS = { expert: "expert", advanced: "advanced", intermediate: "intermediate" } as const;
type SkillLevel = (typeof SKILL_LEVELS)[keyof typeof SKILL_LEVELS];

interface Skill {
  name: string;
  icon: LucideIcon;
  category: SkillCategory;
  level: SkillLevel;
}
```

### Service
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: readonly string[];
}
```

### NavLink
```typescript
interface NavLink {
  label: string;
  href: string;  // e.g., "#hero", "#projects", "#contact"
}
```

### ContactFormData (Zod 4)
```typescript
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters" }),
  email: z.string().email({ error: "Please enter a valid email" }),
  message: z.string().min(10, { error: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;
```

### ActionResult (Server Action Result)
```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

---

## Coverage Assessment

- **Happy paths**: ✅ Covered — every requirement has at least one happy-path scenario
- **Edge cases**: ✅ Covered — empty states, invalid input, placeholder projects, reduced motion, keyboard-only, no-JS, slow network
- **Error states**: ✅ Covered — form validation errors, server-side validation bypass, unexpected Server Action errors, missing images

---

## Next Step

Ready for **design phase** (sdd-design) to produce architecture decisions and component designs. If design already exists, ready for **tasks phase** (sdd-tasks) to break down implementation.