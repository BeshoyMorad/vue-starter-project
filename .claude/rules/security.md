---
paths:
  - "**/*.vue"
  - "**/*.ts"
---

# Security

- No `v-html` / `innerHTML` / `insertAdjacentHTML` / `eval` / `new Function` with data that is not sanitized. Rich text goes through the sanitizer the editor component already uses.
- `target="_blank"` always has `rel="noopener noreferrer"`.
- Validate redirect targets (`route.query.redirect`) as internal paths before `router.push`. Validate protocols of URLs built from user or API data (no `javascript:`).
- No secrets, keys or tokens in source or fixtures. Everything `VITE_*` ships to the browser: add new variables to `src/config/env.ts` and `.env.example`, and never put a secret there.
- Tokens and user data live only in `src/stores/auth.ts`. Never log or toast request/response objects, put tokens or personal data in URLs, or show raw server error text (use `@/utils/apiError`).
- Hiding a button is not authorization: gate with `can('resource.action')` and a route guard; the backend enforces it.
- Build URLs through `apiRoute()` with params, never by string concatenation of user input.
- Client-side validation is UX, not security. Upload limits and file type checks are repeated on the server (see the uploads rule).
- New dependencies need a reason: do not add a package for one helper, or one that duplicates an existing package.
