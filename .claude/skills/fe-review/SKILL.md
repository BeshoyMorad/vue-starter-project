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
5. Check each changed hunk against the checklist in `.claude/agents/fe-reviewer.md` (the single source: reuse, data, API contract, forms, uploads, UI, accessibility, UX, TypeScript, security, performance, text and routing, structure and tests).
6. Output a table: `file:line | severity (blocker/major/nit) | rule | fix`. No praise, no summary of what the code does. Max 25 rows; group repeats. If there are no findings, say "No findings."
