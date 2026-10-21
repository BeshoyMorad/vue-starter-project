---
paths:
  - "**/composables/**/*.ts"
  - "**/api/**/*.ts"
  - "**/queries/**/*.ts"
  - "**/*.vue"
---

# Data fetching (TanStack Query)

- Query keys come from `lib/query-keys.ts` (or the domain's key factory). Never inline arrays like `queryKey: ['users', id]`.
- Endpoints come from `apiRoute()` in `lib/api/endpoints.ts`. No hardcoded URL strings.
- Errors are handled by `utils/apiError.ts` and the shared Axios/ofetch client. Don't add per-component `try/catch` that toasts manually.
- A new query or mutation means: add the key to the factory first, then use it.
