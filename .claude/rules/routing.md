---
paths:
  - "src/router/**"
  - "src/modules/**/*.routes.ts"
  - "src/modules/**/*.paths.ts"
---

# Routing

- Route names are constants. Import `paths` from `@/router/paths` and use `{ name: paths.<module>.<route> }` in `router.push`, `RouterLink`, and guards. Never write raw path strings for navigation.
- Each module exports a `<feature>.paths.ts` (nested object of names) and a `<feature>.routes.ts` (`RouteRecordRaw[]`).
- Register them in the central files:
  - Spread the module's paths into `paths` in `src/router/paths.ts`.
  - Spread the module's routes into the `routes` array in `src/router/index.ts`.
- Lazy-load every page: `component: () => import('./Login.vue')` or `() => import('@/modules/<feature>/pages/...')`.
- Guards:
  - App screens sit under `AppLayout` with `beforeEnter: [authGuard]`.
  - Auth screens sit under `AuthLayout` with `beforeEnter: [guestGuard]`.
- Set `meta.title` on every route. Set `meta.sidebar: false` on screens that should not show the app shell, such as the error pages.
- Error routes are `paths.errors.*`. The Axios client redirects to them on 403 and 500, so keep those names.
