import type { DocPageContent, DocSection } from '@/modules/doc/shared/types';

const SIGNATURE_CODE = `// src/composables/useUploadImage.ts
export type StorageServiceType = 'PHOTO';

export interface UploadImagePayload {
  serviceType: StorageServiceType;
  files: File[];
}

const { mutateAsync, isPending, isError, error } = useUploadImage();

const mediaId: string = await mutateAsync({ serviceType: 'PHOTO', files: [file] });
// files: []  -> resolves '' without any request
// N files   -> ONE mediaId for the whole group, N presigned urls`;

const INTERNALS_CODE = `1. POST storage/presigned-url              (shared api client, apiRoute('storage.presigned-url'))
   body { serviceType, media: [{ fileSize, contentType }, ...] }
   response ApiResponse<{ mediaId, presignedUrls: string[] }>

2. check presignedUrls.length === files.length, else throw 'Failed to retrieve presigned URLs'

3. PUT every file in parallel to its url  (plain axios, NOT the api instance)
   headers { 'Content-Type': file.type }, maxBodyLength: Infinity

4. return mediaId`;

const WHY_AXIOS_CODE = `// Why a fresh axios for the PUT?
// The api instance interceptors add Authorization and device-id and force
// Content-Type: application/json. A presigned url is signed for an exact set of
// headers, so storage answers 403 SignatureDoesNotMatch. Keep it plain.
// Storage must also allow CORS PUT from the app origin.`;

const DIRECT_CODE = `// Outside a form: one-off upload (profile photo button, import file)
const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

const onPick = async (media: MediaValue | null) => {
  if (!media?.file) return;
  const mediaId = await uploadImage({ serviceType: 'PHOTO', files: [media.file] });
  await profileServices.updateAvatar({ mediaIdsToAdd: [mediaId] });
};

// Inside a form: do NOT do this. Use useFormMedia (uploadFormMedia) so uploads
// run after validation, in parallel, cached and with one loading flag.`;

const ERRORS_CODE = `// onError is built in: the message (response.message or Error.message) is shown with
// the error toast, so callers do not toast again.
// mutateAsync still rejects, so you can stop your flow:
try {
  const id = await uploadImage({ serviceType: 'PHOTO', files });
} catch {
  return;   // toast already shown
}

// Validation of type and size happens earlier, inside Field.ImageUpload / Field.FileUpload
// (allowedTypes, maxSizeMb), so a wrong file never reaches the backend.`;

const EXTEND_CODE = `// Add a service type
// 1) src/composables/useUploadImage.ts
export type StorageServiceType = 'PHOTO' | 'ASSETS' | 'DOCUMENT';
// 2) backend accepts the same string in serviceType
// 3) pass it from the form: uploadFormMedia(values, 'DOCUMENT', setFieldValue)

// Different presigned endpoint or payload? Change the route in
// src/lib/api/endpoints.ts ('storage.presigned-url') and the request body here only.`;

const SECTIONS: readonly DocSection[] = [
  {
    title: 'Role in the architecture',
    description:
      'useUploadImage is the lowest layer of uploading: it moves bytes to storage and returns an id. Forms use it through useFormMedia, which is what you should call in 95% of cases.',
    code: `Field.ImageUpload (MediaValue)  ->  useFormMedia.uploadFormMedia  ->  useUploadImage  ->  storage
        UI                            form orchestration                  transport`,
    header: 'layers',
  },
  {
    title: 'API',
    description: 'A TanStack mutation, so you get isPending, error and mutateAsync.',
    code: SIGNATURE_CODE,
    header: 'signature',
  },
  {
    title: 'What happens inside',
    description: 'Two requests: ask for urls, then send the files straight to storage.',
    code: INTERNALS_CODE,
    header: 'steps',
  },
  {
    title: 'Why the PUT does not use the api client',
    description: 'The most common reason an upload fails after copying the code.',
    code: WHY_AXIOS_CODE,
    header: 'note',
  },
  {
    title: 'Direct usage',
    description: 'Use it directly only for a single action outside a form.',
    code: DIRECT_CODE,
    header: 'direct',
  },
  {
    title: 'Errors',
    description: 'Failures are toasted for you.',
    code: ERRORS_CODE,
    header: 'errors',
  },
  {
    title: 'Extending it',
    description: 'New service types and a different backend flow.',
    code: EXTEND_CODE,
    header: 'extend',
  },
];

export const DOC_CONTENT: DocPageContent = {
  title: 'useUploadImage: Deep Dive',
  description:
    'How the presigned url upload works, when to call it directly and when to use useFormMedia. For the interactive example see the useUploadImage page; for the complete form recipe see Uploading Images and Files in Forms.',
  sections: SECTIONS,
};
