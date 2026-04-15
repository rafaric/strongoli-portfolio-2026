# About Section Specification

## Purpose

Defines the about section that presents Rafael Strongoli's freelance profile with client-oriented messaging. This section MUST build trust by communicating expertise, approach, and personality — not just resume bullet points.

## Requirements

### Requirement: About Copy Content

The about section MUST display a short, client-oriented bio paragraph that emphasizes the value Rafael delivers to clients (fast delivery, modern stack, conversion focus) rather than a self-centered resume dump.

#### Scenario: About section renders with client-oriented copy

- GIVEN the portfolio page has loaded
- WHEN the user scrolls to the about section
- THEN a heading MUST be displayed (e.g., "Sobre mí" / "About Me")
- AND a paragraph (or short paragraphs) MUST describe Rafael's value proposition from the **client's perspective** — what problems solved, not just what technologies known
- AND the copy MUST mention: freelance frontend specialization, LatAm startup focus, fast delivery approach
- AND the copy MUST NOT be a generic resume summary

#### Scenario: About copy is concise

- GIVEN the about section content
- WHEN the text length is measured
- THEN the total visible copy MUST be under 150 words
- AND the section MUST be scannable at a glance (not a wall of text)

---

### Requirement: About Photo/Avatar

The about section MUST include a professional photo or stylized avatar of the developer, positioned to create visual balance with the text content.

#### Scenario: Photo renders with proper optimization

- GIVEN the about section is rendered
- WHEN the developer photo appears
- THEN it MUST use `next/image` with appropriate `width`, `height`, and `alt` props
- AND the photo MUST have a border radius or styling that matches the design system
- AND a blur placeholder MUST be shown while loading

#### Scenario: Photo positioning on mobile

- GIVEN a user on a mobile viewport (375px)
- WHEN the about section renders
- THEN the photo MUST appear above the text (stacked layout)
- AND the photo MUST be sized appropriately for mobile (not too large, not too small)

#### Scenario: Photo positioning on desktop

- GIVEN a user on a desktop viewport (1024px+)
- WHEN the about section renders
- THEN the photo and text MUST appear in a two-column layout
- AND the photo MUST be on the left or right with text on the opposite side

---

### Requirement: About Section Accessibility

The about section MUST use proper semantic HTML and be navigable by assistive technologies.

#### Scenario: Screen reader navigates about section

- GIVEN a screen reader user navigating the page
- WHEN the about section is reached
- THEN the section MUST use `<section id="about" aria-labelledby="about-heading">`
- AND the heading MUST be an `<h2>` with `id="about-heading"`
- AND the image MUST have descriptive `alt` text

#### Scenario: About section reachable via navbar

- GIVEN the sticky navbar
- WHEN the user clicks "About" or "Sobre mí"
- THEN the page MUST smooth-scroll to `#about`
- AND the section heading MUST be visible below the sticky navbar