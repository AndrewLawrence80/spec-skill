---
name: documentation-spec
description: >-
    Generate or refresh the project's global documentation set (`docs/overview.md`, `docs/module.md`, `docs/logic/*.md`) so every later skill has a stable global view of the codebase. Use when the user says "generate docs", "describe the architecture", "create an overview", "document the modules", or "onboard me to this repo". Invoke this skill before specify/plan/implement work whenever `docs/` is empty or stale.
version: 0.2.0
phase: 2
---

# documentation-spec

Produce or update the project's **`docs/`** directory: a global view of the whole project that acts as required reading for every later skill (`specify-spec`, `clarify-spec`, `plan-spec`, `tasks-spec`, `analyze-spec`, `implement-spec`, `integration-test-spec`, `commit-spec`).

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 2.

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

- `docs/` does not exist or contains only a README.
- The codebase has changed significantly since the last documentation pass.
- A downstream skill (`specify-spec`, `plan-spec`, etc.) reports that the documentation is stale or missing.

## Inputs

- **Required:** the codebase itself.
- **Optional:**
    - `README.md`, existing `docs/`, code comments, ADRs, RFCs.
    - `.speckit/memory/constitution.md` (to keep terminology aligned).
    - User-supplied focus hints ("focus on the data layer", "skip the CLI").

## Outputs

- `docs/overview.md`: purpose, audience, top-level architecture, glossary.
- `docs/module.md`: per-module responsibility, public interface, and dependencies.
- `docs/logic/<api|task|callback_name>.md`: one file per entry point describing end-to-end control/data flow, expressed as narrative with Mermaid sequence diagrams.
- A short report listing the commit hash reviewed and any `TODO(<topic>): ...` markers left for the user to confirm.

## Workflow

1. **Locate** any existing documentation under `docs/`. If docs exist, record the commit hash from `overview.md` and load only the diff since that commit; otherwise prepare to write from scratch.
2. **Load templates**: read `templates/overview.md`, `templates/module.md`, and `templates/logic.md` to understand the required section structure.
3. **Explore the codebase** to gather the facts needed to fill each template section:
    - Overall purpose and intended audience of the project.
    - Top-level module boundaries and directory/package layout.
    - Entry points: HTTP handlers, CLI commands, cron tasks, message consumers, callbacks.
    - Cross-module control and data flows originating from each entry point.
    - External upstream and downstream dependencies (services, databases, queues, libraries).
    - Per-module public interfaces and internal collaborators.
4. **Write documents in parallel**, following the section skeletons from step 2. Different files (`overview.md`, `module.md`, each `logic/<name>.md`) may be written concurrently because they do not share an output file; do not over-serialize the work.
    - For each entry point found in step 3, trace the full control/data flow end-to-end and write detailed documentation following `templates/logic.md` in `docs/logic/<api|task|callback_name>.md`.
    - Cite a specific file path (and line number where practical) for every factual claim.
    - Where a fact is ambiguous or not evident in the code, emit a `TODO(<topic>): ...` marker instead of inventing content.
5. **Report** the commit hash reviewed, the paths of the files written, and all `TODO` markers for the user to resolve.

## Quality checklist

- [ ] Every claim is grounded in source: file path or commit reference.
- [ ] Module list matches the actual directory/package structure.
- [ ] `docs/logic/<api|task|callback_name>.md` documents every cross-module flow from its entry point, with a Mermaid sequence diagram.
- [ ] Glossary terms align with `.speckit/memory/constitution.md` if it exists.
- [ ] Reviewed-commit hash and refresh date recorded in `docs/overview.md`.
- [ ] All `TODO(<topic>)` markers reported to the user.

## Draft rules

- **No invented facts.** Stay strictly faithful to the existing codebase. Where evidence is incomplete, emit a `TODO(<topic>): ...` marker and ask the user to fill it in.
- **Pragmatic inference.** Make reasonable structural inferences when the context provides clear clues, but do not invent modules, services, or behaviors that cannot be grounded in the code.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Mermaid is required for non-trivial flows.** Use Mermaid sequence diagrams to describe entry-point call sequences and cross-module data flows. Plain prose may supplement but not replace a diagram for non-trivial flows.
- **Marker scope.** Use `TODO(<topic>): ...` here for facts that are not yet evident in the code; a `TODO` is resolved when the documented fact is verified against the codebase or the user.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.

## Handoff

- Ask the user to approve invoking the `commit-spec` skill to commit the new or updated documentation together with the change summary. If approved, proceed to commit; otherwise skip and just report the file paths.
- Suggest **`specify-spec`** as the next step to begin a feature cycle grounded in the newly produced global view.
- **Re-run policy.** When `docs/` changes mid-feature, re-run `analyze-spec` on every in-flight feature to detect drift, and revise downstream plans/tasks as needed.
