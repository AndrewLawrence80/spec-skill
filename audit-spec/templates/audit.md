# Audit Report for `<feature-slug>`

> Audited: YYYY-MM-DD - Source artifacts: `spec.md`, `plan.md`, `tasks.md` under `specs/<feature-slug>/`

---

## Summary of implementation

<!-- Provide a brief overview of what was implemented based on the tasks. -->

---

## Severity legend

- **BLOCKER** - correctness or safety defect that must be fixed before the feature is considered done.
- **MAJOR** - non-trivial design, traceability, or correctness issue that should be fixed before merge unless explicitly accepted by the user.
- **MINOR** - polish or quality issue; fix when convenient.
- **INFO** - observation or suggestion; no change required.

---

## Findings overview

<!-- One-line entry per finding, sorted BLOCKER -> MAJOR -> MINOR -> INFO. Helps reviewers triage at a glance. -->

| ID    | Severity | Category               | Task / Path:line               | One-line summary |
| ----- | -------- | ---------------------- | ------------------------------ | ---------------- |
| F-001 | BLOCKER  | Bug                    | `T-###` / `src/foo.py:42`      |                  |
| F-002 | MAJOR    | Logical problem        | `T-###` / `src/bar.py:117`     |                  |
| F-003 | MINOR    | Traceability           | `T-###`                        |                  |
| F-004 | INFO     | Concurrency            | `T-###` / `src/queue.py:88`    |                  |

---

## Bugs

### F-001 - `T-###` - BLOCKER

- **Description:** [Brief description of the task.]
- **Issue:** [Describe the bug, e.g., "The implementation of this task does not handle edge cases that are mentioned in the spec, which could lead to bugs."]
- **Related docs:** [List any related docs that are relevant to this issue, e.g., `spec.md`, `data-model.md`.]
- **Impact:** [Describe the potential impact of this issue, e.g., "This could lead to runtime errors when the edge cases occur."]
- **Scenarios:** [Describe any scenarios where this issue could cause problems, e.g., "If the input data includes null values, the current implementation will throw an error instead of handling it gracefully."]
- **Suggested follow-up:** [Recommended upstream skill (`clarify-spec`, `plan-spec`, `tasks-spec`, or `documentation-spec`) and what it should change.]

---

## Logical problems

### F-002 - `T-###` - MAJOR

- **Description:** [Brief description of the task.]
- **Issue:** [Describe the logical problem, e.g., "The implementation of this task suffers from logical deviations from the spec."]
- **Related docs:** [List any related docs that are relevant to this issue, e.g., `spec.md`, `docs/logic/<flow>.md`.]
- **Impact:** [Describe the potential impact of this issue, e.g., "This could lead to maintenance problems as future developers may not understand the rationale behind this implementation choice."]
- **Scenarios:** [Describe any scenarios where this issue could cause problems.]
- **Suggested follow-up:** [Recommended upstream skill and what it should change.]

---

## Race conditions and concurrency issues

### F-### - `T-###` - <severity>

- **Description:** [Brief description of the task.]
- **Issue:** [Describe the concurrency issue.]
- **Related docs:** [List any related docs that are relevant.]
- **Impact:** [Describe the potential impact, e.g., "This could lead to unpredictable behavior or data corruption when multiple threads or processes access the shared resource simultaneously."]
- **Scenarios:** [Describe any scenarios where this issue could cause problems.]
- **Suggested follow-up:** [Recommended upstream skill and what it should change.]

---

## Traceability issues

### F-### - `T-###` - <severity>

- **Description:** [Brief description of the task.]
- **Issue:** [Describe the traceability issue, e.g., "The implementation includes an extra function that is not mentioned in the spec or related docs."]
- **Related docs:** [List any related docs that are relevant.]
- **Impact:** [Describe the potential impact.]
- **Scenarios:** [Describe any scenarios where this issue could cause problems.]
- **Suggested follow-up:** [Recommended upstream skill and what it should change.]

---

## Open questions

- **Question:** [Describe the open question, e.g., "Is the extra function mentioned in the implementation necessary, and if so, what is its intended purpose?"]
