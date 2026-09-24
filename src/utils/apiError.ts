import { isAxiosError } from 'axios';
import type { GenericObject } from 'vee-validate';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Recursively flattens nested error objects or arrays into vee-validate field paths.
 * Supports both dot notation ("wallets.0.publicAddress") and bracket notation ("wallets[0].publicAddress").
 */
function flattenErrors(errors: unknown, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  if (!errors || typeof errors !== 'object') {
    return result;
  }

  for (const [key, val] of Object.entries(errors)) {
    // Skip top-level generic "message" key if it's a sibling of field errors
    if (!prefix && key === 'message' && typeof val === 'string') {
      continue;
    }

    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (typeof val === 'string') {
      result[currentPath] = val;
      const bracketPath = currentPath.replace(/\.(\d+)\./g, '[$1].').replace(/\.(\d+)$/, '[$1]');
      if (bracketPath !== currentPath) {
        result[bracketPath] = val;
      }
    } else if (Array.isArray(val)) {
      const firstString = val.find((v) => typeof v === 'string');
      if (firstString) {
        result[currentPath] = firstString;
        const bracketPath = currentPath.replace(/\.(\d+)\./g, '[$1].').replace(/\.(\d+)$/, '[$1]');
        if (bracketPath !== currentPath) {
          result[bracketPath] = firstString;
        }
      }

      val.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          const itemPrefix = !prefix && key === 'message' ? '' : `${currentPath}.${index}`;
          Object.assign(result, flattenErrors(item, itemPrefix));
        }
      });
    } else if (typeof val === 'object' && val !== null) {
      Object.assign(result, flattenErrors(val, currentPath));
    }
  }

  return result;
}

export function getApiError(err: unknown) {
  if (isAxiosError<ApiErrorResponse>(err)) {
    return err.response?.data;
  }

  return;
}

export function getApiErrorMessage(err: unknown, fallback = DEFAULT_MESSAGE): string {
  if (isAxiosError<ApiErrorResponse>(err)) {
    return err.response?.data?.message ?? fallback;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return fallback;
}

export function getApiFieldErrors(err: unknown): Record<string, string> | undefined {
  if (!isAxiosError<ApiErrorResponse>(err)) {
    return undefined;
  }

  const errors = err.response?.data?.errors;
  if (!errors || typeof errors !== 'object') {
    return undefined;
  }

  const flattened = flattenErrors(errors);
  return Object.keys(flattened).length > 0 ? flattened : undefined;
}

/**
 * Applies a backend error to a vee-validate form: field-level validation errors
 * are set on their matching inputs, and generic/non-field errors (e.g. "Invalid
 * email or password") fall back to `fallbackField` so they're still surfaced
 * under a related input instead of a toast.
 */
export function applyApiErrorToForm<TValues extends GenericObject>(
  err: unknown,
  setErrors: (errors: Record<string, string | string[]>) => void,
  fallbackField?: Extract<keyof TValues, string>
): void {
  if (!setErrors) {
    return;
  }

  const fieldErrors = getApiFieldErrors(err);

  if (fieldErrors && Object.keys(fieldErrors).length > 0) {
    setErrors(fieldErrors);
    return;
  }

  if (fallbackField) {
    setErrors({ [fallbackField]: getApiErrorMessage(err) });
  }
}
