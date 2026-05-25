---
name: specify-spec
description: >-
    编写 feature spec：同时覆盖目标 feature 行为与其会触达的现状实现，避免后续步骤丢失全局视图。当用户说“write a spec / specify a new feature / draft a spec from this issue / turn this RFC into a spec”时使用。适用于任何 feature 循环的起点，包括需求来自外部来源（issue tracker、RFC、design doc、web link）的场景。
version: 0.2.0
phase: 3
---

# specify-spec

生成 `specs/<feature-slug>/spec.md`，同时覆盖：

- **Feature behavior** - WHAT 与 WHY：面向用户与评审者，不在此处为“全新组件”引入技术栈选择。
- **Current implementation** - 现状实现：记录该 feature 将与之交互的既有代码路径，使后续步骤理解 feature 将被嫁接到怎样的系统之上。关于既有代码的每条陈述都必须引用真实 `path:line`；不得编造。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 3 步。

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

- **Commit** - 版本控制 checkpoint。
- **Audit** - 事后复盘审计。

## 何时使用

- 用户以自然语言描述新 feature。
- 用户提供 issue、RFC、design doc 或外部链接并希望生成 spec。
- 既有 feature 需要在重构前重新规格化。

## 输入

- **必需：** feature 描述（用户提示或外部工件）。
- **强烈建议：**
    - `docs/overview.md`、`docs/module.md` 与 `docs/logic/` 下的流文档：用于将 spec 落地到现有系统，而不是在真空中写需求。
    - `.speckit/memory/constitution.md`：用于显式暴露与该 feature 相关的原则。
- **外部来源：** issue trackers、RFCs、design docs、web links。若用户提供，应在起草前先抓取并阅读。

## 输出

- `specs/<feature-slug>/spec.md`（slug 由 feature 标题派生，kebab-case）。
- 若存在缺失信息：一条合并后的澄清消息。

## 工作流

1. **派生 feature slug**：从 feature 标题或 issue 标题生成 kebab-case 的短且有意义的 slug。
2. **读取外部来源**：若用户提供 issue/RFC/web link，先读取并保留意图原文；不得用意译消解需求。
3. **读取项目 docs（`docs/*.md`）**：映射该 feature 将触达哪些模块。
4. **发现现状实现**：在代码库中检索相关入口点、interfaces/APIs、数据形状与调用点；记录发现的所有文件路径。
5. **加载 `templates/spec.md` 并填充章节：**
    - **Feature behavior：** 用户价值、用户场景、功能需求（FR-###）、非功能需求（NFR-###）、成功标准、out-of-scope。不得在此处为全新组件引入技术栈选择：这些属于 `plan-spec`。
    - **Current implementation：** 受影响模块、既有入口点与 interfaces/APIs、数据形状、既有测试。每条陈述都必须引用 `path:line`。
    - **Recommended implementation：** 高层方案草图、理由与权衡（不是详细设计）。
    - **Risks & assumptions：** 风险、非显而易见的假设或不确定性；若无，写 “None identified.”。
    - **Open questions：** 需要用户澄清的问题；若无，写 “None identified.”。
6. **暴露缺口**：用 `[NEEDS CLARIFICATION: ...]` markers 标记并向用户提问；相关问题合并为一条提示；不设固定上限。
7. **写入** `specs/<feature-slug>/spec.md`，并报告路径与尚未关闭的澄清点。

## 质量清单

- [ ] Feature behavior 章节只描述 WHAT 与 WHY：不为全新组件引入技术栈选择。
- [ ] 每条 FR 都可独立测试（可观测结果）。
- [ ] 成功标准可度量。
- [ ] 存在 out-of-scope，明确 feature 不做什么。
- [ ] Current implementation 章节中每条陈述均引用真实 `path:line`。
- [ ] 不编造模块、类或函数。
- [ ] 所有待澄清点都列在 open-questions 章节。

## 起草规则

- **No invented facts.** 严格基于用户需求、既有代码库与上游工件；证据不足时输出 `[NEEDS CLARIFICATION: ...]` 或向用户提问，不得编造。
- **Pragmatic inference.** 上下文明确时可做合理推断，但不得编造无法从代码落地的模块/服务/行为。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Best practice is encouraged.** 当用户与代码库沉默时，鼓励遵循语言惯例、社区建议与广泛认可的软件工程原则。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- 若仍有 `[NEEDS CLARIFICATION]`：建议运行 **`clarify-spec`** 后再进入 planning。
- 否则：建议运行 **`plan-spec`**。
- `commit-spec` 可随时调用，将 spec checkpoint 到版本控制。
- **重跑策略：** 若 spec 后续修改，需重跑 `clarify-spec`（若仍有 markers），随后按 `plan-spec`、`tasks-spec`、`analyze-spec` 的顺序重跑。
