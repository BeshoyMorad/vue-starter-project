export const INVALID_FILE_NAME_PATTERN = /[%<>:"'|?*\\/#&+]/;

interface FileValidationOptions {
  maxSizeMb: number;
  allowedTypes: readonly string[];
}

/** Shared by every upload field. Returns an error message, or `null` when the file is valid. */
export function validateFile(file: File, { maxSizeMb, allowedTypes }: FileValidationOptions) {
  if (INVALID_FILE_NAME_PATTERN.test(file.name)) {
    return 'File name contains invalid characters. Avoid characters like %, <, >, :, ", |, ?, *, \\, /, #, &, +.';
  }

  if (file.size > maxSizeMb * 1024 * 1024) {
    return `File "${file.name}" exceeds the ${maxSizeMb}MB limit.`;
  }

  if (!allowedTypes.includes(file.type)) {
    return `File "${file.name}" has an invalid file type.`;
  }

  return null;
}
