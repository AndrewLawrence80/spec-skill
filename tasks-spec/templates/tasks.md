# Tasks: `<feature-slug>`

> **Plan:** [`plan.md`](specs/<feature-slug>/plan.md)
> **Spec:** [`spec.md`](specs/<feature-slug>/spec.md)
> **Created:** YYYY-MM-DD

## Legend

- **Status:** `[ ]` Not started | `[~]` In progress | `[x]` Completed
- **Parallelization:** `[P]` Safe to execute in parallel with sibling tasks. No marker means strictly sequential.
- **Trace:** Upstream requirement ID (e.g., `FR-001`, `NFR-002`), a named API/interface, or a `data-model` entity (when applicable).

---

## Data model & definitions

- [ ] **T-001** [Description of the data model or type definition task]
    - **Files:** `path/to/types_or_schema.ext`
    - **Trace:** `[FR-###]` / `[Entity Name]`
    - **Depends on:** `None`
    - **Implementation Snippet:**

    ```<language>
    // Pseudocode or explicit interface
    ```

- [ ] **T-002** `[P]` [Parallelizable definition task]
    - **Files:** ...
    - **Trace:** ...
    - **Depends on:** `None`
    - **Implementation Snippet:**

    ```<language>

    ```

## Algorithms & utilities

- [ ] **T-010** [Description of shared utility or algorithmic function]
    - **Files:** ...
    - **Trace:** ...
    - **Depends on:** `T-001`
    - **Implementation Snippet:**

    ```<language>

    ```

## Modules & Core Implementation

_Note: Test authoring tasks should precede their respective implementation tasks (TDD alignment)._

- [ ] **T-020** `[P]` [Write unit tests for core module]
    - **Files:** `tests/core_module.test.ext`
    - **Trace:** `[API/interface / FR-###]`
    - **Depends on:** `T-010`

- [ ] **T-021** [Implement core module satisfying the tests]
    - **Files:** `src/core_module.ext`
    - **Trace:** `[FR-###]`
    - **Depends on:** `T-020`
    - **Implementation Snippet:**

    ```<language>

    ```

## Integration & Wiring

- [ ] **T-030** [Integrate core module with the existing system]
    - **Files:** ...
    - **Trace:** ...
    - **Depends on:** `T-021`
    - **Implementation Snippet:**

    ```<language>

    ```

## Polish & Finalization

- [ ] **T-040** `[P]` Document new feature updates and architecture adjustments.
    - **Files:** `docs/*.md`, `README.md`
    - **Trace:** `[Setup/Polish]`
    - **Depends on:** `T-030`

- [ ] **T-041** `[P]` Resolve linting, formatting, and static analysis checks.
    - **Files:** `[All modified files]`
    - **Trace:** `[Setup/Polish]`
    - **Depends on:** `T-040`

---

## Open Questions

- `[NEEDS CLARIFICATION: <question>]`
