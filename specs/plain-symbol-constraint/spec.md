# Feature Spec: `plain-symbol-constraint`

> Created: 2026-05-25
> Source: user prompt

---

## Original description

当前所有的 skill 并未对文档的符号使用做出限制，本次迭代需要限制 Agent 不要输出特殊字符导致修改门槛提高和可读性降低的问题

---

## Feature behavior (WHAT & WHY)

### Summary

当前 spec-skill 的所有 13 个 SKILL.md（英文版与 `zh-cn/` 中文镜像共 26 个文件）的 `## Draft rules` / `## 起草规则` 章节均未对 Agent 输出的符号种类加以限制。Agent 在生成 spec、plan、tasks 等文档时，有可能输出 emoji、Unicode 装饰性标点（弯引号 `"` `"`、破折号 `—`、省略号 `…`）以及非 ASCII 装饰性符号（`→`、`✓`、`★` 等）。

这类特殊字符带来两个具体问题：（1）**修改门槛提高**——它们无法在普通 ASCII 键盘上直接键入，在 diff 视图、终端和轻量编辑器中难以辨别和再现；（2）**可读性降低**——特殊字符与普通 ASCII 字符在视觉上不一致，在不同字体或终端下渲染结果各异，给文档审阅和版本比对带来噪声。

本 feature 在每个 SKILL.md 的 `## Draft rules` / `## 起草规则` 章节中增加一条 **"Plain-text symbols only"** 规则，明确禁止上述特殊字符，并规定 ASCII 等价替换，从而将约束嵌入每次调用 skill 时 Agent 必须遵守的行为规范之中。

### Functional requirements

- **FR-001**: 每个英文 SKILL.md 的 `## Draft rules` 章节 **MUST** 新增一条名为 **Plain-text symbols only** 的规则，明确禁止在生成文档中输出 emoji、Unicode 装饰性标点与非 ASCII 装饰性符号，并给出 ASCII 等价形式。
- **FR-002**: 每个 `zh-cn/` SKILL.md 的 `## 起草规则` 章节 **MUST** 新增与英文版语义等价的中文规则。
- **FR-003**: 规则 **MUST** 明确指出允许的字符范围：ASCII 可打印字符（U+0020–U+007E），以及 zh-cn 输出中作为语言内容使用的 CJK 字符。
- **FR-004**: 规则 **MUST** 提供最常见的 ASCII 替换示例：`->` 代替 `→`、`...` 代替 `…`、直引号代替弯引号、`-` 代替 `—`。
- **FR-005**: 规则 **MUST NOT** 限制代码块（`` ` `` 或 ```` ``` ````）和 Mermaid 图表内部的字符——这些是技术内容，不受约束。

### Non-functional requirements

- **NFR-001**: 新增规则 **MUST** 遵循现有 Draft rules 的行文格式：`**加粗规则名。** 规则正文。`，单条规则不超过 3 句话，与现有条目保持风格一致。
- **NFR-002**: 英文版 26 个文件的规则文本 **MUST** 完全一致（英文 13 个文件一致、zh-cn 13 个文件一致），避免版本漂移。

### Success criteria

- 全部 26 个 SKILL.md 文件（`*/SKILL.md` 与 `zh-cn/*/SKILL.md` 各 13 个）在其 Draft rules / 起草规则章节中均包含新规则。
- 新规则文本在英文版之间完全相同，在 zh-cn 版之间完全相同。
- 没有任何现有 Draft rules 条目被修改或删除。

### Out of scope

- 自动化 lint / CI 检查（不引入任何工具配置）。
- 修改 `templates/` 目录下的模板文件（模板是参考文档，不是 Agent 行为指令）。
- 修改 `README.md` 文件。
- 修改 `constitution-spec/templates/constitution.md`（constitution 的内容由用户驱动，不由本 feature 预填）。
- 对已生成的历史 spec/plan/tasks 文档进行回溯修改。

---

## Current implementation (WHAT EXISTS TODAY)

### Affected modules

本仓库以 skill 目录为模块单位。受影响的 26 个文件分属 13 个英文 skill 目录和 13 个 zh-cn 镜像目录：

- `constitution-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `documentation-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `specify-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `clarify-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `plan-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `tasks-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `analyze-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `implement-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `unittest-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `integration-test-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `research-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `commit-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- `audit-spec/SKILL.md`: Draft rules 章节缺少符号约束。
- 以上 13 个文件的 `zh-cn/` 镜像（`zh-cn/*/SKILL.md`）：`## 起草规则` 章节同样缺少符号约束。

### Existing entry points & interfaces/APIs

