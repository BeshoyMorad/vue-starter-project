---
name: verify
description: Run the narrowest checks that prove a change works (lint on changed files, typecheck, the relevant spec). Use before declaring a task done, or when asked to "verify", "check", or "make sure it passes".
allowed-tools: Bash(pnpm exec eslint:*), Bash(pnpm exec prettier:*), Bash(pnpm type-check:*), Bash(pnpm test:unit --run:*), Bash(pnpm --filter:*), Bash(pnpm lint:*), Bash(git diff:*), Bash(git status:*)
---

# Verify a change

Run the narrowest check that covers the change. Never run the full test suite unless the user asks.

1. List changed files: `git status --short` and `git diff --name-only HEAD`.
2. Lint the changed `.vue`/`.ts` files: `pnpm exec eslint <files>`. Format check: `pnpm exec prettier --check <files>`.
3. Typecheck: `pnpm type-check`.
4. Tests: run the spec next to each changed file, or the closest one: `pnpm test:unit --run <spec file>`. If a changed file has no spec and holds logic (composable, service, schema, util), say so.
5. Locale JSON changed? Confirm `en` and `ar` have the same keys (the post-edit hook reports mismatches) and that `pnpm locales:types` was run by the typecheck.
6. Capture each exit code explicitly, for example `pnpm type-check > /tmp/tc.txt 2>&1; echo "exit $?"`. A pipe hides the status.

Before you judge a failure, check whether the error is in a file you changed. If not, report it as pre-existing and do not fix it inside this task.

Report one line per command: the command, its exit code, and the failing output if any. Do not say a check passed unless you ran it and saw it pass.
