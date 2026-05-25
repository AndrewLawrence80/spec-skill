---
name: research-spec
description: >-
    对某个 feature、当前实现切片或项目级技术问题进行调研，并产出有依据的 `research.md`，通过外部证据以及“当前项目 vs 开源实现”的直接对比来支持技术选型。当用户说“research this feature / find precedents for this spec / compare our project with open source / survey architecture options / evaluate the stack choices”时使用。它是可在开发循环任意阶段调用的横切 skill，用于为设计、技术栈、架构或实现决策补充更强证据。
version: 0.2.0
phase: cross-cutting
---

# research-spec

为 feature 级决策或项目级决策生成有依据的 research 工件。本 skill 不替代 `plan-spec`；它负责在流程任意阶段为技术选型、开源对标、架构取舍与方案修订提供证据基础。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 是横切型 research 步骤，可在任何需要更强技术依据的时候调用。

1. **Constitution** - 项目级原则、规则与质量标准。
2. **Documentation** - 代码库全局视图。
3. **Specification** - feature spec（目标行为 + 现状实现）。
4. **Clarification** - 解析 spec 中的歧义与问题。
5. **Research** - 收集外部证据、先例与比较分析，用来支持或挑战当前技术与架构选择。
6. **Planning** - 设计与实现方案。
7. **Tasks** - 有序、文件精确的任务列表。
8. **Analysis** - 一致性与漂移校验。
9. **Implementation** - 代码实现。
10. **Unit test** - 单元验证。
11. **Integration test** - 跨模块验证。

横切步骤：

- **Research** - 对比当前项目与外部先例，并评估技术选型。
- **Commit** - 版本控制 checkpoint。
- **Audit** - 事后复盘审计。

## 何时使用

- 需要为某个技术、架构、框架、库、协议、存储或部署选择提供依据。
- 在确定方向或修订方向前，需要将当前项目与成熟开源实现进行对比。
- feature 所处领域的实现选择不明显、变化快、或影响面较大。
- 既有 `spec.md`、`plan.md`、`tasks.md` 或某段实现因为假设薄弱、过时或存在争议，需要重新审视。
- 用户希望进行基于先例的调研：开源系统对比、前沿论文、参考架构、或技术栈比较。

## 输入

- **必需：** 足以定义调研目标的上下文。优先使用 `specs/<feature-slug>/spec.md`；若处于后续阶段，也可用 `plan.md`、`tasks.md`、当前实现切片以及明确的用户问题作为锚点。
- **强烈建议：** `docs/overview.md`、`docs/module.md` 以及相关 `docs/logic/*.md`，确保调研是贴合当前系统，而不是泛泛领域调研。
- **可选：** `.speckit/memory/constitution.md`、现有 `plan.md`、`tasks.md`、现有 `research.md`、实现说明，以及预算、部署模式、合规要求、偏好语言、许可证限制、性能目标、运行环境等约束。
- **可选外部输入：** 用户提供的链接、issue 讨论、RFC、benchmark、博客、论文、标准或竞品资料。

## 输出

- **Spec 级 research：** `specs/<feature-slug>/research.md`，用于 feature 范围或决策范围的调研。
- **Project 级 research：** `docs/research/<topic-slug>.md`，用于更宽泛的架构、平台或系统级调研；若用户明确给出其他输出路径，则使用用户指定路径。
- 当现有上下文不足以严肃开展调研时，输出一条合并后的澄清问题消息。

## 模板选择

根据问题范围选择模板：

- **`templates/spec-level-research.md`**：当调研聚焦于某个 feature、某个 spec 目录、某段存在争议的实现切片，或某个 feature 内部的技术选型时使用。
- **`templates/project-level-research.md`**：当调研范围超过单一 feature，例如平台选型、系统架构、横切基础设施、跨模块共性模式，或全项目与开源系统的对比时使用。

不要把 project 级问题硬塞进 spec 级模板，反之亦然。若用户提出混合问题，可拆分为多个明确分段，或先产出主范围报告并注明溢出的后续工作。

## 调研范围

在与当前 feature 或决策相关时，输出应覆盖以下类别：

1. **Popular GitHub repositories** - 解决相近问题、且具有高信号或广泛使用度的开源实现。
2. **Cutting-edge research papers** - 会实质影响设计空间的近期论文、预印本、标准或正式技术文稿。
3. **Mature architectures and solutions** - 生产级模式、参考架构、经验证工作流，以及已知运维权衡。
4. **Technology-stack evaluation** - 基于当前项目真实需求，对可行技术栈、框架、库或平台选项进行比较评估。
5. **Current-project vs open-source comparison** - 直接比较当前项目的架构、约束与实现形态，与相关开源系统的异同。

若某一类对当前问题不相关，必须在 `research.md` 中明确写出“不相关”及其原因。

## 工作流

1. **在当前循环阶段锚定问题。** 若存在 `spec.md` 则优先阅读；否则读取最权威的现有工件（`plan.md`、`tasks.md` 或当前实现切片）以及用户问题。提取真正需要证据支持的需求、约束、争议假设与开放问题。
2. **判断范围。** 确定调研主要是 spec 级还是 project 级，并先选定 `research-spec/templates/` 中匹配的模板。
3. **加载本地上下文。** 阅读相关 `docs/`、实现说明与触达代码路径，确保调研结论与真实架构兼容。
4. **定义调研问题。** 将现有工件转化为一组具体问题，例如：技术栈选择、协议适配、存储策略、扩展方式、性能与延迟、部署模式、替换现有子系统等。
5. **加载所选模板。** 以选中模板为结构基线；在项目确实需要时可扩展或裁剪局部内容，但必填章节应保留，除非用户明确允许删除。
6. **调研 GitHub 仓库。** 找到可比仓库，并记录：
    - 它解决什么问题，与当前 feature 或项目有多接近。
    - 它为何可信：采用度、维护活跃度、生态影响力或生产使用情况。
    - 对当前项目有价值的核心架构思路、权衡、算法与失败模式。
    - 哪些架构点值得借鉴，哪些应明确拒绝。
    - 与当前项目相关的许可证或运维约束。
