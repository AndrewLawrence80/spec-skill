---
name: tasks-spec
description: >-
    将已核准的 `plan.md` 分解为有序、文件精确的任务列表（`tasks.md`），便于人类或 agent 执行。当用户说“break down the plan / generate implementation tasks / make a task list / translate this design into actionable steps”时使用。应在 `plan-spec` 之后、`analyze-spec` 或 `implement-spec` 之前调用。
version: 0.2.0
phase: 6
---

# tasks-spec

生成 `specs/<feature-slug>/tasks.md`：一个按阶段划分、具备依赖关系、且可执行的小粒度任务清单。每个任务必须精确声明其触达文件、可追溯性要求，并用 `[P]` 标记可与兄弟任务并行执行的任务。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 6 步。

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

- 目标 feature 已存在经核准的 `plan.md`。
- 用户希望得到可驱动实现的逐步可执行清单。
- plan 被修订后，需要重新生成 task list 以反映新的架构决策。

## 输入

- **必需：** `specs/<feature-slug>/plan.md`。
- **可选：** `specs/<feature-slug>/data-model.md`（仅当 feature 引入或修改实体）。
- **强烈建议：** `specs/<feature-slug>/spec.md` 与高层 `docs/`（用于确保对 FR/NFR 的可追溯性）。
- **可选：** `.speckit/memory/constitution.md`（治理对齐）；既有 `tasks.md`（用于修订）。

## 输出

- 分阶段、依赖清晰的任务列表：`specs/<feature-slug>/tasks.md`。

## 工作流

1. **分析前置条件。** 读取 `plan.md` 及其引用的设计/spec 文档。
2. **确定任务顺序。** 默认沿用项目既有顺序；若无约定，则采用自底向上的依赖模型：
    - **数据模型与类型：** 依赖最少的上游定义。
    - **工具与算法：** core logic 依赖的共享函数。
    - **核心实现：** 满足功能需求的模块与组件。
    - **接线与集成：** 将 core modules 接入现有系统。
    - **打磨与收尾：** 测试、文档更新、lint/format。
3. **起草任务。** 加载 `templates/tasks.md` 并填充时间线。每个任务必须显式声明：
    - **Task ID：** 便于依赖映射。
    - **Description：** 目标的简洁描述。
    - **Target files：** 精确到创建/修改路径。
    - **Traceability：** 关联上游需求（如 `FR-###`、`NFR-###`）、具名 API/interface，或 `data-model` 实体（适用时）。
    - **Dependencies：** 依赖的 Task IDs。
    - **Parallelization：** 若与兄弟任务无顺序依赖，追加 `[P]`。
    - **Implementation guidance：** 提供伪代码或引用以减少执行歧义。
4. **校验测试顺序。** 若选择 TDD 对齐，针对某行为/接口的测试任务应先于其实现任务。
5. **暴露歧义。** 若 plan 对某一步缺少可执行细节，记录所有开放问题并向用户提交以便解析。

## 质量清单

- [ ] **粒度：** 不允许任务过于笼统（例如“实现 feature”）；任务必须原子化且可单独评审。
- [ ] **文件精确：** 每个任务都显式声明目标文件路径。
- [ ] **可追溯性：** 每个任务都能映射回 FR/NFR、具名 API/interface、`data-model` 实体（适用时），或合理的 setup/polish 需求。
- [ ] **依赖准确：** 依赖的 Task IDs 明确，且 `[P]` 标签正确标识可并行工作。
- [ ] **文档更新：** polish 阶段包含专门任务，用于将变更反映到 `docs/*.md`。

## 起草规则

- **No invented facts.** 严格基于 `plan.md` 与既有代码库；证据缺失处插入 `[NEEDS CLARIFICATION: <issue>]`。
- **Pragmatic inference.** 可基于既有模式做合理结构推断，但不得虚构外部服务或复杂缺失行为。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- 告知用户 tasks 已就绪，并建议调用 **`analyze-spec`**，交叉校验 spec/plan/tasks 的一致性。
- 仅在 analysis 通过后再进入实现（`implement-spec`）。
- `commit-spec` 可随时调用，将任务列表 checkpoint 到版本控制。
- **重跑策略：** 若 `tasks.md` 后续修改，需重跑 `analyze-spec`。
