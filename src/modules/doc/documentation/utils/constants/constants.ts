import type { DocSection } from '@/modules/doc/shared/types';
import { UTILS_FORMAT_SECTIONS } from './format';

export const UTILS_DOC = {
  title: 'Utils',
  description:
    'Small, framework-light helper functions that live in src/utils. Before writing any helper, check this page: the golden rule of the project is reuse before you write.',
} as const;

const UTILS_OVERVIEW_SECTION: DocSection = {
  title: 'Overview: what we have and when to use it',
  description:
    'Every util below is a plain function (no component state). Only cn is re-exported from the barrel file src/utils/index.ts, so import everything else from its own file, for example @/utils/toast.',
  items: [
    {
      name: 'cn',
      description: 'Merge Tailwind classes. Use in every component that accepts a class prop.',
    },
    {
      name: 'apiError',
      description:
        'Read backend errors and put them on a form. Use in every mutation / submit handler.',
    },
    {
      name: 'toast',
      description:
        'Success / error / warn / info toasts. Use for feedback that is not a field error.',
    },
    {
      name: 'formatter',
      description:
        'Currency, date, time, percentage, number, list, file size. Never format inline.',
    },
    {
      name: 'formatText',
      description:
        'truncate() for long ids and addresses, formatPascalCase() for camelCase labels.',
    },
    {
      name: 'formatStatus',
      description: 'Turn ACTIVE / held_by_admin / detailedView into a readable label.',
    },
    { name: 'clipboard', description: 'Copy / paste text with a built-in success toast.' },
    { name: 'device', description: 'Stable per-browser device id sent as the device-id header.' },
    {
      name: 'openExternalLink',
      description: 'Open a link safely in a new tab. Only http(s) is allowed.',
    },
    {
      name: 'extractUrlDetails',
      description: 'Read file name / type / date from a stored file URL with a HEAD request.',
    },
    {
      name: 'getDynamicAssets',
      description: 'Resolve images, gifs and sounds in src/assets by a runtime string.',
    },
    {
      name: 'countries',
      description: 'Country list with dial code and flag emoji for phone and country selects.',
    },
  ],
};

const UTILS_CN_SECTION: DocSection = {
  title: 'cn: merge class names',
  description:
    'cn combines clsx (conditional classes) with tailwind-merge (the last conflicting Tailwind class wins). It is the only util exported from @/utils.',
  howToUse:
    'Use it whenever a class can change by prop or state, and whenever a component lets the parent pass a class. Never concatenate class strings by hand. Do not use ml-/mr-/pl-/pr-: use the logical classes (ms-/me-/ps-/pe-) so RTL works.',
  code: `import { cn } from '@/utils';

const props = defineProps<{ active?: boolean; class?: string }>();

// template
// <div :class="cn('rounded-xl border p-4', active && 'border-primary-500', props.class)" />

cn('px-2 py-1', 'px-4');            // 'py-1 px-4'  (conflict resolved)
cn('p-4', false && 'hidden');       // 'p-4'`,
  header: 'cn',
};

const UTILS_API_ERROR_SECTION: DocSection = {
  title: 'apiError: backend errors to UI',
  description:
    'src/utils/apiError.ts is the single place that understands the backend error shape (the ApiErrorResponse interface in src/types/global.d.ts). It reads Axios errors safely and maps them onto vee-validate forms. See the API Contract page for how to change it when the backend shape changes.',
  howToUse:
    'In a form mutation call applyApiErrorToForm in onError. For a non-form action (a toggle, a delete) read the message with getApiErrorMessage and show it with the error toast. Do not write try/catch blocks that build messages by hand.',
  items: [
    {
      name: 'getApiError(err)',
      description:
        'Returns the raw ApiErrorResponse body, or undefined if err is not an Axios error.',
    },
    {
      name: 'getApiErrorMessage(err, fallback?)',
      description: 'Best human message: response.message, then Error.message, then the fallback.',
    },
    {
      name: 'getApiFieldErrors(err)',
      description:
        'Flattens response.errors into { "wallets[0].address": "msg" } paths that vee-validate understands. Returns undefined when there are none.',
    },
    {
      name: 'applyApiErrorToForm(err, setErrors, fallbackField?)',
      description:
        'Sets field errors on the form. If the backend sent only a general message, shows it under fallbackField.',
    },
  ],
  codeArr: [
    {
      header: 'form mutation',
      code: `import { applyApiErrorToForm } from '@/utils/apiError';

useMutation({
  mutationFn: ({ values }) => authServices.login(values),
  onError: (error, variables) => {
    // field errors -> inputs, general message -> password field
    applyApiErrorToForm(error, variables.ctx.setErrors, 'password');
  },
});`,
    },
    {
      header: 'non-form action',
      code: `import { getApiErrorMessage } from '@/utils/apiError';
import { error as errorToast } from '@/utils/toast';

onError: (err) => errorToast(getApiErrorMessage(err, 'Could not delete user')),`,
    },
  ],
};

