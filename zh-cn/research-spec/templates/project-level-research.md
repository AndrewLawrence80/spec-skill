# Research Report: `<topic-slug>`

> Scope: project-level
> Created: YYYY-MM-DD
> Input anchors: docs, architecture notes, code paths, user question

---

## Executive Summary

- **Question being researched:** <一句话描述当前项目级调研问题>
- **Current recommendation:** <推荐的架构 / 平台 / 技术栈方向>
- **Strongest rejected alternative:** <最强备选及其落选原因>
- **Closest open-source precedent:** <最接近的仓库 / 系统 / 论文>
- **Affected project areas:** <受影响的模块、子系统或平台层>

## Overview

### Current Project and Architectural Context

<!-- 描述项目、当前架构、主要约束，以及正在研究的横切性决策。 -->

### Research Questions

- `<question 1>`
- `<question 2>`

## Reference Index

| Reference | Type                                            | Why It Matters | Credibility Signal                                     | Link  |
| --------- | ----------------------------------------------- | -------------- | ------------------------------------------------------ | ----- |
| `<name>`  | repo / paper / standard / architecture write-up | <相关性>       | <采用度、citation、标准组织、维护活跃度或生产使用情况> | <url> |
| `<name>`  | repo / paper / standard / architecture write-up | <相关性>       | <可信度信号>                                           | <url> |

## Related Projects and Research

- `<reference>`: <该参考与当前项目相关性的简短说明>
- `<reference>`: <该参考与当前项目相关性的简短说明>

---

## Block-Level Research

### `<block-name>`

<!-- 每个 block 对应一个主要架构切片：data layer、orchestration、plugin model、serving path、build system、deployment topology 等。 -->

#### Current State in This Project

- <当前架构、约束与已知痛点>

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

| Reference          | Key Findings | Observations | Pros   | Cons   | Conclusions |
| ------------------ | ------------ | ------------ | ------ | ------ | ----------- |
| `<reference-name>` | <关键发现>   | <观察>       | <优点> | <缺点> | <结论>      |
| `<reference-name>` | <关键发现>   | <观察>       | <优点> | <缺点> | <结论>      |

#### Current Project vs Open-Source Comparison

| Dimension       | Current Project | Closest OSS Reference | Gap or Difference | Adoption Guidance      |
| --------------- | --------------- | --------------------- | ----------------- | ---------------------- |
| Module boundary | <当前状态>      | <开源状态>            | <差异>            | adopt / adapt / reject |
| Runtime model   | <当前状态>      | <开源状态>            | <差异>            | <建议>                 |
| Operations      | <当前状态>      | <开源状态>            | <差异>            | <建议>                 |
| Extension model | <当前状态>      | <开源状态>            | <差异>            | <建议>                 |

#### Candidate Stack Evaluation

| Option       | Strategic Fit | Migration Cost | Complexity | Operational Risk | Why Choose / Reject |
| ------------ | ------------- | -------------- | ---------- | ---------------- | ------------------- |
| `<option-a>` | <适配度>      | <迁移成本>     | <复杂度>   | <风险>           | <结论>              |
| `<option-b>` | <适配度>      | <迁移成本>     | <复杂度>   | <风险>           | <结论>              |

---

## Technical Perspective Suggestions

- **Recommended direction:** <简明建议>
- **Primary reasons:** <为何适合当前项目>
- **Migration or rollout notes:** <如何安全采用>
- **What should remain unchanged:** <应该保留的现有优势>
- **Next upstream artifact to update:** <docs / spec / plan / tasks>

---

## Open Questions and Uncertainties

- `[NEEDS CLARIFICATION: <问题或缺失证据>]`
- `<可选：尚未解决的风险或后续调研项>`
