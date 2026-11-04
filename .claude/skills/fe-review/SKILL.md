---
name: fe-review
description: Review the current branch's frontend changes against this repo's Vue 3 SPA architecture rules. Use when asked to review a diff, branch, PR, or "my changes".
argument-hint: "[base branch or PR number]"
allowed-tools: Bash(git diff:*), Bash(git log:*), Bash(git status:*), Bash(git merge-base:*), Bash(gh pr diff:*), Bash(pnpm exec eslint:*), Read, Grep, Glob
---

# Frontend review

Review ONLY the diff, not the whole codebase.

1. Pick the base: the argument if given (a branch name, or a PR number for `gh pr diff <n>`), else `origin/main`, else `origin/master`, else `origin/develop`.
2. Get the diff: `git diff --stat <base>...HEAD`, then `git diff <base>...HEAD -- '*.vue' '*.ts' '*.json' '*.css'`. If the branch has uncommitted work, include `git diff HEAD`.
3. Run `pnpm exec eslint <changed .vue/.ts files>` and keep only errors on changed lines.
4. Delegate to the `fe-reviewer` subagent with the diff when your tool supports subagents (Claude Code: Agent tool; Gemini CLI: `@fe-reviewer`), so file reads stay out of the main context. Otherwise apply the checklist in `.claude/agents/fe-reviewer.md` yourself.
5. Check each changed hunk against this list:
   - Reuse: new component/composable that duplicates something in `src/components/ui`, `src/components/form`, `src/components/data-table`, `src/composables/`, `src/utils/`, `src/lib/`
   - Raw `<input>`, `<select>`, custom modal, manual pagination/scroll
   - Inline `queryKey: [...]`, hardcoded URL strings, manual toast in `try/catch`, data mirrored into Pinia
   - Inline date/currency formatting; missing `data-test-id` from `TEST_IDS`
   - Physical Tailwind classes (`ml- mr- pl- pr- left- right- text-left text-right`) and raw hex colors
   - Hard-coded UI text; `en`/`ar` key mismatch; English left in `ar`
   - `any`, `@ts-ignore`, missing `import type`
   - New logic without a spec
   - `localStorage`/`sessionStorage` used directly; auth values outside `src/stores/auth.ts`
   - Raw path strings for navigation instead of `paths`; route missing `meta.title`, lazy import, or `authGuard`/`guestGuard`
   - New module not following the `modules/<feature>/` layout (routes, paths, services, schemas)
6. Output a table: `file:line | severity (blocker/major/nit) | rule | fix`. No praise, no summary of what the code does. Max 25 rows; group repeats. If there are no findings, say "No findings."
