# Contact Section Specification

## Purpose

Defines the contact section that enables potential clients to reach Rafael. It MUST include a validated form (via Server Action + Zod), direct contact links (WhatsApp, Email, LinkedIn), and clear error/success feedback.

## Requirements

### Requirement: Contact Form with Zod Validation

The system MUST provide a contact form with fields for name, email, and message, validated using Zod 4 on both client and server via a Server Action. The form MUST use `useActionState` for progressive enhancement.

#### Scenario: Valid form submission succeeds

- GIVEN a user on the contact form
- WHEN they fill in:
  - Name: "María López" (2+ characters, required)
  - Email: "maria@example.com" (valid email format)
  - Message: "I need a landing page for my startup" (10+ characters, required)
- AND they click "Enviar" / "Send"
- THEN the form MUST submit via Server Action
- AND a success message MUST be displayed (e.g., "Message sent! I'll get back to you soon")
- AND the form fields MUST be cleared after successful submission

#### Scenario: Invalid name is rejected

- GIVEN a user on the contact form
- WHEN they enter a name with fewer than 2 characters (e.g., "A") or leave it empty
- AND they attempt to submit
- THEN a validation error MUST be displayed inline next to the name field
- AND the error message MUST clearly describe what's wrong (e.g., "Name must be at least 2 characters")

#### Scenario: Invalid email is rejected

- GIVEN a user on the contact form
- WHEN they enter an invalid email (e.g., "notanemail", "user@")
- AND they attempt to submit
- THEN a validation error MUST be displayed inline next to the email field
- AND the error message MUST clearly indicate the email format is invalid

#### Scenario: Short message is rejected

- GIVEN a user on the contact form
- WHEN they enter a message with fewer than 10 characters
- AND they attempt to submit
- THEN a validation error MUST be displayed inline next to the message field
- AND the error message MUST indicate the minimum length (e.g., "Message must be at least 10 characters")

#### Scenario: Server-side validation catches bypassed client validation

- GIVEN a malicious user who bypasses client-side validation
- WHEN they submit a form payload with invalid data directly to the Server Action
- THEN the Server Action MUST validate using Zod `safeParse`
- AND invalid data MUST be rejected with appropriate error messages returned
- AND the form MUST NOT process or log invalid submissions

---

### Requirement: Server Action Processing

The contact form MUST be processed by a Next.js Server Action (`lib/actions/contact.ts`) that validates the input with Zod and handles success/error states. In v1, the action SHALL log the submission to the console and return a success response.

#### Scenario: Server Action logs submission

- GIVEN a valid form submission
- WHEN the Server Action processes it
- THEN the action MUST log the submission data (name, email, message, timestamp) to the server console
- AND the action MUST return a success result to the client

#### Scenario: Server Action returns structured result

- GIVEN the Server Action implementation
- WHEN a submission is processed
- THEN the action MUST return a `Result` type: `{ success: true, data: { name, email, message } }` or `{ success: false, error: "..." }`
- AND the client MUST use this result to display appropriate feedback

#### Scenario: Server Action handles unexpected errors

- GIVEN an unexpected error occurs during processing (e.g., runtime exception)
- WHEN the Server Action catches the error
- THEN it MUST return a generic error message (e.g., "Something went wrong. Please try again")
- AND it MUST NOT expose internal error details to the client
- AND the action MUST log the full error server-side for debugging

---

### Requirement: Direct Contact Links

In addition to the form, the contact section MUST display direct contact links: WhatsApp, Email, and LinkedIn. These links MUST be prominent and immediately actionable.

#### Scenario: WhatsApp link opens WhatsApp conversation

- GIVEN the contact section is visible
- WHEN the user clicks the WhatsApp link
- THEN it MUST open WhatsApp Web or the WhatsApp app with a pre-filled message (e.g., "Hi Rafael, I found your portfolio and...")
- AND the link MUST include the correct WhatsApp number

#### Scenario: Email link opens email client

- GIVEN the contact section is visible
- WHEN the user clicks the Email link
- THEN it MUST open the user's default email client with a `mailto:` link
- AND the `mailto:` link SHOULD include a pre-filled subject (e.g., "Portfolio Contact")

#### Scenario: LinkedIn link opens profile

- GIVEN the contact section is visible
- WHEN the user clicks the LinkedIn link
- THEN it MUST open Rafael's LinkedIn profile in a new tab
- AND the link MUST have `rel="noopener noreferrer"` and `target="_blank"`

#### Scenario: Direct links are accessible

- GIVEN a screen reader user navigating the contact section
- WHEN each direct link is encountered
- THEN links MUST have descriptive text (e.g., "Contact via WhatsApp" not just "WhatsApp")
- AND icon-only links MUST have `aria-label` attributes

---

### Requirement: Form Loading and Success States

The form MUST provide clear feedback during submission (loading state) and after submission (success or error).

#### Scenario: Loading state during submission

- GIVEN the user has clicked "Send"
- WHEN the Server Action is processing
- THEN the submit button MUST show a loading indicator (spinner or text change)
- AND the submit button MUST be disabled to prevent double submission
- AND all form fields MUST be disabled during submission

#### Scenario: Success state after submission

- GIVEN the Server Action returned `{ success: true }`
- WHEN the success state is rendered
- THEN a success message MUST be displayed prominently
- AND the form fields MUST be cleared
- AND the user MUST be able to submit again if needed

#### Scenario: Error state after failed submission

- GIVEN the Server Action returned `{ success: false, error: "..." }`
- WHEN the error state is rendered
- THEN an error message MUST be displayed above the form
- AND the form fields MUST retain their previous values (don't clear on error)
- AND the user MUST be able to correct and resubmit

---

### Requirement: Contact Section Semantic Structure

The contact section MUST use proper semantic HTML with consistent `id` anchoring.

#### Scenario: Section is properly anchored

- GIVEN the navbar "Contact" or "Contacto" link
- WHEN clicked
- THEN the browser MUST smooth-scroll to `id="contact"`
- AND the section heading MUST be visible below the sticky navbar

#### Scenario: Form uses proper HTML form elements

- GIVEN the contact form
- WHEN inspecting the form markup
- THEN it MUST use `<form>` with `action` attribute pointing to the Server Action
- AND each input MUST use `<label>` elements connected via `htmlFor`/`id`
- AND the form MUST be submittable without JavaScript (progressive enhancement)