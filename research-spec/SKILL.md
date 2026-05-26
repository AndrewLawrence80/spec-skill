---
name: research-spec
description: >-
    Research a feature or in-flight implementation and produce a grounded `research.md` that supports technology choices through external evidence and direct comparison between the current project and relevant open-source implementations. Use when the user says "research this feature", "find precedents for this spec", "compare our project with open source", "survey architecture options", or "evaluate the stack choices". Invoke at any stage of the development loop whenever the agent needs stronger support for a design, stack, architecture, or implementation decision.

version: 0.2.0
phase: cross-cutting
---

# research-spec

Produce a grounded research artifact for either a feature-level decision or a project-level decision. This skill does not replace `plan-spec`; it provides the evidence needed to justify, compare, or revisit technology choices at any stage of the loop.

## Background

`spec-skill` implements a documentation-driven, V-model workflow. This skill is a cross-cutting research step, callable whenever the agent needs stronger evidence for a technical direction.

1. **Constitution** - project-level principles, rules, and quality standards that govern all later steps.
2. **Documentation** - the global view of the codebase that later steps read so they do not optimize for a local view only.
3. **Specification** - per-feature spec capturing both the requested behavior and the current implementation it touches.
4. **Clarification** - resolve questions or ambiguities left by the spec before moving on.
5. **Research** - gather external evidence, precedents, and comparative analysis that support or challenge current technology and architecture choices.
6. **Planning** - design and implementation plan that satisfies the spec while respecting the constitution.
7. **Tasks** - the ordered, file-precise task list derived from the plan.
8. **Analysis** - verify that the plan and tasks comply with the spec, constitution, and other governance rules.
9. **Implementation** - the code changes that satisfy the tasks, guided by the plan.
10. **Unit test** - tests that verify the correctness of individual components.
11. **Integration test** - tests that verify the implementation satisfies the spec while respecting the constitution.

Cross-cutting steps (callable at any point in the flow):

- **Research** - compare the current project against external precedents and evaluate technology choices.
- **Commit** - record progress in version control.
- **Audit** - retrospective review that surfaces design and code problems for follow-up.
- **Explore** - survey an unfamiliar codebase and write `.speckit/memory/exploration.md` when no docs or anchor artifacts exist.

## When to use

- The agent needs support for a technology, architecture, framework, library, protocol, storage, or deployment choice.
- The current project should be compared against mature open-source implementations before committing to or revising a direction.
- The feature touches a domain where implementation choices are non-obvious, fast-moving, or highly consequential.
- A prior `spec.md`, `plan.md`, `tasks.md`, or implementation slice should be revisited because its assumptions are weak, outdated, or contested.
- The user wants precedent-driven research: comparable open-source systems, recent papers, reference architectures, or stack comparisons.

## Inputs

- **Required:** enough feature context to define the research target. Prefer `specs/<feature-slug>/spec.md`; if the loop is later-stage, `plan.md`, `tasks.md`, or the current implementation plus a clear user question may serve as the anchor.
- **Strongly preferred:** `docs/overview.md`, `docs/module.md`, and any related `docs/logic/*.md`, so research is tied to the actual system rather than a generic domain survey.
- **Optional:** `.speckit/memory/constitution.md`, an existing `plan.md`, `tasks.md`, an existing `research.md`, implementation notes, and user constraints such as budget, hosting model, compliance rules, preferred languages, licensing restrictions, performance targets, or deployment environment.
- **Optional external inputs:** user-supplied URLs, issue threads, RFCs, benchmarks, blog posts, academic papers, standards, or competing products.

## Outputs

- **Spec-level research:** `specs/<feature-slug>/research.md` for feature-scoped or decision-scoped investigation.
- **Project-level research:** `docs/research/<topic-slug>.md` for broader architectural, platform, or system-wide investigations. If the user already named a different output path, use that path instead.
- A consolidated clarification message if the available feature context is too vague to research responsibly.

