# Projects Section Specification

## Purpose

Defines the projects section that showcases Rafael's work through a card grid with hover effects, live demo links, and GitHub links. This section MUST demonstrate real capability and build trust with potential clients.

## Requirements

### Requirement: Project Card Grid Layout

The system MUST render a responsive grid of project cards. The grid MUST display 4 projects: 3 real projects and 1 placeholder for future work.

#### Scenario: Grid renders on desktop

- GIVEN a user on a desktop viewport (1024px+)
- WHEN the projects section loads
- THEN project cards MUST be displayed in a 2-column or responsive grid
- AND each card MUST have consistent dimensions and spacing

#### Scenario: Grid renders on mobile

- GIVEN a user on a mobile viewport (375px)
- WHEN the projects section loads
- THEN project cards MUST stack in a single column
- AND each card MUST be fully visible and usable without horizontal scroll

#### Scenario: Responsive grid adapts between breakpoints

- GIVEN a user on a tablet viewport (768px)
- WHEN the projects section renders
- THEN the grid MUST adapt to show 2 columns with appropriate card sizing
- AND the transition between breakpoint layouts MUST NOT cause layout shift

---

### Requirement: Project Card Content

Each project card MUST display: project title, short description, technology tags, a screenshot or placeholder image, and action links (live demo + GitHub).

#### Scenario: Real project card displays all fields

- GIVEN a real project in the data
- WHEN its card is rendered
- THEN the card MUST show:
  - Project title as a heading
  - Short description (under 100 characters)
  - Technology tags as badges
  - A project screenshot or placeholder image
  - A "Live Demo" link with an external-link icon
  - A "GitHub" link with a GitHub icon
- AND the "Live Demo" link MUST open in a new tab (`target="_blank"` with `rel="noopener noreferrer"`)

#### Scenario: Placeholder project card displays coming-soon state

- GIVEN the placeholder project entry
- WHEN its card is rendered
- THEN the card MUST show a "Coming Soon" or similar label
- AND the live demo and GitHub links MUST be disabled or hidden
- AND the card SHOULD have a visually distinct but harmonious style (e.g., dashed border, lower opacity)

#### Scenario: Featured project is highlighted

- GIVEN a project marked as `featured: true` in the data
- WHEN the project grid renders
- THEN the featured project card MUST have a visual distinction (e.g., subtle border accent, "Featured" badge, or larger card)
- AND the featured project SHOULD appear first in the grid ordering

---

### Requirement: Project Card Hover Effects

Each real project card MUST have hover effects that add interactivity: scale transform, shadow elevation, and/or image zoom, all powered by Framer Motion.

#### Scenario: Hover scales card and reveals details

- GIVEN a real project card
- WHEN the user hovers over it
- THEN the card MUST apply a subtle scale transform (e.g., `scale(1.02)`) or shadow elevation
- AND the project image MAY zoom slightly within its container
- AND hover MUST be smooth (GPU-accelerated, no jank)

#### Scenario: Hover respects reduced motion

- GIVEN a user with `prefers-reduced-motion` enabled
- WHEN a project card would animate on hover
- THEN the hover effect MUST be reduced or removed
- AND the card MUST still show a clear visual indicator of interactivity (e.g., outline or color change)

#### Scenario: Hover is keyboard accessible

- GIVEN a user navigating with the keyboard
- WHEN focus moves to a project card link
- THEN the card MUST show the same visual feedback as hover (via `:focus-visible`)
- AND the focus indicator MUST be clearly visible (WCAG focus requirement)

---

### Requirement: Project Card Animations on Scroll

Project cards MUST animate into view using Framer Motion viewport-triggered animations (fade-in, slide-up). Cards MUST NOT animate on mount — only when scrolled into view.

#### Scenario: Cards fade in on scroll

- GIVEN a user scrolling down the page
- WHEN a project card enters the viewport
- THEN the card MUST animate in (fade-in + slide-up) with a staggered delay relative to its position in the grid
- AND the animation MUST only trigger once (not repeat on subsequent scrolls)

#### Scenario: Cards are visible without JavaScript

- GIVEN JavaScript is disabled or fails to load
- WHEN the projects section is viewed
- THEN all project cards MUST still be visible and readable
- AND the cards MUST appear in their final state (no animation, just visible content)

---

### Requirement: Projects Section Semantic Structure

The projects section MUST use proper semantic HTML with consistent `id` anchoring for navigation.

#### Scenario: Section anchor works from navbar

- GIVEN the navbar "Projects" link
- WHEN clicked
- THEN the browser MUST smooth-scroll to `id="projects"`
- AND the section heading MUST be visible below the sticky navbar

#### Scenario: Section uses semantic markup

- GIVEN the projects section structure
- WHEN inspected for semantic correctness
- THEN it MUST use `<section id="projects" aria-labelledby="projects-heading">`
- AND the heading MUST be an `<h2>` with `id="projects-heading"`
- AND each card MUST use an `<article>` element with accessible markup