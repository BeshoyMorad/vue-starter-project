---
paths:
  - "src/types/**"
  - "**/services/**/*.ts"
  - "**/composables/**/*.ts"
  - "**/*.vue"
  - "tests/**"
---

# API contract

- The backend envelope is described once, in `src/types/global.d.ts`: `ApiResponse<T>`, `ApiErrorResponse`, `Meta`, `CursorMeta`, `OffsetPaginatedResponse<T>`, `CursorPaginatedResponse<T>`. They are global, so use them without importing.
- Type every request with them: `api.get<ApiResponse<User>>(...)`, `api.get<OffsetPaginatedResponse<User>>(...)`. Services return the unwrapped payload; components never read `response.data.data`.
- Never redeclare the envelope or pagination shapes locally (`interface UserResponse { data: ...; message: string }`, a custom `PaginationMeta`, inline `{ data: T[]; meta: {...} }`).
- Never build an adapter layer to reshape a backend response into the contract (`mapMeta`, `normalizePagination`, a `transformResponse` that renames fields). Different backends have different contracts, and this is solved once per project:
  1. Edit the interfaces in `src/types/global.d.ts` to match the real backend.
  2. Run `pnpm type-check` and fix every error it reports (`useDataTable`, `useDataInfiniteScroll`, table components, services, MSW mocks, tests, `modules/doc` examples).
  3. Do not make fields optional just to silence errors.
- Do not cast API data to contract types (`as Meta`, `as ApiResponse<T>`, `as unknown as`). Type the request, or narrow with `in` / a type guard.
- Errors are typed `ApiErrorResponse` and read only through `@/utils/apiError`. Never read `error.response.data.message` directly.
