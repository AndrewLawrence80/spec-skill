# Implementation Plan: `<feature-slug>`

> Spec: `specs/<feature-slug>/spec.md` - Created: YYYY-MM-DD

---

## Outline

<!-- Declare the modification outline that complements the requirements. One or two paragraphs explaining the shape of the change at a glance. -->

---

## High-level approach

<!-- For each functional and non-functional requirement, describe the implementation approach in one line. -->

- **FR-001 <name>**: <brief description of the implementation approach>
- **FR-002 <name>**: <brief description of the implementation approach>
- **NFR-001 <name>**: <brief description of the implementation approach>

---

## Affected modules

<!-- Modules this plan touches. For new components, state the technology choice and a one-line rationale. For existing components, follow docs/module.md - do not silently swap technologies. -->

- `<module_name>`: `<new | extend | refactor>` - <what changes and why>

---

## Data

<!-- Modifications to the existing data model and any new data models. Omit this section with a one-line note if the feature introduces no new or modified entities; otherwise the details belong in data-model.md and a summary belongs here. -->

- `<entity>` (`<new | modify>`): <brief description of the entity and its role in the implementation>

---

## Simplicity gate

<!-- For each added project, module, or abstraction, record a written justification. If the justification is weak, drop the abstraction. -->

- `<added unit>`: <why it must exist now, not later>

---

## Anti-abstraction gate

<!-- Do not introduce interfaces, factories, or wrappers "for testability" without a second real consumer. List any abstractions introduced and the second consumer that justifies each one. -->

- `<abstraction>`: <second consumer that justifies it, or "deferred until a second consumer appears">

---

## Constitution compliance

<!-- If `.speckit/memory/constitution.md` is present, acknowledge each principle as satisfied, deferred, or explicitly waived with rationale. If the constitution is absent, write "n/a - no constitution.md present". -->

- `<principle name>`: `<satisfied | deferred | waived>` - <rationale>

---

## Open questions

<!-- Anything still ambiguous after planning. Use [NEEDS CLARIFICATION: ...] markers so downstream skills can locate them. If none, write "None identified.". -->

- `[NEEDS CLARIFICATION: <question>]`
