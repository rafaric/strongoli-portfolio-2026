# Design: Portfolio v1 Initial Build

## Technical Approach

Build a premium one-page portfolio for Rafael Strongoli using Next.js 15 App Router with Server Components as the default rendering strategy. The architecture maximizes Server Components (~80% of the payload) to achieve Lighthouse 95+ by eliminating unnecessary JavaScript from the client bundle. Only interactive elements (navbar, theme toggle, contact form, animation wrappers, card hover effects) become Client Components.

Data is entirely static TypeScript objects in `lib/data/`, making the contact form the only mutation path — handled via Server Action with Zod 4 validation. Framer Motion animations use the `motion/react-client` import pattern wrapped in thin Client Components (`FadeIn`) to keep parent sections as Server Components.

The page is a single route using a `(sections)` route group for organizational clarity without URL impact. All sections compose inside one `page.tsx`, with smooth-scroll navigation via `id` anchors.

---

## Architecture Decisions

### Decision: Route Group `(sections)` vs Flat Page

**Choice**: `(sections)` route group containing a single `page.tsx`
**Alternatives considered**: Flat `app/page.tsx` with no route group; individual routes per section (`/about`, `/projects`)
**Rationale**: A route group provides organizational clarity — it signals that all content lives on one page while allowing future addition of route segments (e.g., `/blog`) without restructuring. It keeps the URL clean (root `/` only) while grouping section-related components. If we ever need a separate route, we add it as a sibling to `(sections)`, not inside it. The flat `app/page.tsx` approach would work but loses the organizational signal that this is a sectioned single page.

### Decision: Component Boundary — Server vs Client

**Choice**: 
- **Server Components** (default): `layout.tsx`, `page.tsx`, `HeroSection`, `AboutSection`, `ProjectsSection` (shell), `SkillsSection`, `ServicesSection` (shell), `ContactSection` (shell), `Footer`
- **Client Components** (`"use client"`): `Navbar`, `ThemeToggle`, `ContactForm`, `FadeIn`, `ProjectCard`, `ServiceCard`, `BackToTopButton`

**Alternatives considered**: Making all sections Client Components for easier animation; keeping Navbar as Server and hydrating only the menu button
**Rationale**: Server Components reduce the client bundle by ~60-80%. The `FadeIn` pattern lets animated content use Framer Motion viewport triggers while keeping the containing section a Server Component. `ProjectCard` and `ServiceCard` need `"use client"` only for hover animations — the section shell remains a Server Component that maps over data and renders these Client children. `Navbar` requires `"use client"` for scroll spy state, mobile menu toggle, and theme toggle rendering. `ContactForm` needs `"use client"` for `useActionState` and form validation state.

### Decision: Data Layer — Static TypeScript Objects vs Future CMS

**Choice**: Hardcoded TypeScript objects with `as const` satisfies patterns in `lib/data/`
**Alternatives considered**: Markdown/MDX files in `/content`; headless CMS (Sanity, Contentful) from start
**Rationale**: Static objects give full type safety, zero network overhead, and instant compilation checks. The data layer is separated from components — when a CMS is needed in v2, only `lib/data/` files change, not the components. `as const` satisfies ensures runtime immutability and compile-time exhaustiveness. Markdown/MDX adds build complexity without benefit for 4 projects and 8 skill entries. CMS integration is explicitly out of scope for v1.

### Decision: Form Handling — Server Action with `useActionState` vs API Route

**Choice**: Server Action (`lib/actions/contact.ts`) with `useActionState` for progressive enhancement
**Alternatives considered**: `Route Handlers` (`app/api/contact/route.ts`) with `fetch`; React Hook Form with Zod resolver
**Rationale**: Server Actions eliminate the need for API route boilerplate, provide automatic progressive enhancement (form works without JavaScript), and integrate natively with React 19's `useActionState`. V1 logs submissions to console — v2 adds email service (Resend/SendGrid) by modifying only the action function body. Zod validation runs both client-side (via `safeParse` in `ContactForm`) and server-side (in the action) for defense in depth.

### Decision: Animation Architecture — Framer Motion with `FadeIn` Wrapper Pattern

**Choice**: Thin `FadeIn` Client Component that wraps `motion.div` with viewport-triggered animations. Each section uses `FadeIn` to animate content while remaining a Server Component.
**Alternatives considered**: Inline `"use client"` in every section; CSS-only animations; Intersection Observer with CSS classes
**Rationale**: The `FadeIn` wrapper pattern is the most performant approach — only the `FadeIn` component ships Framer Motion to the client, while parent sections stay as Server Components. The viewport trigger (`once: true, amount: 0.2`) means animations only play when scrolled into view, not on mount. CSS-only animations can't handle stagger effects, complex hover transforms, or `useReducedMotion` detection. The `FadeIn` component accepts props for `direction`, `delay`, and `duration` for configuration.

### Decision: Theme System — next-themes + Tailwind v4 CSS-First Dark Mode

