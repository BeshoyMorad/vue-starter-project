---
paths:
  - "src/stores/permissions.ts"
  - "src/composables/useCan.ts"
  - "src/router/guards/**"
  - "**/*.vue"
---

# Permissions

- Permissions are `resource.action` strings, for example `users.list`.
- In components, use `can()` from `usePermissionStore` and call `can('resource.action')`. In stores, use `usePermissionStore().can`. Do not re-parse permission strings by hand.
- `can()` takes an optional operator for multiple permissions: `can(['a.list', 'b.list'], 'and')`. The default is `'or'`.
- Templates hide or disable controls with `v-if="can('...')"`. Keep the UI safe when `can` is false.
- Protect routes too, not only buttons. Add a guard in `src/router/guards/` and attach it through `beforeEnter`, the same way `authGuard` is wired.
- Known gap: the store's `permissions` is a fixed stub (`admin: ['list']`), and the link to the authenticated user's role is commented out in `src/stores/permissions.ts`. Treat it as a placeholder until that is wired.
