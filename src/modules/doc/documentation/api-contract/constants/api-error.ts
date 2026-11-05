import type { DocSection } from '@/modules/doc/shared/types';

const API_ERROR_FLOW_CODE = `Axios error
   |  src/lib/api/client.ts  (interceptor)
   |    401 -> authStore.clearAuth()      403 -> /access-denied
   |    500 -> /internal-server-error     419 -> refresh token, retry once
   |    offline -> /no-internet
   v  other statuses (400, 404, 409, 422 ...) are rejected untouched
useMutation onError / catch
   |  src/utils/apiError.ts
   |    getApiFieldErrors -> setErrors(...)   field errors under inputs
   |    getApiErrorMessage -> message or toast  general message
   v
Template shows <Field.* name="..."> errors and an optional general message`;

const FLATTEN_CODE = `// backend body                                   -> setErrors(...)
{ "errors": { "email": "Taken" } }                 { email: 'Taken' }
{ "errors": { "email": ["Taken", "Invalid"] } }    { email: 'Taken' }          (first string)
{ "errors": { "wallets": [ { "address": "Bad" } ] } }
                                                   { 'wallets.0.address': 'Bad',
                                                     'wallets[0].address': 'Bad' }
{ "message": "Invalid credentials" }               no field errors -> fallbackField gets
                                                   getApiErrorMessage(err)`;

const EDIT_API_ERROR_CODE = `// The backend returns errors as an array instead of an object:
// { message: 'Validation failed',
//   errors: [ { field: 'email', message: 'Taken' } ] }

// 1) global.d.ts
interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string | string[]> | { field: string; message: string }[];
}

// 2) src/utils/apiError.ts: normalize first, keep the rest unchanged
function normalizeErrors(errors: unknown): unknown {
  if (Array.isArray(errors) && errors.every((e) => e && typeof e === 'object' && 'field' in e)) {
    return Object.fromEntries(errors.map((e) => [e.field, e.message]));
  }
  return errors;
}

export function getApiFieldErrors(err: unknown) {
  if (!isAxiosError<ApiErrorResponse>(err)) return undefined;
  const errors = normalizeErrors(err.response?.data?.errors);
  if (!errors || typeof errors !== 'object') return undefined;
  const flattened = flattenErrors(errors);
  return Object.keys(flattened).length > 0 ? flattened : undefined;
}`;

const MESSAGE_KEY_CODE = `// The backend uses "detail" instead of "message":
// 1) global.d.ts          -> interface ApiErrorResponse { detail: string; ... }
// 2) apiError.ts          -> err.response?.data?.detail ?? fallback   (getApiErrorMessage only)
// 3) ApiResponse<T>.message is read by success toasts: grep "data.message" in mutations`;

const GENERAL_ERROR_CODE = `// Pattern for forms that also show a general message (see helper CustomTokenForm)
const errorMessage = ref<string>();

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = undefined;
  try {
    await createToken(values);
    options?.onSuccess?.();
  } catch (err) {
    applyApiErrorToForm(err, setErrors);                    // field errors
    if (!getApiFieldErrors(err)) {
      errorMessage.value = getApiErrorMessage(err, 'Failed to add custom token'); // general
    }
  }
});

// template
// <p v-if="errorMessage" role="alert" class="text-danger-600 text-sm">{{ errorMessage }}</p>`;

export const API_CONTRACT_ERROR_SECTIONS: DocSection[] = [
  {
    title: 'apiError: the important file',
    description:
      'src/utils/apiError.ts is the only reader of ApiErrorResponse. Interceptors handle auth and server errors globally, and apiError turns validation errors into form errors. Rule: no manual try/catch that toasts, and no reading err.response.data in components.',
    code: API_ERROR_FLOW_CODE,
    header: 'error flow',
  },
  {
    title: 'What apiError understands',
    description:
      'flattenErrors walks nested objects and arrays and creates both dot paths (wallets.0.address) and bracket paths (wallets[0].address), so the errors land on the right vee-validate field either way. A top level "message" key next to the field errors is skipped.',
    code: FLATTEN_CODE,
    header: 'mapping',
  },
  {
    title: 'Editing apiError when the backend changes',
    description:
      'Change the type in global.d.ts first, then adapt apiError in one place. Components and mutations keep calling the same four functions.',
    codeArr: [
      { header: 'errors as an array', code: EDIT_API_ERROR_CODE },
      { header: 'different message key', code: MESSAGE_KEY_CODE },
    ],
  },
  {
    title: 'General (non field) errors',
    description:
      'The helper module shows a general message above the form for errors that do not belong to a field. In the starter use getApiFieldErrors to know if the error was already placed on a field, and getApiErrorMessage for the message text. Use useMutation onError with applyApiErrorToForm when the mutation owns the form context (auth module), or catch around mutateAsync when the composable owns it (helper module).',
    code: GENERAL_ERROR_CODE,
    header: 'composable',
  },
];
