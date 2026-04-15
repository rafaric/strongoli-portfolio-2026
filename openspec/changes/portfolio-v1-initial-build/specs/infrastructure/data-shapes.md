# Data Shapes Specification

## Purpose

Defines the TypeScript interfaces and Zod schemas that govern all data structures in the portfolio. These shapes MUST be used consistently across data files, components, and Server Actions.

## Requirements

### Requirement: Project Interface

The system MUST define a `Project` interface and corresponding data that describes portfolio projects with full type safety.

#### Scenario: Project interface fields

- GIVEN the `Project` interface in `lib/data/projects.ts` or `lib/types.ts`
- WHEN a project object is created
- THEN it MUST include the following fields:
  - `id: string` — unique identifier (branded type `ProjectId` recommended)
  - `title: string` — project display name
  - `description: string` — short description (under 100 characters for cards)
  - `image: string` — path to project screenshot (relative to `/public`)
  - `tags: readonly string[]` — technology tags displayed as badges
  - `liveUrl: string | null` — URL to live demo (null for placeholder projects)
  - `githubUrl: string | null` — URL to GitHub repo (null for placeholder projects)
  - `featured: boolean` — whether this project is highlighted

#### Scenario: Project data is statically typed

- GIVEN the projects data file
- WHEN a project entry is added or modified
- THEN TypeScript MUST enforce the `Project` interface at compile time
- AND the data array MUST be `as const` to enable literal type inference
- AND attempting to add a project with missing fields MUST cause a compile error

---

### Requirement: Skill Interface

The system MUST define a `Skill` interface for displaying technology skills with categorization.

#### Scenario: Skill interface fields

- GIVEN the `Skill` interface
- WHEN a skill object is created
- THEN it MUST include the following fields:
  - `name: string` — technology display name
  - `icon: LucideIcon` — Lucide React icon component (or typed as `React.ComponentType`)
  - `category: SkillCategory` — category grouping (derived from const object)
  - `level: SkillLevel` — proficiency level (derived from const object)

#### Scenario: SkillCategory and SkillLevel are const types

- GIVEN the skill type definitions
- WHEN `SkillCategory` and `SkillLevel` are inspected
- THEN they MUST be derived using the const types pattern:
  ```typescript
  const SKILL_CATEGORIES = {
    frontend: "frontend",
    tools: "tools",
    platform: "platform",
  } as const;
  type SkillCategory = (typeof SKILL_CATEGORIES)[keyof typeof SKILL_CATEGORIES];
  
  const SKILL_LEVELS = {
    expert: "expert",
    advanced: "advanced",
    intermediate: "intermediate",
  } as const;
  type SkillLevel = (typeof SKILL_LEVELS)[keyof typeof SKILL_LEVELS];
  ```
- AND `SkillCategory` MUST resolve to `"frontend" | "tools" | "platform"`
- AND `SkillLevel` MUST resolve to `"expert" | "advanced" | "intermediate"`

---

### Requirement: Service Interface

The system MUST define a `Service` interface for displaying service offerings.

#### Scenario: Service interface fields

- GIVEN the `Service` interface
- WHEN a service object is created
- THEN it MUST include the following fields:
  - `id: string` — unique identifier
  - `title: string` — service name
  - `description: string` — brief client-oriented description
  - `icon: LucideIcon` — Lucide React icon for the service
  - `features: readonly string[]` — list of key deliverables/benefits

#### Scenario: Service data is immutable

- Given the services data array
- When it's defined in `lib/data/services.ts`
- Then it MUST be typed `as const` satisfies `readonly Service[]`
- AND modifying the array after definition MUST cause a TypeScript error

---

### Requirement: NavLink Interface

The system MUST define a `NavLink` interface for navigation items.

#### Scenario: NavLink interface fields

- GIVEN the `NavLink` interface
- WHEN a nav link object is created
- THEN it MUST include the following fields:
  - `label: string` — display text for the link
  - `href: string` — anchor href (e.g., `#hero`, `#projects`, `#contact`)

#### Scenario: NavLinks are used by navbar

- Given the navbar component
- When it renders the list of navigation links
- Then it MUST consume an array of `NavLink` objects from a shared constant
- AND adding a new section MUST only require adding a `NavLink` entry (not modifying component code)

---

### Requirement: ContactFormData Zod Schema

The system MUST define a Zod 4 schema for contact form validation, used both client-side and server-side.

#### Scenario: ContactFormData schema definition

- GIVEN the `contactSchema` in `lib/actions/contact.ts` or `lib/schemas/contact.ts`
- When the schema is defined
- Then it MUST use Zod 4 with the following fields:
  - `name`: `z.string().min(2, { error: "Name must be at least 2 characters" })`
  - `email`: `z.string().email({ error: "Please enter a valid email" })`
  - `message`: `z.string().min(10, { error: "Message must be at least 10 characters" })`
- AND the schema MUST use Zod 4's `error` parameter (not `message` — v4 breaking change)
- AND the inferred type `ContactFormData` MUST be `z.infer<typeof contactSchema>`

#### Scenario: Schema validation on client

- Given the contact form component
- When the user submits the form
- Then `safeParse` MUST be called (not `parse` — never throws)
- AND validation errors MUST be displayed inline next to each field
- AND the form MUST NOT submit if validation fails

#### Scenario: Schema validation on server

- Given the Server Action receives form data
- When the action processes it
- Then `safeParse` MUST be called again on the server
- AND if validation fails, error messages MUST be returned to the client
- AND if validation passes, the data MUST be logged and a success result returned

---

### Requirement: Server Action Result Type

The system MUST define a `Result` type for Server Action responses using the discriminated union pattern.

#### Scenario: Result type definition

- Given the `Result` type
- When defined in `lib/types.ts` or adjacent to the action
- Then it MUST follow:
  ```typescript
  type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };
  ```
- AND the Server Action MUST always return `ActionResult<ContactFormData>`
- AND the client MUST use exhaustive checking on `success` to handle both states

#### Scenario: Action returns success result

- Given a valid form submission
- When the Server Action processes it successfully
- Then it MUST return `{ success: true, data: { name, email, message } }`
- AND the client MUST display a success message

#### Scenario: Action returns error result

- Given an invalid or failed submission
- When the Server Action catches an error
- Then it MUST return `{ success: false, error: "..." }`
- AND the client MUST display the error message
- AND the error message MUST NOT expose internal server details