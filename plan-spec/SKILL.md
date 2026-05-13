---
name: plan-spec
description: >-
    Turn a clarified `spec.md` into a technical implementation plan covering stack, interfaces, data, and research, so `tasks-spec` can decompose it into executable steps. Use when the user says "plan the implementation", "design how we'll build this", "choose the stack for this feature", or "produce a technical plan". Invoke this skill once `spec.md` is clarified and before `tasks-spec` runs.
version: 0.2.0
phase: 5
---

# plan-spec

Produce the per-feature technical plan: `plan.md` (the master design) and the supporting `data-model.md` and `research.md` artifacts. This is where HOW lives: tech stack, module boundaries, interfaces, data shapes, migration steps.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 5.

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

## When to use

- A clarified `spec.md` exists.
- The user wants a concrete design before implementation.
- A previous plan needs to be revised because the spec changed or the analyzer flagged drift.

## Inputs

- **Required:** `specs/<feature-slug>/spec.md` (clarified).
- **Required for grounded design:** `docs/overview.md`, `docs/module.md`, and flow docs under `docs/logic/`. Without these, the plan risks optimizing a local concern and missing cross-cutting constraints. If `docs/` is empty, flag this risk and ask the user whether to run `documentation-spec` first or proceed with only the local view.
- **Optional:** `.speckit/memory/constitution.md`; existing `plan.md` (for revisions); external standards / RFCs the team already follows.

## Outputs (under `specs/<feature-slug>/`)

- `plan.md`: narrative design and decisions.
- `data-model.md`: entities, fields, relationships, migrations. Omit with a one-line note in `plan.md` if the feature introduces no new data entities.
- `research.md`: investigations, alternatives considered, links and citations. Omit with a one-line note in `plan.md` if no meaningful alternatives exist.

## Workflow

1. **Read** `spec.md`, then the `docs/` directory, then `.speckit/memory/constitution.md` if present. Note any constraints they impose on the design.
2. **Load** the templates from `templates/` as references: extend, reorder, or trim sections when the project clearly calls for it.
3. **Decide the stack and module placement.** For new components, justify the technology choice. For existing components, follow what `docs/module.md` already states; do not silently swap technologies.
4. **Apply the Simplicity gate.** For each added project, module, or abstraction, record a written justification in `plan.md`. If the justification is weak, drop the abstraction.
5. **Apply the Anti-abstraction gate.** Do not introduce interfaces, factories, or wrappers "for testability" without a second real consumer.
6. **Check constitution compliance.** If `.speckit/memory/constitution.md` is present, acknowledge each principle as satisfied, deferred, or explicitly waived with rationale.
7. **Design data** (optional): fill `data-model.md` with typed entities, relationships, and a migration plan traceable to the spec's functional requirements.
8. **Record research** (optional): in `research.md`, list alternatives considered, why the chosen approach wins, and links and citations.
9. **Validate** the draft against the quality checklist before writing any file.
10. **Write** all applicable artifacts to disk under `specs/<feature-slug>/`.
11. **Report** the plan to the user and surface any remaining open questions.

## Quality checklist

- [ ] Every plan decision traces back to a specific FR, NFR, or success criterion in `spec.md`.
- [ ] Tech choices for new components include a one-line rationale.
- [ ] Tech choices for existing components match `docs/module.md`.
- [ ] **Simplicity gate:** any added project, module, or abstraction has a written justification recorded in `plan.md`.
- [ ] **Anti-abstraction gate:** no premature interfaces "for testability" without a second consumer.
- [ ] **Constitution compliance:** if `.speckit/memory/constitution.md` is present, each principle is acknowledged (satisfied, deferred, or explicitly waived with rationale).
- [ ] Data-model fields are typed; relationships specified; migration noted in `data-model.md` (or `plan.md` carries a one-line note explaining why `data-model.md` is omitted).

## Draft rules

- **No invented facts.** Stay strictly faithful to the existing codebase and user answers. Where evidence is absent and the user has not responded, emit `[NEEDS CLARIFICATION: ...]` in the relevant artifact and report it.
- **Pragmatic inference.** Make reasonable inferences when the context provides clear clues, but do not invent modules, services, or behaviors that cannot be grounded in the code.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.

## Handoff

- Plan complete: suggest **`tasks-spec`**.
- `commit-spec` may be invoked at any time to checkpoint the plan.
- **Re-run policy.** If the plan is later amended, re-run `tasks-spec` and `analyze-spec`.
