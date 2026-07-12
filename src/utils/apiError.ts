import { isAxiosError } from 'axios';
import type { SubmissionContext, GenericObject } from 'vee-validate';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Backends sometimes nest generic (non-field) errors under `errors`, e.g.
 * `{ message: "...", error: "Unauthorized", statusCode: 401 }`. Real field-level
 * validation errors instead map field names to a message string/string[], so we
 * distinguish the two shapes by checking every value is a string or string[].
 */
function isFieldErrors(errors: unknown): errors is Record<string, string | string[]> {
  if (!errors || typeof errors !== 'object') {
    return false;
  }

  return Object.values(errors).every(
    (value) =>
      typeof value === 'string' ||
      (Array.isArray(value) && value.every((v) => typeof v === 'string'))
  );
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

export function getApiFieldErrors(err: unknown): Record<string, string | string[]> | undefined {
  if (!isAxiosError<ApiErrorResponse>(err)) {
    return undefined;
  }

  const errors = err.response?.data?.errors;
  return isFieldErrors(errors) ? errors : undefined;
}

/**
 * Applies a backend error to a vee-validate form: field-level validation errors
 * are set on their matching inputs, and generic/non-field errors (e.g. "Invalid
 * email or password") fall back to `fallbackField` so they're still surfaced
 * under a related input instead of a toast.
 */
export function applyApiErrorToForm<TValues extends GenericObject>(
  err: unknown,
  ctx: SubmissionContext<TValues> | undefined,
  fallbackField: Extract<keyof TValues, string>
): void {
  if (!ctx) {
    return;
  }

  const fieldErrors = getApiFieldErrors(err);
  const setErrors = ctx.setErrors as unknown as (errors: Record<string, string | string[]>) => void;

  if (fieldErrors) {
    setErrors(fieldErrors);
    return;
  }

  setErrors({ [fallbackField]: getApiErrorMessage(err) });
}
