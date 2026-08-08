<script setup lang="ts">
  import { ref } from 'vue';
  import { FormDialog, Field, EntityAvatar } from '@/components';
  import { TEST_IDS } from '@/lib/test-ids';
  import type { TokenFilter } from '@/modules/tokenization/types';
  import { TOKEN_STATUSES } from '@/modules/tokenization/constants/token-statuses';
  import { useGetTokenNetworks } from '@/modules/tokenization/composables/useGetTokenNetworks';

  const props = defineProps<{
    filters?: TokenFilter;
  }>();

  const isOpen = defineModel<boolean>('open');

  const emit = defineEmits<{
    (e: 'apply', filters: TokenFilter): void;
    (e: 'clear'): void;
  }>();

  const { networks, isLoading: isNetworksLoading } = useGetTokenNetworks();

  const networkId = ref(props.filters?.networkId);
  const status = ref(props.filters?.status);

  const onSubmit = () => {
    emit('apply', {
      networkId: networkId.value,
      status: status.value,
    });

    isOpen.value = false;
  };

  const onClear = () => {
    networkId.value = undefined;
    status.value = undefined;

    emit('clear');
  };
</script>

<template>
  <FormDialog
    v-model:open="isOpen"
    :test-id="TEST_IDS.tokenization.filter.dialog"
    title="Filter Tokens"
    submit-label="Apply Filters"
    cancel-label="Clear"
    is-dirty
    :close-on-cancel="false"
    @cancel="onClear"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <Field.Select
        v-model="networkId"
        :test-id="TEST_IDS.tokenization.filter.networkSelect"
        :options="networks ?? []"
        :loading="isNetworksLoading"
        option-label="name"
        option-value="id"
        placeholder="Select a network"
        label="Network"
      >
        <template #value="{ selectedOption }">
          <EntityAvatar :name="selectedOption.name" :logo="selectedOption.logo" size="sm" />
        </template>

        <template #option="{ option }">
          <EntityAvatar :name="option.name" :logo="option.logo" />
        </template>
      </Field.Select>

      <Field.Select
        v-model="status"
        :test-id="TEST_IDS.tokenization.filter.statusSelect"
        :options="TOKEN_STATUSES"
        option-label="name"
        option-value="id"
        placeholder="Select a status"
        label="Status"
      />
    </div>
  </FormDialog>
</template>
