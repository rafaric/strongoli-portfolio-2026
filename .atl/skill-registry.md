# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When building AI chat features - breaking changes from v4 | ai-sdk-5 | /Users/rafaric/.config/opencode/skill/ai-sdk-5/SKILL.md |
| When working with files where backend state management comes into play | backend-state-management | /Users/rafaric/.config/opencode/skill/backend-state-management/SKILL.md |
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | /Users/rafaric/.config/opencode/skills/branch-pr/SKILL.md |
| When working with visual UI components, state management patterns, recomposition optimization | compose-expert | /Users/rafaric/.config/opencode/skills/compose-expert/SKILL.md |
| When building REST APIs with Django - ViewSets, Serializers, Filters | django-drf | /Users/rafaric/.config/opencode/skill/django-drf/SKILL.md |
| When designing event-driven systems, implementing message queues | event-driven-architecture | /Users/rafaric/.config/opencode/skill/event-driven-architecture/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | /Users/rafaric/.config/opencode/skills/go-testing/SKILL.md |
| When working with build.gradle.kts, custom plugins, Gradle performance | gradle | /Users/rafaric/.config/opencode/skills/gradle/SKILL.md |
| When working with Gradle build files, version catalog, build optimization | gradle-expert | /Users/rafaric/.config/opencode/skills/gradle-expert/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | /Users/rafaric/.config/opencode/skills/issue-creation/SKILL.md |
| When working with .kt files, coroutines, or Kotlin-specific patterns | kotlin | /Users/rafaric/.config/opencode/skills/kotlin/SKILL.md |
| When modeling JPA entities with Spring Data JPA and Hibernate | kotlin-backend-jpa-entity-mapping | /Users/rafaric/.config/opencode/skills/kotlin-backend-jpa-entity-mapping/SKILL.md |
| When working with structured concurrency, Flow operators, coroutines | kotlin-coroutines | /Users/rafaric/.config/opencode/skills/kotlin-coroutines/SKILL.md |
| When working with StateFlow/SharedFlow, sealed hierarchies, DSL builders | kotlin-expert | /Users/rafaric/.config/opencode/skills/kotlin-expert/SKILL.md |
| When making platform abstraction decisions, expect/actual patterns | kotlin-multiplatform | /Users/rafaric/.config/opencode/skills/kotlin-multiplatform/SKILL.md |
| When migrating KMP projects to AGP 9.0+ | kotlin-tooling-agp9-migration | /Users/rafaric/.config/opencode/skills/kotlin-tooling-agp9-migration/SKILL.md |
| When migrating KMP from CocoaPods to Swift Package Manager | kotlin-tooling-cocoapods-spm-migration | /Users/rafaric/.config/opencode/skills/kotlin-tooling-cocoapods-spm-migration/SKILL.md |
| When converting Java files to idiomatic Kotlin | kotlin-tooling-java-to-kotlin | /Users/rafaric/.config/opencode/skills/kotlin-tooling-java-to-kotlin/SKILL.md |
| When working with Next.js - routing, Server Actions, data fetching | nextjs-15 | /Users/rafaric/.config/opencode/skill/nextjs-15/SKILL.md |
| When writing E2E tests - Page Objects, selectors, MCP workflow | playwright | /Users/rafaric/.config/opencode/skill/playwright/SKILL.md |
| When writing Python tests - fixtures, mocking, markers | pytest | /Users/rafaric/.config/opencode/skill/pytest/SKILL.md |
| When writing React components - no useMemo/useCallback needed | react-19 | /Users/rafaric/.config/opencode/skill/react-19/SKILL.md |
| When styling with Tailwind - cn(), theme variables, no var() in className | tailwind-4 | /Users/rafaric/.config/opencode/skill/tailwind-4/SKILL.md |
| When writing TypeScript code - types, interfaces, generics | typescript | /Users/rafaric/.config/opencode/skill/typescript/SKILL.md |
| Configure TypeScript strict mode with additional safety flags | typescript-strict | /Users/rafaric/.config/opencode/skill/typescript-strict/SKILL.md |
| When using Zod for validation - breaking changes from v3 | zod-4 | /Users/rafaric/.config/opencode/skill/zod-4/SKILL.md |
| When managing React state with Zustand | zustand-5 | /Users/rafaric/.config/opencode/skill/zustand-5/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### nextjs-15
- Server Components are default — async functions, no "use client" directive needed
- Server Actions: "use server" at top of file; use revalidatePath for cache, redirect for navigation
- Data Fetching: Promise.all for parallel, Suspense boundaries for streaming
- Route Handlers: app/api/route.ts with named exports (GET, POST, PUT, DELETE)
- Middleware: middleware.ts at project root, export config with matcher array
- Metadata: export metadata object (static) or generateMetadata function (dynamic)
- Use server-only package to prevent client imports of server code
- Private folders: prefix with _ (e.g., _components) to exclude from routing

