---
name: constitution-spec
description: >-
    创建或更新 `.speckit/memory/constitution.md`：项目级原则、治理规则与质量标准的权威记录，后续每个 spec-skill 步骤都必须遵循。用户说“set up project principles / create a constitution / establish coding standards / ratify governance / amend the constitution”时使用。只要用户希望建立供下游遵循的项目级规则（即使未显式提到“constitution”一词），都应调用。
version: 0.2.0
phase: 1
---

# constitution-spec

建立或修订 `.speckit/memory/constitution.md`：spec-skill 集合中所有其他 skills 都视其为权威的全局锚点。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 1 步。

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

- 项目尚无 `.speckit/memory/constitution.md`- 修订既有 constitution：新增、修改或删除原则，或收紧现有规则。

## 输入

- **必需：** 无——constitution 可以从空白开始。
- **可选：**
    - 用户提供的原则或规则（自由文本）。
    - 既有 `.speckit/memory/constitution.md`（用于修订）。
    - `docs/` 目录下的文档（如存在，用于术语一致性）。

## 输出

- 仓库根目录下的 `.speckit/memory/constitution.md`（或用户指定路径）。
- 简短变更摘要：新增/修改/删除的原则清单，以及 semantic-version bump 的一句话理由。

## 工作流

1. **定位** 现有 `.speckit/memory/constitution.md`。若存在则读取；否则准备新草案。
2. **加载** `templates/constitution.md` 作为推荐结构。可在项目语境明确时调整顺序或扩展章节；未经用户明确同意不得静默删除必填章节。
3. **收集上下文**：来自用户需求、既有代码库，以及（如存在）`docs/` 目录。
4. **起草** constitution：
    - 每条原则以声明式表述，并可独立验证。
    - Ratified/Amended 日期使用 ISO（`YYYY-MM-DD`）。新建时将 ratification date 设为今天；修订时保留原 ratification date，并为被修改的原则标注新的 amendment date；未变更的原则保留原日期且不新增 amendment date。
    - 更新 semantic version：治理层面的破坏性变化用 **MAJOR**；新增原则用 **MINOR**；澄清与文字修订用 **PATCH**。
5. **暴露需澄清点**：用 `[NEEDS CLARIFICATION: ...]` markers 和/或直接向用户提问。相关问题合并为一条提示；不设固定上限。
6. **写入** 文件并报告路径、版本号 bump 与变更摘要。

## 质量清单

- [ ] 每条原则均为声明式且可独立验证。
- [ ] 不编造规则：每条原则要么来自用户明确要求、要么能从仓库证据支撑、要么是广泛接受的最佳实践。
- [ ] Ratified 与 last-amended 日期齐全且为 ISO 格式。
- [ ] semantic version 已更新并包含一句话理由。
- [ ] 若存在 `docs/`，术语与其保持一致。

## 起草规则

- **No invented facts.** 严格基于用户要求与既有代码库；证据不足时输出 `[NEEDS CLARIFICATION: ...]` 或向用户提问，不得编造。
- **Pragmatic inference.** 上下文明确时可做合理推断，但不得编造无法从代码落地的模块/服务/行为。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Best practice is encouraged.** 当用户与代码库在某议题上沉默时，鼓励遵循语言惯例、社区建议与广泛认可的软件工程原则。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- 建议用户批准调用 `commit-spec`，将新建/修订的 constitution 与变更摘要一并提交；若用户不批准，则仅报告文件路径与版本 bump。
- 若 `docs/` 为空，建议下一步运行 **`documentation-spec`**：constitution 与全局文档集共同构成后续 skills 依赖的全局视图。
- **重跑策略：** 若后续修订 constitution，需重跑任何进行中的 `plan-spec` 与 `analyze-spec`，以验证持续一致性。
