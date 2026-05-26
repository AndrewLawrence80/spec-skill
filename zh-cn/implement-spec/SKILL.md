---
name: implement-spec
description: >-
    执行已核准的 feature plan 与 tasks：编写满足 plan 与 data model 的源代码，不得凭空新增 tasks，也不得偏离已记录的架构。当用户说“implement the tasks / build the feature now / code this up / start coding”时使用。应在 `analyze-spec` 报告无 BLOCKER 后调用；或在用户明确接受风险时调用。
version: 0.2.0
phase: 8
---

# implement-spec

按依赖顺序执行 `tasks.md`：写代码、标记任务完成、并汇报进展。本 skill 通过反复读取 `specs/<feature-slug>/` 下的 feature 工件、`docs/` 下的相关文档，以及 `.speckit/memory/constitution.md` 来维持**全局视图**。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 8 步。

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

- `specs/<feature-slug>/` 下存在已核准的 `tasks.md`，并且 `analysis.md` 中无 BLOCKER。
- 用户希望开始（或恢复）为该 feature 编写代码。

## 输入

- **必需：** `specs/<feature-slug>/` 下的 `spec.md`、`tasks.md`、`plan.md`。
- **可选：** `specs/<feature-slug>/data-model.md`（仅当 feature 引入或修改实体）。
- **全局视图必需：** `docs/` 下的相关文档。
- **可选：** `.speckit/memory/constitution.md`（用于可追溯性核对）；既往进展日志。

## 输出

- 满足 tasks 的源代码变更。
- 更新后的 `tasks.md`：将任务状态移动为 `[~]`（进行中）或 `[x]`（已完成）。
- （可选）`specs/<feature-slug>/implement-log.md`：单次会话进展日志。

## 工作流

1. **阶段性复读。** 开始每个 phase 的第一个任务时复读 `plan.md`、`tasks.md` 与相关 `docs/`；如果上一个任务修改了某个特定文档，在继续前应重读该文档。无需对每个任务都全量重载上下文。
2. **选择下一个任务。** 按依赖顺序取下一条就绪任务；若存在并行机会，在就绪任务中优先选择标记为 `[P]` 的任务。
3. **实现。** 严格在任务声明的文件范围内修改；保持变更边界清晰。
4. **标记完成。** 仅当任务所列文件已存在/已修改，并通过相关检查后，才可标记为 `[x]`。
5. **汇报。** 输出实现摘要，并将开放问题合并为一条消息呈现给用户；不设固定上限。

## 质量清单

- [ ] 每个任务严格在其声明的文件范围内实现。
- [ ] 遵循 `tasks.md` 的 phase 顺序；当 plan 选择了 TDD 对齐时，测试任务应先于对应行为/接口的实现落地。
- [ ] 未经 plan 或 docs 更新任务，不得新增模块或依赖。
- [ ] 遵守 `docs/module.md` 的模块边界；跨模块调用需匹配 `docs/logic/*.md` 中记录的流。
- [ ] 不得编造外部接口；除 `data-model.md`（如存在）外不得凭空新增数据字段。
- [ ] 进展日志记录 task ID、状态变更、可提交摘要与澄清项。

## 起草规则

- **No invented facts.** 严格遵循 `plan.md`、`tasks.md` 与既有代码库。
- **Pragmatic inference.** 可基于既有模式做合理结构推断，但不得虚构外部服务或复杂缺失行为。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Clear comments.** 对不直观的逻辑块，应添加注释解释其目的。
- **Modular design.** 将相关功能封装为函数/类；尊重已记录的模块边界。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- 所有实现任务完成：建议运行 **`unittest-spec`** 与 **`integration-test-spec`**（顺序不限；可并行运行，因为写入不同输出文件）。
- 遇到 blocker：指出需要回到哪个上游 skill（`clarify-spec`、`plan-spec`、`tasks-spec` 或 `documentation-spec`）。
- `commit-spec` 可随时调用；建议在 task/phase 边界做 checkpoint，保持 feature 前缀一致（`feat(<feature-slug>): ...`）。
- **重跑策略：** 若在实现中途修改了 `plan.md` 或 `tasks.md`，继续实现前需重跑 `analyze-spec`。