### react-19
- No useMemo/useCallback — React Compiler memoizes automatically
- use() hook for promises/context — replaces useEffect for data fetching
- Server Components by default; add 'use client' only when using hooks/interactivity
- ref is a regular prop — no forwardRef needed
- useActionState for form mutations, useOptimistic for optimistic UI
- ALWAYS use named imports: import { useState } from "react", never import React

### typescript
- Const Types Pattern: create const object first, then type Status = (typeof STATUS)[keyof typeof STATUS]
- Flat Interfaces: one level depth; nested objects → dedicated interface
- NEVER use any — use unknown + type guards or generics
- Use import type { ... } for type-only imports
- Use utility types: Pick, Omit, Partial, Required, Record, etc.

### typescript-strict
- tsconfig: strict: true, noUncheckedIndexedAccess, noImplicitOverride, exactOptionalPropertyTypes
- Use branded types to prevent ID mixups (UserId vs OrderId)
- Exhaustive switch with never type for compile-time safety
- Result<T, E> pattern instead of throwing exceptions for failure cases
- Validate external data with Zod at system boundaries (API, forms)
- Path aliases: @/* → ./src/* for clean imports

### tailwind-4
- NEVER use var() in className — use Tailwind semantic classes (bg-primary, text-slate-400)
- NEVER use hex colors in className — use Tailwind color classes
- Use cn() only for conditional/merged classes; plain className for static
- Dynamic values → style prop, not arbitrary Tailwind classes
- Dark mode: bg-white dark:bg-slate-900 pattern with next-themes
- Style constants with var() ONLY for library props that can't accept className

### zod-4
- Breaking from v3: z.email(), z.uuid(), z.url() replace z.string().email() etc.
- Use 'error' param instead of 'message' (Zod 4 breaking change)
- Use discriminatedUnion for efficient tagged union types
- safeParse returns { success, data/error } — never throws
- Integrate with React Hook Form via @hookform/resolvers/zod

### playwright
- MCP workflow if available: navigate → snapshot → interact → screenshot → verify → then write tests
- Selector priority: getByRole > getByLabel > getByText > getByTestId (never CSS selectors)
- Page Object Pattern: extend BasePage, one page object per page, one spec file per page
- Reuse existing page objects across tests — never duplicate methods
- Move common methods to BasePage, data generation to helpers.ts
- Test tags: @critical, @e2e, @feature-name, @TEST-ID

### zustand-5
- Use selectors (state => state.field) or useShallow to prevent unnecessary re-renders
- NEVER destructure entire store — always select specific fields
- persist middleware for localStorage persistence
- immer middleware for direct mutation syntax (state.todos.push(...))
- devtools middleware for Redux DevTools integration
- Slices pattern for large stores (combine multiple createXxxSlice functions)

### ai-sdk-5
- Breaking from v4: import from "@ai-sdk/react" not "ai"; use DefaultChatTransport
- UIMessage.parts array replaces string content (type: "text" | "image" | "tool-call" | "tool-result")
- sendMessage replaces handleSubmit + input pattern
- streamText for server-side route handlers
- Tool definitions use zod schemas directly
- Error handling via onError callback on useChat

### go-testing
- Use teatest for Bubbletea TUI testing
- Follow table-driven test patterns
- Use testdata/ directory for fixture files

### compose-expert
- Use remember and derivedStateOf for state-derived computations
- Annotate @Immutable on data classes for Compose stability
- Keep composables small and focused; extract reusable components
- Use Material3 theme tokens, not hardcoded colors

### kotlin
- Prefer sealed classes/interfaces for restricted hierarchies
- Use data classes for immutable value objects
- Null safety: prefer ?. safe calls and ?: elvis over !!
- Use coroutines for async work (suspend functions, Flow)

### kotlin-expert
- StateFlow/SharedFlow for reactive state (NOT LiveData)
- Use @Immutable annotation on Compose data classes
- DSL builders with lambda receivers for type-safe fluent APIs
- inline/reified functions for performance-critical generics

### kotlin-coroutines
- Use supervisorScope for independent child coroutines
- Use coroutineScope for structured concurrency (all must succeed)
- flatMapLatest for switching streams on new emissions
- shareIn/stateIn for hot Flow sharing with lifecycle awareness

### kotlin-multiplatform
- Common source set for shared business logic (commonMain)
- expect/actual for platform-specific implementations
- iOS target: use swiftPackage() instead of CocoaPods
- Keep UI platform-specific, share ViewModels/domain logic

### kotlin-backend-jpa-entity-mapping
- Never use data classes for JPA entities (broken equals/hashCode with lazy loading)
- Use @EmbeddedId or IdClass for composite keys
- Always set fetch = FetchType.LAZY on @ManyToOne/@OneToOne
- Override equals() using business key, not id field

### gradle
- Use version catalog (libs.versions.toml) for all dependencies
- Cache configuration via isReproducibleFileOrder, isParallelOperation
- Avoid dynamic versions (use exact versions)
- Use buildSrc or convention plugins for multi-module projects

### gradle-expert
- Exclude transitive dependencies at the configuration level
- Use toolchain management for consistent JDK versions
- Desktop packaging: jpackageViaMsi for Windows, jpackageViaDmg for macOS
- ProGuard/R8: keep rules for reflection-based serialization

### branch-pr
- Create issue first, then branch (issue-first enforcement)
- Branch naming: {type}/{issue-number}-{short-description}
- PR description must reference the issue number
- Squash merge by default

### issue-creation
- Use GitHub Issues API for bug reports and feature requests
- Include reproduction steps, expected vs actual behavior
- Label with priority and type

### judgment-day
- Launch two independent blind judge sub-agents for adversarial review
- Synthesize findings, apply fixes, re-judge until both pass
- Maximum 2 re-judge iterations before escalation

### django-drf
- ViewSets for CRUD + custom actions with @action decorator
- Serializers: model validation, nested relationships, separate read/write
- Filters: django-filter with FilterSet classes
- Pagination: PageNumberPagination as default

### event-driven-architecture
- Use CloudEvents standard format for event payloads
- Event Sourcing for audit trails (store events, derive state)
- CQRS: separate read and write models
- AsyncAPI for event contract documentation

### backend-state-management
- Prefer event-driven state over polling
- Use optimistic updates with rollback for perceived performance
- Separate read and write state (CQRS) when complexity justifies it

### github-copilot-starter
- Configure Copilot for the project's tech stack
- Set .github/copilot-instructions.md with project conventions
- Enable Copilot Chat with custom instructions for code style

### find-skills
- Helps discover available agent skills by searching the skill registry
- Not a coding skill — use when looking for functionality that might exist as a skill

### pytest
- Fixtures for setup/teardown (scope: function, class, module, session)
- Use markers (@pytest.mark.slow, @pytest.mark.integration) for test classification
- Parametrize tests for data-driven scenarios
- Use tmp_path fixture for temporary files

### skill-creator
- Follow the Agent Skills spec for creating new skills
- Each skill needs SKILL.md with frontmatter (name, description, trigger)
- Keep skills focused: one skill per concern
- Include compact rules and examples

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | /Users/rafaric/.config/opencode/AGENTS.md | Global agent configuration — rules, personality, engram protocol |