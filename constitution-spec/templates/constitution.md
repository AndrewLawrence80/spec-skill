# Project Constitution

> Version: 0.1.0 - Ratified: YYYY-MM-DD - Last amended: YYYY-MM-DD

This document captures the rules that govern how this project is built. Every spec, plan, task list, analysis, implementation, and test in this repo MUST be consistent with the principles below. When a principle conflicts with a tactical decision, the principle wins unless this document is amended (with a recorded version bump and rationale).

---

## Purpose

<!-- NEEDS CLARIFICATION: one-paragraph statement of what this project exists to do, for whom, and what it explicitly does *not* try to do. -->

## Principles

<!--
Each principle is declarative ("MUST / MUST NOT / SHOULD / SHOULD NOT") and independently testable.
Add, edit, or remove principles freely; keep the numbering stable across amendments so existing references remain valid.
Each principle carries its own `Ratified` date (when it was first introduced) and an optional `Amended` date (set only when the principle's text changes).
-->

### 1. <!-- Short principle name -->

- **Rule:** [NEEDS CLARIFICATION: declarative statement using MUST / MUST NOT / SHOULD / SHOULD NOT.]
- **Rationale:** [Why this rule exists - the risk it mitigates or the value it preserves.]
- **Ratified:** YYYY-MM-DD
- **Amended:** <!-- YYYY-MM-DD; omit or leave blank if never amended -->

### 2. <!-- Short principle name -->

- **Rule:** ...
- **Rationale:** ...
- **Ratified:** YYYY-MM-DD
- **Amended:**

<!--
Add more principles as needed. Suggested topics to consider:
code style, architecture boundaries, test discipline, dependency policy,
security posture, privacy, observability, performance budgets, accessibility,
data handling, review & merge process, breaking-change policy.
-->

## Amendment process

1. Describe the principle to add, modify, or remove, together with the reason for the change.
2. Bump the semantic version in this header:
    - **MAJOR**: removes or fundamentally changes an existing principle.
    - **MINOR**: adds a new principle.
    - **PATCH**: editorial / clarification only.
3. Update `Last amended` in the header to today's ISO date. For each principle whose text changes, set its `Amended` field to the same date; principles that are unchanged keep their original `Ratified` date and no `Amended` date.
4. Record the change in the changelog below.
5. Ask user's approval to commit the change through the `commit-spec` skill (or the project's normal version-control workflow) so the update is reviewable and traceable.

## Changelog

| Version | Commit hash | Date       | Change         |
| ------- | ----------- | ---------- | -------------- |
| 0.1.0   |             | YYYY-MM-DD | Initial draft. |
