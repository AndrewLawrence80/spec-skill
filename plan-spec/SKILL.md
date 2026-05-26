---
name: plan-spec
description: >-
    Turn a clarified `spec.md` into a technical implementation plan covering stack, interfaces, data, and research, so `tasks-spec` can decompose it into executable steps. Use when the user says "plan the implementation", "design how we'll build this", "choose the stack for this feature", or "produce a technical plan". Invoke this skill once `spec.md` is clarified and before `tasks-spec` runs.
version: 0.2.0
phase: 5
---

# plan-spec

Produce either a feature-level technical plan or a project-level technical plan. For feature work, emit `plan.md` (the master design) plus the supporting `data-model.md` and `research.md` artifacts. For project-from-scratch or cross-cutting architecture work, emit a project-level plan that acts as the global build guide. This is where HOW lives: tech stack, module boundaries, interfaces, data shapes, migration steps, and bottom-up construction order.

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
- **Explore** - survey an unfamiliar codebase and write `.speckit/memory/exploration.md` when no docs or anchor artifacts exist.

## When to use

- A clarified `spec.md` exists.
- The user wants a concrete design before implementation.
- A previous plan needs to be revised because the spec changed or the analyzer flagged drift.
- The user needs a project-level implementation guide for building a system from scratch or coordinating multiple feature blocks into one integrated system.

## Inputs

- **Required:** `specs/<feature-slug>/spec.md` (clarified).
- **Required for grounded design:** `docs/overview.md`, `docs/module.md`, and flow docs under `docs/logic/`. Without these, the plan risks optimizing a local concern and missing cross-cutting constraints. If `docs/` is empty, flag this risk and ask the user whether to run `documentation-spec` first or proceed with only the local view.
- **Optional:** `.speckit/memory/constitution.md`; existing `plan.md` (for revisions); external standards / RFCs the team already follows.

For project-level planning, the anchor may be a project brief, a clarified architecture question, a project-level research artifact, or a set of feature specs that must be assembled into one system. If no grounded project-level inputs exist, stop and ask for them.

## Outputs

- **Feature-level plan:** `specs/<feature-slug>/plan.md` for narrative design and decisions.
- **Feature-level optional companions:** `specs/<feature-slug>/data-model.md` for entities, fields, relationships, and migrations; `specs/<feature-slug>/research.md` for investigations, alternatives considered, links, and citations. Omit either companion with a one-line note in `plan.md` if it is not needed.
- **Project-level plan:** `docs/plans/<topic-slug>.md` for a global implementation guide that sequences the system bottom-up, from foundational data definitions and interfaces through block-by-block construction and final integration.

## Template selection

Choose the template that matches the planning scope:

- **`templates/plan.md`** - use when the plan is tied to one feature spec directory and will drive `tasks-spec` for `specs/<feature-slug>/`.
- **`templates/project-level-plan.md`** - use when the plan is broader than a single feature: a new system, greenfield project, platform slice, or a multi-block implementation roadmap that must coordinate several specs into one build order.

Do not force a project-level implementation roadmap into the feature-level template. If the work mixes scopes, write the project-level plan first and explicitly point to the feature specs or future `plan.md` files that will refine each block.

## Workflow

1. **Determine scope and anchor.** Read `spec.md` when planning a feature; read the project brief, project-level research, related feature specs, and `docs/` when planning a broader system. Note the requirements and constraints that the plan must satisfy.
2. **Load** the matching template from `templates/` as a reference: extend, reorder, or trim sections when the project clearly calls for it.
3. **Decide the stack and module placement.** For new components, justify the technology choice. For existing components, follow what `docs/module.md` already states; do not silently swap technologies.
4. **Design the build order.** For project-level plans, sequence the implementation bottom-up: basic data definitions, storage contracts or database interfaces, helper algorithms or shared utilities, block-level construction derived from the relevant specs, and only then full-system integration.
5. **Apply the Simplicity gate.** For each added project, module, or abstraction, record a written justification in the plan. If the justification is weak, drop the abstraction.
6. **Apply the Anti-abstraction gate.** Do not introduce interfaces, factories, or wrappers "for testability" without a second real consumer.
7. **Check constitution compliance.** If `.speckit/memory/constitution.md` is present, acknowledge each principle as satisfied, deferred, or explicitly waived with rationale.
8. **Design data** (optional): for feature plans, fill `data-model.md` with typed entities, relationships, and a migration plan traceable to the spec's functional requirements. For project-level plans, summarize foundational data definitions in the project-level plan and point to deeper data-model artifacts when they exist.
9. **Record research** (optional): in `research.md` or a linked project-level research artifact, list alternatives considered, why the chosen approach wins, and links and citations.
10. **Validate** the draft against the quality checklist before writing any file.
11. **Write** all applicable artifacts to the scope-appropriate path.
12. **Report** the plan to the user and surface any remaining open questions.

## Quality checklist

- [ ] Every plan decision traces back to a specific FR, NFR, or success criterion in `spec.md`.
- [ ] Tech choices for new components include a one-line rationale.
- [ ] Tech choices for existing components match `docs/module.md`.
- [ ] Project-level plans sequence the work bottom-up: foundations first, feature blocks next, integration last.
- [ ] **Simplicity gate:** any added project, module, or abstraction has a written justification recorded in `plan.md`.
- [ ] **Anti-abstraction gate:** no premature interfaces "for testability" without a second consumer.
- [ ] **Constitution compliance:** if `.speckit/memory/constitution.md` is present, each principle is acknowledged (satisfied, deferred, or explicitly waived with rationale).
- [ ] Data-model fields are typed; relationships specified; migration noted in `data-model.md` (or `plan.md` carries a one-line note explaining why `data-model.md` is omitted).

## Draft rules

- **No invented facts.** Stay strictly faithful to the existing codebase and user answers. Where evidence is absent and the user has not responded, emit `[NEEDS CLARIFICATION: ...]` in the relevant artifact and report it.
- **Pragmatic inference.** Make reasonable inferences when the context provides clear clues, but do not invent modules, services, or behaviors that cannot be grounded in the code.
- **Scope discipline.** Use the feature-level template for one spec and the project-level template for greenfield or cross-feature system plans. Do not blur the two scopes into one vague artifact.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- Plan complete: suggest **`tasks-spec`**.
- `commit-spec` may be invoked at any time to checkpoint the plan.
- **Re-run policy.** If the plan is later amended, re-run `tasks-spec` and `analyze-spec`.
