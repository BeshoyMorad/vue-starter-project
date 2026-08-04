<script setup lang="ts">
  import { computed } from 'vue';
  import { Field, Button, EntityAvatar, InfiniteScrollTable, ErrorAlert } from '@/components';
  import { apiRoute } from '@/lib/api/endpoints';
  import { QUERY_KEYS } from '@/lib/query-keys';
  import { useAvailableAssetsForm } from '@/modules/assets/composables/useAvailableAssetsForm';
  import { getAvailableAssetsColumns } from '@/modules/assets/columns/available-assets';
  import { TEST_IDS } from '@/lib/test-ids';
  import type { Asset } from '@/modules/assets/types';

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const {
    onSubmit,
    assets,
    search,
    networkId,
    isSelectAll,
    selectedIds,
    toggleSelectAll,
    toggleRowSelection,
    isLoading,
    isFetchingNextPage,
    hasMore,
    fetchNextPage,
    isPending,
    errorMessage,
  } = useAvailableAssetsForm({
    onSuccess: () => {
      emit('close');
    },
  });

  const columns = computed(() =>
    getAvailableAssetsColumns({
      isSelectAll: isSelectAll.value,
      selectedIds: selectedIds.value,
      toggleSelectAll,
      toggleRowSelection,
    })
  );

  const handleRowClick = (row: Asset) => {
    if (isSelectAll.value) return;
    const isSelected = selectedIds.value.has(row.id);
    toggleRowSelection(row.id, !isSelected);
  };
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <h3 class="text-foreground text-base font-medium">Select Your Assets</h3>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Field.Text
        v-model="search"
        placeholder="Search for assets"
        icon="hugeicons--search-01"
        :test-id="TEST_IDS.assets.availableAssetsForm.search"
        container-class="sm:col-span-2"
      />

      <Field.InfiniteScrollSelect
        v-model="networkId"
        placeholder="All Networks"
        :endpoint="apiRoute('networks.list')"
        :query-key="QUERY_KEYS.networks.list()"
        option-label="name"
        :test-id="TEST_IDS.assets.availableAssetsForm.networksSelect"
      >
        <template #value="{ selectedOption }">
          <EntityAvatar :name="selectedOption.name" :logo="selectedOption.logo" size="sm" />
        </template>

        <template #option="{ option }">
          <EntityAvatar :name="option.name" :logo="option.logo" />
        </template>
      </Field.InfiniteScrollSelect>
    </div>

    <ErrorAlert v-if="errorMessage">
      {{ errorMessage }}
    </ErrorAlert>

    <InfiniteScrollTable
      :columns="columns"
      :value="assets"
      :loading="isLoading"
      :is-fetching-next-page="isFetchingNextPage"
      :has-more="hasMore"
      max-height="400px"
      class="min-h-100"
      clickable
      @load-more="fetchNextPage"
      @row-click="handleRowClick"
    />

    <div class="border-border mt-6 flex justify-end gap-3 pt-4">
      <Button
        type="button"
        variant="outline"
        :test-id="TEST_IDS.assets.availableAssetsForm.cancelBtn"
        class="min-w-28"
        :disabled="isPending"
        @click="emit('close')"
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="default"
        :test-id="TEST_IDS.assets.availableAssetsForm.submitBtn"
        class="min-w-28"
        :loading="isPending"
        :disabled="isPending"
      >
        Add
      </Button>
    </div>
  </form>
</template>
