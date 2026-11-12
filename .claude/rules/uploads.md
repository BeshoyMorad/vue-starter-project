---
paths:
  - "**/*.vue"
  - "src/composables/**"
  - "src/components/form/**"
  - "**/schemas/**/*.ts"
---

# Images and files

Every upload in the system goes through one pipeline.

- Forms use `Field.ImageUpload` / `Field.FileUpload`. The field value is a `MediaValue` (`src/types/media.ts`). Never build your own `<input type="file">`, `FileReader`, `FormData` or `XMLHttpRequest` upload.
- Upload on submit with `useFormMedia` from `@/composables`, before the mutation:

  ```ts
  const { uploadFormMedia, extractMediaPayload, isUploading } = useFormMedia();
  await uploadFormMedia(values, 'PHOTO', setFieldValue);
  const { mediaIdsToAdd, mediaUrlsToRemove } = extractMediaPayload(values);
  ```

  `serializeMediaValues(values)` is the alternative when the API takes one id/url per field. Payloads never contain a `File`, a `tempUrl` or a whole `MediaValue`. Disable the submit button while `isUploading` or the mutation is pending.
- `src/composables/useUploadImage.ts` is the only code that talks to the backend for uploads. Do not call it from a component for a form field, and do not add a second upload composable, service or endpoint helper.
- The backend-specific part (presigned URL + PUT, or a dedicated upload endpoint; the shape of what comes back: `mediaId`, url, ...) lives in the marked block at the top of `useUploadImage.ts` and in `src/types/media.ts`. If the backend differs, edit those two files once, run `pnpm type-check`, and fix the errors. Do not add a mapping layer beside them.
- Schemas use `requiredMediaSchema` / `optionalMediaSchema` from `@/lib/yup`. Type and size limits are set on the field (`accept`, `maxSize`) and are not trusted alone: the backend validates too.
- Edit forms start from `createMediaValue` / `createMediaValueList`. Removed server files go to `mediaUrlsToRemove`. Retrying a failed submit must not re-upload files that already have a `mediaId` (`uploadFormMedia` skips them).
- Upload errors are shown by `useUploadImage` through `@/utils/apiError`. Do not toast them again.