**Choice**: `next-themes` with `attribute="class"`, `defaultTheme="system"`, `disableTransitionOnChange` + Tailwind v4 `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`
**Alternatives considered**: CSS-only dark mode with `prefers-color-scheme`; Tailwind v4 `@variant dark` without `:where` scope; custom ThemeProvider without next-themes
**Rationale**: `next-themes` handles the three critical problems: (1) SSR flash prevention via injected `<script>` that reads localStorage before paint, (2) system preference detection, and (3) persistence across sessions. The `:where(.dark, .dark *)` selector pattern ensures dark styles apply both to the `<html>` element itself and all descendants without specificity issues. `disableTransitionOnChange` prevents the ugly color-transition flash when toggling themes.

### Decision: Color Palette — HSL-based Semantic Tokens

**Choice**: Define colors as HSL values in CSS custom properties within `globals.css`, then reference via Tailwind semantic classes (`bg-primary`, `text-foreground`, etc.)
**Alternatives considered**: Hardcoded Tailwind color classes; Oklch color space; JSON config file
**Rationale**: HSL gives intuitive control over hue/saturation/lightness and works universally. Tailwind v4's CSS-first config means colors must live in `globals.css` as custom properties. shadcn/ui components expect CSS custom properties like `--primary`, `--background`, `--foreground` — this is the standard pattern. Oklch has browser support concerns. The semantic token approach (using `bg-primary` rather than `bg-blue-600`) means theme changes only require updating CSS variables, not touching component code.

**Color palette (HSL values for Tailwind v4 + shadcn/ui):**

```css
/* Light mode (default) */
--background: 0 0% 100%;           /* white */
--foreground: 222.2 84% 4.9%;     /* near-black slate */
--card: 0 0% 100%;
--card-foreground: 222.2 84% 4.9%;
--primary: 221.2 83.2% 53.3%;     /* blue-600 — trust, tech */
--primary-foreground: 210 40% 98%;
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
--accent: 262.1 83.3% 57.8%;      /* violet-500 — accent/CTA highlights */
--accent-foreground: 210 40% 98%;
--destructive: 0 84.2% 60.2%;
--border: 214.3 31.8% 91.4%;
--input: 214.3 31.8% 91.4%;
--ring: 221.2 83.2% 53.3%;

/* Dark mode overrides */
--background: 222.2 84% 4.9%;     /* deep slate */
--foreground: 210 40% 98%;
--card: 222.2 84% 4.9%;
--card-foreground: 210 40% 98%;
--primary: 217.2 91.2% 59.8%;     /* blue-400 — brighter for dark bg */
--primary-foreground: 222.2 84% 4.9%;
--secondary: 217.2 32.6% 17.5%;
--secondary-foreground: 210 40% 98%;
--muted: 217.2 32.6% 17.5%;
--muted-foreground: 215 20.2% 65.1%;
--accent: 263.4 70% 50.4%;
--accent-foreground: 210 40% 98%;
--destructive: 0 62.8% 30.6%;
--border: 217.2 32.6% 17.5%;
--input: 217.2 32.6% 17.5%;
--ring: 224.3 76.3% 48%;
```

### Decision: Contact Form Result Type — Discriminated Union

**Choice**: `ActionResult<T> = { success: true; data: T } | { success: false; error: string }` with exhaustive checking
**Alternatives considered**: Throwing errors from actions; try/catch on client; separate error state variable
**Rationale**: TypeScript discriminated unions give compile-time exhaustiveness checking — if you forget to handle the error case, TypeScript won't compile. This is superior to try/catch patterns because errors become part of the type system, not edge cases. The `success` property acts as the discriminant. The client can use `if (result.success)` for type narrowing. This aligns with the project's TypeScript-strict philosophy (no `any`, enforced type safety).

---

## Directory Structure

