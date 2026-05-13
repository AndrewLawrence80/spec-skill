# Audit Report for `<feature-slug>`

> 审计日期：YYYY-MM-DD - Source artifacts：`spec.md`, `plan.md`, `tasks.md`（位于 `specs/<feature-slug>/`）

---

## 实现摘要

<!-- 基于 tasks，对本 feature 实现内容做简要概述。 -->

---

## 严重级别说明

- **BLOCKER** - 正确性或安全缺陷；在 feature 被视为完成前必须修复。
- **MAJOR** - 重要的设计/可追溯性/正确性问题；建议合并前修复，除非用户明确接受。
- **MINOR** - 打磨/质量问题；可择机修复。
- **INFO** - 观察或建议；无需变更。

---

## 发现项概览

<!-- 每条发现项一行，按 BLOCKER -> MAJOR -> MINOR -> INFO 排序，便于快速分诊。 -->

| ID    | Severity | Category        | Task / Path:line            | One-line summary |
| ----- | -------- | --------------- | --------------------------- | ---------------- |
| F-001 | BLOCKER  | Bug             | `T-###` / `src/foo.py:42`   |                  |
| F-002 | MAJOR    | Logical problem | `T-###` / `src/bar.py:117`  |                  |
| F-003 | MINOR    | Traceability    | `T-###`                     |                  |
| F-004 | INFO     | Concurrency     | `T-###` / `src/queue.py:88` |                  |

---

## Bugs

### F-001 - `T-###` - BLOCKER

- **描述：** [简述该 task 的目标。]
- **问题：** [描述 bug，例如“实现未覆盖 spec 中提到的边界条件，可能导致缺陷”。]
- **相关文档：** [列出相关 docs，例如 `spec.md`、`data-model.md`。]
- **影响：** [描述影响，例如“边界条件触发时会导致运行时错误”。]
- **场景：** [描述触发场景，例如“输入包含 null 时会抛错而非优雅处理”。]
- **建议跟进：** [推荐上游 skill（`clarify-spec`、`plan-spec`、`tasks-spec` 或 `documentation-spec`）以及需要修改的内容。]

---

## Logical problems

### F-002 - `T-###` - MAJOR

- **描述：** [简述该 task 的目标。]
- **问题：** [描述逻辑问题，例如“实现与 spec 的逻辑约束存在偏离”。]
- **相关文档：** [列出相关 docs，例如 `spec.md`、`docs/logic/<flow>.md`。]
- **影响：** [描述影响，例如“可能造成维护困难，后续开发者难以理解该实现选择”。]
- **场景：** [描述可能发生问题的场景。]
- **建议跟进：** [推荐上游 skill 与需要修改的内容。]

---

## Race conditions and concurrency issues

### F-### - `T-###` - <severity>

- **描述：** [简述该 task 的目标。]
- **问题：** [描述并发问题。]
- **相关文档：** [列出相关 docs。]
- **影响：** [描述影响，例如“多线程/多进程并发访问共享资源时可能导致不可预测行为或数据损坏”。]
- **场景：** [描述可能发生问题的场景。]
- **建议跟进：** [推荐上游 skill 与需要修改的内容。]

---

## Traceability issues

### F-### - `T-###` - <severity>

- **描述：** [简述该 task 的目标。]
- **问题：** [描述可追溯性问题，例如“实现新增了 spec 或相关 docs 未提及的额外函数”。]
- **相关文档：** [列出相关 docs。]
- **影响：** [描述影响。]
- **场景：** [描述可能发生问题的场景。]
- **建议跟进：** [推荐上游 skill 与需要修改的内容。]

---

## Open questions

- **Question：** [描述开放问题，例如“实现中新增函数是否必要？若必要，其设计意图是什么？”]
