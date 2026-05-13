---
name: clarify-spec
description: >-
    Resolve `[NEEDS CLARIFICATION: ...]` markers in a feature spec by citing docs, citing codebase evidence, or asking the user. Every proposed resolution requires explicit user approval before being applied. Use when the user says "clarify the spec", "resolve open questions", "fill in the TODOs in the spec", or "answer the spec's clarifications". Invoke this skill whenever `spec.md` carries unresolved markers, especially before `plan-spec` or `analyze-spec` runs.
version: 0.2.0
phase: 4
---

# clarify-spec

Walk through every `[NEEDS CLARIFICATION: ...]` marker in a `spec.md` and resolve each one by:

1. Citing project documentation or codebase evidence, **or**
2. Asking the user a consolidated set of questions, **or**
3. Downgrading the marker to an `[ASSUMPTION: ...]` record only when the user explicitly defers.

In every case the proposed resolution requires explicit user approval before being written into the spec.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 4.

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

- A `spec.md` contains one or more `[NEEDS CLARIFICATION: ...]` markers.
- The user is about to run `plan-spec` or `analyze-spec` and wants the spec tightened first.

## Inputs

- **Required:** `specs/<feature-slug>/spec.md` with at least one unresolved marker.
- **Required for grounded answers:** `docs/overview.md`, `docs/module.md`, and flow docs under `docs/logic/` if they exist. Without these, the agent tends to optimize a local concern and miss cross-cutting constraints. If `docs/` is empty, flag this risk and ask the user whether to run `documentation-spec` first or proceed with only the local view.
- **Optional:** `.speckit/memory/constitution.md`; user-provided answers; external sources already cited in the spec (issue, RFC, design doc).

## Outputs

- The same `spec.md`, updated in place, with each marker either:
    - Replaced by the approved resolved statement and a parenthetical citation `(source: <src_file>:<function_name>)`.
    - Replaced by `[ASSUMPTION: <statement>]` when the user explicitly accepted deferral.
- A short resolution report: which markers were resolved, by what evidence, which were deferred to assumptions, and which (if any) remain open.

## Workflow

1. **Read** `spec.md` and enumerate every `[NEEDS CLARIFICATION: ...]` marker with a stable index (C-01, C-02, ...).
2. **Group** related markers (e.g., all auth-related questions together) so the user receives one coherent prompt rather than a fragmented series.
3. **Attempt resolution for each group** in this order:
    1. Search `docs/*.md` and `.speckit/memory/constitution.md` for an authoritative answer.
    2. Search the codebase for behavioral evidence; cite `<src_file>:<function_name>` for each finding.
    3. Consult any external source the spec already references (issue, RFC, web link).
    4. **Whether the answer comes from `docs/`, the codebase, or the user, present the proposed resolution to the user and obtain explicit approval before applying it.** Batch related markers into one consolidated prompt to reduce round-trips. Subtle wording changes in a spec can cascade into wide-ranging plan, task, and code modifications, so the chattiness is the safer default. Never silently apply a resolution, even one that appears authoritatively sourced.
    5. If no authoritative answer is found and the user has not yet been asked, ask the user directly with all options available. If the user provides a clear answer, use it; if the user explicitly defers, record an `[ASSUMPTION]` block with the deferred statement.
4. **Apply approved resolutions** to `spec.md`:
    - Replace each marker with the approved statement and append `(source: <src_file>:<function_name>)` when a citation exists.
    - If the user explicitly deferred, replace with `[ASSUMPTION: <statement>]` and record it in the spec's risks & assumptions section.
5. **Re-validate** that no marker has been left silently unresolved before writing the file.
6. **Write** the updated `spec.md` and deliver the resolution report.
7. **Report** to the user about which markers were resolved and which issues remain open.

> If new issues arise during clarification, append them to the spec's open-questions section. If an issue can be resolved immediately, resolve it following the workflow above; otherwise report it to the user as an open question that needs resolution before planning can proceed.

## Quality checklist

- [ ] Every removed marker is justified by a citation, an explicit user answer, or an `[ASSUMPTION]` block - and was explicitly approved by the user before being applied.
- [ ] No new facts introduced beyond what citations or user answers support.
- [ ] User-facing questions are consolidated into one message per related group and ordered scope -> security / privacy -> UX -> tech.
- [ ] All `[ASSUMPTION]` blocks are recorded in the spec's risks & assumptions section.
- [ ] If `docs/` was missing and needed, the report flags it and recommends `documentation-spec`.

## Draft rules

- **No invented facts.** Stay strictly faithful to the existing codebase and user answers. Where evidence is absent and the user has not responded, leave the marker open and report it.
- **Pragmatic inference.** Make reasonable inferences when the context provides clear clues, but do not invent modules, services, or behaviors that cannot be grounded in the code.
- **Templates are references, not religion.** The spec's required sections must not be deleted; sections may be extended to accommodate new findings from clarification.
- **User approval is mandatory.** Every resolution applied to the spec - including those backed by docs or codebase citations - requires explicit user approval first. Never silently apply.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.

## Handoff

- All markers resolved: suggest **`plan-spec`** to design the implementation.
- Markers remain (waiting on the user): suggest re-running `clarify-spec` after the user answers.
- `commit-spec` may be invoked at any time to checkpoint the clarified spec.
- **Re-run policy.** If the spec is amended after clarification, re-run `clarify-spec` for any newly introduced markers, then re-run `plan-spec`, `tasks-spec`, and `analyze-spec` downstream.
