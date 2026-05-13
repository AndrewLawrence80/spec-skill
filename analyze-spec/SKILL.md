---
name: analyze-spec
description: >-
    Read-only audit that verifies `spec.md`, `plan.md`, and `tasks.md` for internal consistency and drift against the project's documentation (`docs/`) and constitution. Use when the user says "analyze the spec", "audit before implementing", "check consistency", "ratify the artifacts", or "find gaps in the plan". Invoke this skill after `tasks-spec` and before `implement-spec`.
version: 0.2.0
phase: 7
---

# analyze-spec

Produce `specs/<feature-slug>/analysis.md` - a flag-only diagnostic report. This skill **strictly never edits source artifacts**. Its sole responsibility is to surface internal inconsistencies, logical gaps, and documentation drift so the user can address them using upstream skills.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 7.

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

- The user requests a sign-off or ratification gate prior to implementation.
- Re-validation is needed after resolving changes in `spec.md`, `plan.md`, or `tasks.md`.
- The project's global `docs/` were updated mid-feature and the agent must verify continued architectural consistency.

## Inputs

- **Required:** `specs/<feature-slug>/spec.md`, `specs/<feature-slug>/plan.md`, and `specs/<feature-slug>/tasks.md`. _If any are missing, abort the workflow and instruct the user to generate them via upstream skills._
- **Optional:** codebase documentation under `docs/` and the project constitution (`.speckit/memory/constitution.md`). Treat as supplementary inputs for drift analysis, not as strict execution gates.

## Outputs

- A flag-only diagnostic report stored at `specs/<feature-slug>/analysis.md`.

## Severity definitions and gate rules

- **BLOCKER** - must be fixed before `implement-spec` (workflow stops).
- **MAJOR** - should be fixed before implementation unless explicitly accepted by the user.
- **MINOR** - polish or quality issue; fix when convenient.
- **INFO** - observation or suggestion; no change required.

## Workflow

1. **Load template.** Ingest `templates/analysis.md` as the structural basis for the report.
2. **Internal consistency check.** Validate traceability across the specification triad:
    - Every FR and NFR in `spec.md` is addressed by at least one architectural decision in `plan.md` and one explicit task in `tasks.md`.
    - Every task in `tasks.md` maps backwards to an FR, NFR, named API or interface, `data-model` entity (when applicable), or valid polish phase.
3. **Verify data-model consistency.** If `specs/<feature-slug>/data-model.md` exists, check that every entity it declares is referenced by at least one task in `tasks.md` and is consistent with the data shapes recorded in `spec.md` and any cross-module flows in `docs/logic/*.md`. If `data-model.md` is absent but the spec or plan implies data-shape changes, flag it.
4. **Documentation drift check.** Compare the plan against the global `docs/`:
    - Do the modules outlined in `plan.md` align with `docs/module.md`? (If introducing new modules, does the plan justify them?)
    - Do the data models and data flows in the plan conflict with global entry-point documentation under `docs/logic/`?
5. **Constitution compliance.** If `.speckit/memory/constitution.md` exists, verify that its principles are explicitly acknowledged in `plan.md` (satisfied, deferred, or waived). Missing acknowledgment is reported as a finding, not a fatal failure.
6. **Draft the analysis report.** Populate `templates/analysis.md` with findings. For each finding, capture:
    - **Severity:** `BLOCKER`, `MAJOR`, `MINOR`, or `INFO`.
    - **Category:** Consistency, Coverage, Drift, Constitution, Data-model, or Risk.
    - **Affected location:** precise `path:line` reference pointing to the source of the issue.
    - **Remediation recommendation:** suggest which upstream skill should resolve it (`clarify-spec`, `plan-spec`, `tasks-spec`, or `documentation-spec`).
7. **Strict enforcement.** Do not apply fixes to `spec.md`, `plan.md`, `tasks.md`, or any code or docs. You are an auditor representing the validation phase.
8. **Report phase.** Save and present the `analysis.md` findings to the user.

## Quality checklist

- [ ] **Traceable findings:** every diagnostic finding cites at least one source file and line number.
- [ ] **Read-only enforced:** no finding includes a suggested code patch or direct file edit - only diagnoses and gap identification.
- [ ] **Data-model coverage:** every entity in `data-model.md` (if present) appears in at least one task; missing data-model coverage when implied is reported.
- [ ] **Context awareness:** if the `docs/` directory is absent, the report explicitly notes the lack of upstream documentation and recommends running `documentation-spec`.
- [ ] **Constitution grace:** reports "n/a" for constitution checks if `constitution.md` is missing, without hallucinating substitute principles.
- [ ] **Execution gate:** the summary clearly aggregates all `BLOCKER` severities that must be resolved prior to invoking `implement-spec`.

## Draft rules

- **No invented facts.** Stay strictly faithful to the provided artifacts and codebase. Do not invent errors that aren't grounded in the documents. Insert `[NEEDS CLARIFICATION: <issue>]` where evidence is truly insufficient to make an audit ruling.
- **Pragmatic inference.** Make reasonable structural assumptions based on the codebase's existing patterns, but verify against written traces.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.

## Handoff

- **Blockers present:** recommend re-running the specific upstream skill (e.g., `plan-spec` or `tasks-spec`) identified in the findings.
- **All clear:** suggest progressing to **`implement-spec`** to begin execution.
- `commit-spec` may be invoked at any time to version-control the analysis report.
- **Re-run policy.** If `spec.md`, `plan.md`, `tasks.md`, `data-model.md`, or any `docs/` file changes after this analysis, re-run `analyze-spec` before implementation continues.
