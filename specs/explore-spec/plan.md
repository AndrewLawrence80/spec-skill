# Implementation Plan: `explore-spec`

> Spec: `specs/explore-spec/spec.md` - Created: 2026-05-26

---

## Outline

This plan covers the creation of the `explore-spec` cross-cutting skill and the mechanical update of all existing skill `SKILL.md` files to register it as a cross-cutting step. The work splits into two independent tracks: (A) authoring the new skill artifacts (`explore-spec/SKILL.md`, `explore-spec/templates/exploration.md`, and their `zh-cn/` mirrors), and (B) patching the Background section of every existing skill's `SKILL.md` with a one-line `explore-spec` bullet.

Track A produces the skill itself; Track B propagates awareness of it across the workflow. Both tracks are low-risk and require no changes to source code, build systems, or runtime behavior - all deliverables are Markdown files.

---

## High-level approach

- **FR-001 (new skill directory)**: Create `explore-spec/SKILL.md` and `zh-cn/explore-spec/SKILL.md` following the exact frontmatter schema and section structure used by `research-spec` (the only other cross-cutting skill). Set `phase: cross-cutting`.
- **FR-002 (output path)**: Hard-code `.speckit/memory/exploration.md` as the output path in the skill's Outputs section and workflow steps. The skill must create `.speckit/memory/` if it does not exist.
- **FR-003 (artifact content)**: Define the required sections in `explore-spec/templates/exploration.md`: Exploration summary, Directory layout, Primary language(s) and framework(s), Entry points (list only), Key external dependencies, Gaps and unknowns, Recommended next step.
- **FR-004 (cross-cutting designation)**: Set `phase: cross-cutting` in frontmatter; describe the skill as callable at any point in the workflow in the Background and When-to-use sections.
- **FR-005 (update existing skills)**: Add one bullet line to the "Cross-cutting steps" list in the Background section of all 13 English `SKILL.md` files and all 13 `zh-cn/*/SKILL.md` files. The line reads: "Explore - survey an unfamiliar codebase and write `.speckit/memory/exploration.md` when no docs or anchor artifacts exist."
- **FR-006 (no duplication of documentation-spec)**: Add an explicit guard in the skill's workflow: if `docs/overview.md` exists and appears current, note this and recommend using `documentation-spec` output directly.
- **FR-007 (template)**: Create `explore-spec/templates/exploration.md` with all required sections and inline guidance comments.
- **NFR-001 (single-pass)**: Design the workflow as a linear, autonomous exploration sequence with a single consolidated clarification message at the end if needed - no per-directory confirmation loops.
- **NFR-002 (single output file)**: The skill writes exactly one file: `.speckit/memory/exploration.md`. No other files are created or modified by the skill at runtime.
- **NFR-003 (plain-text symbols)**: Enforce the same plain-text symbol constraint as all other skills in the draft rules section.

---

## Affected modules

- `explore-spec/` (`new`): New skill directory. Contains `SKILL.md` and `templates/exploration.md`. No runtime code; pure Markdown.
- `explore-spec/SKILL.md` (`new`): The skill definition. Modeled on `research-spec/SKILL.md` for the cross-cutting frontmatter and section structure, and on `documentation-spec/SKILL.md` for the codebase-exploration workflow pattern.
- `explore-spec/templates/exploration.md` (`new`): Output template. Defines the required sections of `.speckit/memory/exploration.md`.
- `zh-cn/explore-spec/` (`new`): Chinese-language mirror directory.
- `zh-cn/explore-spec/SKILL.md` (`new`): Chinese translation of `explore-spec/SKILL.md`.
- `zh-cn/explore-spec/templates/exploration.md` (`new`): Chinese translation of the template.
- All 13 existing English `SKILL.md` files (`extend`): One-line addition to the Background cross-cutting steps list.
- All 13 existing `zh-cn/*/SKILL.md` files (`extend`): One-line addition to the Background cross-cutting steps list (Chinese text).

---

## Data

No new data entities. The only new persistent artifact is `.speckit/memory/exploration.md`, which is written at skill runtime (not at skill-authoring time). Its schema is defined by `explore-spec/templates/exploration.md`.

`data-model.md` is omitted: this feature introduces no typed entities, database schemas, or structured data models beyond a Markdown template.

---

## Simplicity gate

- `explore-spec/SKILL.md`: Must exist as a standalone skill file; it cannot be folded into `documentation-spec` because its scope, depth, and output path are intentionally different. Justified by FR-001 and FR-004.
- `explore-spec/templates/exploration.md`: Required by FR-007 to give agents a consistent output structure. A template is the minimal unit needed; no additional abstraction is introduced.
- `zh-cn/explore-spec/`: Required to maintain parity with all other skills, which each have a `zh-cn/` mirror. Justified by FR-001 and the existing repository convention.

No additional modules, packages, or abstractions are introduced.

---

## Anti-abstraction gate

No interfaces, factories, or wrappers are introduced. All deliverables are Markdown files with no shared code. Not applicable.

---

## Constitution compliance

n/a - no `.speckit/memory/constitution.md` present in this repository.

---

## Build order

The two tracks are independent and can be executed in any order. The recommended sequence minimizes context-switching:

1. Author `explore-spec/SKILL.md` (English).
2. Author `explore-spec/templates/exploration.md` (English template).
3. Author `zh-cn/explore-spec/SKILL.md` (Chinese mirror).
4. Author `zh-cn/explore-spec/templates/exploration.md` (Chinese template).
5. Patch Background cross-cutting steps in all 13 English `SKILL.md` files.
6. Patch Background cross-cutting steps in all 13 `zh-cn/*/SKILL.md` files.

Steps 1-4 should be completed before steps 5-6 so the exact wording of the new bullet is finalized before it is propagated to 26 files.

---

## Open questions

None identified.
