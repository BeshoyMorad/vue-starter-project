import type { DocSection } from '@/modules/doc/shared/types';

const MUTATION_CODE = `// src/modules/assets/mutations/useCreateCustomTokenMutation.ts
export const useCreateCustomTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<unknown>, unknown, CreateCustomTokenPayload>({
    mutationFn: (payload) => assetsServices.createCustomToken(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.assets.list() });
      success(data.message || 'Custom token added successfully');
    },
    // no onError here when the composable maps errors (see below)
  });
};`;

const COMPOSABLE_CODE = `// src/modules/assets/composables/useCustomTokenForm.ts
export function useCustomTokenForm(options?: { onSuccess?: () => void }) {
  const { handleSubmit, setErrors, setFieldValue, meta } = useForm<CustomTokenFormValues>({
    validationSchema: toTypedSchema(customTokenSchema),
    initialValues: { networkId: undefined, contractAddress: '', name: '', symbol: '' },
  });

  const errorMessage = ref<string>();
  const { mutateAsync, isPending: isMutating } = useCreateCustomTokenMutation();
  const { uploadFormMedia, extractMediaPayload, isUploading } = useFormMedia();

  // one flag for the submit button: saving OR uploading
  const isPending = computed(() => isMutating.value || isUploading.value);

  const onSubmit = handleSubmit(async (values) => {
    errorMessage.value = undefined;
    try {
      await uploadFormMedia(values, 'ASSETS', setFieldValue);        // 1) upload new files
      const { mediaIdsToAdd } = extractMediaPayload(values);          // 2) ids for the API
      await mutateAsync({                                             // 3) map + send
        name: values.name,
        symbol: values.symbol,
        contractAddress: values.contractAddress,
        decimals: Number(values.decimals),
        networkId: Number(values.networkId),
        mediaIdsToAdd: mediaIdsToAdd as string[],
      });
      options?.onSuccess?.();
    } catch (err) {
      applyApiErrorToForm(err, setErrors);                            // field errors
      if (!getApiFieldErrors(err)) errorMessage.value = getApiErrorMessage(err); // general
    }
  });

  return { onSubmit, isPending, isDirty: computed(() => meta.value.dirty), errorMessage };
}`;

const TEMPLATE_CODE = `<!-- src/modules/assets/components/CustomTokenForm.vue -->
<script setup lang="ts">
  import { TEST_IDS } from '@/lib/test-ids';
  import { useCustomTokenForm } from '@/modules/assets/composables/useCustomTokenForm';

  const emit = defineEmits<{ (e: 'close'): void }>();

  const { onSubmit, isPending, isDirty, errorMessage } = useCustomTokenForm({
    onSuccess: () => emit('close'),
  });
</script>

<template>
  <form class="space-y-5" @submit.prevent="onSubmit">
    <p v-if="errorMessage" role="alert" class="text-danger-600 text-sm">{{ errorMessage }}</p>

    <Field.ImageUpload name="logo" :test-id="TEST_IDS.assets.customTokenForm.logo" />

    <!-- name must equal the schema key: that is the whole link -->
    <Field.Text name="name" label="Token Name" :test-id="TEST_IDS.assets.customTokenForm.name" />
    <Field.Number name="decimals" label="Token Decimal" :test-id="TEST_IDS.assets.customTokenForm.decimals" />

    <Button type="submit" :loading="isPending" :disabled="!isDirty || isPending">Add</Button>
  </form>
</template>`;

const LINK_ITEMS = [
  {
    name: 'name="..."',
    description:
      'Must equal the schema key (nested: "address.city", lists: "wallets[0].address"). The Field component reads value and error from the nearest useForm by this name. No v-model needed.',
  },
  {
    name: 'label and description',
    description:
      'Pass them to the Field. Required field errors are shown under it automatically. Use the same text in schema .label() so messages match.',
  },
  {
    name: ':test-id',
    description:
      'Required on every Field and Button. Take the value from TEST_IDS in src/lib/test-ids.ts; add new keys there.',
  },
  {
    name: 'type="submit" + @submit.prevent',
    description:
      'Call only onSubmit. handleSubmit validates first and only runs your function when the form is valid.',
  },
  {
    name: ':loading / :disabled',
    description:
      'Bind to isPending (mutation + upload). Use isDirty to keep an untouched form from being submitted.',
  },
  {
    name: 'v-model (no name)',
    description:
      'Fields used outside a form, such as search boxes and filters, use v-model. Fields in a form use name. Do not mix both on one field.',
  },
] as const;

const EDIT_CODE = `// Edit mode: load the entity, then reset the form with initial values
const { data: asset } = useAsset(id);

watch(asset, (a) => {
  if (!a) return;
  resetForm({
    values: {
      name: a.name,
      logo: createMediaValue(a.logo),          // existing server image, not re-uploaded
    },
  });
}, { immediate: true });

// payload: only changed media is sent
const { mediaIdsToAdd, mediaUrlsToRemove } = extractMediaPayload(values);`;

const API_ERROR_CODE = `// 422 { errors: { name: 'Name already exists' } }
//   -> applyApiErrorToForm sets it: the red message appears under Field.Text name="name"
// 400 { message: 'Contract not supported' } (no field errors)
//   -> errorMessage ref is filled -> shown above the form
// 401/403/500  -> handled by the client interceptor (redirect), nothing to do here

// Auth style, when the mutation owns the form context (modules/auth):
const onSubmit = handleSubmit((values, ctx) => mutateAsync({ values, ctx }));
//   onError: (e, vars) => applyApiErrorToForm(e, vars.ctx.setErrors, 'password')`;

export const FORM_WORKFLOW_BUILD_SECTIONS: DocSection[] = [
  {
    title: 'Step 2: the mutation',
    description:
      'One mutation per write action. It owns cache invalidation and the success toast, not the error mapping.',
    code: MUTATION_CODE,
    header: 'mutation',
  },
  {
    title: 'Step 3: the form composable',
    description:
      'useForm with toTypedSchema, the mutation, uploads and error handling. Keep it under 50 lines per function: move parts (like contract population in the helper) into small functions.',
    code: COMPOSABLE_CODE,
    header: 'composable',
  },
  {
    title: 'Step 4: the template',
    description:
      'The component only destructures the composable and renders Field components. Link template to form by the name prop.',
    code: TEMPLATE_CODE,
    header: 'component',
  },
  {
    title: 'Linking the template: the checklist',
    description: 'The details that make a form work and stay testable.',
    items: LINK_ITEMS,
  },
  {
    title: 'Handling API errors',
    description:
      'Use apiError: field errors go under the fields, general messages go to an inline message (the helper module uses an Alert component that is not in this starter yet; use a styled paragraph or add the component first). No manual toast in try/catch.',
    code: API_ERROR_CODE,
    header: 'errors',
  },
  {
    title: 'Edit forms',
    description:
      'Reset the form with the loaded entity and wrap existing media with createMediaValue so untouched images are not uploaded again.',
    code: EDIT_CODE,
    header: 'edit',
  },
];
