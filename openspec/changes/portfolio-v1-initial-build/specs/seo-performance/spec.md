# SEO & Performance Specification

## Purpose

Defines the search engine optimization, social sharing, structured data, semantic HTML, and performance requirements that ensure the portfolio is discoverable, shareable, and fast.

## Requirements

### Requirement: Page Metadata

The system MUST export static metadata via the `metadata` object in `layout.tsx` and dynamic metadata via `generateMetadata` if needed. Metadata MUST include title, description, Open Graph tags, Twitter card tags, and canonical URL.

#### Scenario: Static metadata is present

- GIVEN the root `layout.tsx`
- WHEN metadata is exported
- THEN the following MUST be present:
  - `title`: "Rafael Strongoli — Frontend Developer" or equivalent
  - `description`: A concise, SEO-friendly description under 160 characters
  - `metadataBase`: The canonical base URL

#### Scenario: Open Graph metadata renders correctly

- GIVEN the page metadata
- WHEN a social platform (LinkedIn, Twitter, etc.) scrapes the URL
- THEN Open Graph tags MUST be present:
  - `og:title`
  - `og:description`
  - `og:image` (a 1200x630 OG image)
  - `og:url`
  - `og:type` = "website"
- AND a Twitter card MUST be defined: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

#### Scenario: Metadata is not duplicated

- GIVEN the metadata configuration
- WHEN the page is rendered
- THEN there MUST be exactly one `<title>` tag
- AND no conflicting or duplicate Open Graph tags SHALL exist
- AND `metadataBase` MUST be set to avoid relative URL issues

---

### Requirement: JSON-LD Structured Data

The system MUST include JSON-LD structured data for the Person schema (schema.org) to enhance search engine understanding of Rafael's professional profile.

#### Scenario: Person schema is present and valid

- GIVEN the portfolio page HTML
- WHEN a search engine or validator reads the JSON-LD
- THEN a `<script type="application/ld+json">` MUST be present in the `<head>` or `<body>`
- AND it MUST contain a valid Person schema with:
  - `@type`: "Person"
  - `name`: "Rafael Strongoli"
  - `jobTitle`: "Frontend Developer"
  - `url`: the portfolio URL
  - `sameAs`: array of social/profile URLs (GitHub, LinkedIn)
- AND the JSON-LD MUST pass Google's Rich Results Test

#### Scenario: JSON-LD does not break rendering

- GIVEN the JSON-LD script tag is in the page
- WHEN the HTML renders
- THEN the JSON-LD MUST NOT be visible to the user
- AND it MUST NOT cause any console errors
- AND it MUST NOT block page rendering

---

### Requirement: Semantic HTML Structure

The entire page MUST use semantic HTML elements with proper heading hierarchy, landmark regions, and ARIA attributes.

#### Scenario: Heading hierarchy is correct

- GIVEN the full page HTML
- WHEN headings are analyzed
- THEN there MUST be exactly one `<h1>` (in the hero section)
- AND section headings MUST be `<h2>` elements
- AND the hierarchy MUST NOT skip levels (no `<h1>` → `<h3>` without `<h2>` in between)

#### Scenario: Landmark regions are defined

- Given the page structure
- WHEN landmarks are inspected
- THEN the following landmark roles MUST be present:
  - `<nav>` for the main navigation (with `aria-label="Main navigation"`)
  - `<main>` wrapping the page content
  - `<footer>` for the page footer
  - `<section>` elements with `aria-labelledby` for each content section

#### Scenario: All images have alt text

- GIVEN all `<img>` and `next/image` components on the page
- WHEN alt text is inspected
- THEN every image MUST have descriptive `alt` text
- AND decorative images (if any) MUST have `alt=""` and `aria-hidden="true"`
- AND no image SHALL have `alt` containing "image of" or "picture of" (redundant)

---

### Requirement: Lighthouse Performance Score

The portfolio MUST achieve a Lighthouse Performance score of 95 or higher on desktop and strive for 90+ on mobile.

#### Scenario: Desktop Lighthouse score meets threshold

