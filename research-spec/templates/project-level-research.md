# Research Report: `<topic-slug>`

> Scope: project-level
> Created: YYYY-MM-DD
> Input anchors: docs, architecture notes, code paths, user question

---

## Executive Summary

- **Question being researched:** <one-sentence project-level question>
- **Current recommendation:** <recommended architecture / platform / stack direction>
- **Strongest rejected alternative:** <main alternative and why it lost>
- **Closest open-source precedent:** <repo / system / paper>
- **Affected project areas:** <modules, subsystems, or platform layers>

## Overview

### Current Project and Architectural Context

<!-- Describe the project, its architecture, major constraints, and the cross-cutting decision under investigation. -->

### Research Questions

- `<question 1>`
- `<question 2>`

## Reference Index

| Reference | Type                                            | Why It Matters | Credibility Signal                                                    | Link  |
| --------- | ----------------------------------------------- | -------------- | --------------------------------------------------------------------- | ----- |
| `<name>`  | repo / paper / standard / architecture write-up | <relevance>    | <adoption, citations, standards body, maintenance, or production use> | <url> |
| `<name>`  | repo / paper / standard / architecture write-up | <relevance>    | <credibility signal>                                                  | <url> |

## Related Projects and Research

- `<reference>`: <brief description of the reference and its relevance to the current project>
- `<reference>`: <brief description of the reference and its relevance to the current project>

---

## Block-Level Research

### `<block-name>`

<!-- Use one block per major architecture slice: data layer, orchestration, plugin model, serving path, build system, deployment topology, etc. -->

#### Current State in This Project

- <current architecture, constraints, and known pain points>

#### Findings by Reference

##### `<reference-name>`

- **Relevant design choices:**
- **Trade-offs and failure modes:**
- **What maps cleanly to this project:**
- **What does not map cleanly:**

##### `<reference-name>`

- **Relevant design choices:**
- **Trade-offs and failure modes:**
- **What maps cleanly to this project:**
- **What does not map cleanly:**

#### Horizontal Comparison

| Reference          | Key Findings   | Observations   | Pros   | Cons   | Conclusions   |
| ------------------ | -------------- | -------------- | ------ | ------ | ------------- |
| `<reference-name>` | <key findings> | <observations> | <pros> | <cons> | <conclusions> |
| `<reference-name>` | <key findings> | <observations> | <pros> | <cons> | <conclusions> |

#### Current Project vs Open-Source Comparison

| Dimension       | Current Project | Closest OSS Reference | Gap or Difference | Adoption Guidance      |
| --------------- | --------------- | --------------------- | ----------------- | ---------------------- |
| Module boundary | <current state> | <oss state>           | <gap>             | adopt / adapt / reject |
| Runtime model   | <current state> | <oss state>           | <gap>             | <guidance>             |
| Operations      | <current state> | <oss state>           | <gap>             | <guidance>             |
| Extension model | <current state> | <oss state>           | <gap>             | <guidance>             |

#### Candidate Stack Evaluation

| Option       | Strategic Fit | Migration Cost | Complexity | Operational Risk | Why Choose / Reject |
| ------------ | ------------- | -------------- | ---------- | ---------------- | ------------------- |
| `<option-a>` | <fit>         | <cost>         | <level>    | <risk>           | <decision>          |
| `<option-b>` | <fit>         | <cost>         | <level>    | <risk>           | <decision>          |

---

## Technical Perspective Suggestions

- **Recommended direction:** <concise recommendation>
- **Primary reasons:** <why it fits the project>
- **Migration or rollout notes:** <how to adopt safely>
- **What should remain unchanged:** <existing strengths to preserve>
- **Next upstream artifact to update:** <docs / spec / plan / tasks>

---

## Open Questions and Uncertainties

- `[NEEDS CLARIFICATION: <question or missing evidence>]`
- `<optional unresolved risk or follow-up research item>`
