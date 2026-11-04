# Project instructions

<!-- The shared instructions live in AGENTS.md (also read by Codex, Gemini CLI, and Cursor). Put only Claude Code specifics here. -->

@AGENTS.md

## Claude Code specifics

- `.claude/rules/*.md` load automatically by `paths:`, so the "Path-scoped rules" index above is for other tools.
- Use plan mode first for anything touching more than 3 files.
- Architecture or "where does X live" questions: use the `graphify` skill first (see `.claude/rules/graphify.md`).

## Compact instructions

When compacting, keep: files changed, decisions made, open TODOs, failing test names. Drop: file contents already read, exploration output.
