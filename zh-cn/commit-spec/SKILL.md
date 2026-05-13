---
name: commit-spec
description: >-
    编写符合 Conventional Commit 风格的提交信息，且内容反映 feature 意图（来自 `spec.md` 与 `plan.md`），而不只是描述 diff；并通过项目的 VCS（git 或 svn）创建 commit。同一 feature 的进行中 commits 统一使用 `feat(<feature-slug>): ...` 前缀；最终 commit 必须显式标记完成，以便历史可追溯。用户说“commit / save progress / checkpoint these changes / make a commit message / stage and commit”时使用。可在任意阶段作为 checkpoint 使用，也可作为 feature 的最后一步。
version: 0.2.0
phase: cross-cutting
---

# commit-spec

基于 feature 意图起草 commit message，并通过项目 VCS 记录。该 skill 是横切步骤（可在流程任意阶段调用），用于形成一致的提交历史，从而能用一次查询快速总结 feature 演进。

## 背景

`spec-skill` 采用 documentation-driven 的 V 模型工作流。本 skill 为横切步骤，可在任意阶段调用。

1. **Constitution** - 项目级原则、规则与质量标准。
2. **Documentation** - 代码库的全局视图。
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

- 用户明确要求 commit 或 checkpoint。
- `implement-spec` 的某个阶段已顺利完成。
- `unittest-spec` 或 `integration-test-spec` 刚转绿。
- feature 已完成，需要最终 commit。

## 输入

- **必需：** working tree 状态，并探测 VCS：
    - `git`：`git status --porcelain`、`git diff --staged`、`git diff`、`git log -n 5 --oneline`。
    - `svn`：`svn status`、`svn diff`（无 `--staged` 等价物；将所有修改文件视为候选）。
- **可选：** `specs/<feature-slug>/` 下的 `spec.md`、`plan.md`、`tasks.md`、`data-model.md`；近期 commit 历史（用于保持同一 feature 的前缀一致）。

## 输出

- 基于 `templates/commit-message.md` 渲染的 commit message。
- 默认：在用户批准后创建 staged commit；**或**仅输出 message 供用户手工应用。
- 一份简短摘要：提交了哪些文件、subject 内容、以及这是进行中 checkpoint 还是最终 commit。

## 工作流

1. **探测 VCS**：检查 `.git/` 或 `.svn/`。两者皆无则停止并报告。
2. **确定当前 feature slug**：从 `specs/<feature-slug>/...` 下最近变更文件路径推导；若无法推导则询问用户。
3. **阅读** feature 的 `spec.md` 与 `plan.md`，以便 commit message 能落在“意图”而不仅是“改了什么”。
4. **收集 diff 信息**：使用上述 VCS 命令；按组件（同一模块路径）聚合变更。
5. **选择 commit kind**：
    - `feat(<feature-slug>): ...` - feature 进行中提交的默认选择。
    - `fix(<feature-slug>): ...` - bug 修复。
    - `docs(<feature-slug>): ...` - 仅文档变更。
    - `test(<feature-slug>): ...` - 仅测试变更。
    - `refactor(<feature-slug>): ...` - 内部重构。
    - `chore: ...` - 工具、依赖、仓库脚手架。chore 通常跨 feature，默认 **不加** `<feature-slug>` scope；只有当 chore 确实限定在单一 feature 目录时才加 scope。
6. **识别“最终”提交**：若 `tasks.md` 已全部完成、所有阶段结束且测试为绿，则用以下方式显式标记 done：
    - 使用类似 `feat(<feature-slug>): complete - <one-line summary>` 的 subject，或
    - 添加 `Done: yes` trailer（项目选择记录在 `templates/commit-message.md`）。
7. **用 `templates/commit-message.md` 渲染**：正文 bullets 引用 task IDs 与 FR/NFR IDs；footer 可包含 `Refs:`（issues）、`Co-authored-by:` 等。
8. **暴露歧义并先询问**：例如看似进行中的 untracked 文件、一次提交混入多个 features。**未经明确确认，不得修改（amend）已 push 的 commit。**
9. **提交（仅在用户批准后）**：
    - git：仅 `git add` 本次变更范围内的文件，然后 `git commit -F <file>`。
    - svn：`svn commit -F <file> <paths>`。

## 质量清单

- [ ] subject 以 `<kind>(<feature-slug>):` 开头（或 `chore:` 的无 scope 形式），并给出简洁摘要。
- [ ] body 以模块为单位解释变更，并在适用时引用 task IDs 与 FR/NFR IDs。
- [ ] 对疑似进行中的 untracked 文件要提示，而不是静默提交。
- [ ] 最终提交必须显式标记 done（subject `complete - ` 或 `Done: yes` trailer）。
- [ ] 不使用 `--force` push，不重写已 push 历史，不走 `--no-verify` 捷径。

## 起草规则

- **No invented facts.** 严格基于 diff、spec 与 plan，不得编造 task IDs、FR/NFR IDs 或 trailers。
- **Pragmatic inference.** 可将相关文件聚合成连贯的 body bullets，但不得推断 spec/plan 未记录的意图。
- **Templates are references, not religion.** 尊重 `templates/commit-message.md` 的必填章节（subject、body、trailers）；可在项目语境明确时调整顺序或扩展；未经用户明确同意不得删除必填章节。
- **Safety controls.** 不绕过 VCS 安全控制：禁止 `--force` push、`--no-verify`、破坏性 reset；未经明确确认不得重写已 push 历史。
- **Escalation.** 遇到无法落地的问题（缺失必需工件、diff 含糊、混合 feature、trailers 冲突、用户答复矛盾），停止并向用户提问；相关问题合并为一条消息；不得猜测，不得默默继续。

## 交接建议

- 进行中 checkpoint：建议继续当前阶段对应的下一个 skill（继续 `implement-spec`、运行 `unittest-spec` 等）。
- 最终提交：建议创建 PR / merge request，并用 `specify-spec` 启动下一个 feature。
- **重跑策略：** 本 skill 不产生需重跑的下游工件；后续提交直接再次调用即可。
