---
name: documentation-spec
description: >-
    生成或刷新项目全局文档集（`docs/overview.md`, `docs/module.md`, `docs/logic/*.md`），为后续每个 skill 提供稳定的全局视图。当用户说“generate docs / describe the architecture / create an overview / document the modules / onboard me to this repo”时使用。只要 `docs/` 为空或过期，在 specify/plan/implement 之前都应先调用。
version: 0.2.0
phase: 2
---

# documentation-spec

生成或更新项目的 **`docs/`** 目录：覆盖整个项目的全局视图，作为后续每个 skill（`specify-spec`、`clarify-spec`、`plan-spec`、`tasks-spec`、`analyze-spec`、`implement-spec`、`integration-test-spec`、`commit-spec`）的必读输入。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 2 步。

1. **Constitution** - 项目级原则、规则与质量标准。
2. **Documentation** - 代码库全局视图。
3. **Specification** - feature spec（目标行为 + 现状实现）。
4. **Clarification** - 解析 spec 中的歧义与问题。
5. **Planning** - 设计与实现方案。
6. **Tasks** - 有序、文件精确的任务列表。
7. **Analysis** - 一致性与漂移校验。
8. **Implementation** - 代码实现。
9. **Unit test** - 单元验证。
10. **Integration test** - 跨模块验证。

横切步骤：

- **Explore** - 在无任何锚点文档时，对陌生代码库进行广度优先探索，写入 `.speckit/memory/exploration.md`。
- **Commit** - 版本控制 checkpoint。
- **Audit** - 事后复盘审计。

## 何时使用

- `docs/` 不存在或仅包含 README。
- 自上次文档生成后，代码库发生了显著变更。
- 下游 skill（如 `specify-spec`、`plan-spec`）报告文档缺失或过期。

## 输入

- **必需：** 代码库本身。
- **可选：**
    - `README.md`、既有 `docs/`、代码注释、ADRs、RFCs。
    - `.speckit/memory/constitution.md`（用于术语与规则对齐）。
    - 用户提供的聚焦提示（例如“关注数据层”“跳过 CLI”）。

## 输出

- `docs/overview.md`：项目目的、目标读者、顶层架构、术语表。
- `docs/module.md`：按模块说明职责、对外接口与依赖关系。
- `docs/logic/<api|task|callback_name>.md`：按入口点一文件，描述端到端控制流/数据流，并以 Mermaid sequence diagram 表达。
- 简短报告：列出审阅的 commit hash，以及留下的 `TODO(<topic>): ...` markers（供用户确认）。

## 工作流

1. **定位** `docs/` 下的既有文档。若存在，记录 `overview.md` 中的 commit hash，并仅加载自该 commit 以来的 diff；否则准备从零开始。
2. **加载模板**：读取 `templates/overview.md`、`templates/module.md`、`templates/logic.md`，理解必填章节结构。
3. **探索代码库**，收集填充模板所需事实：
    - 项目整体目的与受众。
    - 顶层模块边界与目录/包布局。
    - 入口点：HTTP handlers、CLI commands、cron tasks、message consumers、callbacks。
    - 从每个入口点出发的跨模块控制流/数据流。
    - 外部上游/下游依赖（服务、数据库、队列、库）。
    - 模块对外接口与内部协作者。
4. **并行写文档**：按第 2 步的章节骨架分别写 `overview.md`、`module.md` 与每个 `logic/<name>.md`。这些文件互不共享输出，允许并发生成，不应过度串行化。
    - 对第 3 步发现的每个入口点，追踪端到端控制/数据流，按 `templates/logic.md` 写入 `docs/logic/<api|task|callback_name>.md`。
    - 每条事实性陈述都必须引用具体文件路径（可行时加行号）。
    - 对于代码中不明确或有歧义的事实，用 `TODO(<topic>): ...` marker 替代编造。
5. **报告**：给出审阅的 commit hash、写入文件路径、以及所有 `TODO` markers（供用户补全/确认）。

## 质量清单

- [ ] 每条陈述都可落地到 source：文件路径或 commit 参考。
- [ ] 模块清单与实际目录/包结构一致。
- [ ] `docs/logic/<api|task|callback_name>.md` 覆盖该入口点的全部跨模块流，并包含 Mermaid sequence diagram。
- [ ] 术语与 `.speckit/memory/constitution.md`（若存在）保持一致。
- [ ] `docs/overview.md` 记录 reviewed-commit hash 与刷新日期。
- [ ] 所有 `TODO(<topic>)` markers 都在报告中汇总。

## 起草规则

- **No invented facts.** 严格基于代码库；证据不足时输出 `TODO(<topic>): ...` 并要求用户补全，不得编造。
- **Pragmatic inference.** 上下文明确时可做合理结构推断，但不得编造无法从代码落地的模块/服务/行为。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Mermaid is required for non-trivial flows.** 对非平凡流必须使用 Mermaid sequence diagram；可辅以文字，但不得用纯文字替代图。
- **Marker scope.** `TODO(<topic>): ...` 用于当前尚无法从代码证实的事实；当事实被代码或用户验证后，视为已解决。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- 建议用户批准调用 `commit-spec`，将新建/更新的文档与变更摘要一并提交；若用户不批准，则仅报告文件路径。
- 建议下一步运行 **`specify-spec`**，在全局视图基础上启动 feature 循环。
- **重跑策略：** 若 `docs/` 在 feature 中途变化，应对所有进行中的 feature 重跑 `analyze-spec` 以检测漂移，并按需修订下游 plan/tasks。
