---
name: add-endpoint
description: Add a new API call end to end (endpoint route, query key, service, composable, typed response). Use when a feature needs a new backend call, list, detail, or mutation.
---

# Add an API call

Follow the existing pattern of a nearby module. Do not create a second HTTP client, inline query keys, or hardcoded URLs.

1. **Route.** Add a named route to the `routes` object in `src/lib/api/endpoints.ts`. Call it only through `apiRoute('name')`.
2. **Query key.** Add a factory to `QUERY_KEYS` in `src/lib/query-keys.ts` (`all`, `list`, `details(id)` as the existing groups do).
3. **Types.** Add request and response types in ``src/modules/<feature>/types.ts``. Use `interface`, not `type`.
4. **Service.** Add a small `async` function in ``src/modules/<feature>/services/index.ts``. It uses the shared `api` instance from `@/lib/api/client` and returns a typed payload. No toasts, no `try/catch`: the client handles errors.
5. **Composable.** Wrap it in ``src/modules/<feature>/composables/`` with `useQuery`, `useMutation`, or `useInfiniteQuery`.
   - Lists and tables: use `useDataTable` or `useDataInfiniteScroll` instead of writing pagination.
   - Mutations: invalidate with `queryClient.invalidateQueries({ queryKey: QUERY_KEYS.<group>.all() })` and show success with the toast helper. Map field errors with `applyApiErrorToForm`.
6. **Test.** Add a spec next to the composable or service using the MSW `server` from `tests/setup.ts`.
7. Nothing SSR-specific: this is a Vite SPA.

Finish with the `verify` skill.
