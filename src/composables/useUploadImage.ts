import { useMutation } from '@tanstack/vue-query';
import axios, { isAxiosError } from 'axios';
import { api } from '@/lib/api/client';
import { apiRoute } from '@/lib/api/endpoints';
import { error } from '@/utils/toast';

export type StorageServiceType = 'PHOTO';

export interface UploadImagePayload {
  serviceType: StorageServiceType;
  files: File[];
}

export interface UploadImageResponse {
  mediaId: string;
  presignedUrls: string[];
}

/**
 * Composable that exposes a TanStack Query mutation for uploading images/files.
 *
 * It requests presigned URLs from the backend and uploads the files directly to
 * the storage provider (e.g. S3) via PUT requests.
 *
 * @returns The mutation object. If successful, `mutateAsync` resolves to the `mediaId` string.
 */
export function useUploadImage() {
  return useMutation({
    mutationFn: async ({ serviceType, files }: UploadImagePayload) => {
      if (!files.length) {
        return '';
      }

      const fileMetadata = files.map((file) => ({
        fileSize: file.size,
        contentType: file.type,
      }));

      // 1. Request presigned URLs from our backend
      const response = await api.post<ApiResponse<UploadImageResponse>>(
        apiRoute('storage.presigned-url'),
        {
          serviceType,
          media: fileMetadata,
        }
      );

      const { mediaId, presignedUrls } = response.data.data;

      if (!presignedUrls || presignedUrls.length !== files.length) {
        throw new Error('Failed to retrieve presigned URLs');
      }

      // 2. Upload files in parallel to the presigned URLs
      // Note: We use a fresh axios instance to prevent our global interceptors from attaching
      // authentication headers or overwriting the Content-Type, which would cause S3 to reject the request.
      const uploadPromises = files.map((file, index) =>
        axios.put(presignedUrls[index], file, {
          headers: {
            'Content-Type': file.type,
          },
          maxBodyLength: Infinity,
        })
      );

      await Promise.all(uploadPromises);

      return mediaId;
    },
    onError: (err: unknown) => {
      let message = 'Failed to upload files';
      if (isAxiosError(err)) {
        message = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      error(message);
    },
  });
}
