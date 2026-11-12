---
paths:
  - "**/*.vue"
  - "src/css/**"
---

# Accessibility and UX

## Accessibility (WCAG 2.2 AA)
- Use native elements: `<button>` for actions, `<a href>` for navigation. Never `@click` on a `div`/`span`/`li`.
- Every interactive element has an accessible name. Icon-only buttons get a translated `aria-label`. Inputs get their label through the field's `label` prop (a placeholder is not a label). Images get `alt` (`alt=""` when decorative); decorative icons get `aria-hidden="true"`.
- Use the shared reka-ui primitives for menus, tabs, comboboxes and dialogs. They already handle roles, arrow keys, Esc and focus return. Do not hand-roll them.
- Never remove focus outlines: `outline-none` needs a visible `focus-visible:` style. No positive `tabindex`.
- Do not convey information by color alone. Use tokens for contrast (4.5:1 text, 3:1 large text and UI parts). Respect `prefers-reduced-motion`.
- Errors and toasts are announced (`role="alert"` / `aria-live`); the shared field and toast components do this, so do not build your own.
- Layouts survive 200% zoom and 320px width. Touch targets are at least 24x24 CSS px (prefer 44). Headings do not skip levels; each page has one `h1` inside `PageWrapper`.

## UX
- Every async view has loading (skeleton), empty (`EmptyPlaceholder`), error with retry (`TableErrorState` / `ExceptionState`) and success states. Lists tell "no data", "no search results" and "no results for filters" apart.
- Triggers show a pending state and are disabled while pending. Success and failure always give feedback.
- Destructive actions use `ConfirmDialog` and name the affected item.
- Correct input types and `autocomplete`/`inputmode`; validation errors in plain language next to the field; focus moves to the first invalid field.
- One primary button per view, verb labels, same wording for the same concept. Layouts must handle long text and Arabic (RTL).
- Debounce search, avoid flicker on filter changes, and keep search, filters and page in the URL when users would expect to share or reload them.
