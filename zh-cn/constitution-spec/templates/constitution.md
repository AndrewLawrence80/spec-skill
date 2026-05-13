# Project Constitution

> Version: 0.1.0 - Ratified: YYYY-MM-DD - Last amended: YYYY-MM-DD

本文档用于记录本项目的工程治理规则。仓库中的每一份 spec、plan、task list、analysis、implementation 与 test 都 MUST 与以下原则保持一致。当某条原则与战术性决策发生冲突时，默认以原则为准；除非先修订本文件（并记录版本号 bump 与理由）。

---

## Purpose

<!-- NEEDS CLARIFICATION: 用一段话说明项目存在的目的、面向对象，以及它明确“不做什么”。 -->

## Principles

<!--
每条原则必须是声明式（"MUST / MUST NOT / SHOULD / SHOULD NOT"）且可独立验证。
可以自由增删改原则；但请保持编号稳定，以避免既有引用失效。
每条原则都包含 `Ratified` 日期（首次引入）与可选的 `Amended` 日期（仅当文本变更时设置）。
-->

### 1. <!-- 原则短名称 -->

- **Rule:** [NEEDS CLARIFICATION: declarative statement using MUST / MUST NOT / SHOULD / SHOULD NOT.]
- **Rationale:** [该规则存在的原因：它在缓解什么风险，或在保留什么价值。]
- **Ratified:** YYYY-MM-DD
- **Amended:** <!-- YYYY-MM-DD; omit or leave blank if never amended -->

### 2. <!-- 原则短名称 -->

- **Rule:** ...
- **Rationale:** ...
- **Ratified:** YYYY-MM-DD
- **Amended:**

<!--
根据需要添加更多原则。建议考虑的议题：
code style、架构边界、测试纪律、依赖策略、
security posture、privacy、observability、性能预算、accessibility、
数据处理、review & merge 流程、breaking-change 策略。
-->

## Amendment process

1. 描述要新增、修改或删除的原则，并说明变更原因。
2. 在本 header 中 bump semantic version：
    - **MAJOR**：移除或从根本上改变既有原则。
    - **MINOR**：新增原则。
    - **PATCH**：仅文字修订/澄清。
3. 将 header 中的 `Last amended` 更新为今天的 ISO 日期。对每条被修改文本的原则，将其 `Amended` 字段设为同一日期；未变化的原则保持原 `Ratified`，且不新增 `Amended`。
4. 在下方 changelog 记录变更。
5. 请求用户批准通过 `commit-spec`（或项目既有版本控制流程）提交该变更，以保证可评审与可追溯。

## Changelog

| Version | Commit hash | Date       | Change         |
| ------- | ----------- | ---------- | -------------- |
| 0.1.0   |             | YYYY-MM-DD | Initial draft. |
