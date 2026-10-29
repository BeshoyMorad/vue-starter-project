---
paths:
  - "src/modules/**"
---

# Module structure

- Feature code lives in `src/modules/<feature>/`. Keep feature-only code there.
- Shared code lives in `src/components/`, `src/composables/`, `src/utils/`, `src/lib/`, and `src/stores/`. Move code there only when a second module needs it.
- Match the layout of the module you are editing. Not every folder is required:

```text
src/modules/<feature>/
  <feature>.routes.ts      # RouteRecordRaw[] (see routing rule)
  <feature>.paths.ts       # route name constants
  pages/                   # page components (or top-level Login.vue, Index.vue)
  components/              # feature-only UI
  composables/             # feature hooks wrapping useQuery / useMutation
  services/index.ts        # API calls: `api` + `apiRoute()`, typed returns
  schemas/<name>.schema.ts # yup schemas
  stores/                  # Pinia stores for client state only
  types.ts                 # request / response types
```

- Services are an object of `async` functions, for example `authServices.login`. Keep transforms in services or composables, not in components.
- `src/modules/doc/` is the component and composable showcase. Do not add product features there.
