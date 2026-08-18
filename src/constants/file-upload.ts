export const IMAGE_TYPES = {
  PNG: 'image/png',
  JPG: 'image/jpg',
  JPEG: 'image/jpeg',
  WEBP: 'image/webp',
  SVG: 'image/svg+xml',
  GIF: 'image/gif',
} as const;

export const DOCUMENT_TYPES = {
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV: 'text/csv',
  TXT: 'text/plain',
  GIF: 'image/gif',
} as const;

export const VIDEO_TYPES = {
  MP4: 'video/mp4',
  WEBM: 'video/webm',
  QUICKTIME: 'video/quicktime',
} as const;

export const DEFAULT_ALLOWED_IMAGE_TYPES = [
  IMAGE_TYPES.PNG,
  IMAGE_TYPES.JPG,
  IMAGE_TYPES.JPEG,
  IMAGE_TYPES.WEBP,
  IMAGE_TYPES.SVG,
  IMAGE_TYPES.GIF,
];

export const DEFAULT_ALLOWED_DOCUMENT_TYPES = [
  DOCUMENT_TYPES.PDF,
  DOCUMENT_TYPES.DOC,
  DOCUMENT_TYPES.DOCX,
  DOCUMENT_TYPES.XLS,
  DOCUMENT_TYPES.XLSX,
  DOCUMENT_TYPES.CSV,
  DOCUMENT_TYPES.TXT,
];

export const MIME_TO_EXTENSION: Record<string, string> = {
  [IMAGE_TYPES.PNG]: 'png',
  [IMAGE_TYPES.JPG]: 'jpg',
  [IMAGE_TYPES.JPEG]: 'jpeg',
  [IMAGE_TYPES.GIF]: 'gif',
  [IMAGE_TYPES.WEBP]: 'webp',
  [IMAGE_TYPES.SVG]: 'svg',

  [DOCUMENT_TYPES.PDF]: 'pdf',
  [DOCUMENT_TYPES.DOC]: 'doc',
  [DOCUMENT_TYPES.DOCX]: 'docx',
  [DOCUMENT_TYPES.XLS]: 'xls',
  [DOCUMENT_TYPES.XLSX]: 'xlsx',
  [DOCUMENT_TYPES.CSV]: 'csv',
  [DOCUMENT_TYPES.TXT]: 'txt',

  [VIDEO_TYPES.MP4]: 'mp4',
  [VIDEO_TYPES.WEBM]: 'webm',
  [VIDEO_TYPES.QUICKTIME]: 'mov',
};

// Default accepted types for the multi FileUpload component (images + documents)
export const DEFAULT_ALLOWED_FILE_TYPES = [
  ...DEFAULT_ALLOWED_IMAGE_TYPES,
  ...DEFAULT_ALLOWED_DOCUMENT_TYPES,
];

// Icon shown per file extension in the row preview for non-image files.
// Swap these hugeicons names for whichever ones exist in your icon set.
export const EXTENSION_TO_ICON: Record<string, string> = {
  pdf: 'hugeicons--pdf-02',
  doc: 'hugeicons--doc-02',
  docx: 'hugeicons--doc-02',
  msword: 'hugeicons--doc-02',
  xls: 'hugeicons--csv-02',
  xlsx: 'hugeicons--csv-02',
  csv: 'hugeicons--csv-02',
  txt: 'hugeicons--txt-02',
  plain: 'hugeicons--txt-02',
  mp4: 'hugeicons--video-01',
  webm: 'hugeicons--video-01',
  mov: 'hugeicons--video-01',
};

export const DEFAULT_FILE_ICON = 'hugeicons--file-02';

export const isImageMimeType = (type: string): boolean => type.startsWith('image/');

export const getFileExtension = (nameOrUrl: string): string => {
  const clean = nameOrUrl.split(/[?#]/)[0];
  const parts = clean.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

export const IMAGE_EXTENSIONS = new Set(
  DEFAULT_ALLOWED_IMAGE_TYPES.map((t) => MIME_TO_EXTENSION[t]).filter(Boolean)
);

export const isImageExtension = (nameOrUrl: string): boolean =>
  IMAGE_EXTENSIONS.has(getFileExtension(nameOrUrl));

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
