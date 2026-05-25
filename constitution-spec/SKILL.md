---
name: constitution-spec
description: >-
    Create or update `.speckit/memory/constitution.md` - the canonical record of project-level principles, governance rules, and quality standards that every later spec-skill step must respect. Use when the user says "set up project principles", "create a constitution", "establish coding standards", "ratify governance", or "amend the constitution". Invoke this skill any time the user wants project-level rules that downstream skills should later honor, even when the word "constitution" is not used.
version: 0.2.0
phase: 1
---

# constitution-spec

Establish or amend `.speckit/memory/constitution.md` - the global anchor that every other skill in the spec-skill set treats as authoritative.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is step 1.

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

- Bootstrap project governance when no `.speckit/memory/constitution.md` exists yet.
- Amend an existing constitution: add, revise, or remove a principle, or tighten an existing rule.

## Inputs

- **Required:** none - the constitution may start blank.
- **Optional:**
    - User-supplied principles or rules (free text).
    - Existing `.speckit/memory/constitution.md` (for amendments).
    - Documentation under the `docs/` directory if present (for terminology consistency).

## Outputs

- `.speckit/memory/constitution.md` at the repository root (or a user-specified path).
- A short change summary listing principles added, modified, or removed, plus a one-line rationale for the semantic-version bump.

## Workflow

1. **Locate** any existing `.speckit/memory/constitution.md`. If found, read it; otherwise prepare a fresh draft.
2. **Load** `templates/constitution.md` as the recommended structure. Sections may be reordered or extended when the project clearly calls for it; required sections MUST NOT be silently deleted.
3. **Gather context** from the user prompt, the existing codebase, and (when present) the `docs/` directory.
4. **Draft** the constitution:
    - State each principle declaratively and make it independently testable.
    - Use ISO dates (`YYYY-MM-DD`) for ratification and amendment dates. For a new constitution, set the ratification date to today. For an amendment, preserve the original ratification date and stamp each changed principle with a new amendment date; principles that are unchanged keep their original date and receive no amendment date.
    - Bump the semantic version: **MAJOR** for breaking governance changes, **MINOR** for newly added principles, **PATCH** for clarifications and editorial fixes.
5. **Surface clarifications** with `[NEEDS CLARIFICATION: ...]` markers and/or by asking the user directly. Consolidate related questions into a single prompt; there is no fixed cap.
6. **Write** the file and report its path together with the version bump and change summary.

## Quality checklist

- [ ] Every principle is declarative and independently testable.
- [ ] No invented rules: each principle is user-stated, repo-evidenced, or a widely accepted best practice.
- [ ] Ratification and last-amended dates are present and in ISO format.
- [ ] Semantic version is updated with a one-line rationale.
- [ ] Terminology aligns with `docs/` if that directory exists.

## Draft rules

- **No invented facts.** Stay strictly faithful to the user's requirements and the existing codebase. Where evidence is incomplete, emit a `[NEEDS CLARIFICATION: ...]` marker or ask the user; do not invent.
- **Pragmatic inference.** Make reasonable structural inferences when the context provides clear clues, but do not invent modules, services, or behaviors that cannot be grounded in the code.
- **Templates are references, not religion.** Respect each template's intent and required sections. Sections may be reordered or extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Best practice is encouraged.** Follow language conventions, community recommendations, and broadly accepted software-engineering principles when the user and the codebase are silent on a topic.
- **Escalation.** If you encounter an unresolved situation that you cannot ground in the inputs (missing required artifact, ambiguous evidence, conflicting documentation, contradictory user answers), stop and ask the user. Consolidate related questions into one message; never guess and never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- Ask the user to approve invoking the `commit-spec` skill to commit the new or amended constitution together with the change summary. If approved, proceed to commit; otherwise skip and just report the file path and version bump.
- Suggest **`documentation-spec`** as the next step when `docs/` is empty - the constitution and the documentation set together form the global view that every later skill depends on.
- **Re-run policy.** If the constitution is amended later, re-run any in-flight `plan-spec` and `analyze-spec` to check continued compliance.
