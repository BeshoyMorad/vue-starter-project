import { ref } from 'vue';
import { useUploadImage } from './useUploadImage';
import type { StorageServiceType } from './useUploadImage';
import type { MediaValue, MediaPayload, MediaPayloadItem } from '@/types/media';

/**
 * Checks if a value matches the shape of a MediaValue object.
 */
export function isMediaValue(val: unknown): val is MediaValue {
  return (
    val !== null &&
    typeof val === 'object' &&
    'file' in val &&
    'tempUrl' in val &&
    'mediaId' in val &&
    'initialUrl' in val &&
    'isChanged' in val &&
    'wasRemoved' in val
  );
}

/**
 * Normalizes an initial media URL/ID into a clean MediaValue structure.
 */
export function createMediaValue(initialUrl?: string | null): MediaValue {
  return {
    file: null,
    tempUrl: '',
    mediaId: null,
    initialUrl: initialUrl || null,
    isChanged: false,
    wasRemoved: false,
  };
}

/**
 * Recursively scans an object for MediaValue instances and executes a callback on each.
 */
function walkMediaValues(
  obj: unknown,
  callback: (mediaVal: MediaValue, key: string, parent: Record<string, unknown>) => void
): void {
  if (!obj || typeof obj !== 'object') {
    return;
  }

  const record = obj as Record<string, unknown>;
  for (const key in record) {
    const val = record[key];
    if (isMediaValue(val)) {
      callback(val, key, record);
    } else if (val && typeof val === 'object') {
      walkMediaValues(val, callback);
    }
  }
}

export interface ExtractMediaPayloadOptions {
  usePayloadItems?: boolean;
}

/**
 * Extracts lists for mediaIdsToAdd and mediaUrlsToRemove for the API payload.
 */
export function extractMediaPayload(
  values: Record<string, unknown>,
  options?: ExtractMediaPayloadOptions
): MediaPayload {
  const usePayloadItems = options?.usePayloadItems ?? false;
  const mediaIdsToAdd: (MediaPayloadItem | string)[] = [];
  const mediaUrlsToRemove: string[] = [];

  walkMediaValues(values, (mediaVal, key) => {
    if (mediaVal.isChanged) {
      if (mediaVal.mediaId) {
        if (usePayloadItems) {
          mediaIdsToAdd.push({ id: mediaVal.mediaId, key });
        } else {
          mediaIdsToAdd.push(mediaVal.mediaId);
        }
      }
      if (mediaVal.wasRemoved && mediaVal.initialUrl) {
        mediaUrlsToRemove.push(mediaVal.initialUrl);
      }
    }
  });

  return {
    mediaIdsToAdd: mediaIdsToAdd as MediaPayloadItem[] | string[],
    mediaUrlsToRemove,
  };
}

/**
 * Serializes all MediaValue properties in the values object into string (URL/ID)
 * or null values, preparing it for simple API payloads.
 */
export function serializeMediaValues(values: Record<string, unknown>): Record<string, unknown> {
  const serializeValue = (val: unknown): unknown => {
    if (isMediaValue(val)) {
      return val.isChanged ? val.mediaId : val.initialUrl;
    }
    if (Array.isArray(val)) {
      return val.map(serializeValue);
    }
    if (val && typeof val === 'object') {
      const obj = val as Record<string, unknown>;
      const res: Record<string, unknown> = {};
      for (const k in obj) {
        res[k] = serializeValue(obj[k]);
      }
      return res;
    }
    return val;
  };

  return serializeValue(values) as Record<string, unknown>;
}

/**
 * Composable to manage the state of uploaded/selected files in forms.
 * Prevents redundant uploads, tracks deletions, and formats payloads.
 */
export function useFormMedia() {
  const { mutateAsync: uploadImageMut } = useUploadImage();
  const isUploading = ref(false);

  /**
   * Scans the form values recursively, uploads any newly selected/changed files
   * in parallel, and caches the returned mediaId in the field values.
   */
  const uploadFormMedia = async (
    values: Record<string, unknown>,
    serviceType: StorageServiceType
  ): Promise<void> => {
    isUploading.value = true;
    try {
      const uploadPromises: Promise<void>[] = [];

      walkMediaValues(values, (mediaVal) => {
        const file = mediaVal.file;
        // If the user changed the file, we have a File object, and it hasn't been uploaded yet
        if (mediaVal.isChanged && file && !mediaVal.mediaId) {
          const promise = (async () => {
            const mediaId = await uploadImageMut({
              serviceType,
              files: [file],
            });
            mediaVal.mediaId = mediaId;
          })();
          uploadPromises.push(promise);
        }
      });

      await Promise.all(uploadPromises);
    } finally {
      isUploading.value = false;
    }
  };

  return {
    isUploading,
    uploadFormMedia,
  };
}