```
strongoli-portfolio-2026/
├── app/
│   ├── (sections)/              # Route group — no URL impact
│   │   └── page.tsx             # Single page composing all sections
│   ├── layout.tsx               # Root layout: ThemeProvider, fonts, metadata
│   ├── globals.css              # Tailwind v4 + CSS custom properties + @custom-variant
│   └── favicon.ico
├── components/
│   ├── ui/                      # shadcn/ui primitives (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── tooltip.tsx
│   │   └── separator.tsx
│   └── custom/                  # Portfolio-specific components
│       ├── navbar.tsx            # "use client" — scroll spy, mobile menu, theme toggle
│       ├── theme-toggle.tsx     # "use client" — next-themes cycle toggle
│       ├── theme-provider.tsx   # "use client" — next-themes provider wrapper
│       ├── fade-in.tsx           # "use client" — Framer Motion viewport animation wrapper
│       ├── hero-section.tsx      # Server Component
│       ├── about-section.tsx     # Server Component
│       ├── projects-section.tsx  # Server Component (shell)
│       ├── project-card.tsx      # "use client" — hover animations
│       ├── skills-section.tsx    # Server Component
│       ├── skill-badge.tsx       # Server Component (no interactivity needed)
│       ├── services-section.tsx  # Server Component (shell)
│       ├── service-card.tsx      # "use client" — hover animations
│       ├── contact-section.tsx   # Server Component (shell)
│       ├── contact-form.tsx      # "use client" — useActionState + Zod validation
│       ├── footer.tsx            # Server Component
│       └── back-to-top-button.tsx # "use client" — smooth scroll on click
├── lib/
│   ├── utils.ts                 # cn() utility from shadcn/ui
│   ├── types.ts                 # Shared TypeScript types: Project, Skill, Service, NavLink, ActionResult
│   ├── constants.ts             # Nav links, site metadata, shared constants
│   ├── actions/
│   │   └── contact.ts           # "use server" — Server Action with Zod 4 validation
│   ├── schemas/
│   │   └── contact.ts           # Zod 4 schema for contact form (safeParse, error param)
│   └── data/
│       ├── projects.ts          # Static project data (as const satisfies)
│       ├── skills.ts            # Static skills data with categories
│       ├── services.ts          # Static services data
│       └── nav-links.ts         # Navigation link constants
├── public/
│   └── images/
│       ├── avatar.webp           # LCP hero image (priority)
│       ├── og-image.png          # 1200x630 Open Graph image
│       └── projects/             # Project screenshots
│           ├── project-1.webp
│           ├── project-2.webp
│           ├── project-3.webp
│           └── placeholder.webp
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript strict mode config
├── package.json
└── README.md
```

**Justification**:
- `app/(sections)/page.tsx` — Route group keeps URL clean while providing organizational signal
- `components/ui/` vs `components/custom/` — Separation of shadcn auto-generated primitives from portfolio-specific code; shadcn CLI additions don't conflict with custom components
- `lib/data/` — Isolated data layer; v2 CMS migration only touches this directory
- `lib/schemas/` — Separated from `lib/actions/` because Zod schemas are shared (client-side validation imports them too)
- `lib/types.ts` — Single source of truth for all interfaces; avoids circular deps between data files and components
- `lib/constants.ts` — Nav links and site metadata in one place; adding a section = adding one entry
- `public/images/` — WebP format for all photos (Lighthouse optimization); .webp > .png for photos

---

## Component Architecture

### Component Hierarchy

```
layout.tsx (Server)
├── <ThemeProvider> (Client wrapper)
├── <Navbar> (Client)
│   ├── <ThemeToggle> (Client)
│   └── <MobileMenu> (Client)
└── <main>
    ├── page.tsx (Server) — composes all sections
    │   ├── <HeroSection> (Server)
    │   │   ├── <FadeIn> (Client) — viewport-triggered animation
    │   │   ├── <Image priority /> (Server — next/image)
    │   │   └── <Button> (UI — Client internally)
    │   ├── <AboutSection> (Server)
    │   │   ├── <FadeIn> (Client)
    │   │   └── <Image /> (Server — next/image)
    │   ├── <ProjectsSection> (Server)
    │   │   └── <ProjectCard> (Client) — hover animations
    │   │       × N (mapped from data)
    │   ├── <SkillsSection> (Server)
    │   │   ├── <FadeIn> (Client)
    │   │   └── <SkillBadge> (Server) — no interactivity
    │   │       × N (mapped from data)
    │   ├── <ServicesSection> (Server)
    │   │   └── <ServiceCard> (Client) — hover animations
    │   │       × N (mapped from data)
    │   ├── <ContactSection> (Server)
    │   │   └── <ContactForm> (Client) — useActionState
    │   │       ├── <Input> (UI)
    │   │       ├── <Textarea> (UI)
    │   │       └── <Button> (UI)
    │   └── <Footer> (Server)
    │       └── <BackToTopButton> (Client) — smooth scroll
    └── </main>
```

### Server vs Client Boundary Details

| Component | Rendering | `"use client"` | Reason |
|-----------|-----------|-----------------|--------|
| `layout.tsx` | Server | No | Static shell; ThemeProvider is a Client child |
| `page.tsx` | Server | No | Composes Server Components; data flows via props |
| `Navbar` | Client | Yes | Scroll spy state, mobile menu toggle, renders ThemeToggle |
| `ThemeToggle` | Client | Yes | `useTheme()` from next-themes |
| `ThemeProvider` | Client | Yes | `ThemeProvider` from next-themes — wraps layout children |
| `FadeIn` | Client | Yes | `motion` from `motion/react-client`, `useReducedMotion` |
| `HeroSection` | Server | No | Static content; FadeIn child handles animation |
| `AboutSection` | Server | No | Static content + optimized image |
| `ProjectsSection` | Server | No | Maps data, renders Server Component shell per card... |
| `ProjectCard` | Client | Yes | Hover animation with `motion` |
| `SkillsSection` | Server | No | Static badge grid; FadeIn for scroll animation |
| `SkillBadge` | Server | No | Just renders icon + text; no state or effects |
| `ServicesSection` | Server | No | Maps data, renders Client cards |
| `ServiceCard` | Client | Yes | Hover animation with `motion` |
| `ContactSection` | Server | No | Static shell (heading, direct links) |
| `ContactForm` | Client | Yes | `useActionState`, form validation state |
| `Footer` | Server | No | Static content + Client child |
| `BackToTopButton` | Client | Yes | Click handler, `window.scrollTo` |

