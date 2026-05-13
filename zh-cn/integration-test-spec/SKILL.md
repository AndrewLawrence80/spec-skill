---
name: integration-test-spec
description: >-
    增加或更新集成测试：验证多个模块协同工作，并尽量使用真实（或足够逼真）的依赖。当用户说“add integration tests / test the modules together / end-to-end test this feature / verify the API end-to-end”时使用。通常在 `implement-spec` 完成集成阶段后调用；也可与 `unittest-spec` 并行（两者需要时）。
version: 0.2.0
phase: 10
---

# integration-test-spec

在 **plan 与文档集声明的边界** 上编写集成测试，而不是在任意切片上“随便测一点”。优先识别并遵循项目既有测试框架与风格；仅当项目尚无约定时，才退回到 `templates/` 下的 polyglot 参考。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 10 步。

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

- feature 需要多个模块协作，必须在边界处做跨模块验证。
- 新增 API 或链接，需要端到端的集成验证。
- bug 暗示缺失关键的集成场景。

## 输入

- **必需：** 源代码。
- **用于边界正确性的必需输入：** `specs/<feature-slug>/plan.md`（声明测试边界）、`docs/module.md` 与 `docs/logic/*.md`（保证测试边界与系统真实模块边界一致，而不是只基于 feature 的局部视图）。
- **可选：** `specs/<feature-slug>/data-model.md`（实体与 fixtures），当 feature 引入或修改数据时使用。
- **可选：** `.speckit/memory/constitution.md`（例如“所有集成测试必须跑真实数据库”）。

## 输出

- 项目测试目录下的集成测试文件（目录路径需从仓库约定中探测，不能假设）。
- `specs/<feature-slug>/integration-test.md`：总结场景、环境与缺口。

## 工作流

1. **探测** 仓库中的集成测试 runner；镜像其风格；只有在无约定时才使用 polyglot 参考。
2. **识别边界**：从 `docs/module.md` 与 `docs/logic/*.md` 推导系统真实模块边界；每个集成测试应覆盖一个真实的跨模块流，最好是 `docs/logic/*.md` 中具名的流。
3. **枚举场景**：
    - 每个相关的 `docs/logic/*.md` 流至少一个 flow test。
    - spec 或 plan 明确指出的失败/回退路径。
4. **加载并理解模板**：`templates/integration-report.md`。
5. **确定测试环境**：真实依赖（如 test containers）还是 fakes，依据项目标准与 constitution 规则；对被测系统边界避免使用 mocks。
6. **尽可能逼真地准备依赖**：按项目标准使用 containers；仅在文档化允许时使用 fakes；对被测边界避免 mocks。
7. **编写与运行测试**：反复迭代直至转绿。
8. **用模板写报告**：基于 `templates/integration-report.md` 生成 `specs/<feature-slug>/integration-test.md`。

### 处理开放问题

若以上工作流问题无法从输入中得到明确答案（边界、场景、环境、fixtures、回退路径），应停止并向用户提交一条合并后的问题清单；在全部解析前不得继续，不得猜测。

## 质量清单

- [ ] 测试覆盖真实跨模块行为，而不是把单模块逻辑伪装成集成测试。
- [ ] 不为被测系统边界使用 mocks（mocks 仅允许在边界之外）。
- [ ] 环境搭建可复现，并记录在报告中。
- [ ] 覆盖失败路径，而非只测 happy path。
- [ ] 保持项目既有风格；若使用 polyglot fallback，必须显式注明。

## 起草规则

- **No invented facts.** 严格基于 `plan.md` 与既有代码库；证据缺失处插入 `[NEEDS CLARIFICATION: <issue>]`。
- **Pragmatic inference.** 可基于既有模式做合理结构推断，但不得虚构外部服务或复杂缺失行为。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。

## 交接建议

- 集成测试全部转绿：建议使用 **`commit-spec`** 完成最终 feature 提交（`feat(<feature-slug>): complete - ...`）。
- 测试暴露问题：按原因回到 **`implement-spec`** 或 **`plan-spec`**。
- `commit-spec` 可随时调用作为 checkpoint。
- **重跑策略：** 若 spec、plan 或模块边界在后续变化，需对受影响的 flows 重跑 `integration-test-spec`。
