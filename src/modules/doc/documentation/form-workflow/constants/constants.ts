import type { DocSection } from '@/modules/doc/shared/types';
import { FORM_WORKFLOW_BUILD_SECTIONS } from './build';

export const FORM_WORKFLOW_DOC = {
  title: 'Building Forms',
  description:
    'The standard recipe for a form: yup schema, a form composable (useForm + mutation), a thin template made of Field components, and server errors mapped back to fields with apiError. Reference implementation: src/modules/helper (CustomTokenForm) and src/modules/auth (login).',
} as const;

const FILES_CODE = `src/modules/<feature>/
  schemas/<name>.schema.ts         yup schema + InferType form type
  mutations/useCreateXMutation.ts  useMutation + invalidate + success toast
  composables/useXForm.ts          useForm + submit + upload + error handling
  components/XForm.vue             template only: Field.* + buttons
  services/index.ts                the request (see Services page)
  types.ts                         request payload interface`;

const FLOW_CODE = `User submits
  -> handleSubmit validates with the yup schema (errors appear under fields)
  -> (optional) uploadFormMedia uploads new files, extractMediaPayload builds ids
  -> build the payload (map form values to what the API expects)
  -> mutateAsync(payload)            service -> api
       success: invalidate list, success toast, options.onSuccess() closes the dialog
       failure: applyApiErrorToForm(err, setErrors)  -> field errors + general message`;

const SHARED_RULES_ITEMS = [
  {
    name: 'phoneSchema(fieldName, message?)',
    description:
      'Optional string, valid international phone (libphonenumber). Add .required() to make it mandatory.',
  },
  {
    name: 'passwordSchema(fieldName?)',
    description: 'Required, min 8, upper, lower, digit and special character.',
  },
  {
    name: 'positiveNumberSchema(fieldName?)',
    description: 'Required number >= 0 with typed error messages.',
  },
  { name: 'percentageSchema(fieldName?)', description: 'Required number 0 to 100.' },
  {
    name: 'requiredMediaSchema(message?)',
    description:
      'For Field.ImageUpload: passes when there is a new file, a mediaId, or an existing url that was not removed.',
  },
  { name: 'optionalMediaSchema(message?)', description: 'Nullable and optional media field.' },
] as const;

const SCHEMA_CODE = `// src/modules/assets/schemas/custom-token.schema.ts
import * as yup from 'yup';
import { optionalMediaSchema, phoneSchema } from '@/lib/yup';   // shared rules

export const customTokenSchema = yup.object({
  logo: optionalMediaSchema(),
  networkId: yup.number().typeError('Network is required').required().label('Network'),
  contractAddress: yup.string().trim().required().label('Contract address'),
  name: yup.string().trim().required().label('Token name'),
  symbol: yup.string().trim().required().max(10).label('Token symbol'),
  decimals: yup.number().integer().min(0).max(18).required().label('Token decimal'),
  supportPhone: phoneSchema('supportPhone'),
});

// the ONLY form type: never hand-write a second copy
export type CustomTokenFormValues = yup.InferType<typeof customTokenSchema>;`;

export const FORM_WORKFLOW_SECTIONS: readonly DocSection[] = [
  {
    title: 'The files of a form',
    description:
      'Keep each concern in its own file. The template never calls the API and the composable never renders anything.',
    code: FILES_CODE,
    header: 'structure',
  },
  {
    title: 'The submit flow',
    description: 'What happens from click to closed dialog.',
    code: FLOW_CODE,
    header: 'flow',
  },
  {
    title: 'Step 1: the schema',
    description:
      'Schemas live in modules/<feature>/schemas/<name>.schema.ts. Export the schema and a form type derived from it. Compose shared rules from @/lib/yup first, then add field specific rules.',
    code: SCHEMA_CODE,
    header: 'schema',
  },
  {
    title: 'Shared yup methods',
    description:
      'Exported from @/lib/yup. Always check this list before writing a regex or a custom test.',
    items: SHARED_RULES_ITEMS,
  },
  ...FORM_WORKFLOW_BUILD_SECTIONS,
];
