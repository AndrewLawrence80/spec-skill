---
name: specify-spec
description: >-
    Author a feature specification that captures both the requested feature behavior and the relevant current implementation it touches, so later steps do not lose the global view. Use when the user says "write a spec", "specify a new feature", "draft a spec from this issue", or "turn this RFC into a spec". Invoke this skill at the start of any feature loop, including when the feature description comes from an external source (issue tracker, RFC, design doc, web link).
version: 0.2.0
phase: 3
---

# specify-spec

Produce `specs/<feature-slug>/spec.md` covering both:

- **Feature behavior** - WHAT and WHY, written for users and reviewers; no tech-stack choices for net-new components.
- **Current implementation** - the existing code paths the feature will interact with, so every later step understands the system the feature is being grafted onto. Every claim about existing code MUST cite a real `path:line`; nothing is invented.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 3.

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

- The user describes a new feature in natural language.
- The user provides an issue, RFC, design doc, or external link and wants a spec.
- An existing feature needs to be re-specified before refactoring.

## Inputs

- **Required:** a feature description (user prompt or external artifact).
- **Strongly preferred:**
    - `docs/overview.md`, `docs/module.md`, and the flow docs under `docs/logic/`: so the spec is grounded in the current system rather than written in a vacuum.
    - `.speckit/memory/constitution.md`: to surface principles relevant to the feature.
- **External sources:** issue trackers, RFCs, design docs, web links. Fetch and read these before drafting if the user supplied them.

## Outputs

- `specs/<feature-slug>/spec.md` (slug derived from the feature title, kebab-case).
- A consolidated clarification message if any required information is missing.

## Workflow

1. **Derive a feature slug** (kebab-case, short, meaningful) from the feature title or issue title.
2. **Read** any user-supplied external sources (issue, RFC, web link) and capture the verbatim intent. Do not paraphrase requirements away.
3. **Read** project docs (`docs/*.md`) to map which modules the feature touches.
4. **Discover the current implementation** by searching the codebase for the relevant entry points, interfaces/APIs, data shapes, and call sites. Record every file path found.
5. **Load** `templates/spec.md` and fill its sections:
    - **Feature behavior:** user value, user scenarios, functional requirements (FR-###), non-functional requirements (NFR-###), success criteria, and out-of-scope items. Do not introduce tech-stack choices for net-new components: those belong in `plan-spec`.
    - **Current implementation:** affected modules, existing entry points and interfaces/APIs, data shapes, and existing tests. Cite a `path:line` for every claim.
    - **Recommended implementation:** high-level approach, rationale, and any trade-offs considered.
    - **Risks & assumptions:** potential risks, non-obvious assumptions, or uncertainties. If none, write "None identified."
    - **Open questions:** any clarifications needed from the user. If none, write "None identified."
6. **Surface gaps** with `[NEEDS CLARIFICATION: ...]` markers and ask the user. Consolidate related questions into a single prompt; there is no fixed cap.
7. **Write** `specs/<feature-slug>/spec.md` and report its path plus any open clarifications.

## Quality checklist

- [ ] The feature-behavior sections describe WHAT and WHY only: no tech-stack choices for net-new components.
- [ ] Every functional requirement is independently testable (observable outcome).
- [ ] Success criteria are measurable.
- [ ] An out-of-scope section is present so reviewers know what the feature does not do.
- [ ] The current-implementation sections cite a real `path:line` for every claim.
- [ ] No invented modules, classes, or functions.
- [ ] All outstanding clarifications are listed in the open-questions section.

## Draft rules

- **No invented facts.** Stay strictly faithful to the user's requirements, the existing codebase, and the upstream artifacts. Where evidence is incomplete, emit `[NEEDS CLARIFICATION: ...]` markers or ask the user; do not invent.
- **Pragmatic inference.** Make reasonable structural inferences when the context provides clear clues, but do not invent modules, services, or behaviors that cannot be grounded in the code.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Best practice is encouraged.** Follow language conventions, community recommendations, and broadly accepted software-engineering principles when the user and the codebase are silent on a topic.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- If `[NEEDS CLARIFICATION]` markers remain, suggest **`clarify-spec`** to resolve them before planning.
- Otherwise, suggest **`plan-spec`** to design the implementation.
- `commit-spec` may be invoked at any time to checkpoint the spec.
- **Re-run policy.** If the spec is later amended, re-run `clarify-spec` (if markers remain), then `plan-spec`, `tasks-spec`, and `analyze-spec`.
