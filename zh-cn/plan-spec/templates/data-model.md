# Data Model: `<feature-slug>`

> 配套文档：[`plan.md`](./plan.md) - 创建日期：YYYY-MM-DD

---

## Entities

<!-- 每个本 feature 新增或修改的实体对应一个小节。对每个实体重复下方块。 -->

### `<EntityName>`

- **Status:** `new` | `modified`
- **Purpose:** [该实体在领域中代表什么。]
- **Storage:** [DB table / collection / in-memory / external system + identifier.]

**Existing fields** _(omit for new entities)_

| Name | Type    | Nullable | Index | Default | Notes / constraints |
| ---- | ------- | -------- | ----- | ------- | ------------------- |
| id   | Integer | False    | PK    |         | Primary key         |

**New / changed fields**

| Name | Type         | Nullable | Index  | Default | Notes / constraints |
| ---- | ------------ | -------- | ------ | ------- | ------------------- |
| name | Varchar(255) | False    | UNIQUE | --      | Must be unique      |

- **Invariants:** [必须恒成立的规则，例如 "email is unique per tenant."。]

---

## Open questions

- `[NEEDS CLARIFICATION: <question>]`
