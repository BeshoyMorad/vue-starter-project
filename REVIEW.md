# Review rules (used by Claude Code Review on PRs)

Only report issues in changed lines. Severity: blocker > major > nit. Skip style nits that lint or Prettier already catch. Stack: Standard Vue 3 SPA.

## Blockers
- `window`/`document`/`localStorage` read directly in a component or composable instead of through a store using `useLocalStorage` (breaks tests and the persistence contract)
- Auth tokens, refresh tokens, or user data stored anywhere except `src/stores/auth.ts`
- Secrets or `VITE_` values committed; new env var not added to `src/config/env.ts` and `.env.example`
- Navigation with a raw path string instead of `paths` route names; route left unguarded where siblings use `authGuard`

## Major
- Envelope/pagination types redeclared locally, an adapter layer over API responses, or `as Meta`-style casts instead of editing the global contract in `src/types/global.d.ts`
- Own file/image upload code, `useUploadImage` called from a component for a form field, or `File`/`tempUrl`/`MediaValue` sent in an API payload (use `Field.*Upload` + `useFormMedia`)
- `v-model` on a submitted form field where nothing reads or changes the value (search/filter inputs and fields the component must read or change are fine)
- `v-html`/`innerHTML` with unsanitized data, `target="_blank"` without `rel="noopener noreferrer"`, unvalidated redirect targets
- `@click` on non-interactive elements, icon-only buttons without `aria-label`, missing `alt`, `outline-none` without a focus style
- Async view missing its loading, empty or error state; destructive action without `ConfirmDialog`
- Useless or hand-copied types, needless casts or `!` assertions, `@ts-ignore`
- `v-for` without a stable `:key`, whole-library imports (`lodash`, `moment`)
- New component/composable/util duplicating an existing primitive (`components/ui`, `components/form`, `components/data-table`, `composables/`)
- Inline `queryKey` arrays, hardcoded API URLs, manual toasts in `try/catch`, a second HTTP client
- Server data copied into Pinia instead of read through Vue Query
- Manual pagination / scroll logic instead of `useDataTable` / `useDataInfiniteScroll` / `useVirtualScroll`
- Physical Tailwind direction classes (breaks Arabic RTL)
- Hard-coded UI string, or a key added to only one of `en` / `ar`, or an `ar` value left in English
- `any`, `as any`, or `@ts-ignore` (a reason comment is required for `@ts-expect-error` and `eslint-disable`)
- New logic (composable, service, schema, util) with no spec
- Raw `<input>`, `<select>`, custom modal, or table instead of the shared primitives
- Raw hex color or arbitrary color value instead of a design token; new semantic token without `light-dark()`
- Route added without `meta.title`, a lazy import, or a permission/auth guard where the neighbouring routes have one

## Nit
- Missing `data-test-id` (value from `TEST_IDS`) on interactive elements; `data-test=` is the wrong attribute
- Inline date/currency/status formatting instead of `formatter.ts` / `formatText.ts` / `formatStatus.ts`
- Parent-relative import (`../x`) instead of the alias
- Component over 300 lines or function over ~50 lines that should be split
- `console.log` left in

## Skip
- Pre-existing problems in lines the PR did not touch.
- Demo and showcase code under `src/modules/doc/` and `src/modules/starter/` unless the PR changes how it is meant to be used.
- Generated files (`*.generated.ts`) and lockfiles.
