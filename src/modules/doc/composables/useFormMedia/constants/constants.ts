import type { DocPageContent, DocSection } from '@/modules/doc/shared/types';

const SHAPE_CODE = `// src/types/media.ts
export interface MediaValue {
  file: File | null;        // file chosen by the user
  tempUrl: string;          // blob url for the preview
  mediaId: string | null;   // filled after the upload (cache)
  initialUrl: string | null;// url from the server in edit mode
  isChanged: boolean;       // user selected or removed something
  wasRemoved: boolean;      // initialUrl was removed or replaced
  fileName?: string;        // display name for non-image files
}

// state table
// untouched existing   file null,  isChanged false, initialUrl 'https://...'
// new file             file File,  isChanged true,  mediaId null -> 'm1' after upload
// replaced             new file + wasRemoved true (old initialUrl must be deleted)
// removed              file null,  isChanged true,  wasRemoved true`;

const API_CODE = `const { isUploading, uploadFormMedia, extractMediaPayload } = useFormMedia();

uploadFormMedia(values, serviceType, setFieldValue?)  : Promise<void>
  walks values (nested objects and arrays), uploads every MediaValue where
  isChanged && file && !mediaId, in parallel through useUploadImage, then
  writes mediaId back (setFieldValue(path, ...)). isUploading is true meanwhile.

extractMediaPayload(values, { usePayloadItems? }) : { mediaIdsToAdd, mediaUrlsToRemove }
  mediaIdsToAdd     ids of changed values (strings, or { id, key } with usePayloadItems)
  mediaUrlsToRemove initialUrl of every changed value with wasRemoved

// helpers exported from the same file and from @/composables
isMediaValue(val)                 type guard
createMediaValue(url?, fileName?) MediaValue for edit mode
createMediaValueList(items)       MediaValue[] from urls or { url, fileName }
serializeMediaValues(values)      MediaValue -> mediaId | initialUrl (simple payloads)`;

const USAGE_CODE = `const onSubmit = handleSubmit(async (values) => {
  await uploadFormMedia(values, 'PHOTO', setFieldValue);
  const { mediaIdsToAdd, mediaUrlsToRemove } = extractMediaPayload(values);
  await mutateAsync({ ...rest, mediaIdsToAdd, mediaUrlsToRemove });
});

const isPending = computed(() => isMutating.value || isUploading.value);`;

const NOTES_CODE = `- Works on any depth: logo, profile.avatar, documents[2].file, attachments[0]
- Paths are bracket style (attachments[0]) so setFieldValue accepts them
- Safe to call twice: values that already have a mediaId are skipped
- If one upload fails, Promise.all rejects, isUploading resets (finally) and the
  error toast comes from useUploadImage; the files that succeeded keep their mediaId
- It does not validate. Use optionalMediaSchema / requiredMediaSchema in the schema`;

const SECTIONS: readonly DocSection[] = [
  {
    title: 'What it is',
    description:
      'useFormMedia turns the media fields of a form into API-ready ids. It is the bridge between Field.ImageUpload / Field.FileUpload and useUploadImage. Import from @/composables.',
    code: `import { useFormMedia, createMediaValue, createMediaValueList, serializeMediaValues } from '@/composables';`,
    header: 'import',
  },
  {
    title: 'MediaValue',
    description:
      'One object describes a file through its whole life. All logic is based on its flags.',
    code: SHAPE_CODE,
    header: 'MediaValue',
  },
  {
    title: 'API',
    description: 'Two functions and a loading flag, plus helpers.',
    code: API_CODE,
    header: 'API',
  },
  {
    title: 'Typical usage',
    description: 'Always inside handleSubmit.',
    code: USAGE_CODE,
    header: 'usage',
  },
  {
    title: 'Good to know',
    description: 'Behavior details that matter when debugging.',
    code: NOTES_CODE,
    header: 'notes',
  },
];

export const DOC_CONTENT: DocPageContent = {
  title: 'useFormMedia',
  description:
    'Manage selected, uploaded, replaced and removed files in forms. Prevents duplicate uploads and builds the add and remove lists for the API.',
  sections: SECTIONS,
};
