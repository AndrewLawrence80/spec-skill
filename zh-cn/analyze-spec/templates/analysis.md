# Analysis Report: `<feature-slug>`

> **运行日期：** YYYY-MM-DD | **目标 feature：** `<feature-slug>`

## 执行摘要

- **BLOCKERS：** 0
- **MAJORS：** 0
- **MINORS：** 0
- **INFOS：** 0

> **门禁检查：** 若 `BLOCKERS > 0`，不得进入 `implement-spec`；请先修复所有上游问题。
>
> **严重级别说明：** BLOCKER = 必须停止；MAJOR = 建议实现前修复（除非用户接受）；MINOR = 打磨；INFO = 记录即可。

---

## 内部一致性（Spec、Plan、Tasks）

### 覆盖矩阵

| Spec Requirement | Covered in `plan.md` (Section) | Covered in `tasks.md` (Task IDs) | Notes |
| ---------------- | ------------------------------ | -------------------------------- | ----- |
| `[FR-001]`       |                                |                                  |       |
| `[NFR-001]`      |                                |                                  |       |

### 发现项

- **F-001** `[BLOCKER / MAJOR / MINOR / INFO]` `[Consistency / Coverage]`
    - **描述：** [清晰说明缺口或不一致之处]
    - **位置：** `specs/<feature-slug>/spec.md:FR-001`, `specs/<feature-slug>/tasks.md:T-021`
    - **建议修复：** [例如：运行 `tasks-spec` 补齐缺失实现任务]

---

## 文档漂移（`docs/*.md`）

> _若全局 `docs/` 缺失，请输出："Documentation set absent: recommend running `documentation-spec` before proceeding" 并跳过本节。_

### 发现项

- **F-101** `[BLOCKER / MAJOR / MINOR / INFO]` `[Drift]`
    - **描述：** [解释 plan 如何与全局架构或入口点文档冲突]
    - **位置：** `specs/<feature-slug>/plan.md:L##`, `docs/module.md:L##`
    - **建议修复：** [例如：修订 `plan-spec`，或为 docs 增加明确的更新任务]

---

## 数据模型校验

| Artifact / Entity | Notes |
| ----------------- | ----- |
| `Entity: <Name>`  |       |

### 发现项

- **F-201** `[BLOCKER / MAJOR / MINOR / INFO]` `[Consistency]`
    - **描述：** [说明与数据模型相关的设计或实现风险]
    - **位置：** `specs/<feature-slug>/tasks.md:<entity_name>`
    - **建议修复：** [可执行的修复动作，用于满足需求/接口]

---

## Constitution Compliance

> _若 `.speckit/memory/constitution.md` 缺失，请跳过并将本节标注为 "N/A"。_

| Principle     | Acknowledged in `plan.md`? | Status (Satisfied / Deferred / Waived) | Notes |
| ------------- | -------------------------- | -------------------------------------- | ----- |
| [Description] | Yes / No                   |                                        |       |

### 发现项

- **F-301** `[BLOCKER / MAJOR / MINOR / INFO]` `[Constitution]`
    - **描述：** [解释原则违背或缺少显式回应的情况]
    - **位置：** `specs/<feature-slug>/plan.md:L##`
    - **建议修复：** [可执行的修复动作，用于遵守项目规则]

---

## 风险登记册（Risk Register）

> _记录不属于“硬性不一致”，但在架构或实现层面存在风险的事项。_

- **R-001** `[Risk]` - **[风险标题]：** [描述实现过程中可能出现的风险]
    - **缓解措施：** [建议策略或防御性编码实践]

---

## 推荐下一步

1. [动作 1：例如，运行 `tasks-spec` 修复 Blockers]
2. [动作 2：若执行摘要允许，则进入 `implement-spec`]
