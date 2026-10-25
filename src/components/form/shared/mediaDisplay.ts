import {
  EXTENSION_TO_ICON,
  DEFAULT_FILE_ICON,
  isImageMimeType,
  isImageExtension,
  getFileExtension,
} from '@/constants/file-upload';
import type { MediaValue } from '@/types/media';

export const iconForFile = (mediaVal: MediaValue): string => {
  const name = mediaVal.file?.name || mediaVal.fileName || mediaVal.initialUrl || '';
  return EXTENSION_TO_ICON[getFileExtension(name)] || DEFAULT_FILE_ICON;
};

export const isImagePreview = (mediaVal: MediaValue): boolean => {
  if (mediaVal.file) return isImageMimeType(mediaVal.file.type);
  return isImageExtension(mediaVal.fileName || mediaVal.initialUrl || '');
};

export const previewSrc = (mediaVal: MediaValue): string | null => {
  if (mediaVal.tempUrl) return mediaVal.tempUrl;
  if (mediaVal.initialUrl && isImagePreview(mediaVal)) return mediaVal.initialUrl;
  return null;
};

export const displayName = (mediaVal: MediaValue): string => {
  if (mediaVal.file) return mediaVal.file.name;
  if (mediaVal.fileName) return mediaVal.fileName;
  if (mediaVal.initialUrl) return mediaVal.initialUrl.split('/').pop() || mediaVal.initialUrl;
  return 'File';
};