## Template selection

Choose the template that matches the scope of the question:

- **`templates/spec-level-research.md`** - use when the research is tied to one feature, one spec directory, one disputed implementation slice, or one feature-local technology choice.
- **`templates/project-level-research.md`** - use when the research is broader than a single feature: platform choice, system architecture, cross-cutting infrastructure, common patterns across the codebase, or a whole-project comparison against open source.

Do not force project-level questions into a spec-level template or vice versa. If the user asks a mixed question, split the report into clearly labeled sections or produce the dominant scope first and note the spillover work.

## Scope of research

The output should cover the following categories when relevant to the feature or decision area:

1. **Popular GitHub repositories** - widely used or high-signal open-source implementations that solve closely related problems.
2. **Cutting-edge research papers** - recent papers, preprints, standards, or formal write-ups that materially affect the design space.
3. **Mature architectures and solutions** - production-grade patterns, reference architectures, battle-tested workflows, and known operational trade-offs.
4. **Technology-stack evaluation** - a comparative assessment of viable stacks, frameworks, libraries, or platform choices against the current project's actual needs.
5. **Current-project vs open-source comparison** - a direct comparison between the current project's architecture, constraints, and implementation shape versus relevant open-source systems.

If one category is not relevant, say so explicitly in `research.md` and explain why.

## Workflow

1. **Anchor the research in the current loop stage.** Read `spec.md` when present; otherwise read the most authoritative available artifact (`plan.md`, `tasks.md`, or the current implementation slice) plus the user's question. Extract the requirements, constraints, disputed assumptions, and open questions that actually need evidence.
2. **Determine scope.** Decide whether the research is primarily spec-level or project-level. Pick the matching template from `research-spec/templates/` before drafting.
3. **Load local context.** Read the related `docs/`, current implementation notes, and touched code paths so the research stays compatible with the project's real architecture.
4. **Define research questions.** Convert the current artifact set into a short set of concrete questions, for example: stack choice, protocol fit, storage strategy, scaling assumptions, latency targets, safety constraints, model choice, deployment model, or replacement of an existing subsystem.
5. **Load the selected research template.** Use the chosen template as the structural baseline, then add or trim sections when the project clearly benefits from it. Required sections should stay present unless the user approves removing them.
6. **Survey GitHub repositories.** Find comparable repositories and record, for each one:
    - What problem it solves and how close it is to the current feature.
    - Why it is credible: adoption, maintenance activity, ecosystem influence, or production use.
    - Core architectural ideas, trade-offs, algorithms, and failure modes that are relevant to the current project.
    - The architectural ideas worth borrowing or explicitly rejecting.
    - Licensing or operational constraints that matter to the current project.
7. **Survey papers and formal references.** Gather recent papers, specifications, benchmarks, or standards that materially affect the design. Summarize the key result, its assumptions, and whether those assumptions match the current feature.
8. **Survey mature architectures.** Identify reference architectures from credible production systems, vendor docs, or established engineering write-ups. Extract the invariants, trade-offs, and failure modes rather than copying their surface structure.
9. **Compare the current project against open source.** For the most relevant repositories, explicitly compare:
    - The current project's architecture, module boundaries, and constraints.
    - What the open-source implementation does differently.
    - Which differences are signal versus incidental.
    - What can be adopted directly, adapted cautiously, or rejected with rationale.
10. **Evaluate candidate stacks.** Compare realistic implementation options against the current project's requirements, constraints, existing codebase shape, and team-fit signals. Prefer a compact evaluation matrix over vague prose when multiple options are viable.
11. **Translate findings into decision support.** For each research topic, state how it changes or constrains the current artifact under discussion: `spec.md`, `plan.md`, `tasks.md`, implementation, or broader project architecture. Research is only useful if it narrows the decision space.
12. **Call out unknowns.** If critical evidence is missing or contradictory, record `[NEEDS CLARIFICATION: ...]` items or explicit open research items rather than forcing a false conclusion.
13. **Write** the report to the scope-appropriate output path and report the main recommendation, the main rejected alternative, the main difference versus the closest open-source precedent, and any unresolved risks.

