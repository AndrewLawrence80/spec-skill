# Implementation Plan: `plain-symbol-constraint`

> Spec: `specs/plain-symbol-constraint/spec.md` - Created: 2026-05-25

---

## Outline

本 feature 是纯文本追加操作：向 26 个 SKILL.md 文件（英文版 13 个、`zh-cn/` 镜像 13 个）的 `## Draft rules` / `## 起草规则` 章节末尾各追加一条新规则。所有 26 个文件的修改相互独立，不存在任何运行时依赖或执行顺序约束，可并行处理。

不引入任何新文件、新目录或新依赖。不修改模板文件、README 文件或任何非 SKILL.md 文件。

---

## High-level approach

- **FR-001 Plain-text symbols rule (EN)**: 在每个英文 `SKILL.md` 的 `## Draft rules` 章节末尾（`## Handoff` 节之前）追加规则条目，使用下方"规范文本"一节中定义的精确文本。
- **FR-002 Plain-text symbols rule (zh-cn)**: 在每个 `zh-cn/` `SKILL.md` 的 `## 起草规则` 章节末尾（`## 交接建议` 节之前）追加中文规则条目，使用下方"规范文本"一节中定义的精确中文文本。
- **FR-003 / FR-004 / FR-005 rule content**: 规范文本本身同时满足 FR-003（允许范围）、FR-004（ASCII 替换示例）、FR-005（代码块与 Mermaid 豁免）。不需要额外操作。
- **NFR-001 format compliance**: 规范文本严格遵循 `**加粗规则名。** 规则正文。` 格式，且不超过 3 句话（与现有条目风格一致）。
- **NFR-002 text consistency**: 通过"规范文本"一节定义唯一真实来源，所有英文文件使用同一文本，所有 zh-cn 文件使用同一文本，实现方阶段逐字复制，不得自行措辞。

---

## Canonical rule text

> 此处定义的文本为唯一真实来源（single source of truth）。实现阶段必须逐字使用，不得增减任何字符。

**English rule** (用于全部 13 个英文 `SKILL.md`)：

```
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.
```

**zh-cn rule** (用于全部 13 个 `zh-cn/` `SKILL.md`)：

```
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。
```

---

## Affected modules

所有 26 个 SKILL.md 文件均为 `extend` 操作（追加一条规则，现有内容不变）。

### English files

| 文件路径                         | `## Draft rules` 行 | `## Handoff` 行 | 操作   |
| -------------------------------- | ------------------- | --------------- | ------ |
| `constitution-spec/SKILL.md`     | 71                  | 79              | extend |
| `documentation-spec/SKILL.md`    | 80                  | 89              | extend |
| `specify-spec/SKILL.md`          | 80                  | 88              | extend |
| `clarify-spec/SKILL.md`          | 84                  | 92              | extend |
| `plan-spec/SKILL.md`             | 89                  | 97              | extend |
| `tasks-spec/SKILL.md`            | 78                  | 85              | extend |
| `analyze-spec/SKILL.md`          | 83                  | 90              | extend |
| `implement-spec/SKILL.md`        | 68                  | 77              | extend |
| `unittest-spec/SKILL.md`         | 68                  | 75              | extend |
| `integration-test-spec/SKILL.md` | 76                  | 83              | extend |
| `research-spec/SKILL.md`         | 131                 | 142             | extend |
| `commit-spec/SKILL.md`           | 81                  | 89              | extend |
| `audit-spec/SKILL.md`            | 86                  | 94              | extend |

### zh-cn files

| 文件路径                               | `## 起草规则` 行 | `## 交接建议` 行 | 操作   |
| -------------------------------------- | ---------------- | ---------------- | ------ |
| `zh-cn/constitution-spec/SKILL.md`     | 71               | 79               | extend |
| `zh-cn/documentation-spec/SKILL.md`    | 80               | 89               | extend |
| `zh-cn/specify-spec/SKILL.md`          | 80               | 88               | extend |
| `zh-cn/clarify-spec/SKILL.md`          | 84               | 92               | extend |
| `zh-cn/plan-spec/SKILL.md`             | 89               | 97               | extend |
| `zh-cn/tasks-spec/SKILL.md`            | 78               | 85               | extend |
| `zh-cn/analyze-spec/SKILL.md`          | 83               | 90               | extend |
| `zh-cn/implement-spec/SKILL.md`        | 68               | 77               | extend |
| `zh-cn/unittest-spec/SKILL.md`         | 68               | 75               | extend |
| `zh-cn/integration-test-spec/SKILL.md` | 76               | 83               | extend |
| `zh-cn/research-spec/SKILL.md`         | 130              | 141              | extend |
| `zh-cn/commit-spec/SKILL.md`           | 83               | 91               | extend |
| `zh-cn/audit-spec/SKILL.md`            | 87               | 95               | extend |

---

## Insertion strategy

**定位锚点**：`## Handoff` / `## 交接建议` 行是每个文件中唯一且稳定的分隔标志。实现时以该行为锚点，将新规则条目插入其正上方（即 Draft rules 最后一条与 Handoff 标题之间）。

**插入格式**：新规则条目前后各加一空行，以保持章节间距一致（与现有最后一条 Draft rules 条目之间有一个空行，条目本身不含尾部空行）。实际观察到的格式是：最后一条 Draft rules 条目结束后直接接 `## Handoff` 标题，中间有一个空行。因此正确的插入为：

```
<最后一条现有 Draft rules 条目>
- **Plain-text symbols only.** ...

## Handoff
```

即：在现有最后一条条目结束的换行符之后追加新条目（含一前置换行符），再保留原有的一个空行后接 `## Handoff`。

**实现方法**：使用 `replace_string_in_file`，以每个文件中 `## Handoff` / `## 交接建议` 前的最后一条现有 Draft rules 末尾文字 + `\n\n## Handoff` 作为 `oldString`，替换为相同末尾文字 + 新规则条目 + `\n\n## Handoff`。这样可以保证不误匹配其他位置。

---

## Data

No data model changes. SKILL.md 文件为纯 Markdown，无结构化 schema。

---

## Simplicity gate

无新增 project、module 或 abstraction。本 feature 是纯追加文本操作，不引入任何新抽象层。Simplicity gate: pass。

---

## Anti-abstraction gate

无新增 interface、factory 或 wrapper。Anti-abstraction gate: pass。

---

## Constitution compliance

n/a - no constitution.md present.

---

## Open questions

None identified.