### Key Interface: `FadeIn` Props

```typescript
interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right"; // default: "up"
  delay?: number;    // seconds, default: 0
  duration?: number; // seconds, default: 0.5
  className?: string;
  once?: boolean;    // default: true — animate only first time
}
```

---

## Data Flow

```
Static Data Files                    Server Components               Client Components
─────────────────                    ──────────────────               ─────────────────
                                     
lib/data/projects.ts ───────────► ProjectsSection (Server) ──────► ProjectCard (Client)
  └ arrays of Project interfaces       └ maps data                    └ hover animations
                                       └ passes as props              

lib/data/skills.ts ──────────────► SkillsSection (Server) ──────► SkillBadge (Server)
  └ arrays of Skill interfaces          └ maps data                    └ just renders
                                        └ passes as props             

lib/data/services.ts ────────────► ServicesSection (Server) ────► ServiceCard (Client)
  └ arrays of Service interfaces        └ maps data                    └ hover animations
                                        └ passes as props             

lib/data/nav-links.ts ──────────► Navbar (Client)
  └ array of NavLink interfaces         └ renders links + scroll spy
                                        
lib/schemas/contact.ts ─────────► ContactForm (Client) ──────► Server Action (Server)
  └ Zod 4 schema                        └ client-side safeParse        └ server-side safeParse
                                        └ useActionState               └ console.log + Result
                                        
next-themes ────────────────────► ThemeProvider (Client)
  └ localStorage + system pref          └ ThemeToggle consumes useTheme()
```

**Data flow principles:**
1. **Data flows DOWN**: Static data files → Server Components → Client Components (via props, never through global state)
2. **Actions flow UP**: Form submissions go from Client Components → Server Actions (via `useActionState`)
3. **No client-side data fetching**: All content is static, imported directly by Server Components
4. **Zod validates at boundaries**: Contact form validates client-side for UX, server-side for security

---

## Theme System

### Architecture

```
globals.css                    ThemeProvider (Client)              ThemeToggle (Client)
───────────                    ────────────────────                ────────────────────
@import "tailwindcss"          <ThemeProvider                     const { theme, setTheme }
@custom-variant dark             attribute="class"               = useTheme()
  (&:where(.dark, .dark *))     defaultTheme="system"            
                               disableTransitionOnChange           // Cycles:
:root {                       >                                     system → light → dark → system
  --background: ...            {children}                         
  --foreground: ...                                               onClick={() =>
  --primary: ...               />                                   setTheme(nextTheme)}
  --accent: ...
  ...
}

.dark {
  --background: ...
  --foreground: ...
  --primary: ...
  --accent: ...
  ...
}
```

### How It Works

1. **`ThemeProvider`** wraps the entire app in `layout.tsx`. It injects a `<script>` tag that reads `localStorage` before the first paint, preventing the "flash of wrong theme" syndrome (FOIT/FOUT)
2. **`@custom-variant dark`** in `globals.css` tells Tailwind v4 to use the `.dark` class on `<html>` for dark mode — this is the next-themes integration point
3. **`disableTransitionOnChange`** prevents the ugly color-flash when toggling themes (all colors change simultaneously, not sequentially)
4. **Color tokens** use HSL values stored in CSS custom properties (`:root` for light, `.dark` for dark). Components reference these via Tailwind semantic classes: `bg-primary`, `text-foreground`, `border-border`
5. **Theme cycle order**: system → light → dark → system. Icons: Monitor (system) → Sun (light) → Moon (dark)

### Implementation in `globals.css`

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius: 0.75rem;
}
```

---

## Animation Architecture

### Framer Motion Strategy

**Rule**: All animations are OPT-IN, viewport-triggered, and respect `prefers-reduced-motion`.

| Animation | Component | Trigger | Reduced Motion Fallback |
|-----------|-----------|---------|------------------------|
| Section fade-in + slide-up | `FadeIn` | Viewport intersection (`once: true`) | No animation, content appears immediately |
| Project card hover scale | `ProjectCard` | `onHoverStart` / `onHoverEnd` | `:hover` color change only, no transform |
| Service card hover elevation | `ServiceCard` | `onHoverStart` / `onHoverEnd` | `:hover` shadow change only, no transform |
| Hero animated gradient | `HeroSection` (via `FadeIn`) | Page load (continuous) | Static gradient fallback |
| Mobile menu slide-in | `Navbar` | State toggle (`isOpen`) | Instant show/hide, no slide |
| Scroll spy active indicator | `Navbar` | Scroll position | Highlight only (no animation) |

### `FadeIn` Component Implementation Strategy

```typescript
// components/custom/fade-in.tsx
"use client";

