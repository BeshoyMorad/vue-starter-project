# Review rules (used by Claude Code Review on PRs)

Only report issues in changed lines. Severity: blocker > major > nit. Skip style nits that lint already catches.

## Blockers
- `window`/`document`/`localStorage` at the root of `<script setup>` (SSR crash)
- Cross-domain imports (`domains/a` → `domains/b`) or relative imports across `apps/*`
- Auth token stored outside `useCookie()`

## Major
- New component/composable duplicating an existing primitive in `components/ui`, `components/form`, `components/data-table`
- Inline `queryKey` arrays, hardcoded API URLs, manual toasts in `try/catch`
- Manual pagination / scroll logic instead of `useDataTable` / `useDataInfiniteScroll` / `useVirtualScroll`
- Physical Tailwind direction classes (breaks Arabic RTL)

## Nit
- Missing `data-test` from `lib/test-ids.ts` on interactive elements
- Inline date/currency formatting instead of `formatter.ts`
