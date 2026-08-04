<script setup lang="ts">
  import { ref } from 'vue';
  import { FormDialog, Field, EntityAvatar } from '@/components';
  import { TEST_IDS } from '@/lib/test-ids';
  import { apiRoute } from '@/lib/api/endpoints';
  import { QUERY_KEYS } from '@/lib/query-keys';
  import type { AssetFilter } from '@/modules/assets/types';
  import { ASSET_STATUSES } from '@/modules/assets/constants/asset-statuses';

  const props = defineProps<{
    filters?: AssetFilter;
  }>();

  const isOpen = defineModel<boolean>('open');

  const emit = defineEmits<{
    (e: 'apply', filters: AssetFilter): void;
    (e: 'clear'): void;
  }>();

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
    :test-id="TEST_IDS.assets.filter.dialog"
    title="Filter Assets"
    submit-label="Apply Filters"
    cancel-label="Clear"
    is-dirty
    :close-on-cancel="false"
    @cancel="onClear"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <Field.InfiniteScrollSelect
        v-model="networkId"
        :test-id="TEST_IDS.assets.filter.networkSelect"
        :endpoint="apiRoute('networks.list')"
        :query-key="QUERY_KEYS.networks.list()"
        option-label="name"
        placeholder="Select a network"
        label="Network"
      >
        <template #value="{ selectedOption }">
          <EntityAvatar :name="selectedOption.name" :logo="selectedOption.logo" size="sm" />
        </template>

        <template #option="{ option }">
          <EntityAvatar :name="option.name" :logo="option.logo" />
        </template>
      </Field.InfiniteScrollSelect>

      <Field.Select
        v-model="status"
        :test-id="TEST_IDS.assets.filter.statusSelect"
        :options="ASSET_STATUSES"
        option-label="name"
        option-value="id"
        placeholder="Select a status"
        label="Status"
      />
    </div>
  </FormDialog>
</template>
