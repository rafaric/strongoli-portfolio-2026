# Footer Specification

## Purpose

Defines the footer section at the bottom of the portfolio page, containing copyright information, social links, and a back-to-top button.

## Requirements

### Requirement: Copyright Information

The footer MUST display copyright information with the current year and Rafael Strongoli's name or brand.

#### Scenario: Copyright displays current year

- GIVEN the footer is visible
- WHEN the copyright text is inspected
- THEN it MUST display `© {current_year} Rafael Strongoli` or equivalent
- AND the year MUST be dynamic (not hardcoded to a past year)

---

### Requirement: Social Links

The footer MUST include social/profile links (GitHub, LinkedIn, and any other relevant profile) that open in new tabs.

#### Scenario: Social links open correctly

- GIVEN the footer is visible
- WHEN the user clicks each social link (GitHub, LinkedIn)
- THEN each link MUST open the correct profile URL in a new tab
- AND each link MUST have `rel="noopener noreferrer"` and `target="_blank"`

#### Scenario: Social links are accessible

- GIVEN a screen reader user navigating the footer
- WHEN social icon links are encountered
- THEN each icon-only link MUST have an `aria-label` describing the destination (e.g., "GitHub profile", "LinkedIn profile")

---

### Requirement: Back-to-Top Button

The footer MUST provide a back-to-top button that smooth-scrolls the user to the top of the page.

#### Scenario: Back-to-top scrolls to hero

- GIVEN the user has scrolled down the page
- WHEN they click the back-to-top button in the footer
- THEN the page MUST smooth-scroll to the `#hero` section
- AND the scroll MUST account for the sticky navbar offset

#### Scenario: Back-to-top is keyboard accessible

- GIVEN a keyboard user navigating the page
- WHEN focus reaches the back-to-top button
- THEN the user MUST be able to activate it with Enter or Space
- AND the result MUST be the same smooth-scroll to top as clicking

#### Scenario: Back-to-top has accessible label

- GIVEN a screen reader user
- WHEN the back-to-top button is encountered
- THEN it MUST have an `aria-label` of "Back to top" or equivalent
- AND it MUST NOT be announced as just an icon

---

### Requirement: Footer Semantic Structure

The footer MUST use proper semantic HTML.

#### Scenario: Footer uses landmark element

- GIVEN the footer markup
- WHEN inspected for semantic correctness
- THEN it MUST use the `<footer>` element
- AND it SHOULD NOT need an `id` for navigation (it's the page footer, not a scannable section)
- AND the content MUST be wrapped in a semantic container