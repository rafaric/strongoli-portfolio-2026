# Services Section Specification

## Purpose

Defines the services section that presents Rafael's offerings to potential clients. Services MUST be presented as visually distinct cards — similar to a pricing layout — but WITHOUT prices, focusing on value propositions.

## Requirements

### Requirement: Service Cards Layout

The system MUST display 4 service cards in a responsive grid layout. Each card MUST present a service offering with an icon, title, description, and key features/deliverables.

#### Scenario: Four service cards render on desktop

- GIVEN a user on a desktop viewport (1024px+)
- WHEN the services section loads
- THEN exactly 4 service cards MUST be rendered in a row or 2x2 grid
- AND each card MUST have consistent sizing, spacing, and visual style

#### Scenario: Service cards stack on mobile

- GIVEN a user on a mobile viewport (375px)
- WHEN the services section loads
- THEN service cards MUST stack in a single column
- AND each card MUST be fully readable and usable without horizontal scroll

---

### Requirement: Service Card Content

Each service card MUST display: a service icon (Lucide), a service title, a short description, and a list of key features or deliverables.

#### Scenario: Service card displays all content fields

- GIVEN a service entry (e.g., "Landing Pages de Conversión")
- WHEN its card is rendered
- THEN the card MUST show:
  - An icon relevant to the service (Lucide icon)
  - A clear service title
  - A description (under 2 sentences)
  - A bullet list of 3-5 key features/deliverables
- AND the card MUST NOT display a price or "starting from" pricing

#### Scenario: Service descriptions are client-oriented

- GIVEN the service card content
- WHEN a potential client reads the description
- THEN the language MUST focus on client outcomes (e.g., "convierte visitantes en clientes") rather than technical jargon (e.g., "implementa server-side rendering")
- AND each feature point MUST describe a tangible benefit

---

### Requirement: Core Services Content

The 4 services MUST cover the following offerings, aligned with Rafael's freelance positioning:

1. **Landing Pages de Conversión** — Fast, conversion-optimized landing pages
2. **Dashboards Administrativos** — Admin panels and dashboards
3. **MVPs en 1-2 Semanas** — Rapid MVP development
4. **Integración Ligera de IA** — Lightweight AI integration into existing products

#### Scenario: All four services are displayed

- GIVEN the services section data
- WHEN the section renders
- THEN exactly 4 service cards MUST appear
- AND they MUST correspond to the 4 services listed above (in Spanish or English as appropriate)
- AND the ordering MUST match the list above (most important service first)

#### Scenario: CTA on service cards

- GIVEN a service card
- WHEN the user wants to take action
- THEN each card MAY include a "Consultar" or "Let's Talk" CTA that links to the contact section
- AND the CTA MUST be secondary in visual weight (not competing with the hero CTAs)

---

### Requirement: Service Card Hover Effects

Service cards MUST have subtle hover interactions to indicate interactivity and add visual polish.

#### Scenario: Card elevates on hover

- GIVEN a service card
- WHEN the user hovers over it
- THEN the card MUST show a subtle elevation effect (shadow increase or translateY)
- AND the effect MUST be smooth and GPU-accelerated
- AND the card MUST NOT scale excessively (keep it subtle, e.g., translateY(-2px) + shadow)

#### Scenario: Hover respects reduced motion

- GIVEN a user with `prefers-reduced-motion` enabled
- WHEN a service card would animate on hover
- THEN the hover effect MUST be reduced or replaced with a non-animated visual indicator
- AND the card MUST still appear interactive (e.g., cursor change, color shift)

---

### Requirement: Services Section Semantic Structure

The services section MUST use proper semantic HTML with anchored `id` for navigation.

#### Scenario: Section is properly anchored

- GIVEN the navbar "Services" or "Servicios" link
- WHEN clicked
- THEN the browser MUST smooth-scroll to `id="services"`
- AND the section heading MUST be visible below the sticky navbar

#### Scenario: Section uses semantic markup

- GIVEN the services section structure
- WHEN inspected for semantic correctness
- THEN it MUST use `<section id="services" aria-labelledby="services-heading">`
- AND the heading MUST be `<h2>` with `id="services-heading"`
- AND each service card MUST use `<article>` or `<li>` with appropriate ARIA