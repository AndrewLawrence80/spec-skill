# Tasks: `plain-symbol-constraint`

> **Plan:** [`plan.md`](specs/plain-symbol-constraint/plan.md)
> **Spec:** [`spec.md`](specs/plain-symbol-constraint/spec.md)
> **Created:** 2026-05-25

## Legend

- **Status:** `[ ]` Not started | `[~]` In progress | `[x]` Completed
- **Parallelization:** `[P]` Safe to execute in parallel with sibling tasks.
- **Trace:** Upstream requirement ID.

## Shared implementation pattern

All tasks in Phase 1 and Phase 2 use the same `replace_string_in_file` approach.
Read the **Canonical rule text** from `specs/plain-symbol-constraint/plan.md` before executing any task -- do not paraphrase.

**Anchor for English files:** find the text `never silently proceed.\n\n## Handoff` in the target file and insert the new English rule bullet between them.

**Anchor for zh-cn files:** find the text `不得默默继续。\n\n## 交接建议` in the target file and insert the new zh-cn rule bullet between them.

Resulting structure (English example):

```
- **Escalation.** ...never silently proceed.
- **Plain-text symbols only.** Do not emit emoji, Unicode decorative punctuation (curly quotes, em-dash, ellipsis), or non-ASCII decorative symbols in any generated document; use ASCII equivalents instead (e.g., `->` for arrows, `...` for ellipsis, straight `"` for quotes, `-` for dashes). Exception: CJK characters in zh-cn skill outputs are permitted as linguistic content; code blocks and Mermaid diagrams are exempt.

## Handoff
```

---

## Phase 1: English SKILL.md files

_All 13 tasks in this phase are fully independent. Execute in parallel._

- [ ] **T-001** `[P]` Add plain-text symbols rule to `constitution-spec/SKILL.md`
    - **Files:** `constitution-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:**
    ```
    oldString: "never silently proceed.\n\n## Handoff"
    newString: "never silently proceed.\n- **Plain-text symbols only.** <EN canonical text>\n\n## Handoff"
    ```

- [ ] **T-002** `[P]` Add plain-text symbols rule to `documentation-spec/SKILL.md`
    - **Files:** `documentation-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-003** `[P]` Add plain-text symbols rule to `specify-spec/SKILL.md`
    - **Files:** `specify-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-004** `[P]` Add plain-text symbols rule to `clarify-spec/SKILL.md`
    - **Files:** `clarify-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-005** `[P]` Add plain-text symbols rule to `plan-spec/SKILL.md`
    - **Files:** `plan-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-006** `[P]` Add plain-text symbols rule to `tasks-spec/SKILL.md`
    - **Files:** `tasks-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-007** `[P]` Add plain-text symbols rule to `analyze-spec/SKILL.md`
    - **Files:** `analyze-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-008** `[P]` Add plain-text symbols rule to `implement-spec/SKILL.md`
    - **Files:** `implement-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-009** `[P]` Add plain-text symbols rule to `unittest-spec/SKILL.md`
    - **Files:** `unittest-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-010** `[P]` Add plain-text symbols rule to `integration-test-spec/SKILL.md`
    - **Files:** `integration-test-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-011** `[P]` Add plain-text symbols rule to `research-spec/SKILL.md`
    - **Files:** `research-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-012** `[P]` Add plain-text symbols rule to `commit-spec/SKILL.md`
    - **Files:** `commit-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

- [ ] **T-013** `[P]` Add plain-text symbols rule to `audit-spec/SKILL.md`
    - **Files:** `audit-spec/SKILL.md`
    - **Trace:** `FR-001`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-001.

---

## Phase 2: zh-cn SKILL.md files

_All 13 tasks in this phase are fully independent of each other and of Phase 1. Execute in parallel._

- [ ] **T-014** `[P]` Add plain-text symbols rule to `zh-cn/constitution-spec/SKILL.md`
    - **Files:** `zh-cn/constitution-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:**
    ```
    oldString: "不得默默继续。\n\n## 交接建议"
    newString: "不得默默继续。\n- **仅使用纯文本符号。** <zh-cn canonical text>\n\n## 交接建议"
    ```

- [ ] **T-015** `[P]` Add plain-text symbols rule to `zh-cn/documentation-spec/SKILL.md`
    - **Files:** `zh-cn/documentation-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-016** `[P]` Add plain-text symbols rule to `zh-cn/specify-spec/SKILL.md`
    - **Files:** `zh-cn/specify-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-017** `[P]` Add plain-text symbols rule to `zh-cn/clarify-spec/SKILL.md`
    - **Files:** `zh-cn/clarify-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-018** `[P]` Add plain-text symbols rule to `zh-cn/plan-spec/SKILL.md`
    - **Files:** `zh-cn/plan-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-019** `[P]` Add plain-text symbols rule to `zh-cn/tasks-spec/SKILL.md`
    - **Files:** `zh-cn/tasks-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-020** `[P]` Add plain-text symbols rule to `zh-cn/analyze-spec/SKILL.md`
    - **Files:** `zh-cn/analyze-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-021** `[P]` Add plain-text symbols rule to `zh-cn/implement-spec/SKILL.md`
    - **Files:** `zh-cn/implement-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-022** `[P]` Add plain-text symbols rule to `zh-cn/unittest-spec/SKILL.md`
    - **Files:** `zh-cn/unittest-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-023** `[P]` Add plain-text symbols rule to `zh-cn/integration-test-spec/SKILL.md`
    - **Files:** `zh-cn/integration-test-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-024** `[P]` Add plain-text symbols rule to `zh-cn/research-spec/SKILL.md`
    - **Files:** `zh-cn/research-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-025** `[P]` Add plain-text symbols rule to `zh-cn/commit-spec/SKILL.md`
    - **Files:** `zh-cn/commit-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

- [ ] **T-026** `[P]` Add plain-text symbols rule to `zh-cn/audit-spec/SKILL.md`
    - **Files:** `zh-cn/audit-spec/SKILL.md`
    - **Trace:** `FR-002`, `NFR-001`, `NFR-002`
    - **Depends on:** None
    - **Implementation Snippet:** same anchor pattern as T-014.

---

## Phase 3: Polish & Finalization

- [ ] **T-027** Verify all 26 SKILL.md files contain the new rule
    - **Files:** all 26 `*/SKILL.md` and `zh-cn/*/SKILL.md` files (read-only verification)
    - **Trace:** `FR-001`, `FR-002`, `NFR-002` (consistency check)
    - **Depends on:** T-001 through T-026
    - **Implementation Snippet:**
    ```bash
    # Confirm rule keyword present in all 13 English files (13 matches):
    grep -rl "Plain-text symbols only" */SKILL.md | wc -l
    # Confirm canonical text integrity via distinctive phrase (13 matches):
    grep -rl "Unicode decorative punctuation" */SKILL.md | wc -l
    # Confirm rule keyword present in all 13 zh-cn files (13 matches):
    grep -rl "仅使用纯文本符号" zh-cn/*/SKILL.md | wc -l
    # Confirm zh-cn canonical text integrity via distinctive phrase (13 matches):
    grep -rl "Unicode 装饰性标点" zh-cn/*/SKILL.md | wc -l
    # All four commands must return 13.
    ```