import { motion, useReducedMotion } from "motion/react-client";
import type { FadeInProps } from "@/lib/types";

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  once = true,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Key decisions:**
- Import from `motion/react-client` (not `framer-motion`) — SSR-safe, tree-shakeable
- `useReducedMotion()` hook from Framer Motion checks `prefers-reduced-motion` natively
- `viewport={{ once: true }}` prevents re-animation on scroll-back
- `viewport={{ amount: 0.2 }}` triggers when 20% of element is visible
- Direction offsets are small (40px) for subtlety — the spec says "premium", not "animated demo reel"

### Reduced Motion CSS Fallback

In addition to Framer Motion's `useReducedMotion`, add a CSS rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This catches any CSS animations/transitions that Framer Motion doesn't control.

---

## Contact Form Flow

### Architecture

```
ContactForm (Client)                         Server Action (Server)
────────────────────                         ──────────────────────
                                            
User fills form                              
  ↓                                          
<Client-side validation>                     
  ↓ safeParse(contactSchema)                 
  ↓                                          
If invalid → show inline errors              
  ↓                                          
If valid → submit via useActionState         
  ↓ action={submitContact}                  
  ↓                                          
  ──── form data sent ──────────────────►  contactAction(formData)
                                             ↓ safeParse(contactSchema) — re-validate!
                                             ↓
                                          If invalid → return { success: false, error }
                                             ↓
                                          If valid → log to console
                                             ↓ return { success: true, data }
  ◄──── ActionResult<ContactFormData> ───────
  ↓
If success → clear form, show success msg
If error → show error, retain field values
```

### Zod Schema (`lib/schemas/contact.ts`)

```typescript
import { z } from "zod";

// Zod 4: uses `error` parameter, not `message`
export const contactSchema = z.object({
  name: z.string().min(2, { error: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ error: "Ingresá un email válido" }),
  message: z.string().min(10, { error: "El mensaje debe tener al menos 10 caracteres" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### Server Action (`lib/actions/contact.ts`)

```typescript
"use server";

import { contactSchema } from "@/lib/schemas/contact";
import type { ActionResult, ContactFormData } from "@/lib/types";

export async function submitContact(
  _prevState: ActionResult<ContactFormData> | null,
  formData: FormData,
): Promise<ActionResult<ContactFormData>> {
  // Extract and validate with Zod safeParse (never throws)
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    // Join all field errors into a single message
    const errorMessage = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    return { success: false, error: errorMessage };
  }

  // v1: Log to console (email service integration in v2)
  console.log("Contact form submission:", {
    ...result.data,
    timestamp: new Date().toISOString(),
  });

  return { success: true, data: result.data };
}
```

### Result Type (`lib/types.ts`)

```typescript
// Discriminated union for Server Action results
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

### UX States

| State | UI Feedback |
|-------|------------|
| **Idle** | Form visible, submit button enabled |
| **Validating (client)** | Inline error messages next to invalid fields |
| **Submitting** | Button shows spinner + "Enviando...", all fields disabled |
| **Success** | Form replaced by success message "¡Mensaje enviado! Te respondo pronto." |
| **Error** | Error banner above form, fields retain values, button re-enabled |

---

## SEO Strategy

### Metadata (`layout.tsx`)

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://strongoli.dev"), // Update with actual domain
  title: "Rafael Strongoli — Frontend Developer",
  description:
    "Freelance frontend developer specializing in Next.js, React, and Tailwind. I build fast, conversion-focused web experiences for LatAm startups.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://strongoli.dev",
    siteName: "Rafael Strongoli",
    title: "Rafael Strongoli — Frontend Developer",
    description:
      "Freelance frontend developer specializing in Next.js, React, and Tailwind. I build fast, conversion-focused web experiences for LatAm startups.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rafael Strongoli — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Strongoli — Frontend Developer",
    description:
      "Freelance frontend developer specializing in Next.js, React, and Tailwind.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### JSON-LD (`page.tsx` or layout component)

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rafael Strongoli",
  jobTitle: "Frontend Developer",
  url: "https://strongoli.dev",
  sameAs: [
    "https://github.com/rafaelstrongoli",  // Update with actual GitHub
    "https://linkedin.com/in/rafaelstrongoli",  // Update with actual LinkedIn
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Frontend Development",
  ],
};
```

### Semantic HTML Structure

```html
<html lang="es" class="dark"> <!-- or light, managed by next-themes -->
  <body>
    <nav aria-label="Main navigation">...</nav>
    <main>
      <section id="hero" aria-labelledby="hero-heading">
        <h1 id="hero-heading">...</h1>
      </section>
      <section id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">...</h2>
      </section>
      <section id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">...</h2>
        <article>...</article>  <!-- each project -->
      </section>
      <section id="skills" aria-labelledby="skills-heading">
        <h2 id="skills-heading">...</h2>
      </section>
      <section id="services" aria-labelledby="services-heading">
        <h2 id="services-heading">...</h2>
        <article>...</article>  <!-- each service -->
      </section>
      <section id="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">...</h2>
      </section>
    </main>
    <footer>...</footer>
  </body>
