# Project Implementation Plan: `<topic-slug>`

> Scope: project-level or cross-feature system plan - Created: YYYY-MM-DD

---

## Goal and scope

<!-- Describe the system being built, the boundaries of this plan, and the user or business outcome it must satisfy. Reference the project brief, project-level research, and any feature specs that contribute to this system. -->

---

## Build strategy

<!-- Summarize the bottom-up construction order in one or two paragraphs. The expected pattern is foundations first, block assembly second, integration last. -->

---

## Foundation layer

<!-- Define the lowest-level building blocks that everything else depends on. -->

### Data definitions

- `<entity or value object>`: <why it exists, where it lives, and which later blocks depend on it>

### Storage and database interfaces

- `<interface or adapter>`: <contract, backing store, and the invariants it must preserve>

### Shared algorithms and helpers

- `<helper or algorithm>`: <what problem it solves and why it belongs in the foundation layer>

---

## Block implementation sequence

<!-- Build one coherent block at a time. Each block should map back to a feature spec, project requirement, or subsystem slice. -->

### Block 1: `<name>`

- **Scope:** <what this block delivers>
- **Depends on:** <foundation pieces or earlier blocks>
- **Implementation notes:** <modules, interfaces, workflows, and constraints>
- **Spec linkage:** <feature spec path or project requirement>

### Block 2: `<name>`

- **Scope:** <what this block delivers>
- **Depends on:** <foundation pieces or earlier blocks>
- **Implementation notes:** <modules, interfaces, workflows, and constraints>
- **Spec linkage:** <feature spec path or project requirement>

---

## Integration sequence

<!-- Describe how the independently built blocks are combined into one system. Cover orchestration, shared state boundaries, cross-block contracts, observability, and release sequencing. -->

- `<integration milestone>`: <how the blocks are connected and how correctness will be checked>

---

## Module placement and stack choices

<!-- List the concrete modules, projects, services, or packages this plan introduces or extends. New components need a one-line rationale. Existing components should follow docs/module.md. -->

- `<module_name>`: `<new | extend | refactor>` - <why it belongs here>

---

## Simplicity gate

<!-- For each added project, module, or abstraction, record the justification. If the justification is weak, remove it. -->

- `<added unit>`: <why it must exist now>

---

## Anti-abstraction gate

<!-- Do not add interfaces, factories, or wrappers without a second real consumer. -->

- `<abstraction>`: <second consumer that justifies it, or "deferred until a second consumer appears">

---

## Constitution compliance

<!-- If `.speckit/memory/constitution.md` is present, acknowledge each principle as satisfied, deferred, or waived with rationale. If absent, write "n/a - no constitution.md present". -->

- `<principle name>`: `<satisfied | deferred | waived>` - <rationale>

---

## Risks and open questions

<!-- Record project-level uncertainties, sequencing risks, and missing information. -->

- `[NEEDS CLARIFICATION: <question>]`
