export const IMAGE_UPLOAD_DOM = {
  title: 'useUploadImage',
  description:
    'Upload images directly to storage using the useUploadImage composable and presigned URLs.',

  import: {
    title: 'Import',
    description: 'Import the useUploadImage composable to handle image uploads.',
  },

  whatIs: {
    title: 'What is useUploadImage?',
    description:
      'useUploadImage is a composable that handles the complete image upload flow. It requests a presigned URL from the backend, uploads the file directly to storage, and returns the mediaId.',
  },

  basicUsage: {
    title: 'Basic Usage',
    description: 'Select an image and upload it using useUploadImage.',
    howToUse:
      'Select an image, then call uploadImage with the selected file and the required serviceType.',
  },

  presignedUrl: {
    title: 'How Does the Upload Work?',
    description:
      'The upload is handled through a presigned URL so the file can be uploaded directly to the storage provider.',
  },

  mediaId: {
    title: 'Using the mediaId',
    description:
      'After the upload is completed, use the returned mediaId when another API needs to reference the uploaded image.',
  },

  multipleFiles: {
    title: 'Multiple Files',
    description: 'useUploadImage also supports uploading multiple files.',
    howToUse: 'Pass multiple File objects in the files array. The files are uploaded in parallel.',
  },
};

export const IMAGE_UPLOAD_BASIC_CODE = `const media = ref<MediaValue | null>(null);

const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

const mediaId = ref('');

const handleUpload = async () => {
  if (!media.value?.file) return;

  mediaId.value = await uploadImage({
    serviceType: 'PHOTO',       
    files: [media.value.file],
  });
};`;

export const IMAGE_UPLOAD_TEMPLATE_CODE = `<Field.ImageUpload
  v-model="media"
  size-preset="avatar"
  crop
  test-id="direct-avatar-crop-upload"
/>

<Button
  :disabled="!media?.file || isUploading"
  @click="handleUpload"
>
  {{ isUploading ? 'Uploading...' : 'Upload Image' }}
</Button>`;
export const IMAGE_UPLOAD_IMPORT_CODE = `import { ref } from 'vue';
import { useUploadImage } from '@/composables/useUploadImage';`;

export const IMAGE_UPLOAD_PRESIGNED_URL_CODE = `1. Frontend requests a presigned URL
        ↓
2. Backend returns the presigned URL
        ↓
3. Frontend uploads the file directly to storage
        ↓
4. Upload completes
        ↓
5. useUploadImage returns the mediaId`;

export const IMAGE_UPLOAD_REQUEST_CODE = `POST /storage/presigned-url

{
  serviceType: 'PHOTO',
  media: [
    {
      fileSize: file.size,
      contentType: file.type,
    },
  ],
}`;

export const IMAGE_UPLOAD_RESPONSE_CODE = `{
  mediaId: 'abc123',
  presignedUrls: [
    'https://storage-provider/...',
  ],
}`;

export const IMAGE_UPLOAD_STORAGE_CODE = `await axios.put(presignedUrl, file, {
  headers: {
    'Content-Type': file.type,
  },
});`;

export const IMAGE_UPLOAD_MEDIA_ID_CODE = `const mediaId = await uploadImage({
  serviceType: 'PHOTO',
  files: [file],
});

await createProduct({
  name: 'Product',
  imageId: mediaId,
});`;

export const IMAGE_UPLOAD_MULTIPLE_CODE = `const mediaId = await uploadImage({
  serviceType: 'PHOTO',
  files: [file1, file2, file3],
});`;
