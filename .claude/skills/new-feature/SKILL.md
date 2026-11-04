---
name: new-feature
description: Scaffold a new feature module under src/modules/<feature>/ (routes, paths, page, service, composable, schema, locales, test ids). Use when asked to add a screen, section, or business feature.
---

# New feature module

Look at `src/modules/auth/` (services, schemas, composables) and `src/modules/starter/` (pages, components, stores) first and mirror them. Reuse before you write: check `src/components/`, `src/composables/`, and `src/utils/`.

1. **Layout.** Create only the folders you need under `src/modules/<feature>/`: `<feature>.routes.ts`, `<feature>.paths.ts`, `pages/`, `components/`, `composables/`, `services/index.ts`, `schemas/<name>.schema.ts`, `stores/`, `types.ts`.
2. **Paths and routes.** `<feature>.paths.ts` exports the route-name object; `<feature>.routes.ts` exports `RouteRecordRaw[]` with lazy pages, `meta.title`, and the guard (`authGuard` under `AppLayout`). Spread the paths into `src/router/paths.ts` and the routes into `src/router/index.ts`.
3. **Data.** Use the `add-endpoint` skill for every API call.
4. **Page.** Wrap content in `PageWrapper` (`title`, `subtitle`, header buttons in `actions`). Lists use `Table`/`InfiniteScrollTable` with `useDataTable`/`useDataInfiniteScroll`. Forms follow the forms rule (vee-validate + Yup, `Field.*`, `applyApiErrorToForm`).
5. **Text.** Use the `add-translation` skill for every string (en and ar).
6. **Test ids.** Add keys to `src/lib/test-ids.ts` and bind `:data-test-id` on interactive elements.
7. **Permissions.** Gate buttons with `can('resource.action')` and the route with a guard.
8. **Tests.** Add specs for composables, services, and schemas. Then run the `verify` skill.

Do not add anything to `src/modules/doc/`.
