# Project instructions

<!-- Shared by Codex, Gemini CLI, Cursor, and Claude Code (CLAUDE.md imports this file). Keep it tool-neutral and under 200 lines. -->

## Stack

Vue 3.5 SPA (Vite 8, `vue-tsc`), TypeScript, Tailwind CSS v4 with reka-ui primitives, Pinia (`pinia-plugin-persistedstate`), TanStack Vue Query and Vue Table, vee-validate + Yup, Axios, vue-i18n (`en`, `ar`), vue-sonner, Vitest + MSW. Package manager: pnpm.

## Commands

- Dev: `pnpm dev` · Typecheck: `pnpm type-check` · Lint: `pnpm lint` (`pnpm lint:fix`) · Format: `pnpm format`
- Unit: `pnpm test:unit --run <file>` · Locale types: `pnpm locales:types` (runs inside `type-check`)
- Everything at once (format + lint:fix + type-check): `pnpm verify`. Run it only when asked.
- Verify a change with lint on the changed files, typecheck, and the relevant spec only. Never run the full suite unless asked. `pnpm test:unit` alone starts watch mode and hangs, so always pass `--run`.

## Architecture

- **Standard Vue 3 SPA**, organized by technical concern. Feature code lives in `src/modules/<feature>/`; code used by two or more modules moves to `src/components/`, `src/composables/`, `src/utils/`, `src/lib/`, or `src/stores/`.
- Vite SPA, not SSR: persisting through `useLocalStorage` in a store is correct here.
- `src/modules/doc/` is the component showcase; do not add product features to it.

## Golden rule: reuse before you write

Before creating any component, composable, or util, search for an existing one (`src/components/ui`, `src/components/form`, `src/components/data-table`, `src/composables/`, `src/utils/`, `src/lib/`). If one exists, use it. If you believe a new primitive is truly needed, say so and ask first.

## Where things live (don't search for these, use them)

- Query keys: `src/lib/query-keys.ts` · Endpoints: `src/lib/api/endpoints.ts` (`apiRoute()`) · API client: `src/lib/api/client.ts` · Table fetch: `src/lib/api/table.ts`
- Test IDs: `src/lib/test-ids.ts` · Env validation: `src/config/env.ts` · Query client: `src/lib/query-client.ts`
- Validation: `src/lib/yup/` (`setupYupLocale`, methods) · Errors: `src/utils/apiError.ts` · Toasts: `src/utils/toast.ts`
- Formatters: `src/utils/formatter.ts`, `formatText.ts`, `formatStatus.ts` · Class merge: `cn()` from `@/utils`
- Stores: `src/stores/auth.ts`, `src/stores/permissions.ts` · Router: `src/router/index.ts`, `src/router/paths.ts`, `src/router/guards/`
- Design tokens: `src/css/token.css` · Shared components: exported from `src/components/index.ts`
- Translations: `src/locales/{en,ar}/<namespace>.json` · i18n wiring: `src/locales/index.ts`, `messages.ts`

## Non-negotiables (details in `.claude/rules/`)

- **RTL-first.** Logical Tailwind classes only (`ms-* me-* ps-* pe-* start-* end-* text-start text-end`). Never `ml- mr- pl- pr- left- right- text-left text-right`.
- **No hard-coded UI strings.** Every label goes in `en` and `ar` JSON, used through `t()`.
- **Registries, not literals.** Query keys from `QUERY_KEYS`, URLs from `apiRoute()`, test ids from `TEST_IDS` (`data-test-id`), colors from the token file, route names from `paths`.
- **Server state in Vue Query, client state in Pinia.** Never copy API data into a store. No manual `try/catch` toasts.
- **Strict TypeScript.** No `any`, `interface` over `type`, `import type`, `@/` alias instead of `../`. Files under 300 lines.

## Path-scoped rules

Detailed rules live in `.claude/rules/`. Claude Code and Cursor (through the stubs in `.cursor/rules/`) load them by path automatically. Every other tool: before you edit files matching a glob below, read that rule file.

- `.claude/rules/data-fetching.md`: `**/services/**/*.ts`, `**/composables/**/*.ts`, `**/api/**/*.ts`, `**/*.vue`, `src/lib/query-keys.ts`
- `.claude/rules/forms-and-validation.md`: `**/schemas/**/*.ts`, `**/*.vue`, `src/components/form/**`
- `.claude/rules/graphify.md`: always relevant
- `.claude/rules/i18n.md`: `src/locales/**`, `**/*.vue`
- `.claude/rules/module-structure.md`: `src/modules/**`
- `.claude/rules/permissions.md`: `src/stores/permissions.ts`, `src/composables/useCan.ts`, `src/router/guards/**`, `**/*.vue`
- `.claude/rules/project-conventions.md`: always relevant
- `.claude/rules/routing.md`: `src/router/**`, `src/modules/**/*.routes.ts`, `src/modules/**/*.paths.ts`
- `.claude/rules/state-management.md`: `src/stores/**`, `**/stores/**`, `src/composables/**`
- `.claude/rules/styling.md`: `src/css/**`, `**/*.vue`
- `.claude/rules/testing.md`: `**/*.spec.ts`, `**/tests/**`, `**/vitest.config.ts`
- `.claude/rules/typescript.md`: `**/*.ts`, `**/*.vue`
- `.claude/rules/vue-ui.md`: `**/*.vue`

## Automated checks

- Hooks in `.claude/hooks/` (wired for Claude Code in `.claude/settings.json`, Gemini CLI in `.gemini/settings.json`, Codex in `.codex/hooks.json`, Cursor in `.cursor/hooks.json`): after each edit they run Prettier, RTL / convention / en-ar locale-parity checks, and ESLint on the file. Before edits they block lockfiles, `.env`, `*.generated.ts`, and build output. Before shell commands they block `vitest` without `--run`, force push, `--no-verify`, and `git reset --hard`. Fix what they report before moving on.
- No hooks in your tool? After editing, run `.claude/hooks/post-edit.sh <file>...` yourself and fix what it prints.

## Skills and subagents

- Skills (`fe-review`, `verify`, `add-endpoint`, `add-translation`, `new-feature`) are in `.claude/skills/`. Cursor reads that folder directly; Gemini CLI and Codex read it through the `.agents/skills` symlink. Their `SKILL.md` files are plain instructions: read and follow them if your tool does not load skills.
- Reviewer and test-writer subagent definitions: `.claude/agents/` (Claude Code), `.gemini/agents/` (Gemini CLI). Cursor reads `.claude/agents/` (its read-only `fe-reviewer` override is in `.cursor/agents/`). Without subagents, apply the checklist in `.claude/agents/fe-reviewer.md` yourself.

## Working style

- For anything touching more than 3 files, propose a plan first and wait for approval.
- Be concise. Show diffs, not whole files. Don't re-explain code I can read.
- Don't add dependencies, edit `package.json` scripts, or change `packageManager`/`engines` without asking.
- Never commit, push, or discard changes unless asked.
- For architecture or "where does X live" questions, if `graphify-out/GRAPH_REPORT.md` exists, read it before grepping the codebase.
