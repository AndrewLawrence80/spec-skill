---
name: tasks-spec
description: >-
    Decompose a ratified `plan.md` into an ordered, file-precise task list (`tasks.md`) for human or agent execution. Use when the user says "break down the plan", "generate implementation tasks", "make a task list", or "translate this design into actionable steps". Invoke this skill after `plan-spec` and before `analyze-spec` or `implement-spec`.
version: 0.2.0
phase: 6
---

# tasks-spec

Produce `specs/<feature-slug>/tasks.md`: an ordered, dependency-aware list of small, actionable implementation tasks. Each task strictly specifies the files it touches, required traceability, and uses a `[P]` marker for tasks that can run in parallel alongside their siblings.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 6.

1. **Constitution** - project-level principles, rules, and quality standards that govern all later steps.
2. **Documentation** - the global view of the codebase that later steps read so they do not optimize for a local view only.
3. **Specification** - per-feature spec capturing both the requested behavior and the current implementation it touches.
4. **Clarification** - resolve questions or ambiguities left by the spec before moving on.
5. **Planning** - design and implementation plan that satisfies the spec while respecting the constitution.
6. **Tasks** - the ordered, file-precise task list derived from the plan.
7. **Analysis** - verify that the plan and tasks comply with the spec, constitution, and other governance rules.
8. **Implementation** - the code changes that satisfy the tasks, guided by the plan.
9. **Unit test** - tests that verify the correctness of individual components.
10. **Integration test** - tests that verify the implementation satisfies the spec while respecting the constitution.

Cross-cutting steps (callable at any point in the flow):

- **Commit** - record progress in version control.
- **Audit** - retrospective review that surfaces design and code problems for follow-up.
- **Explore** - survey an unfamiliar codebase and write `.speckit/memory/exploration.md` when no docs or anchor artifacts exist.

## When to use

- A ratified `plan.md` exists for the target feature.
- The user requests an executable, step-by-step checklist to drive implementation.
- The underlying plan has been revised and the task list requires regeneration to reflect new architectural decisions.

## Inputs

- **Required:** `specs/<feature-slug>/plan.md`.
- **Optional:** `specs/<feature-slug>/data-model.md` (only when the feature introduces or modifies entities).
- **Strongly preferred:** `specs/<feature-slug>/spec.md` and the high-level `docs/` (ensures traceability to FRs and NFRs).
- **Optional:** `.speckit/memory/constitution.md` (for governance alignment) and existing `tasks.md` (if revising).

## Outputs

- A phased, dependency-aware task list stored at `specs/<feature-slug>/tasks.md`.

## Workflow

1. **Analyze prerequisites.** Ingest `plan.md` and all referenced design and spec documentation.
2. **Determine task ordering.** Default to the project's established sequence. If none exists, apply a bottom-up dependency model:
    - **Data models and types:** upstream definitions with the fewest dependencies.
    - **Utilities and algorithms:** shared functions required by core logic.
    - **Core implementation:** modules and components fulfilling functional requirements.
    - **Wiring and integration:** connecting core modules to the existing system.
    - **Polish and finalization:** tests, documentation updates, and linting / formatting.
3. **Draft the tasks.** Load `templates/tasks.md` and populate the timeline. Each task must explicitly define:
    - **Task ID:** for dependency mapping.
    - **Description:** concise summary of the goal.
    - **Target files:** exact creation or modification paths.
    - **Traceability:** links to upstream requirements (e.g., `FR-###`, `NFR-###`), a named API or interface, or a `data-model` entity (when applicable).
    - **Dependencies:** prerequisite Task IDs.
    - **Parallelization:** append `[P]` if the task has no sequential sibling dependency.
    - **Implementation guidance:** add a code snippet (pseudocode or specific references) to reduce ambiguity during execution.
4. **Validate test sequencing.** Ensure tasks generating tests for a specific behavior or interface precede the implementation task for that same behavior when that sequencing is chosen (TDD alignment).
5. **Surface ambiguities.** If the plan lacks actionable detail for a step, document all open questions and present them to the user for resolution.

## Quality checklist

- [ ] **Granularity:** no task is vaguely scoped (e.g., "implement feature"). Tasks must be atomic and reviewable in isolation.
- [ ] **File precision:** every task explicitly declares the targeted file paths.
- [ ] **Traceability:** every task maps backwards to an FR, NFR, named API or interface, `data-model` entity (when applicable), or legitimate setup / polish requirement.
- [ ] **Dependency accuracy:** prerequisite task IDs are explicit, and `[P]` tags correctly identify parallelizable work.
- [ ] **Doc updates:** the polish phase includes a dedicated task to reflect feature changes inside `docs/*.md`.

## Draft rules

- **No invented facts.** Stay strictly faithful to the provided `plan.md` and existing codebase. Insert `[NEEDS CLARIFICATION: <issue>]` where evidence is absent.
- **Pragmatic inference.** Make reasonable structural assumptions based on the codebase's existing patterns, but never invent fictional external services or complex missing behaviors.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- Let the user know the tasks are ready, and recommend invoking **`analyze-spec`** to cross-verify the spec, plan, and tasks for consistency.
- Only proceed to implementation (`implement-spec`) after analysis succeeds.
- `commit-spec` may be invoked at any time to checkpoint the task list.
- **Re-run policy.** If `tasks.md` is later amended, re-run `analyze-spec`.
