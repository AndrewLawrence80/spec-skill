---
name: implement-spec
description: >-
    Execute the ratified plan and tasks for a feature, writing source code that satisfies the plan and data model without inventing tasks or drifting from the documented architecture. Use when the user says "implement the tasks", "build the feature now", "code this up", or "start coding". Invoke this skill once `analyze-spec` reports no BLOCKERs, or when the user explicitly accepts the risks.
version: 0.2.0
phase: 8
---

# implement-spec

Walk `tasks.md` in dependency order, write code, mark tasks done, and report progress. This skill keeps the **global view** by re-reading the relevant feature artifacts under `specs/<feature-slug>/`, related documentation under `docs/`, and the constitution at `.speckit/memory/constitution.md`.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 8.

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

- A ratified `tasks.md` exists under `specs/<feature-slug>/` with no BLOCKER findings in `analysis.md`.
- The user wants to start (or resume) writing code for the feature.

## Inputs

- **Required:** `spec.md`, `tasks.md`, `plan.md` under `specs/<feature-slug>/`.
- **Optional:** `data-model.md` under `specs/<feature-slug>/` (only when the feature introduces or modifies entities).
- **Required for global view:** related docs under the `docs/` directory.
- **Optional:** `.speckit/memory/constitution.md` (for traceability checks), prior progress log.

## Outputs

- Source-code changes that satisfy the tasks.
- Updated `tasks.md` with statuses moved to `[~]` (in progress) or `[x]` (done).
- (Optional) A per-session progress log at `specs/<feature-slug>/implement-log.md`.

## Workflow

1. **Re-read** `plan.md`, `tasks.md`, and the relevant `docs/` files when starting the first task of each phase, and re-read any specific doc that the previous task changed before continuing. Do not reload the whole context on every task.
2. **Pick the next task** in dependency order. Among ready tasks, prefer ones marked `[P]` if parallelism makes sense for the session.
3. **Implement** strictly the files named in the task. Keep edits scoped.
4. **Mark** the task `[x]` only when its named files exist and pass the relevant checks.
5. **Report** the implementation summary and **surface** open questions to the user as a consolidated message; no fixed cap.

## Quality checklist

- [ ] Each task is implemented exactly within its declared files.
- [ ] Phase order from `tasks.md` is respected; tests for a behavior or interface land before that behavior's implementation when the plan calls for it.
- [ ] No new module or dependency added without a corresponding plan or docs update task.
- [ ] Code respects `docs/module.md` boundaries; cross-module calls match the documented flows under `docs/logic/*.md`.
- [ ] No invented external interfaces, no invented data fields beyond `data-model.md` (when present).
- [ ] Progress log records task ID, status change, commit-worthy summary, and any clarifications.

## Draft rules

- **No invented facts.** Stay strictly faithful to the provided `plan.md`, `tasks.md`, and existing codebase.
- **Pragmatic inference.** Make reasonable structural assumptions based on the codebase's existing patterns, but never invent fictional external services or complex missing behaviors.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Clear comments.** Every non-obvious logical block should carry a comment explaining its purpose.
- **Modular design.** Encapsulate related functionality into functions or classes; respect documented module boundaries.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- All implementation tasks done: suggest **`unittest-spec`** and **`integration-test-spec`** (in either order; they can run in parallel because they write to different output files).
- Blocker hit: name the upstream skill (`clarify-spec`, `plan-spec`, `tasks-spec`, or `documentation-spec`).
- `commit-spec` may be invoked at any time; it is recommended at task or phase boundaries to keep history feature-keyword-prefixed (`feat(<feature-slug>): ...`).
- **Re-run policy.** If `plan.md` or `tasks.md` is amended mid-implementation, re-run `analyze-spec` before continuing.
