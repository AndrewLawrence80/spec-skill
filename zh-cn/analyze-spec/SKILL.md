---
name: analyze-spec
description: >-
    只读审计：校验 `spec.md`、`plan.md`、`tasks.md` 的内部一致性，并检查其相对于项目文档（`docs/`）与 constitution 的漂移（drift）。当用户说“analyze the spec / audit before implementing / check consistency / ratify the artifacts / find gaps in the plan”时使用。应在 `tasks-spec` 之后、`implement-spec` 之前调用。
version: 0.2.0
phase: 7
---

# analyze-spec

产出 `specs/<feature-slug>/analysis.md`：仅包含标记与结论的诊断报告。本 skill **严格禁止修改任何源工件**；其唯一职责是暴露内部不一致、逻辑缺口与文档漂移，便于用户通过上游 skills 修复。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 7 步。

1. **Constitution** - 项目级原则、规则与质量标准，约束后续所有步骤。
2. **Documentation** - 代码库的全局视图；后续步骤必须阅读，以避免只做局部最优。
3. **Specification** - 单个 feature 的规格说明，既覆盖目标行为，也覆盖将被触达的现状实现。
4. **Clarification** - 在继续推进前，消解 spec 中遗留的问题与歧义。
5. **Planning** - 满足 spec 且遵循 constitution 的设计与实现方案。
6. **Tasks** - 由 plan 推导出的、有序且文件精确的任务列表。
7. **Analysis** - 验证 plan 与 tasks 是否符合 spec、constitution 与其他治理规则。
8. **Implementation** - 在 plan 指引下完成满足 tasks 的代码变更。
9. **Unit test** - 验证单个组件正确性的测试。
10. **Integration test** - 验证实现是否满足 spec 且遵循 constitution 的测试。

可在任意阶段调用的横切步骤：

- **Commit** - 在版本控制中记录进展。
- **Audit** - 事后复盘，输出需跟进的设计/代码问题。

## 何时使用

- 用户希望在进入实现前设置签署/核准门禁。
- 在 `spec.md`、`plan.md` 或 `tasks.md` 变更后需要重新校验。
- feature 开发中途项目全局 `docs/` 被更新，需要验证架构一致性仍成立。

## 输入

- **必需：** `specs/<feature-slug>/spec.md`、`specs/<feature-slug>/plan.md`、`specs/<feature-slug>/tasks.md`。_任一缺失都应中止流程，并提示用户通过上游 skills 生成。_
- **可选：** `docs/` 下的代码库文档与项目 constitution（`.speckit/memory/constitution.md`）。它们用于漂移分析的补充输入，而非严格执行门禁。

## 输出

- `specs/<feature-slug>/analysis.md`：仅包含标记的诊断报告。

## 严重级别定义与门禁规则

- **BLOCKER** - 必须在 `implement-spec` 前修复（流程停止）。
- **MAJOR** - 建议在实现前修复，除非用户明确接受风险。
- **MINOR** - 体验/质量类问题；可择机修复。
- **INFO** - 观察或建议；无需变更。

## 工作流

1. **加载模板。** 读取 `templates/analysis.md`，作为报告结构骨架。
2. **内部一致性检查。** 校验 specification 三件套的可追溯性：
    - `spec.md` 中每个 FR 与 NFR，至少在 `plan.md` 中有一个架构决策覆盖，并在 `tasks.md` 中有至少一个明确任务覆盖。
    - `tasks.md` 中每个任务都能反向映射到 FR、NFR、具名 API/interface、`data-model` 实体（适用时）、或合理的收尾/打磨阶段。
3. **数据模型一致性校验。** 若存在 `specs/<feature-slug>/data-model.md`：检查其中每个实体都至少被 `tasks.md` 的一个任务引用，并且与 `spec.md` 记录的数据形状、以及 `docs/logic/*.md` 中跨模块流一致；若不存在但 spec/plan 暗示数据形状变更，则记录为问题项。
4. **文档漂移检查。** 将 plan 与全局 `docs/` 对齐：
    - `plan.md` 中的模块划分是否与 `docs/module.md` 一致？（若引入新模块，plan 是否给出正当化？）
    - plan 中的数据模型与数据流是否与 `docs/logic/` 下的入口点文档冲突？
5. **constitution 一致性。** 若存在 `.speckit/memory/constitution.md`：验证其原则是否在 `plan.md` 中被显式回应（满足、延期、或豁免）；缺失回应应作为发现项报告，但不应被视为致命失败。
6. **撰写分析报告。** 用发现项填充 `templates/analysis.md`。每条发现项需包含：
    - **Severity：** `BLOCKER` / `MAJOR` / `MINOR` / `INFO`。
    - **Category：** Consistency、Coverage、Drift、Constitution、Data-model 或 Risk。
    - **Affected location：** 精确到 `path:line` 的引用。
    - **Remediation recommendation：** 建议由哪个上游 skill 修复（`clarify-spec`、`plan-spec`、`tasks-spec` 或 `documentation-spec`）。
7. **严格只读。** 不得对 `spec.md`、`plan.md`、`tasks.md`、以及任何代码/文档应用修复。你是验证阶段的审计者。
8. **报告阶段。** 保存 `analysis.md` 并向用户呈现结论。

## 质量清单

- [ ] **可追溯的发现项：** 每条发现项都引用至少一个源文件与行号。
- [ ] **只读保证：** 不提供补丁式代码改动建议，不做直接编辑；仅诊断与缺口识别。
- [ ] **数据模型覆盖：** `data-model.md`（如存在）的每个实体至少出现在一个任务中；如 spec/plan 暗示数据形状变更但缺失数据模型，则必须报告。
- [ ] **上下文意识：** 若缺少 `docs/`，报告应明确指出缺失并建议运行 `documentation-spec`。
- [ ] **constitution 宽容：** 若缺少 `constitution.md`，constitution 校验应标注为 “n/a”，不得臆造替代原则。
- [ ] **执行门禁：** 摘要需汇总所有 `BLOCKER`，并明确其在 `implement-spec` 前必须清零。

## 起草规则

- **No invented facts.** 严格以提供的工件与代码库为依据，不得编造错误。证据确实不足以做出审计判断时，插入 `[NEEDS CLARIFICATION: <issue>]`。
- **Pragmatic inference.** 可基于既有模式做合理结构推断，但必须回到书面痕迹进行核验。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展。未经用户明确同意，必填章节不得删除。
- **Escalation.** 遇到无法从输入落地的问题（缺失必需工件、证据含糊、文档冲突、用户答复自相矛盾），停止并向用户提问。相关问题需合并为一条消息；不得猜测，不得默默继续。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- **存在 Blocker：** 建议按发现项指定的上游 skill（例如 `plan-spec` 或 `tasks-spec`）修复后重跑。
- **全部通过：** 建议进入 **`implement-spec`** 开始执行。
- `commit-spec` 可随时调用，将 `analysis.md` 记录到版本控制。
- **重跑策略：** 若 `spec.md`、`plan.md`、`tasks.md`、`data-model.md` 或任意 `docs/` 文件在本次分析后发生变化，实现继续之前需重跑 `analyze-spec`。
