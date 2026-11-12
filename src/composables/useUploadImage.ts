import { useMutation } from '@tanstack/vue-query';
import axios from 'axios';
import { api } from '@/lib/api/client';
import { apiRoute } from '@/lib/api/endpoints';
import { getApiErrorMessage } from '@/utils/apiError';
import { error } from '@/utils/toast';

// ── Backend-specific part ────────────────────────────────────────────────────
// Everything a different backend can change lives in this block: the service types it accepts, the
// shape it returns, and the two functions below. `useFormMedia`, the upload fields and every form
// only see the resolved `mediaId` (see `MediaValue.mediaId` in `@/types/media`), so adapting to a
// new backend means editing this block and `@/types/media`, never the forms.
//   - Backend returns a url instead of an id: make `uploadFile` resolve that url and keep storing
//     it in `MediaValue.mediaId` (or rename the field once, in `@/types/media`, and fix the
//     type-check errors).
//   - Backend takes the file on its own endpoint (multipart): drop `requestPresignedUrls` and
//     `putToStorage`, POST the file through `api` in `uploadFile`.

export type StorageServiceType = 'PHOTO';

export interface UploadImagePayload {
  serviceType: StorageServiceType;
  files: File[];
}

export interface UploadImageResponse {
  mediaId: string;
  presignedUrls: string[];
}

async function requestPresignedUrls(
  serviceType: StorageServiceType,
  files: File[]
): Promise<UploadImageResponse> {
  const media = files.map((file) => ({ fileSize: file.size, contentType: file.type }));
  const response = await api.post<ApiResponse<UploadImageResponse>>(
    apiRoute('storage.presigned-url'),
    { serviceType, media }
  );
  const { mediaId, presignedUrls } = response.data.data;

  if (!presignedUrls || presignedUrls.length !== files.length) {
    throw new Error('Failed to retrieve presigned URLs');
  }
  return { mediaId, presignedUrls };
}

// A fresh axios instance on purpose: the shared `api` interceptors would attach auth headers or
// overwrite Content-Type, and the storage provider (S3) rejects the request.
function putToStorage(url: string, file: File) {
  return axios.put(url, file, {
    headers: { 'Content-Type': file.type },
    maxBodyLength: Infinity,
  });
}

async function uploadFile({ serviceType, files }: UploadImagePayload): Promise<string> {
  const { mediaId, presignedUrls } = await requestPresignedUrls(serviceType, files);
  await Promise.all(files.map((file, index) => putToStorage(presignedUrls[index] as string, file)));
  return mediaId;
}

/**
 * Mutation that uploads files to storage. `mutateAsync` resolves to the `mediaId` to send to the API.
 * In forms do not call it directly: use `useFormMedia().uploadFormMedia`.
 */
export function useUploadImage() {
  return useMutation({
    mutationFn: async (payload: UploadImagePayload) =>
      payload.files.length ? uploadFile(payload) : '',
    onError: (err: unknown) => error(getApiErrorMessage(err, 'Failed to upload files')),
  });
}
