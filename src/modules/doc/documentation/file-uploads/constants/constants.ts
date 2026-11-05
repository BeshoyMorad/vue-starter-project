import type { DocSection } from '@/modules/doc/shared/types';

export const FILE_UPLOADS_DOC = {
  title: 'Uploading Images and Files in Forms',
  description:
    'The right way to add an image or file to any form: the field holds a MediaValue, the form composable uploads changed files with useFormMedia (which uses useUploadImage and presigned urls), and the API receives only media ids and urls to remove. Reference: CustomTokenForm and useCustomTokenForm in src/modules/helper.',
} as const;

const PIECES_ITEMS = [
  {
    name: 'Field.ImageUpload',
    description:
      'One image. v-model / form value is MediaValue | null. Has preview, crop, size presets, type and size validation.',
  },
  {
    name: 'Field.FileUpload',
    description:
      'Many files (documents). Form value is MediaValue[]. Supports maxFiles, allowedTypes, maxSizeMb.',
  },
  {
    name: 'MediaValue',
    description:
      'The state object of one file: file, tempUrl, mediaId, initialUrl, isChanged, wasRemoved, fileName. Type in src/types/media.ts.',
  },
  {
    name: 'useFormMedia()',
    description:
      'uploadFormMedia (upload everything changed), extractMediaPayload (ids to add and urls to remove), isUploading. Also createMediaValue, createMediaValueList, serializeMediaValues.',
  },
  {
    name: 'useUploadImage()',
    description:
      'The mutation that asks the backend for presigned urls and PUTs the files to storage. Used by useFormMedia; call it directly only outside forms.',
  },
  {
    name: 'optionalMediaSchema / requiredMediaSchema',
    description: 'Yup rules from @/lib/yup for a media field.',
  },
] as const;

const FLOW_CODE = `1. User picks a file          Field sets MediaValue { file, tempUrl, isChanged: true }
2. User clicks submit        handleSubmit validates the schema first
3. uploadFormMedia           finds every MediaValue with a new file and no mediaId,
                             uploads them in parallel:
                               POST storage/presigned-url   -> { mediaId, presignedUrls }
                               PUT  <presigned url>         -> file goes straight to storage
                             then stores the mediaId back with setFieldValue
4. extractMediaPayload       -> { mediaIdsToAdd: [ids], mediaUrlsToRemove: [old urls] }
5. mutateAsync(payload)      the API only ever sees ids and urls, never files
6. mediaId is cached         if step 5 fails and the user retries, nothing is uploaded twice`;

const CREATE_CODE = `// schema
export const schema = yup.object({
  name: yup.string().required().label('Name'),
  logo: optionalMediaSchema(),            // or requiredMediaSchema() when mandatory
});

// composable
const { uploadFormMedia, extractMediaPayload, isUploading } = useFormMedia();
const isPending = computed(() => isMutating.value || isUploading.value);

const onSubmit = handleSubmit(async (values) => {
  await uploadFormMedia(values, 'ASSETS', setFieldValue);   // serviceType, see below
  const { mediaIdsToAdd } = extractMediaPayload(values);
  await mutateAsync({ name: values.name, mediaIdsToAdd: mediaIdsToAdd as string[] });
});

// template: the name is the schema key. Nothing else to wire.
// <Field.ImageUpload name="logo" size-preset="avatar" crop :test-id="TEST_IDS.x.logo" />
// <Button type="submit" :loading="isPending" :disabled="isPending">Save</Button>`;

const EDIT_CODE = `// Wrap the existing server url so the field shows it and knows it is unchanged
resetForm({
  values: {
    name: asset.name,
    logo: createMediaValue(asset.logo),                 // single
    attachments: createMediaValueList(asset.files),     // list: strings or { url, fileName }
  },
});

// Untouched image  -> isChanged false -> not uploaded, not in the payload
// Replaced image   -> new mediaId in mediaIdsToAdd + old url in mediaUrlsToRemove
// Removed image    -> old url in mediaUrlsToRemove

const { mediaIdsToAdd, mediaUrlsToRemove } = extractMediaPayload(values);
await updateAsset({ id, name: values.name, mediaIdsToAdd, mediaUrlsToRemove });`;