- GIVEN a production build of the portfolio deployed to a server
- WHEN Lighthouse audits the page on desktop
- THEN the Performance score MUST be >= 95
- AND the Accessibility score MUST be >= 90
- AND the Best Practices score MUST be >= 90
- AND the SEO score MUST be >= 90

#### Scenario: Core Web Vitals meet targets

- GIVEN a production deployment
- WHEN Core Web Vitals are measured
- THEN:
  - Largest Contentful Paint (LCP) MUST be < 2.5 seconds
  - Cumulative Layout Shift (CLS) MUST be < 0.1
  - First Input Delay (FID) / Interaction to Next Paint (INP) MUST be < 200ms

#### Scenario: Mobile performance is acceptable

- GIVEN a production deployment
- WHEN Lighthouse audits on mobile (simulated)
- THEN the Performance score SHOULD be >= 85
- AND the page MUST be fully usable on 3G throttled connections

---

### Requirement: Image Optimization

All images MUST use `next/image` with appropriate sizing, priority flags, and lazy loading.

#### Scenario: Hero image is prioritized

- GIVEN the hero section avatar/image
- WHEN the page loads
- THEN it MUST use `<Image priority>` for LCP optimization
- AND `sizes` attribute MUST be set for responsive rendering
- AND a blur placeholder MUST be provided while loading

#### Scenario: Below-fold images are lazy-loaded

- GIVEN project screenshots and other images below the fold
- WHEN the page loads
- THEN they MUST NOT have `priority` prop (default lazy-loading)
- AND they MUST use `next/image` for automatic optimization (WebP, sizing)
- AND `sizes` MUST be set appropriately for the layout

#### Scenario: No layout shift from images

- GIVEN all images on the page
- WHEN they load
- THEN each `<Image>` component MUST have explicit `width` and `height` props (or `fill` with container sizing)
- AND no image loading SHALL cause Cumulative Layout Shift > 0.1

---

### Requirement: JavaScript Bundle Optimization

The JavaScript bundle MUST be minimized by maximizing Server Components and code-splitting Client Components.

#### Scenario: Client Components are minimal

- Given the production build output
- WHEN the JavaScript bundle is analyzed
- THEN the client bundle size for the initial page load MUST be under 100KB (gzipped)
- AND only the following components SHALL be Client Components: Navbar, ThemeToggle, ContactForm, ProjectCard, ServiceCard, FadeIn (animation wrapper)
- AND all section shells (Hero, About, Projects layout, Skills, Services layout, Contact shell, Footer) MUST be Server Components

#### Scenario: Dynamic imports reduce initial bundle

- GIVEN below-fold section animations
- WHEN the page loads
- THEN Framer Motion animations MUST use viewport-triggered rendering (not mount-triggered)
- AND components below the fold MAY be dynamically imported if they contribute significantly to bundle size

---

### Requirement: Accessibility Foundation

The portfolio MUST meet WCAG 2.1 AA accessibility standards at a minimum.

#### Scenario: Color contrast meets AA standard

- GIVEN the portfolio in both light and dark modes
- WHEN color contrast is measured
- THEN all body text MUST have a contrast ratio of at least 4.5:1 against its background
- AND large text (headings) MUST have a contrast ratio of at least 3:1
- AND interactive elements MUST have a contrast ratio of at least 3:1 against adjacent colors

#### Scenario: Keyboard navigation covers all interactive elements

- GIVEN a keyboard-only user
- WHEN they Tab through the entire page
- THEN every interactive element (links, buttons, form inputs) MUST be reachable
- AND focus MUST be clearly visible (custom focus rings matching the design system)
- AND the Tab order MUST follow a logical reading order (top to bottom, left to right)

#### Scenario: Reduced motion preference is respected

- GIVEN a user with `prefers-reduced-motion: reduce` in their OS settings
- WHEN the portfolio loads
- THEN all scroll-triggered animations MUST be disabled or significantly reduced
- AND the page MUST still be fully usable and visually complete without animations
- AND Framer Motion MUST check `useReducedMotion()` before applying animations