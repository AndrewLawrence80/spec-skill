# Project Implementation Plan: `<topic-slug>`

> Scope: project-level or cross-feature system plan - Created: YYYY-MM-DD

---

## 目标与范围

<!-- 说明要构建的系统、此计划覆盖的边界，以及它必须满足的用户或业务结果。引用项目 brief、project-level research，以及相关 feature specs。 -->

---

## 构建策略

<!-- 用一到两段总结自底向上的构建顺序。期望模式是：先 foundations，再 block assembly，最后 integration。 -->

---

## 基础层

<!-- 定义所有上层 block 依赖的最低层 building blocks。 -->

### 数据定义

- `<entity or value object>`: <它为何存在、位于何处、后续哪些 blocks 依赖它>

### 存储与数据库接口

- `<interface or adapter>`: <契约、后端存储，以及必须保持的约束>

### 共享算法与帮助器

- `<helper or algorithm>`: <它解决什么问题，以及为何属于基础层>

---

## Block 构建顺序

<!-- 一次构建一个完整 block。每个 block 都应映射到某个 feature spec、项目需求，或子系统切片。 -->

### Block 1: `<name>`

- **Scope:** <此 block 交付什么>
- **Depends on:** <依赖哪些 foundations 或更早的 blocks>
- **Implementation notes:** <模块、接口、流程与约束>
- **Spec linkage:** <feature spec 路径或项目需求>

### Block 2: `<name>`

- **Scope:** <此 block 交付什么>
- **Depends on:** <依赖哪些 foundations 或更早的 blocks>
- **Implementation notes:** <模块、接口、流程与约束>
- **Spec linkage:** <feature spec 路径或项目需求>

---

## 集成顺序

<!-- 描述如何把独立构建的 blocks 组装成一个系统。覆盖 orchestration、共享状态边界、跨 block 契约、可观测性与发布顺序。 -->

- `<integration milestone>`: <如何连接 blocks，以及如何验证正确性>

---

## 模块落点与技术选型

<!-- 列出本计划新增或扩展的模块、项目、服务或包。新组件需要一句话理由；既有组件应遵循 docs/module.md。 -->

- `<module_name>`: `<new | extend | refactor>` - <为何放在这里>

---

## Simplicity gate

<!-- 对每个新增 project/module/abstraction，记录理由。若理由薄弱，应移除。 -->

- `<added unit>`: <为何现在必须存在>

---

## Anti-abstraction gate

<!-- 没有第二个真实 consumer 时，不要新增 interfaces/factories/wrappers。 -->

- `<abstraction>`: <支撑它的第二个 consumer，或 "deferred until a second consumer appears">

---

## Constitution compliance

<!-- 若存在 `.speckit/memory/constitution.md`，逐条回应 satisfied、deferred 或 waived，并给出理由。若不存在，写 "n/a - no constitution.md present"。 -->

- `<principle name>`: `<satisfied | deferred | waived>` - <rationale>

---

## 风险与开放问题

<!-- 记录 project-level 的不确定性、顺序风险与缺失信息。 -->

- `[NEEDS CLARIFICATION: <question>]`
