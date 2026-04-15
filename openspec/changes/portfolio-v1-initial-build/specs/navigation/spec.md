# Navigation Specification

## Purpose

Defines the sticky navigation bar, smooth scroll links, mobile menu, theme toggle, and overall navigation behavior for the single-page portfolio.

## Requirements

### Requirement: Sticky Navigation Bar

The system MUST render a fixed navbar at the top of the viewport that remains visible during scroll. The navbar SHALL contain links to each major section of the portfolio and a theme toggle button.

#### Scenario: Navbar stays visible on scroll

- GIVEN a user viewing the portfolio
- WHEN the user scrolls down past the hero section
- THEN the navbar MUST remain fixed at the top of the viewport
- AND the navbar background MUST become semi-transparent with a backdrop blur effect (glass morphism style)

#### Scenario: Navbar links navigate to correct sections

- GIVEN the sticky navbar is visible
- WHEN the user clicks a navigation link (e.g., "Projects")
- THEN the viewport MUST smooth-scroll to the `#projects` section
- AND the URL hash MUST update to `#projects` without a full page reload

#### Scenario: Active section is highlighted in navbar

- GIVEN a user scrolling through the portfolio
- WHEN the "About" section occupies the majority of the viewport
- THEN the "About" link in the navbar MUST be visually highlighted (active state)
- AND highlighting MUST update dynamically as the user scrolls between sections

---

### Requirement: Mobile Navigation

The system MUST provide a hamburger menu for viewports below the responsive breakpoint (768px). The mobile menu SHALL slide in from the side or drop down with a smooth animation and close when a link is clicked.

#### Scenario: Hamburger menu opens on mobile

- GIVEN a user on a viewport narrower than 768px
- WHEN the user taps the hamburger icon
- THEN a full-screen or slide-in menu MUST appear with all navigation links
- AND a close button (X icon) MUST be visible

#### Scenario: Mobile menu closes on link click

- GIVEN the mobile menu is open
- WHEN the user taps a navigation link
- THEN the menu MUST close with a smooth animation
- AND smooth-scroll navigation to the clicked section MUST proceed

#### Scenario: Mobile menu closes on outside tap

- GIVEN the mobile menu is open
- WHEN the user taps outside the menu area or presses Escape
- THEN the menu MUST close
- AND no stale overlay or scroll-lock SHALL remain

---

### Requirement: Theme Toggle

The system MUST provide a theme toggle button in the navbar that cycles through light, dark, and system themes. The toggle MUST use next-themes for state management and persist the user's preference.

#### Scenario: Theme toggle cycles through modes

- GIVEN a user on the portfolio
- WHEN the theme toggle is clicked
- THEN the theme MUST cycle: system → light → dark → system
- AND the active theme MUST be visually indicated (sun icon for light, moon for dark, monitor for system)

#### Scenario: Theme preference persists across sessions

- GIVEN a user who selected "dark" theme
- WHEN the user closes the browser and returns
- THEN the dark theme MUST be applied without flashing the light theme first
- AND next-themes MUST read from localStorage before rendering

#### Scenario: SSR renders correct theme without flash

- GIVEN a server-side rendered page
- WHEN the HTML is delivered to the browser
- THEN next-themes MUST inject a script tag that reads localStorage before paint
- AND the correct theme class MUST be applied to `<html>` before first contentful paint

---

### Requirement: Smooth Scroll Behavior

The system MUST implement smooth scroll navigation from the navbar to all sections. Scrolling MUST use `scroll-behavior: smooth` CSS or programmatic `scrollIntoView` with smooth behavior.

#### Scenario: Clicking nav link scrolls smoothly

- GIVEN a user viewing the hero section
- WHEN the user clicks "Contact" in the navbar
- THEN the viewport MUST animate a smooth scroll to the contact section
- AND the scroll duration MUST be perceptible but not sluggish (~500ms)

#### Scenario: Scroll offset accounts for sticky navbar

- GIVEN the sticky navbar is 64px tall
- WHEN smooth-scroll navigates to a section
- THEN the target section's top MUST be visible below the navbar
- AND the section heading MUST NOT be hidden behind the navbar

#### Scenario: Direct URL with hash loads correct section

- GIVEN a user navigating to `portfolio.com/#projects`
- WHEN the page loads
- THEN the browser MUST scroll to the projects section after hydration
- AND the navbar MUST highlight the "Projects" link

---

### Requirement: Navigation Accessibility

The navigation MUST be fully keyboard-operable with clear focus indicators and ARIA labels for screen readers.

#### Scenario: Keyboard navigation works end-to-end

- GIVEN a user navigating with the Tab key
- WHEN focus reaches the navbar
- THEN each navigation link MUST be reachable via Tab
- AND pressing Enter on a focused link MUST trigger smooth-scroll to the target section

#### Scenario: Mobile menu is operable via keyboard

- GIVEN the hamburger menu button has focus
- WHEN the user presses Enter (or Space)
- THEN the mobile menu MUST open
- AND focus MUST move to the first link in the mobile menu
- AND pressing Escape MUST close the mobile menu

#### Scenario: Screen reader announces navigation

- GIVEN a screen reader user navigating the portfolio
- WHEN the navbar is encountered
- THEN the `<nav>` element MUST have `aria-label="Main navigation"`
- AND the current active section MUST be indicated with `aria-current="true"`