每个 SKILL.md 的 `## Draft rules` / `## 起草规则` 章节是 Agent 行为约束的入口：Agent 在调用对应 skill 时**必须遵守**该章节的所有规则。以下列出现有章节位置（按英文版）：

- `constitution-spec/SKILL.md:71`: `## Draft rules` — 当前包含 5 条规则：No invented facts、Pragmatic inference、Templates are references、Best practice is encouraged、Escalation。
- `documentation-spec/SKILL.md:80`: `## Draft rules` — 当前包含 6 条规则（额外含 Mermaid is required for non-trivial flows 与 Marker scope）。
- `specify-spec/SKILL.md:80`: `## Draft rules` — 当前包含 5 条规则。
- `clarify-spec/SKILL.md:84`: `## Draft rules` — 当前包含规则若干。
- `plan-spec/SKILL.md:89`: `## Draft rules` — 当前包含规则若干。
- `tasks-spec/SKILL.md:78`: `## Draft rules` — 当前包含规则若干。
- `analyze-spec/SKILL.md:83`: `## Draft rules` — 当前包含规则若干。
- `implement-spec/SKILL.md:68`: `## Draft rules` — 当前包含规则若干。
- `unittest-spec/SKILL.md:68`: `## Draft rules` — 当前包含规则若干。
- `integration-test-spec/SKILL.md:76`: `## Draft rules` — 当前包含规则若干。
- `research-spec/SKILL.md:131`: `## Draft rules` — 当前包含规则若干。
- `commit-spec/SKILL.md:81`: `## Draft rules` — 当前包含规则若干。
- `audit-spec/SKILL.md:86`: `## Draft rules` — 当前包含规则若干。

zh-cn 镜像对应章节：

- `zh-cn/constitution-spec/SKILL.md:71`: `## 起草规则`
- `zh-cn/documentation-spec/SKILL.md:80`: `## 起草规则`
- `zh-cn/specify-spec/SKILL.md:80`: `## 起草规则`
- `zh-cn/clarify-spec/SKILL.md:84`: `## 起草规则`
- `zh-cn/plan-spec/SKILL.md:89`: `## 起草规则`
- `zh-cn/tasks-spec/SKILL.md:78`: `## 起草规则`
- `zh-cn/analyze-spec/SKILL.md:83`: `## 起草规则`
- `zh-cn/implement-spec/SKILL.md:68`: `## 起草规则`
- `zh-cn/unittest-spec/SKILL.md:68`: `## 起草规则`
- `zh-cn/integration-test-spec/SKILL.md:76`: `## 起草规则`
- `zh-cn/research-spec/SKILL.md:130`: `## 起草规则`
- `zh-cn/commit-spec/SKILL.md:83`: `## 起草规则`
- `zh-cn/audit-spec/SKILL.md:87`: `## 起草规则`

### Existing logic

本 feature 不涉及跨模块调用流程。所有变更都是向独立的 Markdown 章节追加一条文本规则，不存在运行时依赖或数据流。

### Existing data shapes

SKILL.md 文件为纯 Markdown，无结构化 schema。现有 Draft rules 条目格式为：

```
- **<规则名>。** <规则正文，1-3 句话。>
```

新条目须遵循同一格式（见 `specify-spec/SKILL.md:81-85`）。

---

## Recommended implementation (HOW)

向每个受影响 SKILL.md 的 `## Draft rules` / `## 起草规则` 章节末尾（在 `## Handoff` / `## 交接建议` 之前）追加一条新规则。

**英文版规则文本（13 个文件统一使用）：**

```
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document. Use ASCII equivalents instead: `->` not `->` (Unicode arrow), `...` not `...` (ellipsis character), straight `"` not curly quotes, `-` not em-dash. Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content. Code blocks and Mermaid diagrams are exempt.
```

**zh-cn 版规则文本（13 个文件统一使用）：**

```
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号。请使用 ASCII 等价形式：`->` 代替 Unicode 箭头、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。
```

---

## Risks & assumptions

- **假设 1：** `templates/` 下的 Markdown 模板为参考文档而非 Agent 行为指令，因此不在本次修改范围内。如果后续决策将模板也视为 Agent 指令，则需补充修改对应模板文件。
- **假设 2：** `zh-cn/` 镜像与英文版的行号可能存在轻微偏差（已通过 grep 验证主要位置一致），但每个文件的实际追加操作应以 `## Handoff` / `## 交接建议` 段落标题为定位锚点，而非依赖固定行号。
- **风险 1：** 如果未来某个 skill 确实需要在其输出中使用 Unicode 符号（例如数学公式），该规则的豁免条款需要相应扩展。当前豁免仅覆盖代码块、Mermaid 图表与 zh-cn CJK 字符。

---

## Open questions / TODOs

None identified.
