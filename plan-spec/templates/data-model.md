# Data Model: `<feature-slug>`

> Companion to [`plan.md`](./plan.md) - Created: YYYY-MM-DD

---

## Entities

<!-- One subsection per entity that this feature creates or modifies. Repeat the block below for each entity. -->

### `<EntityName>`

- **Status:** `new` | `modified`
- **Purpose:** [What this entity represents in the domain.]
- **Storage:** [DB table / collection / in-memory / external system + identifier.]

**Existing fields** _(omit for new entities)_

| Name | Type    | Nullable | Index | Default | Notes / constraints |
| ---- | ------- | -------- | ----- | ------- | ------------------- |
| id   | Integer | False    | PK    |         | Primary key         |

**New / changed fields**

| Name | Type         | Nullable | Index  | Default | Notes / constraints |
| ---- | ------------ | -------- | ------ | ------- | ------------------- |
| name | Varchar(255) | False    | UNIQUE | --       | Must be unique      |

- **Invariants:** [Rules that must always hold, e.g., "email is unique per tenant."]

---

## Open questions

- `[NEEDS CLARIFICATION: <question>]`