## Expected structure of `research.md`

At minimum, the final artifact should include:

- **Research questions / decision areas** derived from the current artifact set.
- **Popular GitHub repositories** with links, relevance notes, and lessons.
- **Current-project vs open-source comparison** with similarities, differences, and adoption guidance.
- **Cutting-edge papers and formal references** with dates, claims, and applicability notes.
- **Mature architectures and solutions** with operational trade-offs.
- **Technology-stack evaluation** comparing viable choices against the current project's needs.
- **Decision impact** describing which choices in `spec.md`, `plan.md`, `tasks.md`, or implementation are supported, weakened, or ruled out.
- **Open research items** for anything unresolved.

The project-level template may emphasize cross-cutting modules, platform constraints, and architecture slices. The spec-level template should emphasize one feature, its current implementation touchpoints, and the exact decision impact on `spec.md`, `plan.md`, `tasks.md`, or implementation.

## Quality checklist

- [ ] Every research section maps back to a concrete requirement, constraint, or open question from the current feature artifact set.
- [ ] External claims are cited with enough detail to be re-checked later: title, repository or paper name, and link when available.
- [ ] GitHub repositories are analyzed for architectural relevance, not listed as popularity theater.
- [ ] At least one direct comparison is made between the current project and the closest relevant open-source implementation when such a comparison is feasible.
- [ ] Papers or formal references include applicability notes; do not cite research that is impressive but irrelevant.
- [ ] Mature architectures include operational trade-offs, not just diagrams or slogans.
- [ ] Stack evaluation compares at least two realistic options when multiple options are truly viable.
- [ ] The output clearly states what evidence supports the likely recommendation and what evidence weakens it.
- [ ] Open unknowns are preserved as `[NEEDS CLARIFICATION: ...]` or `Open Research Items` instead of being silently guessed away.
- [ ] The selected template matches the scope of the question and the output path matches that scope.

## Draft rules

- **No invented facts.** Do not fabricate repository popularity, paper claims, benchmark results, adoption, or implementation details. If a fact is uncertain, say it is uncertain.
- **Ground everything in the current project.** This is not a generic market survey. Every finding must help the current feature, artifact, or implementation decision.
- **Prefer primary sources.** Favor original repositories, papers, standards, official docs, benchmarks, and source code over second-hand summaries when available.
- **Separate evidence from recommendation.** Be explicit about what is observed, what is inferred, and what is recommended.
- **Compare before you prescribe.** When recommending a stack or architecture, explicitly compare the current project against the strongest open-source precedent instead of making a free-floating recommendation.
- **Use the local research templates first.** `research-spec/templates/spec-level-research.md` and `research-spec/templates/project-level-research.md` are the primary templates for this skill.
- **Templates are references, not religion.** Respect the selected template's intent and required sections, but extend or lightly reorder sections when the project clearly benefits from it.
- **Escalation.** If the current feature or decision scope is too ambiguous to research responsibly, stop and ask the user for clarification in one consolidated message instead of performing a vague survey.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff

- If the research supports a new or revised design direction, recommend **`plan-spec`**.
- If the research exposes unresolved product ambiguity, recommend **`clarify-spec`**.
- If the research changes execution sequencing or implementation decomposition, recommend **`tasks-spec`**.
- If the research contradicts the in-flight implementation, recommend revisiting **`implement-spec`** after updating upstream artifacts.
- `commit-spec` may be invoked at any time to checkpoint `research.md`.
- **Re-run policy.** If `spec.md`, `plan.md`, `tasks.md`, or the implementation introduces a new disputed technology or architecture decision, re-run `research-spec` for the affected decision areas before proceeding.
