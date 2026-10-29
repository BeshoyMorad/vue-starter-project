---
paths:
  - "src/css/**"
  - "**/*.vue"
---

# Styling & design tokens

- Tailwind CSS v4 (`@tailwindcss/vite`). Prefer utility classes. Avoid `<style>` blocks except for keyframes or truly local exceptions.
- Colors come from tokens in `src/css/token.css` (`@theme`), never raw hex in components. Token families:
  - Semantic: `--color-bg-*`, `--color-text-*`, `--color-border-*`.
  - Palette scales: `--color-primary-*`, `--color-neutral-*`, `--color-success-*`, `--color-danger-*`, `--color-warning-*`, `--color-info-*`.
- Every new semantic token gets both modes with `light-dark()`, referencing palette scales:

  ```css
  --color-bg-custom: light-dark(var(--color-neutral-100), var(--color-neutral-900));
  ```

  Shared primitives must not hardcode light-only colors.
- To remove a token, grep for its usages first, then delete it from `token.css`.
- Compose classes with `cn()` from `@/utils`. Build variants with CVA (`class-variance-authority`), following `components/ui/button`.
- Icons: render them with the `Icon` component from `@/components` and pass the icon class through its `icon` prop. `iconVariants` controls size and color.
