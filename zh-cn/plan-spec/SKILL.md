---
name: plan-spec
description: >-
    将已澄清的 `spec.md` 转化为技术实现计划：覆盖 stack、interfaces、data 与 research，使 `tasks-spec` 能将其分解为可执行步骤。当用户说“plan the implementation / design how we'll build this / choose the stack for this feature / produce a technical plan”时使用。应在 `spec.md` 已澄清后、`tasks-spec` 之前调用。
version: 0.2.0
phase: 5
---

# plan-spec

生成 feature 级或 project 级技术计划。对于 feature 工作，产出 `plan.md`（主设计文档）及配套的 `data-model.md`、`research.md`；对于从零开始的项目或跨 feature 的体系设计，产出 project-level plan，作为全局实现指导。这里承载 “HOW”：技术栈、模块边界、接口、数据形状、迁移步骤，以及自底向上的构建顺序。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 5 步。

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

- 已存在澄清后的 `spec.md`。
- 用户希望在实现前先获得清晰、可落地的技术设计。
- spec 变更或 analyzer 提示漂移后，需要修订既有 plan。
- 用户需要一个面向从零构建系统的 project-level 实施指南，或需要把多个 feature block 组织成一个完整系统。

## 输入

- **必需：** `specs/<feature-slug>/spec.md`（已澄清）。
- **用于落地设计的必需输入：** `docs/overview.md`、`docs/module.md` 与 `docs/logic/` 下的流文档。缺少全局 docs 时，plan 容易只做局部最优并忽略横切约束；若 `docs/` 为空，需显式提示风险，并询问用户是否先运行 `documentation-spec`，或在仅有局部视图的前提下继续。
- **可选：** `.speckit/memory/constitution.md`；既有 `plan.md`（用于修订）；团队既有标准/RFCs。

对于 project-level planning，锚点可以是项目 brief、已澄清的体系问题、project-level research 工件，或一组需要组装成完整系统的 feature specs。若不存在可落地的 project-level 输入，应停止并向用户索取。

## 输出

- **Feature-level plan：** `specs/<feature-slug>/plan.md`，用于记录叙述式设计与决策。
- **Feature-level 可选配套：** `specs/<feature-slug>/data-model.md` 用于实体、字段、关系与迁移；`specs/<feature-slug>/research.md` 用于调研记录、备选方案、链接与引用。若不需要，可在 `plan.md` 中用一句话说明并省略。
- **Project-level plan：** `docs/plans/<topic-slug>.md`，作为全局实现指南，按自底向上的顺序组织系统建设：先基础数据定义与接口，再按 block 构建，最后系统集成。

## 模板选择

根据 planning scope 选择模板：

- **`templates/plan.md`** - 当 plan 绑定到单个 feature spec 目录，并将驱动 `specs/<feature-slug>/` 下的 `tasks-spec` 时使用。
- **`templates/project-level-plan.md`** - 当 plan 超出单个 feature：新系统、greenfield project、平台级切片，或需要协调多个 specs 的多 block 实施路线图时使用。

不要把 project-level 的实施路线图硬塞进 feature-level 模板。若问题混合了两种 scope，应先写 project-level plan，并明确指出后续由哪些 feature specs 或 `plan.md` 细化各 block。

## 工作流

1. **先确定 scope 与锚点。** 规划 feature 时读取 `spec.md`；规划更大的系统时读取项目 brief、project-level research、相关 feature specs 与 `docs/`。记录 plan 必须满足的要求与约束。
2. **加载匹配模板**：将 `templates/` 下对应模板作为参考；在项目语境明确时可扩展、调整顺序或裁剪章节。
3. **决定技术栈与模块落点。** 对新组件需给出技术选型理由；对既有组件应遵循 `docs/module.md`，不得静默替换技术。
4. **设计构建顺序。** 对 project-level plan，按自底向上的顺序组织实现：基础数据定义、存储契约或数据库接口、helper algorithms 或 shared utilities、再按相关 specs 构建各 block，最后做系统级集成。
5. **应用 Simplicity gate。** 对每个新增 project/module/abstraction，在 plan 中记录书面理由；理由薄弱则移除抽象。
6. **应用 Anti-abstraction gate。** 不得仅为“可测试性”引入 interfaces/factories/wrappers，除非存在第二个真实 consumer。
7. **校验 constitution 一致性。** 若存在 `.speckit/memory/constitution.md`，需逐条原则回应：已满足、延期或明确豁免，并给出理由。
8. **设计数据（可选）。** 对 feature plan，用类型化实体、关系与迁移计划填充 `data-model.md`，并可追溯到 spec 的 FR。对 project-level plan，在主文档中概述基础数据定义，并指向更细化的数据工件（如存在）。
9. **记录调研（可选）。** 在 `research.md` 或关联的 project-level research 工件中记录备选方案、选择理由、链接与引用。
10. **写入前自检**：对照质量清单验证草案。
11. **写入** 所有适用工件到对应 scope 的路径。
12. **向用户汇报**：说明计划内容，并暴露仍未解析的开放问题。

## 质量清单

- [ ] 每个 plan 决策都可追溯到 `spec.md` 中某个 FR、NFR 或成功标准。
- [ ] 新组件的技术选型包含一句话理由。
- [ ] 既有组件的技术选择与 `docs/module.md` 一致。
- [ ] Project-level plan 的顺序符合自底向上：先基础，再 feature blocks，最后集成。
- [ ] **Simplicity gate：** 任何新增 project/module/abstraction 都在 `plan.md` 中有书面正当化。
- [ ] **Anti-abstraction gate：** 不得出现“为测试而抽象”的过早 interfaces，除非存在第二个 consumer。
- [ ] **Constitution compliance：** 若存在 `.speckit/memory/constitution.md`，每条原则都被显式回应（满足/延期/豁免 + 理由）。
- [ ] 数据模型字段有类型；关系明确；迁移步骤在 `data-model.md` 中记录；若省略 `data-model.md`，`plan.md` 有一句话说明原因。

## 起草规则

- **No invented facts.** 严格基于既有代码库与用户答复；证据缺失且用户未答复时，在相关工件中插入 `[NEEDS CLARIFICATION: ...]` 并汇报。
- **Pragmatic inference.** 上下文明确时可做合理推断，但不得编造无法从代码落地的模块/服务/行为。
- **Scope discipline.** 单个 spec 用 feature-level 模板；greenfield 或 cross-feature 系统计划用 project-level 模板。不要把两种 scope 混成一个模糊工件。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。

## 交接建议

- plan 完成：建议进入 **`tasks-spec`**。
- `commit-spec` 可随时调用，将 plan checkpoint 到版本控制。
- **重跑策略：** 若 plan 后续修改，需重跑 `tasks-spec` 与 `analyze-spec`。
