---
paths:
  - "src/stores/**"
  - "**/stores/**"
  - "src/composables/**"
---

# State management

- **Pinia** holds client, session, and UI state only:
  - Auth in `src/stores/auth.ts`: access and refresh tokens and the user, all persisted with `useLocalStorage` from `@vueuse/core`.
  - Permissions in `src/stores/permissions.ts`.
  - Module UI state, for example `modules/starter/stores/starterStore.ts`.
- **Vue Query** owns all API-backed state: lists, details, mutations, and infinite queries. Caching, refetch, and staleness belong there.
- Do not copy API entity data into Pinia. Read it through a query in a composable.
- Keep storage keys as constants, as `auth.ts` does.
- Logout goes through `authStore.clearAuth()`, which clears the query cache. Keep that path intact.
- Local component state uses `ref` and `computed`. Share state across components with a store or `provide`/`inject`.