</html>
```

**Key rules:**
- Exactly ONE `<h1>` on the entire page (hero headline)
- Each section uses `<h2>` with matching `id="*-heading"` for `aria-labelledby`
- Projects and services use `<article>` elements
- `<nav>` has `aria-label="Main navigation"`
- `<main>` wraps all content sections
- `<footer>` is a landmark element (no `id` needed for nav)

---

## Performance Strategy

### Lighthouse 95+ Target Plan

| Optimization | Impact | Implementation |
|-------------|--------|----------------|
| **Server Components default** | HIGH | ~80% of payload is RSC HTML, no JS shipped |
| **Hero image priority** | HIGH | `<Image priority sizes="(max-width: 768px) 100vw, 50vw" />` for LCP |
| **Below-fold lazy loading** | MEDIUM | FadeIn uses `whileInView` (not mount animation) |
| **WebP images** | MEDIUM | All photos served as .webp via next/image auto-optimization |
| **Client bundle minimization** | HIGH | Only 7 Client Components ship Framer Motion; rest is RSC |
| **Font optimization** | MEDIUM | `next/font/google` with `display: swap` and subset |
| **CSS optimization** | MEDIUM | Tailwind v4 tree-shakes unused classes automatically |
| **No layout shift** | HIGH | All images have explicit `width`/`height` or `fill` with container sizing |

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Hero image with `priority`, Server Components, minimal blocking JS |
| **CLS** | < 0.1 | Explicit image dimensions, font `display: swap`, no late-loading layout shifts |
| **INP** | < 200ms | Minimal Client Components, responsive forms, no heavy client-side computation |

### Code Splitting Strategy

- **Framer Motion**: Imported only in Client Components that need it (`FadeIn`, `ProjectCard`, `ServiceCard`, `Navbar`). Tree-shakeable via `motion/react-client`
- **shadcn/ui**: Each component is self-contained; only imported components ship
- **Lucide React**: Tree-shakeable; import only icons used: `import { Mail, Phone, Github, Linkedin, ArrowUp, ... } from "lucide-react"`
- **next/image**: Automatic format negotiation (WebP), responsive `sizes`, lazy by default
- **Fonts**: `next/font/google` with `display: swap`, only load weights used (400, 600, 700)

### Image Strategy

```
Avatar (Hero LCP):
  - priority={true}
  - sizes="(max-width: 768px) 100vw, 33vw"
  - placeholder="blur" with blurDataURL
  - WebP format via next/image

Project Screenshots:
  - priority={false} (lazy-loaded)
  - sizes="(max-width: 768px) 100vw, 50vw"
  - WebP format via next/image
  - Explicit width/height to prevent CLS

OG Image:
  - Static file: public/images/og-image.png (1200×630)
  - Referenced in metadata, not rendered in UI
```

---

## Accessibility Strategy

| Requirement | Implementation |
|-------------|----------------|
| **Color contrast** | All body text 4.5:1 ratio minimum; headings 3:1; interactive elements 3:1 |
| **Keyboard navigation** | All interactive elements reachable via Tab; visible focus rings (`focus-visible:ring-2 ring-ring`) |
| **ARIA labels** | `<nav aria-label="Main navigation">`, icon-only links with `aria-label`, sections with `aria-labelledby` |
| **Heading hierarchy** | Single `<h1>` (hero), `<h2>` per section, `<h3>` only within cards |
| **Reduced motion** | `useReducedMotion()` in every Framer Motion component; CSS `prefers-reduced-motion` fallback |
| **Form labels** | Every `<input>` linked to `<label htmlFor>`; validation errors in `aria-live` region |
| **Skip links** | Optional: skip-to-content link for keyboard users (assess during implementation) |
| **Mobile menu** | Focus trap when open; Escape to close; `aria-expanded` on trigger; `role="dialog"` on menu |
| **Semantic HTML** | `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`, `<h1>`–`<h3>` hierarchy |

---

## Dependency List

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | >=15.0.0 | Framework (App Router, Server Components, Server Actions) |
| `react` | >=19.0.0 | UI library (useActionState, use, etc.) |
| `react-dom` | >=19.0.0 | React DOM renderer |
| `tailwindcss` | >=4.0.0 | Utility-first CSS (CSS-first config) |
| `framer-motion` | >=11.0.0 | Animation library (motion/react-client import) |
| `next-themes` | >=0.4.0 | Dark/light theme toggle with SSR support |
| `lucide-react` | latest | Icon library (tree-shakeable) |
| `zod` | >=4.0.0 | Schema validation (safeParse, discriminatedUnion, error param) |
| `class-variance-authority` | latest | shadcn/ui variant utility |
| `clsx` | latest | Conditional className utility |
| `tailwind-merge` | latest | Merge Tailwind classes (used by cn()) |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | >=5.5.0 | Type checking |
| `@types/react` | latest | React type definitions |
| `@types/react-dom` | latest | React DOM type definitions |
| `eslint` | latest | Linting |
| `eslint-config-next` | latest | Next.js ESLint rules |
| `@eslint/js` | latest | ESLint core rules |
| `server-only` | latest | Prevents client imports of server code |

### shadcn/ui Init Config

```
npx shadcn@latest init
  style: "default"
  base color: "slate"
  css variables: true
  tailwind config: CSS-first (globals.css)
