---
name: plan-spec
description: >-
    将已澄清的 `spec.md` 转化为技术实现计划：覆盖 stack、interfaces、data 与 research，使 `tasks-spec` 能将其分解为可执行步骤。当用户说“plan the implementation / design how we'll build this / choose the stack for this feature / produce a technical plan”时使用。应在 `spec.md` 已澄清后、`tasks-spec` 之前调用。
version: 0.2.0
phase: 5
---

# plan-spec

生成 feature 级技术计划：`plan.md`（主设计文档）以及配套的 `data-model.md` 与 `research.md`。这是 “HOW” 所在：技术栈、模块边界、接口、数据形状、迁移步骤。

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

## 输入

- **必需：** `specs/<feature-slug>/spec.md`（已澄清）。
- **用于落地设计的必需输入：** `docs/overview.md`、`docs/module.md` 与 `docs/logic/` 下的流文档。缺少全局 docs 时，plan 容易只做局部最优并忽略横切约束；若 `docs/` 为空，需显式提示风险，并询问用户是否先运行 `documentation-spec`，或在仅有局部视图的前提下继续。
- **可选：** `.speckit/memory/constitution.md`；既有 `plan.md`（用于修订）；团队既有标准/RFCs。

## 输出（位于 `specs/<feature-slug>/`）

- `plan.md`：叙述式设计与决策。
- `data-model.md`：实体、字段、关系与迁移。若 feature 不引入新实体，可在 `plan.md` 中用一句话说明并省略该文件。
- `research.md`：调研记录、备选方案、链接与引用。若无实质备选方案，可在 `plan.md` 中用一句话说明并省略该文件。

## 工作流

1. **阅读顺序：** 先读 `spec.md`，再读 `docs/`，最后（如存在）读 `.speckit/memory/constitution.md`；记录它们对设计施加的约束。
2. **加载模板**：将 `templates/` 下模板作为参考；在项目语境明确时可扩展、调整顺序或裁剪章节。
3. **决定技术栈与模块落点。** 对新组件需给出技术选型理由；对既有组件应遵循 `docs/module.md`，不得静默替换技术。
4. **应用 Simplicity gate。** 对每个新增 project/module/abstraction，在 `plan.md` 记录书面理由；理由薄弱则移除抽象。
5. **应用 Anti-abstraction gate。** 不得仅为“可测试性”引入 interfaces/factories/wrappers，除非存在第二个真实 consumer。
6. **校验 constitution 一致性。** 若存在 `.speckit/memory/constitution.md`，需逐条原则回应：已满足、延期或明确豁免，并给出理由。
7. **设计数据（可选）。** 用类型化实体、关系与迁移计划填充 `data-model.md`，并可追溯到 spec 的 FR。
8. **记录调研（可选）。** 在 `research.md` 中记录备选方案、选择理由、链接与引用。
9. **写入前自检**：对照质量清单验证草案。
10. **写入** 所有适用工件到 `specs/<feature-slug>/`。
11. **向用户汇报**：说明计划内容，并暴露仍未解析的开放问题。

## 质量清单

- [ ] 每个 plan 决策都可追溯到 `spec.md` 中某个 FR、NFR 或成功标准。
- [ ] 新组件的技术选型包含一句话理由。
- [ ] 既有组件的技术选择与 `docs/module.md` 一致。
- [ ] **Simplicity gate：** 任何新增 project/module/abstraction 都在 `plan.md` 中有书面正当化。
- [ ] **Anti-abstraction gate：** 不得出现“为测试而抽象”的过早 interfaces，除非存在第二个 consumer。
- [ ] **Constitution compliance：** 若存在 `.speckit/memory/constitution.md`，每条原则都被显式回应（满足/延期/豁免 + 理由）。
- [ ] 数据模型字段有类型；关系明确；迁移步骤在 `data-model.md` 中记录；若省略 `data-model.md`，`plan.md` 有一句话说明原因。

## 起草规则

- **No invented facts.** 严格基于既有代码库与用户答复；证据缺失且用户未答复时，在相关工件中插入 `[NEEDS CLARIFICATION: ...]` 并汇报。
- **Pragmatic inference.** 上下文明确时可做合理推断，但不得编造无法从代码落地的模块/服务/行为。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。

## 交接建议

- plan 完成：建议进入 **`tasks-spec`**。
- `commit-spec` 可随时调用，将 plan checkpoint 到版本控制。
- **重跑策略：** 若 plan 后续修改，需重跑 `tasks-spec` 与 `analyze-spec`。