const MULTI_CODE = `// Several files in one field
// schema:   attachments: yup.array().default([])
// template: <Field.FileUpload name="attachments" :max-files="5" :max-size-mb="10"
//             :allowed-types="['application/pdf']" :test-id="TEST_IDS.x.files" />
// payload:  extractMediaPayload(values)  -> every changed file in the list

// Several different media fields (cover + logo): ask for { id, key } items.
// key is the form field name, so the backend knows which id belongs to which field.
const { mediaIdsToAdd } = extractMediaPayload(values, { usePayloadItems: true });
// [{ id: 'm1', key: 'cover' }, { id: 'm2', key: 'logo' }]

// Backend wants one url or id per field instead of add/remove lists?
const body = serializeMediaValues(values);   // MediaValue -> mediaId if changed, else initialUrl`;

const SERVICE_TYPE_CODE = `// src/composables/useUploadImage.ts
export type StorageServiceType = 'PHOTO';     // add the values your backend accepts
//                              'PHOTO' | 'ASSETS' | 'DOCUMENT'

// The helper module calls uploadFormMedia(values, 'ASSETS', setFieldValue):
// extend the union before you use a new value, and use the same string in the
// presigned-url request the backend validates.`;

const PITFALLS_ITEMS = [
  {
    name: 'Upload in the composable',
    description:
      'Never call useUploadImage from a component for a form field. Use uploadFormMedia inside handleSubmit so validation runs first.',
  },
  {
    name: 'Pass setFieldValue',
    description:
      'Third argument of uploadFormMedia. It stores the mediaId in the form so a retry does not upload again.',
  },
  {
    name: 'Send ids, not files',
    description:
      'The API payload never contains a File or a whole MediaValue. Use extractMediaPayload or serializeMediaValues.',
  },
  {
    name: 'One loading flag',
    description:
      'Disable and show loading on the submit button with mutation isPending OR isUploading, or users can double submit.',
  },
  {
    name: 'Upload errors',
    description:
      'useUploadImage already shows an error toast. In the catch, do not toast again: map with applyApiErrorToForm and show one general message at most.',
  },
  {
    name: 'Multi-step forms',
    description:
      'useMultiStepForm drops File and Blob values when it persists a step to storage, so selected files are lost on reload. Upload before moving on if you need them to survive.',
  },
  {
    name: 'Validation limits',
    description:
      'maxSizeMb defaults to 10 and allowedTypes to common image or file types. Match them to what the backend accepts.',
  },
] as const;

export const FILE_UPLOADS_SECTIONS: readonly DocSection[] = [
  {
    title: 'The pieces',
    description: 'Everything you need already exists. A form never talks to storage directly.',
    items: PIECES_ITEMS,
  },
  {
    title: 'How an upload travels',
    description: 'Why the API call stays small and why retries are safe.',
    code: FLOW_CODE,
    header: 'flow',
  },
  {
    title: 'Create form (the standard way)',
    description:
      'Schema, composable and template for one image field. This is the pattern of useCustomTokenForm.',
    code: CREATE_CODE,
    header: 'create',
  },
  {
    title: 'Edit form',
    description:
      'Wrap existing urls with createMediaValue so the form can tell new, replaced, removed and untouched files apart.',
    code: EDIT_CODE,
    header: 'edit',
  },
  {
    title: 'Multiple files and fields',
    description:
      'FileUpload for lists, usePayloadItems for several media fields, serializeMediaValues for simple payloads.',
    code: MULTI_CODE,
    header: 'multiple',
  },
  {
    title: 'serviceType',
    description:
      'The backend decides where a file goes from the serviceType in the presigned-url request.',
    code: SERVICE_TYPE_CODE,
    header: 'useUploadImage.ts',
  },
  {
    title: 'Do and do not',
    description: 'The mistakes the reviewer looks for.',
    items: PITFALLS_ITEMS,
  },
];
