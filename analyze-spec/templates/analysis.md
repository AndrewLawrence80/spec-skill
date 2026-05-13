# Analysis Report: `<feature-slug>`

> **Run Date:** YYYY-MM-DD | **Target Feature:** `<feature-slug>`

## Executive Summary

- **BLOCKERS:** 0
- **MAJORS:** 0
- **MINORS:** 0
- **INFOS:** 0

> **Gate Check:** If `BLOCKERS > 0`, do NOT proceed to `implement-spec`. Resolve all upstream issues first.
>
> **Severity legend:** BLOCKER = stop; MAJOR = fix before implement (unless accepted); MINOR = polish; INFO = note.

---

## Internal Consistency (Spec, Plan, Tasks)

### Coverage Matrix

| Spec Requirement | Covered in `plan.md` (Section) | Covered in `tasks.md` (Task IDs) | Notes |
| ---------------- | ------------------------------ | -------------------------------- | ----- |
| `[FR-001]`       |                                |                                  |       |
| `[NFR-001]`      |                                |                                  |       |

### Findings

- **F-001** `[BLOCKER / MAJOR / MINOR / INFO]` `[Consistency / Coverage]`
    - **Description:** [Clearly explain the gap or discrepancy]
    - **Locations:** `specs/<feature-slug>/spec.md:FR-001`, `specs/<feature-slug>/tasks.md:T-021`
    - **Suggested Remediation:** [e.g., Run `tasks-spec` to add a missing implementation task]

---

## Documentation Drift (`docs/*.md`)

> _If global `docs/` are absent, output: "Documentation set absent: recommend running `documentation-spec` before proceeding" and skip this section._

### Findings

- **F-101** `[BLOCKER / MAJOR / MINOR / INFO]` `[Drift]`
    - **Description:** [Explain how the plan conflicts with global architecture or entry points]
    - **Locations:** `specs/<feature-slug>/plan.md:L##`, `docs/module.md:L##`
    - **Suggested Remediation:** [e.g., Revise `plan-spec` or add a specific update task for the docs]

---

## Data Model Verification

| Artifact / Entity | Notes |
| ----------------- | ----- |
| `Entity: <Name>`  |       |

### Findings

- **F-201** `[BLOCKER / MAJOR / MINOR / INFO]` `[Consistency]`
    - **Description:** [Explain the design or implementation risk related to the data model]
    - **Locations:** `specs/<feature-slug>/tasks.md:<entity_name>`
    - **Suggested Remediation:** [Actionable fix to satisfy the requirement / interface]

---

## Constitution Compliance

> _Skip if `.speckit/memory/constitution.md` is absent and mark this section as "N/A"._

| Principle     | Acknowledged in `plan.md`? | Status (Satisfied / Deferred / Waived) | Notes |
| ------------- | -------------------------- | -------------------------------------- | ----- |
| [Description] | Yes / No                   |                                        |       |

### Findings

- **F-301** `[BLOCKER / MAJOR / MINOR / INFO]` `[Constitution]`
    - **Description:** [Explain the principle violation or missing acknowledgment]
    - **Locations:** `specs/<feature-slug>/plan.md:L##`
    - **Suggested Remediation:** [Actionable fix to adhere to project rules]

---

## Risk Register

> _Log items that aren't strict inconsistencies but carry architectural or implementation risk._

- **R-001** `[Risk]` - **[Risk Title]:** [Description of what might break during implementation]
    - **Mitigation:** [Suggested strategy or defensive coding practice]

---

## Recommended Next Steps

1. [Action 1: e.g., Run `tasks-spec` to resolve Blockers]
2. [Action 2: e.g., Proceed to `implement-spec` if the Executive Summary allows]
