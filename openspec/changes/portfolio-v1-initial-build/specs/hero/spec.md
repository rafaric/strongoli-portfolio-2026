# Hero Section Specification

## Purpose

Defines the hero section — the first-screen impression that visitors see. It MUST communicate Rafael Strongoli's value proposition as a freelance frontend developer, provide clear calls to action, and create visual impact with animated elements.

## Requirements

### Requirement: Hero Headline and Subheadline

The hero section MUST display a primary headline stating the developer's role and value proposition, followed by a subheadline with supporting detail. Both MUST be SEO-optimized and client-oriented.

#### Scenario: Hero renders with correct content

- GIVEN the portfolio homepage
- WHEN the hero section loads
- THEN a primary headline MUST be displayed (e.g., "Frontend Developer specializing in Next.js & React")
- AND a subheadline MUST appear below (e.g., "I build fast, conversion-focused web experiences for LatAm startups")
- AND both texts MUST use semantic `<h1>` and `<p>` elements respectively

#### Scenario: Hero text scales responsively

- GIVEN a user on a mobile viewport (375px wide)
- WHEN the hero section renders
- THEN the headline MUST be legible and not overflow the viewport
- AND the subheadline MUST wrap appropriately at smaller breakpoints
- AND font sizes MUST scale up on larger viewports for visual impact

---

### Requirement: Hero Call-to-Action Buttons

The hero section MUST display two call-to-action buttons: a primary CTA linking to the contact section and a secondary CTA linking to the projects section.

#### Scenario: Primary CTA links to contact

- GIVEN the hero section is rendered
- WHEN the user clicks the primary CTA button (e.g., "Hablemos" / "Let's Talk")
- THEN smooth-scroll navigation MUST navigate to the `#contact` section
- AND the button MUST have a distinct visual style (filled, accent color)

#### Scenario: Secondary CTA links to projects

- GIVEN the hero section is rendered
- WHEN the user clicks the secondary CTA button (e.g., "Ver Proyectos" / "See Projects")
- THEN smooth-scroll navigation MUST navigate to the `#projects` section
- AND the button MUST have a distinct visual style (outlined or ghost variant)

#### Scenario: CTAs are keyboard accessible

- GIVEN a user navigating via keyboard
- WHEN Tab focus reaches the CTA buttons
- THEN both buttons MUST be focusable with visible focus rings
- AND pressing Enter MUST trigger the same smooth-scroll navigation as clicking

---

### Requirement: Hero Avatar/Photo

The hero section MUST display a professional avatar or photo of the developer, optimized as the Largest Contentful Paint (LCP) image.

#### Scenario: Avatar renders as LCP-optimized image

- GIVEN the hero section loads
- WHEN the avatar image is inspected
- THEN it MUST use `next/image` with the `priority` prop enabled
- AND appropriate `sizes` attribute MUST be set for responsive rendering
- AND a blur placeholder SHALL be displayed while the image loads

#### Scenario: Avatar on slow connections

- GIVEN a user on a slow network connection
- WHEN the hero section begins loading
- THEN a blur placeholder or skeleton MUST be visible before the avatar loads
- AND the layout MUST NOT shift when the avatar finishes loading (CLS < 0.1)

#### Scenario: Avatar accessibility

- GIVEN a screen reader user encountering the hero avatar
- WHEN the avatar image is described
- THEN the `<img>` element MUST have a descriptive `alt` text (e.g., "Rafael Strongoli, frontend developer")
- AND the alt text MUST NOT be decorative-only (it communicates meaning)

---

### Requirement: Hero Animated Background

The hero section MUST feature an animated visual element — such as a subtle parallax effect, gradient animation, or abstract shapes — that adds visual depth without impacting performance.

#### Scenario: Background animation plays on load

- GIVEN the hero section has loaded
- WHEN the user views the section
- THEN an animated background effect MUST be visible (gradient shift, floating shapes, or parallax)
- AND the animation MUST use `will-change` or GPU-accelerated properties (transform, opacity)
- AND the animation MUST NOT cause jank or dropped frames (target: 60fps on mid-range devices)

#### Scenario: Background respects reduced motion preference

- GIVEN a user who has enabled "prefers-reduced-motion" in their OS
- WHEN the hero section renders
- THEN all animated background effects MUST be disabled or significantly reduced
- AND the hero MUST still present a visually acceptable static fallback
- AND Framer Motion MUST check `useReducedMotion()` before applying animations

#### Scenario: Background does not interfere with text readability

- GIVEN the animated background is active
- WHEN text content is overlaid
- THEN the headline and subheadline MUST maintain WCAG 2.1 AA contrast ratio (4.5:1)
- AND no animation SHALL cause text to become temporarily unreadable

---

### Requirement: Hero Section Semantic Structure

The hero section MUST use proper semantic HTML with a consistent `id` anchor for navigation.

#### Scenario: Hero section is properly anchored

- GIVEN the navbar "Home" or logo link
- WHEN clicked
- THEN the browser MUST scroll to the `id="hero"` section
- AND the hero section MUST use `<section id="hero" aria-labelledby="hero-heading">` markup
- AND the headline MUST be the `<h1>` element with `id="hero-heading"`