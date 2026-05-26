---
name: unittest-spec
description: >-
    增加或更新单元测试：以隔离方式、确定性地验证函数/类/模块，不依赖网络或真实文件系统。当用户说“add unit tests / write tests for this function / improve unit-test coverage / fix the unit tests”时使用。通常在 `implement-spec` 完成某个阶段后调用；或在任意单元缺少足够隔离覆盖时调用。
version: 0.2.0
phase: 9
---

# unittest-spec

按“一个 unit 一次”的粒度编写单元测试。必须先探测并遵循**项目既有的测试框架与风格**；仅当项目尚未建立约定时，才退回到 `templates/polyglot/` 下的通用参考。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 对应第 9 步。

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

- **Explore** - 在无任何锚点文档时，对陌生代码库进行广度优先探索，写入 `.speckit/memory/exploration.md`。
- **Commit** - 版本控制 checkpoint。
- **Audit** - 事后复盘审计。

## 何时使用

- `implement-spec` 新增代码缺少单元测试覆盖。
- bug 暗示缺失或薄弱的单元测试。
- 用户希望提升某个 unit 的覆盖质量。

## 输入

- **必需：** 被测源单元（unit）。
- **强烈建议：** `plan.md`（了解测试框架选择）、`data-model.md`（fixtures 形状）、`tasks.md` 的测试条目、以及仓库中既有测试（镜像约定）。
- **可选：** `docs/module.md`（理解该 unit 的职责与边界，而不仅是函数签名）。

## 输出

- 项目测试目录下的测试文件（目录路径需探测，不能假设）。
- `specs/<feature-slug>/unit-test.md`：总结测试覆盖、覆盖观察与已知缺口。

## 工作流

1. **探测** 测试 runner：从构建文件与既有测试中识别（如 `pytest`、`jest`、`go test`、`cargo test`、`rspec`、`xunit`）；镜像命名与目录布局。只有在无约定时才使用 `templates/polyglot/`。
2. **识别被测 unit** 以及其应满足的行为/接口契约（签名、前后置条件、不变量）。
3. **枚举用例**：happy path、边界/空值/最大尺寸等 edge cases、错误路径、以及 `data-model.md` 不变量。
4. **编写测试**：每个测试聚焦一个可观测断言；确定性；不访问网络、不使用真实文件系统、不依赖真实时钟（除非可伪造）。采用项目偏好的 mocking 与 fixture 风格。
5. **本地运行并迭代**：反复迭代至转绿——除非项目采用 TDD，此时首轮为 red 是预期，然后补齐实现使其转绿。
6. **生成报告**：用 `templates/unit-report.md` 写入 `specs/<feature-slug>/unit-test.md`。

## 质量清单

- [ ] 每个测试覆盖一个可观测行为。
- [ ] 外部依赖通过 mocks/stubs/fakes 解耦。
- [ ] 测试命名描述行为，而非实现细节。
- [ ] 覆盖 edge 与 error paths，而非只测 happy path。
- [ ] 覆盖缺口必须在报告中列出（不得静默忽略）。
- [ ] 保持项目既有风格；若无约定，使用 polyglot fallback 并在报告中注明。

## 起草规则

- **No invented facts.** 严格基于 `plan.md` 与既有代码库；证据缺失处插入 `[NEEDS CLARIFICATION: <issue>]`。
- **Pragmatic inference.** 可基于既有模式做合理结构推断，但不得虚构外部服务或复杂缺失行为。
- **Templates are references, not religion.** 尊重模板意图与必填章节；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Escalation.** 遇到无法落地的问题，停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。
- **仅使用纯文本符号。** 不得在生成的文档中输出 emoji、Unicode 装饰性标点（弯引号、破折号、省略号）或非 ASCII 装饰性符号；请使用 ASCII 等价形式（例如 `->` 代替箭头符号、`...` 代替省略号字符、直引号代替弯引号、`-` 代替破折号）。例外：zh-cn skill 输出中的 CJK 字符作为语言内容是允许的；代码块与 Mermaid 图表同样豁免。

## 交接建议

- 单元测试转绿：建议运行 **`integration-test-spec`**（若尚未并行完成）。
- 覆盖缺口需要设计调整：建议修订 **`plan-spec`**。
- `commit-spec` 可随时调用，将测试补充 checkpoint 到版本控制。
- **重跑策略：** 若被测 unit 后续修改，需对该 unit 重跑 `unittest-spec`。
