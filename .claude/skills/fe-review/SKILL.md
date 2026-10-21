---
name: fe-review
description: Review the current branch's frontend changes against the team's Vue/Nuxt architecture rules. Use when asked to review a diff, branch, PR, or "my changes".
---

# Frontend review

Review ONLY the diff, not the whole codebase.

1. Get the diff: `git diff --stat origin/main...HEAD`, then `git diff origin/main...HEAD -- '*.vue' '*.ts'`.
   If an argument is given (PR number or base branch), use it instead of `origin/main`.
2. Delegate to the `fe-reviewer` subagent with the diff, so file reads stay out of the main context.
3. Check each changed hunk against this list:
   - Reuse: new component/composable that duplicates something in `components/ui`, `components/form`, `components/data-table`, `composables/`
   - Raw `<input>`, `<select>`, custom modal, manual pagination/scroll
   - Inline `queryKey: [...]`, hardcoded URL strings, manual toast in `try/catch`
   - Inline date/currency formatting; missing `data-test` from `lib/test-ids.ts`
   - Physical Tailwind classes (`ml- mr- pl- pr- left- right- text-left text-right`)
   - `window`/`document`/`localStorage` outside `onMounted`; tokens not via `useCookie()`
   - Cross-domain or cross-app imports
4. Output a table: `file:line | severity (blocker/major/nit) | rule | fix`. No praise, no summary of what the code does. Max 25 rows; group repeats.
