---
paths:
  - "apps/**"
  - "packages/**"
  - "domains/**"
  - "core/**"
  - "shared/**"
---

# Import boundaries

- Monorepo: no relative imports across `apps/*` boundaries; import shared code via its package name. `packages/ui` and `packages/core` stay SSR-safe with `"sideEffects": false`.
- FSD/DDD: `app → domains → core → shared` only. A file in `domains/x` never imports from `domains/y`. `shared/` imports nothing from above it.
- If a change seems to need a forbidden import, stop and propose moving the shared piece down a layer instead.
