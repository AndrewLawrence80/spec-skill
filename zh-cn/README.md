# spec-skill

一组可独立使用的 [Anthropic agent-skill](https://github.com/anthropics/skills) 文件集合，用于将 [spec-kit](https://github.com/github/spec-kit) / spec-driven-development (SDD) 工作流重新组织为以 **documentation-driven development (DDD)** 为中心的方法。

核心动机：在真实工程实践中，coding agents 往往会过度优化它正在修改的那一小块代码，从而丢失对项目的**全局视图**——项目的目的、模块划分、接口边界与约束条件。spec-skill 的应对策略是把项目级文档提升为一等公民：将其作为每一个下游阶段（clarify、plan、analyze、implement、integration-test、audit、commit）都必须可用的输入。

## Skills

这 13 个 skills 对应一个以文档为驱动的 V 模型工作流，并统一采用 `<step>-spec` 的命名约定。步骤 1–10 是按序推进的 V 模型阶段；`research-spec`、`commit-spec` 与 `audit-spec` 是可在流程任意阶段调用的横切步骤。

| #   | Skill                                                       | 输出工件                                                                                                 |
| --- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1   | [`constitution-spec`](./constitution-spec/SKILL.md)         | `.speckit/memory/constitution.md`                                                                        |
| 2   | [`documentation-spec`](./documentation-spec/SKILL.md)       | `docs/overview.md`, `docs/module.md`, `docs/logic/<api/task/callback>.md`                                |
| 3   | [`specify-spec`](./specify-spec/SKILL.md)                   | `specs/<feature-slug>/spec.md`（包含 feature + current implementation）                                  |
| 4   | [`clarify-spec`](./clarify-spec/SKILL.md)                   | 更新后的 `specs/<feature-slug>/spec.md`（已解析 markers）                                                |
| 5   | [`plan-spec`](./plan-spec/SKILL.md)                         | `specs/<feature-slug>/plan.md`（可选附带 `data-model.md`, `research.md`）或 `docs/plans/<topic-slug>.md` |
| 6   | [`tasks-spec`](./tasks-spec/SKILL.md)                       | `specs/<feature-slug>/tasks.md`                                                                          |
| 7   | [`analyze-spec`](./analyze-spec/SKILL.md)                   | `specs/<feature-slug>/analysis.md`（只读一致性报告）                                                     |
| 8   | [`implement-spec`](./implement-spec/SKILL.md)               | 满足 `specs/<feature-slug>/tasks.md` 的源代码变更                                                        |
| 9   | [`unittest-spec`](./unittest-spec/SKILL.md)                 | 单元测试 + `specs/<feature-slug>/unit-test.md`                                                           |
| 10  | [`integration-test-spec`](./integration-test-spec/SKILL.md) | 集成测试 + `specs/<feature-slug>/integration-test.md`                                                    |
| -   | [`research-spec`](./research-spec/SKILL.md)                 | `specs/<feature-slug>/research.md` 或 `docs/research/<topic-slug>.md`（横切）                            |
| -   | [`commit-spec`](./commit-spec/SKILL.md)                     | Conventional-commit message + commit（横切）                                                             |
| -   | [`audit-spec`](./audit-spec/SKILL.md)                       | `specs/<feature-slug>/audit.md` 或用于全项目的 `<output-dir>/audit.md`（横切）                           |

## Getting started

1. 将这些 skill 目录安装到你的 coding agent 中，作为 “agent skills”。
2. 启动一个 feature 时，先运行 `documentation-spec`（建立全局视图）与 `specify-spec`（生成 feature spec）。
3. 在开始实现之前，按 `clarify-spec` -> `plan-spec` -> `tasks-spec` -> `analyze-spec` 的顺序推进。若是 greenfield 或跨 feature 系统规划，可先让 `plan-spec` 产出 `docs/plans/<topic-slug>.md` 作为 project-level 指南。
4. 当技术选型、架构方向或与开源实现的对比需要更强证据时，随时调用 `research-spec`；它既可以放在 planning 前，也可以在后续争议出现时重跑。

背景与安装概念可参考：
- https://docs.github.com/zh/copilot/concepts/agents/about-agent-skills

## Design principles（摘要）

1. **先全局，后局部。** 尽早运行 `documentation-spec`；其输出是 clarify / analyze / implement / integration-test / commit / audit 的必读输入。
2. **模板是参考，不是枷锁。** Agents 必须尊重每个 template 的意图与必填章节，但可在项目语境明确时扩展、调整顺序或裁剪章节。未经用户明确同意，必填章节不得删除。
3. **不确定就问用户。** 每个 skill 遵循同一升级规则：事实无法从输入中落地（grounded）时，停止并以一条合并消息向用户提问；不猜测、不默默假设。
4. **spec 同时覆盖目标行为与现状实现。** `specify-spec` 记录用户请求的 feature 以及将被触达的既有代码路径。
5. **analyze 面向文档集进行校验。** `analyze-spec` 用 `spec.md` 与项目 `docs/*.md` 校验 plan/tasks 的一致性；constitution 是输入之一，但不是唯一门禁。
6. **测试用于验证，而非教条化 test-first。** unit 与 integration test 作为显式步骤存在，但并不强制 red/green 顺序。
7. **research 是一等横切步骤。** `research-spec` 可在任意阶段调用，用于对比当前项目与开源先例、收集论文/标准/正式参考资料，并为技术选型提供证据支持。
8. **随时 checkpoint。** `commit-spec` 可在任意阶段调用；同一 feature 的进行中 commits 使用统一前缀（`feat(<feature-slug>): ...`），最终 commit 需显式标记完成。
9. **audit 是一等横切步骤。** 建议在实现后（最好测试通过后）运行 `audit-spec`，以 BLOCKER / MAJOR / MINOR / INFO 严重级别输出后续跟进问题。

## Rerun / loop rules

- spec 变更 -> 重新运行 `clarify-spec`（若仍有 markers）-> 重新运行 `plan-spec` -> 重新运行 `tasks-spec` -> 重新运行 `analyze-spec`。
- plan 变更 -> 重新运行 `tasks-spec` -> 重新运行 `analyze-spec`。
- tasks 变更 -> 重新运行 `analyze-spec`。
- feature 开发中途全局 docs 变更 -> 重新运行 `analyze-spec`（漂移检查）。
- 实现与 tasks/spec 偏离 -> 优先回写上游工件（优先 `tasks-spec` / `plan-spec`），然后重新运行 `analyze-spec`。

## Parallel execution guidance

- 并行更适合 **只读** 工作（research、analysis、test execution）。
- 避免并发写入同一工件（例如不要同时运行两个都会修改 `specs/<feature-slug>/plan.md` 的 skills）。
- 输出文件不同则可并行（例如 `documentation-spec` 可并发写 `overview.md`、`module.md` 以及各 `logic/<name>.md`）。
- 使用 subagents 时，建议各 subagent 只产出报告，由一个 “supervisor” agent 汇总并应用编辑。

## Independence

这些 skills **不依赖** `spec-kit` runtime、`.specify/` 目录或任何 extension hooks。每个 skill 都是自包含的 `SKILL.md` + `templates/` 目录；可安装到任意兼容 Anthropic-skill 的 coding agent（Claude、Copilot 等）中使用。
