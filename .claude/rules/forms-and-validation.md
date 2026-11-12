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
- Bind submitted fields by `name` (`<Field.Text name="email" label="..." />`): `useForm` then owns the value and renders the error. Pass the label, hint and `required` through the field's props; no custom `<label>`, hint text or manual error rendering.
- `v-model` is allowed in two cases:
  - Search and filter inputs that are not part of the submitted form (for example bound to the table state `search`). They have no `name`.
  - A form field whose value the component must read or change: dependent fields, live preview, auto-filling another field, sections shown by the value. If you only need to read a named field, prefer `useFieldValue('name')` / `values` from `useForm`.
  Everywhere else use `name`. A field with `v-model` and no `name` is invisible to `useForm`: it is not validated or submitted.
- Server errors go to fields with `applyApiErrorToForm(error, ctx.setErrors, '<field>')` from `@/utils/apiError`, as `useLoginMutation` does.
- Images and files: follow the uploads rule (`.claude/rules/uploads.md`).
- Multi-step forms use `useMultiStepForm` with `MultiStepForm.vue` and `StepIndicator.vue` from `@/components/form`.
