---
name: unittest-spec
description: >-
    Add or update unit tests that verify individual functions, classes, or modules in isolation, deterministically and without network or filesystem dependencies. Use when the user says "add unit tests", "write tests for this function", "improve unit-test coverage", or "fix the unit tests". Invoke this skill after `implement-spec` finishes a phase, or any time a function lacks adequate isolated coverage.
version: 0.2.0
phase: 9
---

# unittest-spec

Author unit tests targeting one unit at a time. Detect the **project's existing test framework and style first**; only fall back to the generic polyglot reference under `templates/polyglot/` if the project has not yet established a convention.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 9.

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

- New code from `implement-spec` lacks unit-test coverage.
- A bug indicates a missing or weak unit test.
- The user wants to raise coverage for a specific unit.

## Inputs

- **Required:** the source unit(s) under test.
- **Strongly preferred:** `plan.md` (to learn the test framework choice), `data-model.md` (for fixture shapes), `tasks.md` test entries, and existing tests in the repo (to mirror conventions).
- **Optional:** `docs/module.md` (so the unit's role is understood, not just its signature).

## Outputs

- Test files in the project's test directory (path discovered, not assumed).
- `specs/<feature-slug>/unit-test.md` summarizing what was tested, coverage observations, and known gaps.

## Workflow

1. **Detect** the test runner from build files and existing tests (e.g., `pytest`, `jest`, `go test`, `cargo test`, `rspec`, `xunit`). Mirror the project's naming and layout. Only use the polyglot fallback under `templates/polyglot/` if no convention exists.
2. **Identify the unit** under test and the behavior or interface it should honor (signature, pre/postconditions, invariants).
3. **Enumerate cases**: happy path, edge cases (boundaries, empty / null, max sizes), error paths, and any `data-model.md` invariants.
4. **Write tests**: one assertion focus per test; deterministic; no network, no real filesystem, no real clock unless faked. Use the project's preferred mocking and fixture style.
5. **Run** the tests locally and iterate until green - unless the project follows TDD, in which case the first run is expected to be red and the implementation is then written to turn the suite green.
6. **Write** `specs/<feature-slug>/unit-test.md` from `templates/unit-report.md`.

## Quality checklist

- [ ] Each test exercises one observable behavior.
- [ ] External dependencies are decoupled via mocks, stubs, or fakes.
- [ ] Test names describe the behavior, not the implementation.
- [ ] Edge and error paths are covered, not only the happy path.
- [ ] Coverage gaps are listed in the report (not silently ignored).
- [ ] Project's existing style (framework, naming, layout) is preserved; if the project has none, the polyglot fallback is used and recorded as such.

## Draft rules

- **No invented facts.** Stay strictly faithful to the provided `plan.md` and existing codebase. Insert `[NEEDS CLARIFICATION: <issue>]` where evidence is absent.
- **Pragmatic inference.** Make reasonable structural assumptions based on the codebase's existing patterns, but never invent fictional external services or complex missing behaviors.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.

## Handoff

- Unit tests green: suggest **`integration-test-spec`** (if not already done in parallel).
- Coverage gaps that need design changes: suggest **`plan-spec`** revision.
- `commit-spec` may be invoked at any time to checkpoint the test additions.
- **Re-run policy.** If the unit under test is later modified, re-run `unittest-spec` for that unit.
