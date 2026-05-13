---
name: audit-spec
description: >-
    事后复盘：将 feature（或全项目）实现与 spec、plan、tasks、constitution 以及相关 docs 对照，输出正确性、可追溯性、设计与并发问题，并按严重级别标注后续跟进。用户说“audit this feature / review the implementation / find bugs after the fact / retrospective on the build / check traceability”时使用。通常在实现后（最好测试后）调用，也可在需要复盘时随时调用。
version: 0.2.0
phase: cross-cutting
---

# audit-spec

按依赖顺序走读 `plan.md` 与 `tasks.md`，对照 spec 与相关 docs 审计实现，按严重级别对每个发现项分类，并为每个发现项指向合适的上游 skill 作为后续修复入口。本 skill 是横切步骤（可在流程任意阶段调用），并且 **严格只读**：绝不编辑任何源工件，唯一输出是审计报告。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 为横切步骤，可在任意阶段调用。

1. **Constitution** - 项目级原则、规则与质量标准。
2. **Documentation** - 代码库的全局视图。
3. **Specification** - feature spec（目标行为 + 现状实现）。
4. **Clarification** - 解析 spec 中的歧义与问题。
5. **Planning** - 设计与实现方案。
6. **Tasks** - 有序、文件精确的任务列表。
7. **Analysis** - 一致性与漂移校验。
8. **Implementation** - 代码实现。
9. **Unit test** - 单元验证。
10. **Integration test** - 端到端/跨模块验证。

横切步骤：

- **Commit** - 版本控制 checkpoint。
- **Audit** - 事后复盘审计。

## 何时使用

- feature 已实现（通常在 `implement-spec` 与测试阶段之后），用户希望做复盘审查。
- 用户希望对全项目按现有工件集做审计。
- 线上 bug 或险情促使进行可追溯性复核。

## 输入

- **必需：** `specs/<feature-slug>/` 下的 `spec.md`、`plan.md`、`tasks.md`，以及实现源代码。
- **可选：** `specs/<feature-slug>/data-model.md`（仅当 feature 引入或修改实体）。
- **全局视图必需：** `docs/` 下的相关文档。
- **可选：** `.speckit/memory/constitution.md`；既往进展日志；最近 commit 历史。

## 输出

- `specs/<feature-slug>/audit.md`：仅标记的审计报告（feature 级）。
    - 若是全项目审计：用户必须显式提供输出目录，写入 `<output-dir>/audit.md`。
- 基于 tasks 给出的简短 **实现摘要**。
- 按类别分组的发现项：**Bugs**、**Logical problems**、**Race conditions and concurrency issues**、**Traceability issues**。
- 若存在：用于后续跟进的 **Open questions**。

## 严重级别定义

- **BLOCKER** - 正确性或安全缺陷；在 feature 被视为完成之前必须修复。
- **MAJOR** - 重要的设计/可追溯性/正确性问题；建议在合并前修复，除非用户明确接受。
- **MINOR** - 打磨/质量问题；可择机修复。
- **INFO** - 观察或建议；无需变更。

## 工作流

1. **选择输出路径。**
    - feature 审计（默认）：写入 `specs/<feature-slug>/audit.md`。
    - 全项目审计：向用户索取明确输出目录，写入 `<output-dir>/audit.md`。
2. **在每个审计阶段前复读** `spec.md`、`plan.md`、`tasks.md` 与相关 `docs/`。
3. **加载 commit 历史** 以理解近期变更背景。
4. **按依赖顺序审阅实现**，并为每个发现项赋予严重级别与类别。对每个 task，至少核对：
    - **Correctness：** 代码是否满足 task 的明确要求？
    - **Completeness：** task 的每一部分是否都实现了——并且只实现了这部分？
    - **Logical soundness：** 是否存在导致 bug/维护性问题的设计或实现瑕疵？
    - **Traceability：** 实现是否能追溯回 spec、constitution 或相关 docs？
    - **Race conditions and concurrency issues：** 适用时必须覆盖。
5. **用 `templates/audit.md` 记录发现项。** 每条发现项需包含 severity（BLOCKER / MAJOR / MINOR / INFO）、category、受影响的 `path:line`、影响、场景、以及建议的上游 skill。
6. **严格只读。** 不得对 spec/plan/tasks/code/docs 应用修复；仅写审计报告。
7. **向用户呈现发现项与开放问题。** 对每条 MAJOR 或 BLOCKER，建议回到对应上游 skill（`clarify-spec`、`plan-spec`、`tasks-spec` 或 `documentation-spec`）修复。

## 质量清单

- [ ] 每条发现项都有明确严重级别（BLOCKER / MAJOR / MINOR / INFO）。
- [ ] 每条发现项都至少引用一个 `path:line`。
- [ ] Correctness、completeness、logical soundness、traceability 与 concurrency 均被覆盖（或给出 “n/a” 与理由）。
- [ ] 只读：不提供直接代码补丁或文件编辑。
- [ ] 摘要需汇总所有 BLOCKER 与 MAJOR（作为必须处理的门禁项）。
- [ ] 如有开放问题，必须显式列出。

## 起草规则

- **No invented facts.** 严格以 `spec.md`、`plan.md`、`tasks.md` 与代码库为依据。仅在证据不足以作出审计判断时插入 `[NEEDS CLARIFICATION: <issue>]`。
- **Pragmatic inference.** 可基于既有模式做合理结构推断，但必须对照书面痕迹核验。
- **Templates are references, not religion.** 尊重 `templates/audit.md` 的意图与必填章节；可在项目语境明确时调整顺序或扩展。未经用户明确同意，必填章节不得删除。
- **Read-only.** 本 skill 永不编辑源工件；发现项是诊断而非补丁。
- **Escalation.** 遇到无法从输入落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。

## 交接建议

- 已输出发现项：针对每个 BLOCKER/MAJOR，建议重跑对应上游 skill（`clarify-spec`、`plan-spec`、`tasks-spec` 或 `documentation-spec`），并引用受影响的上游工件。
- 审计工件本身：建议使用 **`commit-spec`** 将 `audit.md` 提交到版本控制。
- **全部通过（无 BLOCKER/MAJOR）：** 向用户报告放行结果。
- **重跑策略：** 若 spec、plan、tasks 或实现被修改，需重跑 `audit-spec` 验证修复。
