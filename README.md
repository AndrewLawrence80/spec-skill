# spec-skill

A collection of standalone [Anthropic agent-skill](https://github.com/anthropics/skills) files
that reorient the [spec-kit](https://github.com/github/spec-kit) / spec-driven-development (SDD)
workflow around **documentation-driven development (DDD)**.

The motivating problem: in real-world practice, coding agents tend to over-optimize a *local*
view of the code they are touching and lose the *global* view of the project -- its purpose,
modules, interfaces, and constraints. spec-skill combats this by making project-level
documentation a first-class, always-available input to every downstream step (clarify, plan,
analyze, implement, integration-test, audit, commit).

## Skills

These thirteen skills mirror a documentation-driven V-model workflow, named to a uniform
`<step>-spec` convention. Steps 1-10 are sequential phases of the V-model; `research-spec`,
`commit-spec`, and `audit-spec` are cross-cutting steps callable at any point in the flow.

| #   | Skill                                                       | Output artifact                                                                              |
| --- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | [`constitution-spec`](./constitution-spec/SKILL.md)         | `.speckit/memory/constitution.md`                                                            |
| 2   | [`documentation-spec`](./documentation-spec/SKILL.md)       | `docs/overview.md`, `docs/module.md`, `docs/logic/<api/task/callback>.md`                    |
| 3   | [`specify-spec`](./specify-spec/SKILL.md)                   | `specs/<feature-slug>/spec.md` (feature + current implementation)                            |
| 4   | [`clarify-spec`](./clarify-spec/SKILL.md)                   | Updated `specs/<feature-slug>/spec.md` with resolved markers                                 |
| 5   | [`plan-spec`](./plan-spec/SKILL.md)                         | `specs/<feature-slug>/plan.md` (+ optional `data-model.md`, `research.md`)                   |
| 6   | [`tasks-spec`](./tasks-spec/SKILL.md)                       | `specs/<feature-slug>/tasks.md`                                                              |
| 7   | [`analyze-spec`](./analyze-spec/SKILL.md)                   | `specs/<feature-slug>/analysis.md` (read-only consistency report)                            |
| 8   | [`implement-spec`](./implement-spec/SKILL.md)               | Source code that satisfies `specs/<feature-slug>/tasks.md`                                   |
| 9   | [`unittest-spec`](./unittest-spec/SKILL.md)                 | Unit tests + `specs/<feature-slug>/unit-test.md`                                             |
| 10  | [`integration-test-spec`](./integration-test-spec/SKILL.md) | Integration tests + `specs/<feature-slug>/integration-test.md`                               |
| -   | [`research-spec`](./research-spec/SKILL.md)                 | `specs/<feature-slug>/research.md` or `docs/research/<topic-slug>.md` (cross-cutting)        |
| -   | [`commit-spec`](./commit-spec/SKILL.md)                     | Conventional-commit message + commit (cross-cutting)                                         |
| -   | [`audit-spec`](./audit-spec/SKILL.md)                       | `specs/<feature-slug>/audit.md` or `<output-dir>/audit.md` for whole-project (cross-cutting) |

## Getting started

1. Install these skill folders into your coding agent as "agent skills".
2. Start a feature by running `documentation-spec` (global view) and `specify-spec` (feature spec).
3. Use `clarify-spec` -> `plan-spec` -> `tasks-spec` -> `analyze-spec` before you implement.
4. Invoke `research-spec` whenever a stack choice, architecture direction, or open-source comparison needs stronger evidence; it can run before planning or later when a decision is disputed.

For background and installation concepts, see:
- https://docs.github.com/zh/copilot/concepts/agents/about-agent-skills

## Design principles (summary)

1. **Global view first.** `documentation-spec` runs early; its outputs are required reading for
   clarify / analyze / implement / integration-test / commit / audit.
2. **Templates are references, not straitjackets.** Agents respect each template's intent and
   required sections but may extend, reorder, or trim sections when the project clearly calls
   for it. Required sections MUST NOT be deleted without explicit user approval.
3. **Ask the user when in doubt.** Every skill carries the same escalation rule: if a fact
   cannot be grounded in the inputs, stop and ask the user in one consolidated message. No
   guessing, no silent assumptions.
4. **Spec includes both target behavior AND current implementation.** `specify-spec` records
   the requested feature *and* the existing code paths it will touch.
5. **Analyze validates against the documentation set.** `analyze-spec` checks plan/tasks for
   consistency with `spec.md` and project `docs/*.md`. The constitution is one input among
   many, not the only gate.
6. **Test-as-verification, not test-first dogma.** Unit and integration test skills exist as
   explicit steps but the agent is not forced into red/green order.
7. **Research is a first-class cross-cutting step.** `research-spec` may be invoked at any
   point to compare the current project against open-source precedents, gather papers or formal
   references, and evaluate technology choices before or during implementation.
8. **Checkpoint freely.** `commit-spec` is callable at any phase, not only at the end. All
   in-progress commits for one feature share a feature-keyword prefix
   (`feat(<feature-slug>): ...`); the final commit is explicitly marked done.
9. **Audit is a first-class cross-cutting step.** Use `audit-spec` after implementation (and
   ideally after tests) to surface correctness, traceability, and design issues for follow-up,
   each tagged with BLOCKER / MAJOR / MINOR / INFO severity.

## Rerun / loop rules

- Spec changed -> re-run `clarify-spec` (if markers remain) -> re-run `plan-spec` -> re-run `tasks-spec` -> re-run `analyze-spec`.
- Plan changed -> re-run `tasks-spec` -> re-run `analyze-spec`.
- Tasks changed -> re-run `analyze-spec`.
- Global docs changed mid-feature -> re-run `analyze-spec` (drift check).
- Implementation diverged from tasks/spec -> update the upstream artifact (prefer `tasks-spec` / `plan-spec`) and re-run `analyze-spec`.

## Parallel execution guidance

- Prefer parallelism for **read-only** work (research, analysis, test execution).
- Avoid concurrent writes to the same artifacts (e.g., don't run two skills that both edit `specs/<feature-slug>/plan.md`).
- Different output files are safe to parallelize (e.g., `documentation-spec` may write
  `overview.md`, `module.md`, and each `logic/<name>.md` concurrently).
- When using subagents, have each subagent produce a report and let one "supervisor" agent apply edits.

## Independence

These skills do **not** depend on the `spec-kit` runtime, the `.specify/` directory, or any
extension hooks. Each skill is a self-contained `SKILL.md` + `templates/` directory; install
them into any Anthropic-skill-compatible coding agent (Claude, Copilot, etc.).
