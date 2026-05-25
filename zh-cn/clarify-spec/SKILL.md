---
name: clarify-spec
description: >-
    解析 feature spec 中的 `[NEEDS CLARIFICATION: ...]` markers：通过引用 docs、引用代码证据，或向用户提问来完成解析。每一条拟议的解析结论在写回之前都必须获得用户明确批准。用户说“clarify the spec / resolve open questions / fill in the TODOs in the spec / answer the spec's clarifications”时使用。只要 `spec.md` 仍有未解析 markers，就应调用，尤其是在 `plan-spec` 或 `analyze-spec` 之前。
version: 0.2.0
phase: 4
---

# clarify-spec

逐条遍历 `spec.md` 中的每个 `[NEEDS CLARIFICATION: ...]` marker，并按以下方式将其解析：

1. 引用项目文档或代码库证据，**或**
2. 向用户提出一组已合并的问题，**或**
3. 仅在用户明确延期（defer）时，将 marker 降级为 `[ASSUMPTION: ...]` 记录。

无论采用哪种方式，写回 spec 之前都必须获得用户明确批准。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 4 步。

1. **Constitution** - 项目级原则、规则与质量标准。
2. **Documentation** - 代码库的全局视图。
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

- `spec.md` 含有一个或多个 `[NEEDS CLARIFICATION: ...]` markers。
- 用户即将运行 `plan-spec` 或 `analyze-spec`，希望先把 spec 收紧。

## 输入

- **必需：** 带有至少一个未解析 marker 的 `specs/<feature-slug>/spec.md`。
- **用于落地回答的必需输入：** 若存在 `docs/overview.md`、`docs/module.md` 与 `docs/logic/` 下的流文档，应优先引用它们。缺少全局 docs 时，agent 容易只做局部最优而忽略横切约束；若 `docs/` 为空，需显式提示该风险，并询问用户是否先运行 `documentation-spec`，或在仅有局部视图的前提下继续。
- **可选：** `.speckit/memory/constitution.md`；用户答复；spec 已引用的外部来源（issue、RFC、design doc）。

## 输出

- 原地更新的 `spec.md`：每个 marker 要么
    - 被“已批准的解析结论”替换，并附加括号引用 `(source: <src_file>:<function_name>)`（若存在引用），要么
    - 在用户明确延期时，被 `[ASSUMPTION: <statement>]` 替换。
- 一份简短解析报告：哪些 markers 已解析、证据来源、哪些被延期为 assumptions、以及是否仍有未关闭项。

## 工作流

1. **阅读** `spec.md`，枚举所有 `[NEEDS CLARIFICATION: ...]` markers，并为其分配稳定编号（C-01、C-02、...）。
2. **分组** 相关 markers（例如把所有 auth 相关问题合并），避免让用户收到碎片化提问。
3. **按以下顺序尝试为每个分组解析：**
    1. 在 `docs/*.md` 与 `.speckit/memory/constitution.md` 中检索权威答案。
    2. 在代码库中检索行为证据；对每条发现引用 `<src_file>:<function_name>`。
    3. 读取 spec 已引用的外部来源（issue、RFC、web link）。
    4. **无论答案来自 `docs/`、代码库还是用户，都必须先向用户呈现拟议解析结论，并在获得明确批准后才能应用。** 同组问题需合并为一条消息以减少往返。spec 的细微措辞变化可能引发 plan、tasks 与代码的大范围连锁修改，因此“更啰嗦一点”是更安全的默认。
    5. 若找不到权威答案且尚未询问用户，则直接向用户提问并给出可选项；用户给出明确答案则采用；用户明确延期则记录 `[ASSUMPTION]`。
4. **将已批准的解析结论写回** `spec.md`：
    - 用批准的陈述替换 marker；如有引用，追加 `(source: <src_file>:<function_name>)`。
    - 若用户延期，则替换为 `[ASSUMPTION: <statement>]`，并记录到 spec 的 risks & assumptions 章节。
5. **重新校验**：写入前确保没有任何 marker 被“默默遗留”。
6. **写入** 更新后的 `spec.md` 并交付解析报告。
7. **向用户汇报** 哪些 markers 已解析、哪些仍待用户答复。

> 如在解析过程中发现新问题，应追加到 spec 的 open-questions 章节。若能立即按上述工作流解析则直接解析；否则作为需在 planning 前解决的开放问题向用户汇报。

## 质量清单

- [ ] 每个被移除的 marker 都有依据：引用、用户明确答复或 `[ASSUMPTION]`，且在应用前已获得用户明确批准。
- [ ] 不引入超出引用或用户答复支持的新事实。
- [ ] 面向用户的问题应按“范围 -> security/privacy -> UX -> tech”排序，并尽量合并为每组一条消息。
- [ ] 所有 `[ASSUMPTION]` 块都被记录在 spec 的 risks & assumptions 章节。
- [ ] 若缺失且需要 `docs/`，报告必须提示并建议运行 `documentation-spec`。

## 起草规则

- **No invented facts.** 严格基于代码库与用户答复；缺少证据且用户未答复时，保留 marker 并报告。
- **Pragmatic inference.** 允许在上下文明确时做合理推断，但不得编造无法从代码落地的模块/服务/行为。
- **Templates are references, not religion.** spec 的必填章节不得删除；可在解析新增信息时扩展章节。
- **User approval is mandatory.** 任何写回到 spec 的解析结论（即使有 docs/代码引用支撑）也必须先获得用户明确批准；不得静默应用。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- markers 全部解析：建议进入 **`plan-spec`** 进行技术方案设计。
- markers 仍待用户答复：建议用户回答后重跑 `clarify-spec`。
- `commit-spec` 可随时调用，将已澄清的 spec checkpoint 到版本控制。
- **重跑策略：** 若 spec 在澄清后被修改，引入新的 markers 时需重跑 `clarify-spec`，随后下游按 `plan-spec`、`tasks-spec`、`analyze-spec` 顺序重跑。