const UTILS_TOAST_SECTION: DocSection = {
  title: 'toast: user feedback',
  description:
    'Wrapper around vue-sonner that renders the project CustomToast with a variant icon. Helpers: success(body), error(body), warn(body), info(title, body, action). notify(variant, options) is the low level function.',
  howToUse:
    'Use success after a mutation succeeds (the response message is usually the best body). Use error for failures that are not shown on a field. Pass an action to info() to make the toast clickable. Rename the import when you use several: import { success as successToast }.',
  code: `import { success, error, warn, info } from '@/utils/toast';

success('User created');
error('Could not reach the server');
warn('Your session expires soon');
info('New version', 'Click to reload', () => window.location.reload());`,
  header: 'toast',
};

const UTILS_SMALL_SECTIONS: DocSection[] = [
  {
    title: 'clipboard',
    description:
      'copyToClipboard(text) writes to the clipboard and shows the "Copied to clipboard" success toast. pasteFromClipboard() returns the clipboard text. Both are async and need a secure context (https or localhost) and a user gesture.',
    howToUse:
      'Use for copy buttons (addresses, ids, codes). For a ready-made button prefer the CopyText component, which already uses this util.',
    code: `import { copyToClipboard, pasteFromClipboard } from '@/utils/clipboard';

await copyToClipboard(user.id);
const pasted = await pasteFromClipboard();`,
    header: 'clipboard',
  },
  {
    title: 'device: getDeviceId',
    description:
      'Returns a UUID stored in localStorage under device_id, creating it on first call. The API client (src/lib/api/client.ts) sends it on every request as the device-id header.',
    howToUse:
      'You normally never call it: the client does. Call it only when you build a request outside the shared api instance and the backend needs the same device id.',
    code: `import { getDeviceId } from '@/utils/device';

const deviceId = getDeviceId(); // same value on every call in this browser`,
    header: 'device',
  },
  {
    title: 'openExternalLink and isSafeUrl',
    description:
      'openExternalLink(url) opens a new tab with noopener,noreferrer. Only http and https are accepted; a bare "example.com" becomes https://example.com; javascript: and data: links are ignored. isSafeUrl(url) returns the same check as a boolean.',
    howToUse:
      'Use for every link that comes from the backend or the user. Never call window.open with raw data. Use isSafeUrl to decide whether to render a link at all.',
    code: `import { openExternalLink, isSafeUrl } from '@/utils/openExternalLink';

<Button @click="openExternalLink(project.website)">Visit</Button>

isSafeUrl('javascript:alert(1)'); // false
isSafeUrl('example.com');         // true`,
    header: 'openExternalLink',
  },
  {
    title: 'extractUrlDetails',
    description:
      'Sends a HEAD request to a stored file URL and returns { url, filename, extension, uploadedAt } from the x-amz-meta-filename, Content-Type and Last-Modified headers. On any error it returns "Unknown" values instead of throwing.',
    howToUse:
      'Use to show a file name and date for an existing server file in an edit form (for example the fileName of createMediaValueList). The storage bucket must allow CORS HEAD and expose these headers, or you get "Unknown".',
    code: `import { extractUrlDetails } from '@/utils/extractUrlDetails';

const details = await extractUrlDetails(document.url);
// { url, filename: 'contract.pdf', extension: 'pdf', uploadedAt: '12 Mar, 2026' }`,
    header: 'extractUrlDetails',
  },
  {
    title: 'getDynamicAssets',
    description:
      'Vite cannot bundle an image whose path is only known at runtime. These helpers use import.meta.glob over src/assets/images, gifs and sounds and return the built URL: getImagePath(path), getGifPath(name), getSoundPath(name) (returns an Audio).',
    howToUse:
      'Use when the file name comes from data (an empty-state image name passed as a prop). For a fixed image, import it directly. Paths are relative to the folder: getImagePath("add-coin.png").',
    code: `import { getImagePath, getGifPath, getSoundPath } from '@/utils/getDynamicAssets';

const src = getImagePath('add-coin.png');      // src/assets/images/add-coin.png
const gif = getGifPath('loading');             // src/assets/gifs/loading.gif
getSoundPath('notify').play();                 // src/assets/sounds/notify.wav`,
    header: 'getDynamicAssets',
  },
  {
    title: 'countries',
    description:
      'Built once at module load from libphonenumber-js: allCountries (sorted CountryOption[] with code, name, dialCode, flag) and countryCodeToFlag(code) which builds the flag emoji from the ISO code.',
    howToUse:
      'Use for country and dial-code selects. The Field.Phone component already uses it, so you rarely need it directly. Names are English only.',
    code: `import { allCountries, countryCodeToFlag } from '@/utils/countries';

countryCodeToFlag('EG'); // flag emoji
allCountries.find((c) => c.code === 'EG')?.dialCode; // '20'`,
    header: 'countries',
  },
];

export const UTILS_SECTIONS: readonly DocSection[] = [
  UTILS_OVERVIEW_SECTION,
  UTILS_CN_SECTION,
  UTILS_API_ERROR_SECTION,
  UTILS_TOAST_SECTION,
  ...UTILS_FORMAT_SECTIONS,
  ...UTILS_SMALL_SECTIONS,
];
