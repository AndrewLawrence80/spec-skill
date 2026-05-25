---
name: commit-spec
description: >-
    Compose a Conventional-Commit-style message that reflects feature intent (drawn from `spec.md` and `plan.md`), not just the diff, and create the commit using the project's VCS (git or svn). In-progress commits for a feature share a `feat(<feature-slug>): ...` prefix; the final commit is explicitly marked done so the feature's history is trivially traceable. Use when the user says "commit", "save progress", "checkpoint these changes", "make a commit message", or "stage and commit". Invoke this skill at any phase as a checkpoint, and as the last step of a feature.
version: 0.2.0
phase: cross-cutting
---

# commit-spec

Compose a commit message grounded in feature intent and record it through the project's VCS. This skill is a cross-cutting step (callable at any point in the flow) and produces consistent commit history so a feature's progress can be summarized in one query.

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

- The user explicitly asks to commit or checkpoint.
- A phase of `implement-spec` finished cleanly.
- Tests in `unittest-spec` or `integration-test-spec` just turned green.
- The feature is complete and needs its final commit.

## Inputs

- **Required:** working-tree state. Detect the VCS:
    - `git`: `git status --porcelain`, `git diff --staged`, `git diff`, `git log -n 5 --oneline`.
    - `svn`: `svn status`, `svn diff` (there is no `--staged` analog; treat all modified files as candidates).
- **Optional:** `spec.md`, `plan.md`, `tasks.md`, `data-model.md` under `specs/<feature-slug>/`; recent commit history (to keep the prefix consistent across a feature's commits).

## Outputs

- A commit message rendered from `templates/commit-message.md`.
- Either a staged commit (default, after user approval), **or** a printed message for the user to apply manually.
- A short summary: which files were committed, the message subject, and whether this was an in-progress checkpoint or the final commit.

## Workflow

1. **Detect VCS** by checking for `.git/` or `.svn/`. If neither is found, stop and report.
2. **Determine the active feature slug** from the path of the most recently changed file under `specs/<feature-slug>/...`, or ask the user.
3. **Read** `spec.md` and `plan.md` for the feature so the message can reference intent (FR / NFR IDs, the user value).
4. **Gather diff data** with the VCS commands above. Group changes by component (paths under the same module).
5. **Choose the commit kind**:
    - `feat(<feature-slug>): ...` - most in-progress feature commits.
    - `fix(<feature-slug>): ...` - bug fixes.
    - `docs(<feature-slug>): ...` - when only docs changed.
    - `test(<feature-slug>): ...` - when only tests changed.
    - `refactor(<feature-slug>): ...` - internal restructuring.
    - `chore: ...` - tooling, dependencies, repo scaffolding. The `<feature-slug>` scope is **omitted** for chores because they are typically cross-feature; only add a scope if the chore is genuinely confined to one feature's directory.
6. **Detect "final" commits**: if `tasks.md` is fully checked, all phases done, and tests are green, mark the commit as done by either:
    - using a subject like `feat(<feature-slug>): complete - <one-line summary>`, or
    - adding a `Done: yes` trailer (the project's choice, recorded in `templates/commit-message.md`).
7. **Render** the message from `templates/commit-message.md`. Body bullets reference task IDs and FR / NFR IDs. Footer trailers may include `Refs:` (issues), `Co-authored-by:`, etc.
8. **Surface** anything ambiguous (untracked files that look like in-progress work, mixed features in one commit) and ask before proceeding. **Never amend a pushed commit without explicit confirmation.**
9. **Commit** (only after user approval): `git add` only the files explicitly part of the change, then `git commit -F <file>`. For svn: `svn commit -F <file> <paths>`.

## Quality checklist

- [ ] Subject begins with `<kind>(<feature-slug>):` (or bare `<kind>:` for `chore`) followed by a brief summary.
- [ ] Body explains module changes with brief summaries and references task IDs and FR / NFR IDs where applicable.
- [ ] Untracked files that look like in-progress work are flagged, not silently committed.
- [ ] Final commits are explicitly marked done (either subject prefix `complete - ` or `Done: yes` trailer).
- [ ] No `--force` push, no rewriting of pushed history, no `--no-verify` shortcuts.

## Draft rules

- **No invented facts.** Stay strictly faithful to the diff, the spec, and the plan. Do not invent task IDs, FR / NFR IDs, or trailers.
- **Pragmatic inference.** Group related file changes into coherent body bullets, but do not infer intent that the spec or plan does not record.
- **Templates are references, not religion.** Respect `templates/commit-message.md`'s required sections (subject, body, trailers). Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Safety controls.** Never bypass VCS safety controls: no `--force` push, no `--no-verify`, no destructive resets, no rewriting of pushed history without explicit user confirmation.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous diff, mixed-feature commit, conflicting trailers, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- In-progress checkpoint: suggest the next skill in the active phase (continue `implement-spec`, run `unittest-spec`, etc.).
- Final feature commit: suggest opening a PR or merge request, and starting the next feature with `specify-spec`.
- **Re-run policy.** This skill has no downstream artifacts to re-run; subsequent commits simply re-invoke this skill.
