---
name: audit-spec
description: >-
    Retrospective review of a feature (or whole project) against its spec, plan, tasks, constitution, and related docs. Surfaces correctness, traceability, design, and concurrency issues with explicit severity levels for follow-up. Use when the user says "audit this feature", "review the implementation", "find bugs after the fact", "retrospective on the build", or "check traceability". Invoke this skill after implementation (and ideally after tests), or any time a retrospective review is needed.
version: 0.2.0
phase: cross-cutting
---

# audit-spec

Walk `plan.md` and `tasks.md` in dependency order, audit the resulting implementation against the spec and related docs, classify each finding by severity, and surface follow-ups for the appropriate upstream skill. This skill is a cross-cutting step (callable at any point in the flow) and **never edits source artifacts** - its only output is the audit report.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is a cross-cutting step, callable at any point in the flow.

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

- A feature's implementation is in place (typically after `implement-spec` and the test skills) and the user wants a retrospective review.
- The user wants a whole-project audit against the existing artifact set.
- A bug or near-miss in production motivates a retrospective traceability check.

## Inputs

- **Required:** `spec.md`, `plan.md`, `tasks.md` under `specs/<feature-slug>/`, plus the implementation source code.
- **Optional:** `data-model.md` under `specs/<feature-slug>/` (only when the feature introduces or modifies entities).
- **Required for global view:** related docs under the `docs/` directory.
- **Optional:** `.speckit/memory/constitution.md`; prior progress log; recent commit history.

## Outputs

- A flag-only audit report at `specs/<feature-slug>/audit.md` (or `<output-dir>/audit.md` for a whole-project audit; the user must supply the directory explicitly).
- A brief **summary of implementation** based on the tasks.
- Findings grouped by category: **Bugs**, **Logical problems**, **Race conditions and concurrency issues**, **Traceability issues**.
- **Open questions** for follow-up, if any.

## Severity definitions

- **BLOCKER** - correctness or safety defect that must be fixed before the feature is considered done.
- **MAJOR** - non-trivial design, traceability, or correctness issue that should be fixed before merge unless explicitly accepted by the user.
- **MINOR** - polish or quality issue; fix when convenient.
- **INFO** - observation or suggestion; no change required.

## Workflow

1. **Choose the output path.**
    - Feature audit (default): write to `specs/<feature-slug>/audit.md`.
    - Whole-project audit: ask the user for an explicit output directory and write `<output-dir>/audit.md`.
2. **Re-read** `spec.md`, `plan.md`, `tasks.md`, and the related `docs/` files before each phase of the audit.
3. **Load commit history** to understand the context of recent changes.
4. **Review the implementation** in dependency order, classifying each finding by severity and category. For every task, check:
    - **Correctness:** does the code do what the task says it should?
    - **Completeness:** is every part of the task implemented - and only that part?
    - **Logical soundness:** does the implementation make sense, or are there design or code issues that could lead to bugs or maintenance problems?
    - **Traceability:** can every part of the implementation be traced back to the spec, constitution, or related docs?
    - **Race conditions and concurrency issues** when applicable.
5. **Document findings** using `templates/audit.md`. For each finding, capture severity (BLOCKER / MAJOR / MINOR / INFO), category, affected `path:line`, impact, scenarios, and suggested follow-up upstream skill.
6. **Strict read-only enforcement.** Do not apply fixes to the spec, plan, tasks, code, or docs. The skill only writes the audit report.
7. **Surface findings and report open questions.** Recommend the relevant upstream skill (`clarify-spec`, `plan-spec`, `tasks-spec`, or `documentation-spec`) for each MAJOR or BLOCKER finding.

## Quality checklist

- [ ] Every finding carries an explicit severity (BLOCKER / MAJOR / MINOR / INFO).
- [ ] Every finding cites at least one source `path:line` reference.
- [ ] Correctness, completeness, logical soundness, traceability, and concurrency are each addressed (or noted as "n/a" with rationale).
- [ ] Read-only: no finding includes a direct code patch or file edit; only diagnoses and follow-up recommendations.
- [ ] The summary clearly aggregates all BLOCKER and MAJOR findings that must be resolved.
- [ ] Open questions are surfaced for follow-up, if any.

## Draft rules

- **No invented facts.** Stay strictly faithful to the provided `spec.md`, `plan.md`, `tasks.md`, and existing codebase. Insert `[NEEDS CLARIFICATION: <issue>]` only where evidence is truly insufficient to make an audit ruling.
- **Pragmatic inference.** Make reasonable structural assumptions based on the codebase's existing patterns, but verify against written traces.
- **Templates are references, not religion.** Respect `templates/audit.md`'s intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Read-only.** This skill never edits source artifacts. Findings are diagnoses, not patches.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- Findings filed: recommend re-running **`clarify-spec`**, **`plan-spec`**, **`tasks-spec`**, or **`documentation-spec`** for each BLOCKER or MAJOR finding, citing the affected upstream artifact.
- Audit artifact itself: suggest **`commit-spec`** to record `audit.md` in version control.
- **All clear (no BLOCKER or MAJOR):** report the green light to the user.
- **Re-run policy.** If the spec, plan, tasks, or implementation is amended after the audit, re-run `audit-spec` to verify the fixes.
