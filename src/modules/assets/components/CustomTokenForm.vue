<script setup lang="ts">
  import { Field, Button, EntityAvatar } from '@/components';
  import { apiRoute } from '@/lib/api/endpoints';
  import { QUERY_KEYS } from '@/lib/query-keys';
  import { TEST_IDS } from '@/lib/test-ids';
  import { useCustomTokenForm } from '@/modules/assets/composables/useCustomTokenForm';

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const { onSubmit, isFieldsDisabled, isPending, isDirty } = useCustomTokenForm({
    onSuccess: () => {
      emit('close');
    },
  });
</script>

<template>
  <form class="space-y-5" @submit.prevent="onSubmit">
    <h3 class="text-foreground text-base font-medium">Add Custom Token</h3>

    <Field.ImageUpload
      name="logo"
      :test-id="TEST_IDS.assets.customTokenForm.logo"
      size-preset="default"
      placeholder="Upload Photo"
    />

    <Field.InfiniteScrollSelect
      name="networkId"
      label="Networks"
      placeholder="All Networks"
      :endpoint="apiRoute('networks.list')"
      :query-key="QUERY_KEYS.networks.list()"
      option-label="name"
      :test-id="TEST_IDS.assets.customTokenForm.network"
    >
      <template #value="{ selectedOption }">
        <EntityAvatar :name="selectedOption.name" :logo="selectedOption.logo" size="sm" />
      </template>

      <template #option="{ option }">
        <EntityAvatar :name="option.name" :logo="option.logo" />
      </template>
    </Field.InfiniteScrollSelect>

    <Field.Text
      name="contractAddress"
      label="Contract Address"
      placeholder="Add Contract Address"
      :test-id="TEST_IDS.assets.customTokenForm.contractAddress"
    />

    <Field.Text
      name="name"
      label="Token Name"
      placeholder="Add Token Name"
      :test-id="TEST_IDS.assets.customTokenForm.name"
      :disabled="isFieldsDisabled"
    />

    <Field.Text
      name="symbol"
      label="Token Symbol"
      placeholder="Add Token Symbol"
      :test-id="TEST_IDS.assets.customTokenForm.symbol"
      :disabled="isFieldsDisabled"
    />

    <Field.Number
      name="decimals"
      label="Token Decimal"
      placeholder="Add Token Decimal"
      :test-id="TEST_IDS.assets.customTokenForm.decimals"
      :hide-steppers="true"
      :disabled="isFieldsDisabled"
    />

    <div class="border-border mt-6 flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        :test-id="TEST_IDS.assets.customTokenForm.cancelBtn"
        class="min-w-28"
        :disabled="isPending"
        @click="emit('close')"
      >
        <!-- :disabled="isPending || isUploading" -->
        Cancel
      </Button>

      <Button
        type="submit"
        variant="default"
        :test-id="TEST_IDS.assets.customTokenForm.submitBtn"
        class="min-w-28"
        :loading="isPending"
        :disabled="!isDirty || isPending"
      >
        <!-- :loading="isPending || isUploading"
        :disabled="!isDirty || isPending || isUploading" -->
        Add
      </Button>
    </div>
  </form>
</template>