7. **调研论文与正式参考。** 收集会实质影响设计的论文、规范、benchmark 或标准；总结其关键结论、前提假设，以及这些假设是否符合当前场景。
8. **调研成熟架构。** 从可信的生产系统、厂商文档或成熟工程文章中提取参考架构，总结其中的不变量、权衡与失败模式，而不是照抄表面结构。
9. **对比当前项目与开源实现。** 对最相关的仓库进行显式比较：
    - 当前项目的架构、模块边界与约束。
    - 开源实现做法有何不同。
    - 哪些差异是真正有信号的，哪些只是偶然差异。
    - 哪些内容可以直接采用、谨慎适配、或应拒绝并说明理由。
10. **评估候选技术栈。** 依据当前项目需求、约束、现有代码形态与团队适配度，对现实可行的方案进行比较；当存在多个可行选项时，优先使用紧凑的对比矩阵。
11. **转化为决策支持。** 对每个调研主题，明确说明它会如何改变或约束当前讨论中的工件：`spec.md`、`plan.md`、`tasks.md`、实现，或更高层的项目架构。不能缩小决策空间的调研就是低价值调研。
12. **保留未知项。** 若关键证据缺失或相互矛盾，用 `[NEEDS CLARIFICATION: ...]` 或显式的 open research items 记录，不要强行得出虚假结论。
13. **写出报告。** 将结果写入与范围匹配的输出路径，并向用户报告：主推荐方案、最强被否决备选、与最接近开源先例的主要差异，以及剩余风险。

## `research.md` 的预期结构

最终工件至少应包含：

- **Research questions / decision areas**：从当前工件集合中提炼出的调研问题。
- **Popular GitHub repositories**：附链接、相关性说明与经验结论。
- **Current-project vs open-source comparison**：当前项目与开源先例的相似点、差异点与采用建议。
- **Cutting-edge papers and formal references**：附日期、核心结论与适用性说明。
- **Mature architectures and solutions**：附运维与工程权衡。
- **Technology-stack evaluation**：针对当前项目需求的技术栈比较。
- **Decision impact**：说明 `spec.md`、`plan.md`、`tasks.md`、实现或项目架构中哪些选择被支持、削弱或排除。
- **Open research items**：尚未解决的问题。

project 级模板更强调横切模块、平台约束与架构分块；spec 级模板更强调单一 feature、其现状实现触点，以及对 `spec.md`、`plan.md`、`tasks.md` 或实现的直接影响。

## 质量清单

- [ ] 每个调研章节都能回溯到当前工件中的具体需求、约束或开放问题。
- [ ] 外部结论都附带足够信息，便于后续复核：标题、仓库名或论文名，以及可用链接。
- [ ] GitHub 仓库分析关注架构相关性，而不是做“流行度列表”。
- [ ] 若条件允许，至少有一处“当前项目 vs 最接近开源实现”的直接比较。
- [ ] 论文或正式参考必须注明适用性，不得堆砌看起来很强但与问题无关的资料。
- [ ] 成熟架构部分必须写出运维权衡，而不是停留在图示或口号。
- [ ] 当存在多个现实可行选项时，技术栈评估至少比较两个方案。
- [ ] 输出必须明确说明：哪些证据支持当前推荐，哪些证据削弱它。
- [ ] 未知项必须以 `[NEEDS CLARIFICATION: ...]` 或 `Open Research Items` 保留下来，而不是被静默猜掉。
- [ ] 选用的模板与问题范围匹配，输出路径也与该范围匹配。

## 起草规则

- **No invented facts.** 不得编造仓库热度、论文结论、benchmark 结果、采用情况或实现细节；不确定就明确写“不确定”。
- **Ground everything in the current project.** 这不是泛泛的市场调研；每个结论都必须服务于当前 feature、当前工件或当前实现决策。
- **Prefer primary sources.** 优先使用原始仓库、论文、标准、官方文档、benchmark 与源代码，而不是二手总结。
- **Separate evidence from recommendation.** 清楚区分哪些是观察、哪些是推断、哪些是建议。
- **Compare before you prescribe.** 在给出技术栈或架构建议前，先显式比较当前项目与最强开源先例，而不是悬空下结论。
- **Use the local research templates first.** 优先使用 `research-spec/templates/spec-level-research.md` 与 `research-spec/templates/project-level-research.md`。
- **Templates are references, not religion.** 尊重所选模板的意图与必填章节；必要时可轻微重排或扩展，但不要无故删除关键信息。
- **Escalation.** 若当前 feature 或决策范围过于模糊，无法严肃开展调研，应停止并用一条合并消息向用户提问，而不是产出空泛调研。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- 若 research 支持新的或修订后的设计方向，建议进入 **`plan-spec`**。
- 若 research 暴露了尚未澄清的产品问题，建议进入 **`clarify-spec`**。
- 若 research 改变了执行顺序或实现拆解，建议重跑 **`tasks-spec`**。
- 若 research 与当前实现相冲突，建议先更新上游工件，再回到 **`implement-spec`**。
- `commit-spec` 可随时调用，将 `research.md` checkpoint 到版本控制。
- **重跑策略：** 若 `spec.md`、`plan.md`、`tasks.md` 或实现引入了新的有争议技术/架构决策，应针对受影响的决策区域重跑 `research-spec`。
