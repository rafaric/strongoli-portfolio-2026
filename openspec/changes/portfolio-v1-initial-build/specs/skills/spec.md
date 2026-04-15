# Skills Section Specification

## Purpose

Defines the skills section that visually presents Rafael's technical stack using icons and badges, grouped by category. This section MUST communicate breadth and depth of expertise at a glance.

## Requirements

### Requirement: Skill Display Format

The system MUST display skills as visual badges with icons and labels, grouped by category (Frontend, Tools, Other). Each badge MUST include the technology's Lucide icon (or a suitable alternative) and the technology name.

#### Scenario: Skills render grouped by category

- GIVEN the skills section has loaded
- WHEN the user views the section
- THEN skills MUST be organized into categories: Frontend, Tools & Platform, and any additional groupings
- AND each category MUST have a visible heading (e.g., "Frontend", "Tools & Platform")
- AND skills within each category MUST be displayed as badge elements with icons and labels

#### Scenario: Each skill badge shows icon and name

- GIVEN a skill entry in the data (e.g., `{ name: "Next.js", icon: SiNextdotjs, category: "frontend" }`)
- WHEN the skill badge renders
- THEN the badge MUST display the technology icon and the technology name
- AND the badge MUST be visually consistent with the design system (rounded, sized, colored)

#### Scenario: Skill badges scale on mobile

- GIVEN a user on a mobile viewport (375px)
- WHEN the skills section renders
- THEN skill badges MUST wrap into multiple rows
- AND each badge MUST remain legible and tappable
- AND the section MUST NOT require horizontal scrolling

---

### Requirement: Skill Level Indication

Each skill MAY display a proficiency level indicator (e.g., filled dots, progress bar, or subtle visual distinction) to communicate depth of knowledge.

#### Scenario: Skill level is visually indicated

- GIVEN a skill with `level: "expert"` in the data
- WHEN the skill badge renders
- THEN the badge SHOULD have a subtle visual indicator of proficiency level
- AND the indicator MUST be accessible (described via ARIA or visually clear)

#### Scenario: All skill levels are present

- GIVEN the skill data includes entries with `level: "expert"`, `level: "advanced"`, and `level: "intermediate"`
- WHEN the skills section renders
- THEN each level MUST be visually distinguishable from the others
- AND there MUST be a legend or implicit visual pattern that communicates the meaning

---

### Requirement: Core Skills Content

The skills section MUST showcase the following core technologies at minimum: Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Supabase, OpenAI, Vercel.

#### Scenario: All required skills are displayed

- GIVEN the skills data file
- WHEN the section renders
- THEN the following technologies MUST appear: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Supabase, OpenAI, Vercel
- AND additional relevant skills MAY be included (Git, Node.js, etc.)

#### Scenario: Skills are ordered logically

- GIVEN the skills section
- WHEN the user scans from left to right, top to bottom
- THEN core/frontend skills SHOULD appear first
- AND secondary/tool skills SHOULD follow
- AND the ordering MUST prioritize the technologies most relevant to potential clients

---

### Requirement: Skills Section Scroll Animation

The skills section MUST animate into view with a staggered fade-in effect for each category or badge group.

#### Scenario: Skills fade in on scroll

- GIVEN a user scrolling down the page
- WHEN the skills section enters the viewport
- THEN the category headings MUST fade in first
- AND skill badges MUST stagger in with a slight delay per badge
- AND the animation MUST only trigger once

#### Scenario: Skills are visible without animation

- GIVEN JavaScript is disabled
- WHEN the skills section is viewed
- THEN all skills MUST be visible and readable in their final state
- AND no content MUST be hidden or inaccessible due to missing animation

---

### Requirement: Skills Section Semantic Structure

The skills section MUST use proper semantic HTML and be navigable by keyboard and assistive technologies.

#### Scenario: Section is properly anchored

- GIVEN the navbar "Skills" or "Stack" link
- WHEN clicked
- THEN the browser MUST smooth-scroll to `id="skills"`
- AND the section heading MUST be visible below the sticky navbar

#### Scenario: Skill badges are accessible

- GIVEN a screen reader user navigating the skills section
- WHEN each skill badge is encountered
- THEN the technology name MUST be announced
- AND icons MUST have `aria-hidden="true"` (if decorative) or `aria-label` (if meaningful)
- AND the section MUST use `<section id="skills" aria-labelledby="skills-heading">`