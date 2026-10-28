# Project instructions

<!-- Keep this file < 200 lines. Anything that only matters for some files goes in .claude/rules/ with `paths:`. Multi-step procedures go in .claude/skills/. HTML comments like this one are stripped and cost 0 tokens. -->

## Stack

Vue 3 / Nuxt, TypeScript, Tailwind, TanStack Query, Yup, Sonner. Package manager: pnpm.

## Commands

- Dev: `pnpm dev` · Typecheck: `pnpm typecheck` · Lint: `pnpm lint` · Unit: `pnpm test --run <file>`
- Verify a change with typecheck + the relevant test file only. Never run the full suite unless asked.

## Architecture mode

<!-- Delete the two modes that don't apply to this repo — don't make Claude detect it every session. -->

- **Standard Vue 3** (`components/`, `modules/`): organize by technical concern; keep it simple.

## Golden rule: reuse before you write

Before creating any component, composable, or util, search for an existing one (`components/ui`, `components/form`, `components/data-table`, `composables/`, `utils/`, `lib/`). If one exists, use it. If you believe a new primitive is truly needed, say so and ask first.

## Where things live (don't search for these, use them)

- Query keys: `lib/query-keys.ts` · Endpoints: `lib/api/endpoints.ts` (`apiRoute()`) · Test IDs: `lib/test-ids.ts`
- Validation: `lib/yup/` (`setupYupLocale`, methods) · Errors: `utils/apiError.ts` · Toasts: `toast.ts`
- Formatters: `formatter.ts`, `formatText.ts`, `formatStatus.ts` · Class merge: `cn()`
- Translations: `src/locales/{locale}/{namespace}.json` · i18n wiring: `src/locales/`

## Working style

- For anything touching more than 3 files, use plan mode first and wait for approval.
- Be concise. Show diffs, not whole files. Don't re-explain code I can read.

## Compact instructions

When compacting, keep: files changed, decisions made, open TODOs, failing test names. Drop: file contents already read, exploration output.
