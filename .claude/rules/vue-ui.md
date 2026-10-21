---
paths:
  - "**/*.vue"
---

# Vue components & UI

## Reuse existing primitives (never hand-roll)
- Base UI from `components/ui/` (or `shared/ui/`): Dialog, Button, Tabs, Accordion, Dropdown, Calendar.
- Inputs from `components/form/`: InputText, Select, DatePicker, Editor, ImageUpload, InputOtp, CheckboxGroup, TagsInput. No raw `<input>`/`<select>`.
- Overlays/feedback: `ConfirmDialog.vue`, `FormDialog.vue`, `toast.ts`. Never create a new modal wrapper.
- Empty/labels: `EmptyPlaceholder.vue`, `StatusBadge.vue`.

## Tables & lists
- Never write manual pagination or scroll logic.
- `useDataTable` / `useDataInfiniteScroll` / `useVirtualScroll` paired with `Table`, `InfiniteScrollTable`, `TablePagination` from `components/data-table/`.

## Forms
- Validation schemas from `utils/yupSchemas.ts`.
- Wizards: `useMultiStepForm` + `MultiStepForm.vue` + `StepIndicator.vue`.
- Uploads: `useUploadImage`, `useFormMedia` with `FileUpload` / `ImageUpload`.

## Styling (RTL-first)
- Logical properties only: `ms-* me-* ps-* pe-* start-* end-* text-start text-end border-s border-e rounded-s rounded-e`.
- Forbidden: `ml- mr- pl- pr- left- right- text-left text-right border-l border-r rounded-l rounded-r`.
- Merge dynamic classes with `cn()` (twMerge + clsx).

## Presentation & testing
- Format dates/currency/status via `formatter.ts`, `formatText.ts`, `formatStatus.ts` — no inline formatting.
- Every interactive element and critical boundary gets `data-test` from `lib/test-ids.ts` (no string literals).

## Isomorphic safety
- No `window`, `document`, `localStorage` at the root of `<script setup>`; wrap in `onMounted`.
- Auth tokens via `useCookie()` so SSR can read them.
