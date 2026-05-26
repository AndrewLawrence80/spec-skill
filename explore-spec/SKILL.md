---
name: explore-spec
description: >-
    Survey an unfamiliar codebase and write a lightweight orientation report to `.speckit/memory/exploration.md` when no docs, spec, or constitution anchor exists. Use when the user says "explore this repo / orient me to this codebase / what is this project / I have no docs yet / survey the workspace before we start". Invoke this skill as the very first step on a cold repository, or any time a quick structural snapshot is needed before running documentation-spec, research-spec, specify-spec, or constitution-spec.
version: 0.1.0
phase: cross-cutting
---

# explore-spec

Produce `.speckit/memory/exploration.md`: a single-file, breadth-first structural snapshot of an unfamiliar codebase. This skill is intentionally lighter than `documentation-spec` - it does not trace end-to-end flows, does not produce Mermaid diagrams for every entry point, and does not generate the full `docs/` directory. Its purpose is to give every downstream skill enough orientation to proceed when no anchor artifact exists yet.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is a cross-cutting exploration step, callable whenever the agent needs a structural orientation of the codebase before other artifacts exist.

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

- **Explore** - survey an unfamiliar codebase and write `.speckit/memory/exploration.md` when no docs or anchor artifacts exist.
- **Research** - compare the current project against external precedents and evaluate technology choices.
- **Commit** - record progress in version control.
- **Audit** - retrospective review that surfaces design and code problems for follow-up.

## When to use

- The repository has no `docs/`, no `spec.md`, no `constitution.md`, and no other anchor artifact.
- The user wants a quick structural snapshot before committing to the heavier `documentation-spec` workflow.
- A new contributor or agent session needs orientation without reading the entire codebase.
- Pre-research ingestion: `research-spec` needs local context but `docs/` does not yet exist.
- The codebase has changed significantly and a fast re-orientation is needed before deciding which skill to run next.

## Inputs

- **Required:** the codebase itself (directory tree, source files, dependency manifests).
- **Optional:**
    - `README.md` or any top-level documentation files already present.
    - `.speckit/memory/constitution.md` (for terminology alignment if it exists).
    - User-supplied focus hints (e.g., "focus on the API layer", "skip the test directory").

## Outputs

- `.speckit/memory/exploration.md`: a single lightweight orientation report. The skill creates `.speckit/memory/` if it does not exist.
- A consolidated clarification message if critical ambiguity is found during exploration (e.g., multiple conflicting entry points with no clear primary, ambiguous language/framework detection).

## Guard: when docs already exist

Before starting exploration, check whether `docs/overview.md` exists and appears current (non-empty, references a recent commit or date). If it does, note this to the user and recommend reading `docs/overview.md` directly instead of re-running exploration. Do not overwrite a current `docs/` set with a lighter `exploration.md` summary.

## Workflow

1. **Check for existing anchor artifacts.** Look for `docs/overview.md`, `.speckit/memory/exploration.md`, `README.md`, and `.speckit/memory/constitution.md`. If `docs/overview.md` exists and is current, apply the guard above and stop unless the user explicitly asks to re-explore.
2. **Load** `templates/exploration.md` to understand the required sections before beginning the survey.
3. **Survey the directory tree.** List the top-level and second-level directories. Identify the primary source directories, test directories, configuration files, and dependency manifests (e.g., `package.json`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `pom.xml`, `requirements.txt`).
4. **Detect primary language(s) and framework(s).** Infer from file extensions, dependency manifests, and build files. Record the primary language and any significant frameworks or runtimes.
5. **Outline modules.** For each top-level source module or package, write a one-paragraph description of its responsibility and the key concerns a reader should be aware of (e.g., concurrency model, external coupling, known complexity). Do not enumerate every function or API; focus on the module's role in the overall system.
6. **Note gaps and unknowns.** Record anything that could not be determined from a breadth-first pass: missing manifests, ambiguous module boundaries, undocumented directories, or areas that require deeper investigation.
7. **Fill** the loaded template with the findings from steps 3-6.
8. **Create `.speckit/memory/`** if it does not exist, then write `.speckit/memory/exploration.md`.
9. **Report** the output path and surface a single consolidated clarification message if any critical gaps remain.

## Quality checklist

- [ ] Directory layout section reflects the actual top-level and second-level structure.
- [ ] Primary language(s) and framework(s) are inferred from evidence (file extensions, manifests), not assumed.
- [ ] Each module has a one-paragraph outline describing its responsibility and key concerns; no API lists or full flow traces.
- [ ] Gaps and unknowns section is present; if nothing is unknown, write "None identified."
- [ ] Recommended next step is concrete and matches the actual state of the repository.
- [ ] The output does NOT reproduce the depth of `documentation-spec` (no API lists, no full flow traces, no per-entry-point Mermaid diagrams).
- [ ] If `docs/overview.md` already exists and is current, the guard was applied and the user was notified.

## Draft rules

- **No invented facts.** Every claim about the codebase must be grounded in an observed file, directory, or manifest entry. Where evidence is absent, write "unknown" or record it in Gaps and unknowns; do not guess.
- **Breadth over depth.** This skill surveys the shape of the codebase, not the internals of each module. Stop at the boundary of each module; do not trace cross-module flows.
- **Single-pass autonomy.** Complete the exploration in one pass without asking the user to confirm each directory. Surface all ambiguities in a single consolidated message at the end.
- **Overwrite policy.** If `.speckit/memory/exploration.md` already exists, overwrite it with the fresh findings. Do not append. Record the previous exploration date in the new file's header if it can be read.
- **Templates are references, not religion.** Respect the template's intent and required sections. Sections may be reordered or lightly extended when the project clearly calls for it. Required sections MUST NOT be deleted without explicit user approval.
- **Escalation.** If a critical ambiguity cannot be resolved from the codebase alone (e.g., the project has no manifest files and no recognizable source structure), stop and ask the user in one consolidated message.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- Exploration complete, no `docs/` exists: suggest **`documentation-spec`** to produce the full global view, or **`constitution-spec`** to establish project principles first.
- Exploration complete, `docs/` exists but is stale: suggest **`documentation-spec`** to refresh it.
- Exploration complete, user has a feature in mind: suggest **`specify-spec`** using `exploration.md` as a lightweight substitute for `docs/overview.md`.
- Exploration complete, user needs technology research: suggest **`research-spec`**, passing `exploration.md` as local context.
- `commit-spec` may be invoked at any time to checkpoint `exploration.md`.
- **Re-run policy.** Re-run `explore-spec` whenever the repository structure changes significantly (new top-level modules added, primary language changed, major dependency added or removed) and `docs/` has not yet been regenerated.
