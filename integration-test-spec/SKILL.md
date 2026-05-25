---
name: integration-test-spec
description: >-
    Add or update integration tests that verify multiple modules working together against real (or realistic) dependencies. Use when the user says "add integration tests", "test the modules together", "end-to-end test this feature", or "verify the API end-to-end". Invoke this skill after `implement-spec` finishes the integration phase, or alongside `unittest-spec` when both are needed.
version: 0.2.0
phase: 10
---

# integration-test-spec

Author integration tests at the **boundaries declared by the plan and the documentation set**, not at arbitrary slices. Use the project's preferred test framework and style first; fall back to the polyglot reference under `templates/` only when the project has none.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 10.

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

- A feature has multiple modules collaborating and needs cross-boundary verification.
- A new API or link was introduced and needs an integration test.
- A bug indicates a missing integration scenario.

## Inputs

- **Required:** source code.
- **Required for boundary correctness:** `specs/<feature-slug>/plan.md` (declared boundaries) and `docs/module.md` plus `docs/logic/*.md` (so the test boundary matches the system's real module boundaries, not just the feature's local view).
- **Optional:** `specs/<feature-slug>/data-model.md` (entities and fixtures) when the feature introduces or modifies data.
- **Optional:** `.speckit/memory/constitution.md` (e.g., "all integration tests run against a real database").

## Outputs

- Integration-test files in the project's test directory.
- `specs/<feature-slug>/integration-test.md` summarizing scenarios, environment, and gaps.

## Workflow

1. **Detect** the integration-test runner in the repo. Mirror its style. Use the polyglot fallback only if no convention exists.
2. **Detect boundaries** from `docs/module.md` and the flow docs under `docs/logic/*.md`. Each integration test should exercise a real cross-module flow, ideally one named in `docs/logic/*.md`.
3. **Enumerate scenarios**:
    - One flow test per relevant documented flow under `docs/logic/*.md`.
    - Failure and fallback paths called out by the spec or plan.
4. **Load and understand the template**: `templates/integration-report.md`.
5. **Determine the test environment**: real dependencies (e.g., test containers) vs. fakes, based on project standards and constitution rules. Avoid mocks for the system boundary under test.
6. **Set up dependencies** as realistically as the project standard allows (containers, fakes only when documented). Avoid mocks for the boundary under test.
7. **Write tests**, run them, iterate until green.
8. **Write** `specs/<feature-slug>/integration-test.md` from `templates/integration-report.md`.

### Handling open questions

If any of the workflow questions above are unclear or unanswerable from the inputs (boundaries, scenarios, environment, fixtures, fallback paths), stop and report a consolidated set of questions to the user. Resolve all of them before proceeding. Do not guess at answers or make assumptions that are not grounded in the provided documentation and codebase.

## Quality checklist

- [ ] Tests exercise real cross-module behavior, not single-module logic disguised as integration tests.
- [ ] No mocks for the system boundary under test (mocks only outside that boundary).
- [ ] Environment setup is reproducible and recorded in the report.
- [ ] Failure paths are covered, not only happy paths.
- [ ] Project style is preserved; the polyglot fallback is noted explicitly if used.

## Draft rules

- **No invented facts.** Stay strictly faithful to the provided `plan.md` and existing codebase. Insert `[NEEDS CLARIFICATION: <issue>]` where evidence is absent.
- **Pragmatic inference.** Make reasonable structural assumptions based on the codebase's existing patterns, but never invent fictional external services or complex missing behaviors.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- All integration tests green: suggest **`commit-spec`** to finalize the feature commit (`feat(<feature-slug>): complete - ...`).
- Issues uncovered: loop back to **`implement-spec`** or **`plan-spec`** depending on the cause.
- `commit-spec` may be invoked at any time as a checkpoint.
- **Re-run policy.** If the spec, plan, or module boundaries change later, re-run `integration-test-spec` for the affected flows.
