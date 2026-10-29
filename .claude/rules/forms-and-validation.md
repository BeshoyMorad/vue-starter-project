---
paths:
  - "**/schemas/**/*.ts"
  - "**/*.vue"
  - "src/components/form/**"
---

# Forms and validation

- This starter uses **vee-validate with yup**, not zod. Wire forms with `useForm({ validationSchema: toTypedSchema(schema) })`, where `useForm` comes from `vee-validate` and `toTypedSchema` from `@vee-validate/yup`.
- Schemas live in `modules/<feature>/schemas/<name>.schema.ts`. Export `schema` and a form type derived from it, following `login.schema.ts`:

  ```ts
  export const schema = yup.object({ ... });
  export type LoginForm = Partial<yup.InferType<typeof schema>>;
  ```

  Reuse the inferred type. Do not hand-write a second copy of the shape.
- Reusable rules come from `@/lib/yup`: `phoneSchema`, `passwordSchema`, `positiveNumberSchema`, `percentageSchema`, `requiredMediaSchema`, `optionalMediaSchema`. `setupYupLocale()` runs once in `main.ts`, so messages come from the `yup` locale namespace. Add new messages to `src/locales/{en,ar}/yup.json`.
- Field components come from `@/components/form` (for example `Field.Text`, `Field.Password`, `Field.Select`). Match the wiring of the nearby form in the same module.
- Server errors go to fields with `applyApiErrorToForm(error, ctx.setErrors, '<field>')` from `@/utils/apiError`, as `useLoginMutation` does.
- Uploads use `useFormMedia` and `useUploadImage` from `@/composables`. Pass `MediaValue` through `extractMediaPayload`.
- Multi-step forms use `useMultiStepForm` with `MultiStepForm.vue` and `StepIndicator.vue` from `@/components/form`.
