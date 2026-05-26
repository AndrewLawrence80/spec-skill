---
name: explore-spec
description: >-
    对陌生代码库进行广度优先探索，在没有任何 docs、spec 或 constitution 锚点时，将轻量探索报告写入 `.speckit/memory/exploration.md`。当用户说"explore this repo / orient me to this codebase / what is this project / I have no docs yet / survey the workspace before we start"时使用。在冷启动仓库时作为第一步调用，或在运行 documentation-spec、research-spec、specify-spec、constitution-spec 之前需要快速结构快照时调用。
version: 0.1.0
phase: cross-cutting
---

# explore-spec

生成 `.speckit/memory/exploration.md`：对陌生代码库进行单文件、广度优先的结构快照。本 skill 有意比 `documentation-spec` 更轻量 - 不追踪端到端流程，不为每个入口点生成 Mermaid 图，也不产出完整的 `docs/` 目录。其目的是在尚无任何锚点工件时，为所有下游 skill 提供足够的定向信息以继续工作。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 是横切型探索步骤，可在其他工件尚不存在时随时调用，用于对代码库进行结构性定向。

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

- **Explore** - 在没有 docs 或锚点工件时，对陌生代码库进行探索并写入 `.speckit/memory/exploration.md`。
- **Research** - 对比当前项目与外部先例，并评估技术选型。
- **Commit** - 版本控制 checkpoint。
- **Audit** - 事后复盘审计。

## 何时使用

- 仓库没有 `docs/`、没有 `spec.md`、没有 `constitution.md`，也没有其他锚点工件。
- 用户希望在启动较重的 `documentation-spec` 工作流之前先获得快速结构快照。
- 新的贡献者或 agent 会话需要定向，但不想读取整个代码库。
- 预调研摄取：`research-spec` 需要本地上下文，但 `docs/` 尚不存在。
- 代码库发生了显著变更，需要在决定下一步运行哪个 skill 之前快速重新定向。

## 输入

- **必需：** 代码库本身（目录树、源文件、依赖清单）。
- **可选：**
    - `README.md` 或已存在的顶层文档文件。
    - `.speckit/memory/constitution.md`（若存在，用于术语对齐）。
    - 用户提供的聚焦提示（例如"关注 API 层""跳过测试目录"）。

## 输出

- `.speckit/memory/exploration.md`：单文件轻量探索报告。若 `.speckit/memory/` 不存在，本 skill 负责创建该目录。
- 若探索过程中发现关键歧义（例如多个相互冲突的入口点且无明确主入口、语言/框架检测模糊），则输出一条合并后的澄清消息。

## 守卫：当 docs 已存在时

在开始探索之前，检查 `docs/overview.md` 是否存在且看起来是最新的（非空、引用了近期 commit 或日期）。若是，向用户说明这一情况，并建议直接读取 `docs/overview.md`，而不是重新运行探索。不要用较轻的 `exploration.md` 摘要覆盖当前的 `docs/` 文档集。

## 工作流

1. **检查现有锚点工件。** 查找 `docs/overview.md`、`.speckit/memory/exploration.md`、`README.md` 与 `.speckit/memory/constitution.md`。若 `docs/overview.md` 存在且为最新，应用上方守卫并停止，除非用户明确要求重新探索。
2. **加载** `templates/exploration.md`，在开始扫描前了解所需章节。
3. **扫描目录树。** 列出顶层与二级目录，识别主要源码目录、测试目录、配置文件与依赖清单（例如 `package.json`、`go.mod`、`Cargo.toml`、`pyproject.toml`、`pom.xml`、`requirements.txt`）。
4. **检测主要语言与框架。** 从文件扩展名、依赖清单与构建文件推断，记录主要语言以及重要框架或运行时。
5. **概述各模块。** 对每个顶层源码模块或包，写一段话描述其职责以及读者需要关注的关键点（例如并发模型、外部耦合、已知复杂度）。不枚举每个函数或 API；聚焦于模块在整体系统中的角色。
6. **记录空白与未知项。** 记录广度优先扫描无法确定的内容：缺失的清单、模糊的模块边界、未文档化的目录，或需要更深入调查的区域。
7. **填充** 已加载的模板，用第 3-6 步的发现填写各章节。
8. **若 `.speckit/memory/` 不存在则创建**，然后写入 `.speckit/memory/exploration.md`。
9. **报告** 输出路径，若存在关键空白则输出一条合并后的澄清消息。

## 质量清单

- [ ] 目录布局章节反映实际的顶层与二级结构。
- [ ] 主要语言与框架从证据（文件扩展名、清单）推断，而非假设。
- [ ] 每个模块有一段 outline，描述其职责与关键关注点；不含 API 列表或完整流程追踪。
- [ ] 空白与未知项章节存在；若无未知项，写"None identified."。
- [ ] 推荐下一步具体且与仓库实际状态匹配。
- [ ] 输出不复现 `documentation-spec` 的深度（不含 API 列表、完整流程追踪、每个入口点的 Mermaid 图）。
- [ ] 若 `docs/overview.md` 已存在且为最新，已应用守卫并通知用户。

## 起草规则

- **No invented facts.** 关于代码库的每条陈述都必须基于观察到的文件、目录或清单条目。证据缺失时写"unknown"或记录在空白与未知项中；不得猜测。
- **广度优先，不深入。** 本 skill 扫描代码库的形状，而非每个模块的内部实现。在每个模块边界处停止；不追踪跨模块流程。
- **单次自主完成。** 在一次扫描中完成探索，无需逐目录向用户确认。在最后用一条合并消息暴露所有歧义。
- **覆写策略。** 若 `.speckit/memory/exploration.md` 已存在，用新发现覆写它，不追加。若能读取旧文件，在新文件头部记录上次探索日期。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Escalation.** 若关键歧义无法仅从代码库解决（例如项目没有清单文件且没有可识别的源码结构），停止并用一条合并消息向用户提问。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- 探索完成，`docs/` 不存在：建议运行 **`documentation-spec`** 生成完整全局视图，或先运行 **`constitution-spec`** 建立项目原则。
- 探索完成，`docs/` 存在但已过期：建议运行 **`documentation-spec`** 刷新文档。
- 探索完成，用户有 feature 需求：建议运行 **`specify-spec`**，以 `exploration.md` 作为 `docs/overview.md` 的轻量替代。
- 探索完成，用户需要技术调研：建议运行 **`research-spec`**，将 `exploration.md` 作为本地上下文传入。
- `commit-spec` 可随时调用，将 `exploration.md` checkpoint 到版本控制。
- **重跑策略：** 当仓库结构发生显著变化（新增顶层模块、主要语言变更、重要依赖增删）且 `docs/` 尚未重新生成时，重跑 `explore-spec`。
