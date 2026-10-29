---
paths:
  - "**/*.vue"
---

# Vue components & UI

## SFC shape
- `<script setup lang="ts">` only (no Options API). Block order: `<script>`, `<template>`, then `<style>` only if unavoidable.
- `defineProps<Props>()` and `defineEmits<Emits>()` with typed interfaces. Use `defineModel()` for two-way bindings.
- Use `@formkit/auto-animate` for list transitions where the component already uses it.

## Reuse before you write
- Base primitives live in `src/components/ui/` (reka-ui based): Accordion, Avatar, Button, Calendar, Card, Combobox, Dialog, DropdownMenu, Popover, Table, Tooltip, Sidebar, and others. Use them. Do not hand-roll them.
- Form controls come from `@/components/form`.
- Overlays and feedback: `ConfirmDialog` and `FormDialog` from `@/components`, and toasts from `@/utils/toast`. Do not create new modal wrappers.
- States: `EmptyPlaceholder`, `TableErrorState`, `ExceptionState`, `StatusBadge`.
- Shared components go in `src/components/` only when more than one module uses them, and must be exported from `src/components/index.ts`. Feature components stay in `modules/<feature>/components/`.
- Components use **reka-ui and Tailwind**. Do not add PrimeVue.

## Page layout
- Wrap page content in `PageWrapper` from `@/components`, with `title` and `subtitle` props. Put header buttons in its `actions` slot.

## Tables & lists
- Use `Table` or `InfiniteScrollTable` from `@/components` with `useDataTable` or `useDataInfiniteScroll` (see the data-fetching rule).
- Columns are `ColumnDef<TRow, unknown>[]` from `@tanstack/vue-table`, as in the existing modules.

## Styling (RTL-first)
- Logical properties only: `ms-* me-* ps-* pe-* start-* end-* text-start text-end border-s border-e rounded-s rounded-e`.
- Forbidden: `ml- mr- pl- pr- left- right- text-left text-right border-l border-r rounded-l rounded-r`.
- The `check-rtl.sh` hook blocks these after every edit, so fix them before finishing.
- See the styling rule for tokens and `cn()`.

## Test hooks & formatting
- Interactive elements and critical boundaries get `data-test-id`, with the value taken from `TEST_IDS` in `src/lib/test-ids.ts`. Add new keys there. Do not use string literals.
- Format dates, currency, and status with `@/utils/formatter`, `formatText`, and `formatStatus`. No inline formatting.

## Browser state
- This is a Vite SPA, not SSR. Persist auth values through `useLocalStorage` in `stores/auth.ts`. Do not read `localStorage` directly in components.
