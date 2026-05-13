# Tasks: `<feature-slug>`

> **Plan：** [`plan.md`](specs/<feature-slug>/plan.md)
> **Spec：** [`spec.md`](specs/<feature-slug>/spec.md)
> **创建日期：** YYYY-MM-DD

## Legend

- **Status:** `[ ]` 未开始 | `[~]` 进行中 | `[x]` 已完成
- **Parallelization:** `[P]` 可与兄弟任务并行执行；无标记则严格串行。
- **Trace:** 上游需求 ID（如 `FR-001`、`NFR-002`）、具名 API/interface，或 `data-model` 实体（适用时）。

---

## Data model & definitions

- [ ] **T-001** [数据模型或类型定义任务描述]
    - **Files:** `path/to/types_or_schema.ext`
    - **Trace:** `[FR-###]` / `[Entity Name]`
    - **Depends on:** `None`
    - **Implementation Snippet:**

    ```<language>
    // Pseudocode or explicit interface
    ```

- [ ] **T-002** `[P]` [可并行的定义类任务]
    - **Files:** ...
    - **Trace:** ...
    - **Depends on:** `None`
    - **Implementation Snippet:**

    ```<language>

    ```

## Algorithms & utilities

- [ ] **T-010** [共享工具或算法函数描述]
    - **Files:** ...
    - **Trace:** ...
    - **Depends on:** `T-001`
    - **Implementation Snippet:**

    ```<language>

    ```

## Modules & Core Implementation

_注：若选择 TDD 对齐，测试编写任务应先于对应实现任务。_

- [ ] **T-020** `[P]` [为核心模块编写 unit tests]
    - **Files:** `tests/core_module.test.ext`
    - **Trace:** `[API/interface / FR-###]`
    - **Depends on:** `T-010`

- [ ] **T-021** [实现核心模块以满足测试]
    - **Files:** `src/core_module.ext`
    - **Trace:** `[FR-###]`
    - **Depends on:** `T-020`
    - **Implementation Snippet:**

    ```<language>

    ```

## Integration & Wiring

- [ ] **T-030** [将核心模块集成到现有系统]
    - **Files:** ...
    - **Trace:** ...
    - **Depends on:** `T-021`
    - **Implementation Snippet:**

    ```<language>

    ```

## Polish & Finalization

- [ ] **T-040** `[P]` 更新新 feature 的文档与必要的架构说明。
    - **Files:** `docs/*.md`, `README.md`
    - **Trace:** `[Setup/Polish]`
    - **Depends on:** `T-030`

- [ ] **T-041** `[P]` 修复 lint、format 与 static analysis 问题。
    - **Files:** `[All modified files]`
    - **Trace:** `[Setup/Polish]`
    - **Depends on:** `T-040`

---

## Open Questions

- `[NEEDS CLARIFICATION: <question>]`