```

---

## shadcn/ui Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| **Button** | CTAs, form submit, nav links | Primary (hero CTA), secondary (hero CTA), ghost (nav links) |
| **Card** | Project cards, service cards | `CardHeader`, `CardContent`, `CardFooter` for layout consistency |
| **Input** | Contact form — name, email fields | With label, error state, disabled state |
| **Textarea** | Contact form — message field | With label, error state, character count |
| **Avatar** | Hero and about sections — developer photo | `AvatarImage` with `priority` for hero |
| **Badge** | Technology tags on project cards, skills | Skill level indicator, project tags |
| **Tooltip** | Skill badges — proficiency level on hover | Accessible tooltip with `aria-describedby` |
| **Separator** | Visual section dividers | Optional, between sections |

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `app/layout.tsx` | Create | Root layout with ThemeProvider, fonts, metadata, JSON-LD script |
| `app/globals.css` | Create | Tailwind v4 imports, @custom-variant dark, CSS custom properties (light + dark), @theme inline |
| `app/(sections)/page.tsx` | Create | Single page composing all section Server Components |
| `components/custom/navbar.tsx` | Create | Client: sticky nav, scroll spy, mobile menu, theme toggle |
| `components/custom/theme-toggle.tsx` | Create | Client: next-themes cycle toggle (system → light → dark) |
| `components/custom/theme-provider.tsx` | Create | Client: next-themes ThemeProvider wrapper |
| `components/custom/fade-in.tsx` | Create | Client: Framer Motion viewport-triggered animation wrapper |
| `components/custom/hero-section.tsx` | Create | Server: headline, subheadline, CTAs, avatar with priority |
| `components/custom/about-section.tsx` | Create | Server: bio text, photo, two-column layout |
| `components/custom/projects-section.tsx` | Create | Server: section shell, maps Project data → ProjectCard |
| `components/custom/project-card.tsx` | Create | Client: hover animations, live demo + GitHub links |
| `components/custom/skills-section.tsx` | Create | Server: grouped skills by category with FadeIn |
| `components/custom/skill-badge.tsx` | Create | Server: icon + label + level indicator |
| `components/custom/services-section.tsx` | Create | Server: section shell, maps Service data → ServiceCard |
| `components/custom/service-card.tsx` | Create | Client: hover elevation animation |
| `components/custom/contact-section.tsx` | Create | Server: section shell with heading + direct links |
| `components/custom/contact-form.tsx` | Create | Client: useActionState form with Zod validation |
| `components/custom/footer.tsx` | Create | Server: copyright, social links, BackToTopButton |
| `components/custom/back-to-top-button.tsx` | Create | Client: smooth scroll on click |
| `components/ui/button.tsx` | Create | shadcn/ui — CTA buttons, form submit, nav links |
| `components/ui/card.tsx` | Create | shadcn/ui — project and service card layout |
| `components/ui/input.tsx` | Create | shadcn/ui — contact form text inputs |
| `components/ui/textarea.tsx` | Create | shadcn/ui — contact form message field |
| `components/ui/avatar.tsx` | Create | shadcn/ui — hero and about photo |
| `components/ui/badge.tsx` | Create | shadcn/ui — project tags, skill badges |
| `components/ui/tooltip.tsx` | Create | shadcn/ui — skill level tooltips |
| `components/ui/separator.tsx` | Create | shadcn/ui — section dividers |
| `lib/utils.ts` | Create | cn() utility (shadcn/ui convention) |
| `lib/types.ts` | Create | Shared types: Project, Skill, Service, NavLink, ActionResult, FadeInProps |
| `lib/constants.ts` | Create | NAV_LINKS, SITE_METADATA, SKILL_CATEGORIES, SKILL_LEVELS |
| `lib/schemas/contact.ts` | Create | Zod 4 contact form schema with safeParse |
| `lib/actions/contact.ts` | Create | "use server" — Server Action for contact form |
| `lib/data/projects.ts` | Create | Static project data array (as const satisfies) |
| `lib/data/skills.ts` | Create | Static skills data array |
| `lib/data/services.ts` | Create | Static services data array |
| `lib/data/nav-links.ts` | Create | Navigation link constants |
| `public/images/avatar.webp` | Create | Hero/about avatar (LCP priority image) |
| `public/images/og-image.png` | Create | 1200×630 Open Graph share image |
| `public/images/projects/*.webp` | Create | Project screenshots |
| `next.config.ts` | Create | Next.js config (image optimization, remote patterns) |
| `tsconfig.json` | Create | TypeScript strict: strict, noUncheckedIndexedAccess, noImplicitOverride, exactOptionalPropertyTypes |
| `package.json` | Create | Dependencies and scripts |

---

## Interfaces / Contracts

### Core Type Definitions (`lib/types.ts`)

```typescript
import type { LucideIcon } from "lucide-react";

// ─── Branded Types ───────────────────────────────────────────────
type Brand<T, B> = T & { __brand: B };
export type ProjectId = Brand<string, "ProjectId">;
export type ServiceId = Brand<string, "ServiceId">;

// ─── Const Types Pattern ──────────────────────────────────────────
export const SKILL_CATEGORIES = {
  frontend: "frontend",
  tools: "tools",
  platform: "platform",
} as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[keyof typeof SKILL_CATEGORIES];

export const SKILL_LEVELS = {
  expert: "expert",
  advanced: "advanced",
  intermediate: "intermediate",
} as const;
export type SkillLevel = (typeof SKILL_LEVELS)[keyof typeof SKILL_LEVELS];

// ─── Data Interfaces ──────────────────────────────────────────────
export interface Project {
  id: ProjectId;
  title: string;
  description: string;  // under 100 chars
  image: string;        // relative to /public
  tags: readonly string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: SkillCategory;
  level: SkillLevel;
}

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  icon: LucideIcon;
  features: readonly string[];
}

export interface NavLink {
  label: string;
  href: string;  // e.g., "#hero", "#projects"
}

// ─── Server Action Result ─────────────────────────────────────────
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─── FadeIn Component Props ───────────────────────────────────────
export interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}
```

---

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| **Unit** | Zod contact schema validation | Vitest + valid/invalid inputs |
| **Unit** | `ActionResult` type narrowing | TypeScript compiler enforces exhaustive matching |
| **Unit** | Data files — type checking | `as const satisfies` pattern catches errors at compile time |
| **Unit** | `cn()` utility | shadcn/ui-provided, no tests needed |
| **Component** | ContactForm rendering states (idle, loading, success, error) | React Testing Library + `renderHook` for `useActionState` |
| **Component** | Navbar scroll spy behavior | Mock `IntersectionObserver`, verify active link |
| **Component** | ThemeToggle cycle (system → light → dark) | Mock `useTheme`, verify theme changes |
| **Component** | FadeIn respects `useReducedMotion` | Mock `useReducedMotion() → true`, verify no `motion.div` |
| **Integration** | Contact Server Action end-to-end | Submit form, verify `ActionResult` success/error shapes |
| **Integration** | Page renders all sections | Render `page.tsx`, verify all `id` anchors exist |
| **E2E** | v1 excludes E2E — future scope | Playwright in v2 |
| **Accessibility** | Lighthouse Accessibility audit | CI Lighthouse check ≥ 90 |
| **Accessibility** | axe-core scan | `axe` in React Testing Library for key pages |
| **Performance** | Lighthouse Performance audit | CI Lighthouse check ≥ 95 (desktop) |

---

## Migration / Rollout

No migration required — this is a greenfield project. The only rollout concern is:

1. **Development**: Local `next dev` for initial build
2. **Vercel deployment**: Connect repo, auto-deploy on `main` merge
3. **DNS configuration**: Out of scope for this change (separate change)

If issues arise after deployment:
- Revert to last known good commit via `git revert`
- Redeploy via Vercel — instant rollback
- Each section is composable — can disable individual sections by commenting out imports in `page.tsx`

---

## Open Questions

- [ ] **Avatar image source**: Need actual photo of Rafael for hero and about sections. Using placeholder until provided. What dimensions and aspect ratio?
- [ ] **Project screenshots**: Need actual screenshots of 3 real projects. What are the project names, URLs, and descriptions?
- [ ] **WhatsApp number**: Need actual WhatsApp number for the direct contact link.
- [ ] **LinkedIn URL**: Need actual LinkedIn profile URL.
- [ ] **GitHub URL**: Need actual GitHub profile URL.
- [ ] **Domain**: `metadataBase` uses `https://strongoli.dev` — is this the actual domain?
- [ ] **Calendly link**: The spec mentions Calendly as a direct contact option. Is this needed or should it be omitted for v1?
- [ ] **Hero headline/subheadline copy**: What specific messaging? The spec says "client-oriented" but actual copy needs to be provided.
- [ ] **About section copy**: Under 150 words, client-oriented — needs actual text.
- [ ] **Services copy**: Each of the 4 services needs title, description, and 3-5 features. Spanish or English?