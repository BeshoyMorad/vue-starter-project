---
paths:
  - "**/*.ts"
  - "**/*.vue"
---

# TypeScript and lint limits (enforced by ESLint)

- No `any` (`@typescript-eslint/no-explicit-any` is an error). Use `unknown` and narrow, or a real type.
- Object shapes use `interface`, not `type` aliases (`consistent-type-definitions`). Arrays are `User[]`, not `Array<User>`.
- Type-only imports use `import type { X }` (`consistent-type-imports`).
- Avoid non-null `!` assertions (warn). Unused variables must start with `_` to be allowed as arguments.
- No `@ts-ignore` / `@ts-nocheck`. `@ts-expect-error` and `eslint-disable` need a one-line reason.
- Every type must earn its place. No alias that only renames another type, no hand-written copy of a type that already exists (use `yup.InferType`, `ReturnType`, `Parameters`, component props, or the global contract types), no annotations the compiler already infers (`const n: number = 1`). Exported functions and composables keep explicit return types.
- Be precise: string unions or `as const` objects instead of `string`, discriminated unions instead of bags of optional flags, `Record<Union, T>` when keys are known, `satisfies` for config objects, no `enum`. `ref<User | null>(null)`, never bare `ref(null)`.
- Do not cast to silence the compiler (`as X`, `as unknown as X`, `!`). Narrow with a type guard. A cast needs a one-line reason.
- `types/` folders hold only `type` and `interface`. Runtime values go in `constants/` or `utils/`.
- Files stay under 300 lines and functions under ~50 lines (configured in `eslint.config.ts`). Split a component or composable before it grows past that.
- Use the `@/` alias for anything outside the current module folder; parent-relative `../` imports warn.
- Vue SFC: block order `<script>`, `<template>`, `<style>`. Attribute order follows `vue/attributes-order` (definition, conditionals, list rendering, ..., events, content). Let `pnpm lint:fix` order them.
- No `console.log` in committed code.
