<script setup lang="ts">
  import { ref, computed, useTemplateRef } from 'vue';
  import { useRouter } from 'vue-router';
  import { PageWrapper, MultiStepForm, ErrorAlert } from '@/components';
  import { paths } from '@/router/paths';
  import { getApiErrorMessage } from '@/utils/apiError';
  import { useFormMedia, extractMediaPayload } from '@/composables/useFormMedia';
  import { useCreateToken } from '@/modules/tokenization/composables';
  import {
    createTokenSteps,
    type CreateTokenFormValues,
  } from '@/modules/tokenization/schemas/token.schema';
  import { NFT_TOKEN_TYPE } from '@/modules/tokenization/constants/config';
  import type { GenericObject } from 'vee-validate';
  import BasicSettings from '@/modules/tokenization/components/create/BasicSettings.vue';
  import Configuration from '@/modules/tokenization/components/create/Configuration.vue';
  import { buildTokenPayload } from '@/modules/tokenization/utils/token-payload-builder';

  const router = useRouter();

  const { uploadFormMedia, isUploading } = useFormMedia();
  const { mutateAsync: createToken, isPending: isSubmitting } = useCreateToken();

  const formRef = useTemplateRef<InstanceType<typeof MultiStepForm>>('formRef');

  const isLoading = computed(() => isSubmitting.value || isUploading.value);
  const serverErrorMessage = ref<string | null>(null);

  // ── Form Submission Handler ────────────────────────────────────────────────
  const handleSubmit = async (values: GenericObject) => {
    try {
      await uploadFormMedia(values, 'TOKENIZATION', formRef.value?.form.setFieldValue);

      const mediaPayload = extractMediaPayload(values);
      const mediaIdsToAdd = (mediaPayload.mediaIdsToAdd as string[]).filter(Boolean);

      const isNFT = values.type === NFT_TOKEN_TYPE;
      const payload = buildTokenPayload(values as CreateTokenFormValues, mediaIdsToAdd, isNFT);

      await createToken(payload);

      const vaultId = values.vaultId;
      if (isNFT && vaultId) {
        router.push({
          name: paths.vaults.details,
          params: { id: vaultId },
        });
      } else {
        router.push({ name: paths.tokenization.root });
      }
    } catch (err: unknown) {
      serverErrorMessage.value = getApiErrorMessage(err);
      formRef.value?.handleApiError(err);
    }
  };
</script>

<template>
  <PageWrapper title="Create New Token" subtitle="Enter the token details & configuration settings">
    <template #header-actions>
      <p class="text-foreground-caption text-sm">
        Step {{ (formRef?.currentStep ?? 0) + 1 }} from {{ formRef?.totalSteps }}
      </p>
    </template>

    <div class="border-border border-t p-6">
      <ErrorAlert v-if="serverErrorMessage" class="mb-6">
        {{ serverErrorMessage }}
      </ErrorAlert>

      <MultiStepForm
        ref="formRef"
        test-id="create-token-multi-step-form"
        :steps="createTokenSteps"
        :loading="isLoading"
        submit-label="Save"
        :show-stepper="false"
        @submit="handleSubmit"
      >
        <template #step-0>
          <BasicSettings />
        </template>

        <template #step-1>
          <Configuration />
        </template>
      </MultiStepForm>
    </div>
  </PageWrapper>
</template>
