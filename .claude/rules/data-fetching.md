---
paths:
  - "**/services/**/*.ts"
  - "**/composables/**/*.ts"
  - "**/api/**/*.ts"
  - "**/*.vue"
  - "src/lib/query-keys.ts"
---

# Data fetching (TanStack Query)

- All HTTP goes through the shared `api` instance from `@/lib/api/client` (auth header, device-id, 401/403/500 handling). Do not create another Axios instance.
- Build URLs only with `apiRoute('name')` from `@/lib/api/endpoints`. Add new route names to the `routes` object in that file first. No hardcoded `/api/...` strings.
- Services are small `async` functions in `modules/<feature>/services/index.ts` that return typed payloads. `queryFn` and mapping belong in services or composables, not in components.
- Server state uses TanStack Vue Query: `useQuery`, `useMutation`, `useInfiniteQuery`.
- Query keys come from the `QUERY_KEYS` registry in `src/lib/query-keys.ts`, for example `QUERY_KEYS.starter.profile()`. Add new keys there before using them. Never inline arrays like `queryKey: ['users', id]`.
- After a mutation, invalidate through `useQueryClient()` using the registry, for example `invalidateQueries({ queryKey: QUERY_KEYS.users.all() })`. Do not mirror server data in Pinia.
- Lists and tables:
  - `useDataTable` for offset pagination.
  - `useDataInfiniteScroll` for infinite lists.
  - Both call `fetchTableData` from `@/lib/api/table` and take an `endpoint` and a `queryKey`.
  - Do not write manual pagination or scroll logic.
- Errors are handled by the client interceptors and `@/utils/apiError`. Do not add a `try/catch` that toasts manually. Map field errors onto forms with `applyApiErrorToForm` (see the forms rule). Use `@/utils/toast` for success messages.
