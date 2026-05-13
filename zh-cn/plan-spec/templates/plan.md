# Implementation Plan: `<feature-slug>`

> Spec: `specs/<feature-slug>/spec.md` - 创建日期：YYYY-MM-DD

---

## Outline

<!-- 用 1–2 段话概述变更轮廓，与需求形成互补：让读者一眼理解这次改动的“形状”。 -->

---

## High-level approach

<!-- 对每条功能/非功能需求，用一行描述实现路径。 -->

- **FR-001 <name>**: <brief description of the implementation approach>
- **FR-002 <name>**: <brief description of the implementation approach>
- **NFR-001 <name>**: <brief description of the implementation approach>

---

## Affected modules

<!-- 本 plan 触达的 modules。对新组件：写明技术选择与一句话理由。对既有组件：遵循 docs/module.md，不得静默替换技术栈。 -->

- `<module_name>`: `<new | extend | refactor>` - <what changes and why>

---

## Data

<!-- 对现有数据模型的修改与新数据模型。若 feature 不引入/修改实体，可用一句话说明并省略本节；否则细节写入 data-model.md，并在此给出摘要。 -->

- `<entity>` (`<new | modify>`): <brief description of the entity and its role in the implementation>

---

## Simplicity gate

<!-- 对每个新增 project/module/abstraction，记录书面正当化；理由薄弱则移除抽象。 -->

- `<added unit>`: <why it must exist now, not later>

---

## Anti-abstraction gate

<!-- 不得仅为“可测试性”引入 interfaces/factories/wrappers，除非存在第二个真实 consumer。列出引入的抽象，以及支撑它的第二个 consumer。 -->

- `<abstraction>`: <second consumer that justifies it, or "deferred until a second consumer appears">

---

## Constitution compliance

<!-- 若存在 `.speckit/memory/constitution.md`：逐条原则说明 satisfied/deferred/waived，并给出理由；若缺失，写 "n/a - no constitution.md present"。 -->

- `<principle name>`: `<satisfied | deferred | waived>` - <rationale>

---

## Open questions

<!-- planning 后仍存在的歧义。用 [NEEDS CLARIFICATION: ...] markers，便于下游 skills 定位。若无，写 "None identified."。 -->

- `[NEEDS CLARIFICATION: <question>]`
