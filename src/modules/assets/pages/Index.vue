<script setup lang="ts">
  import { computed } from 'vue';
  import type { AssetFilter, AssetVault } from '@/modules/assets/types';
  import { Table, Field, PageWrapper, Button, EmptyPlaceholder } from '@/components';
  import { assetColumns } from '@/modules/assets/columns';
  import { useDataTable } from '@/composables/useDataTable';
  import { TEST_IDS } from '@/lib/test-ids';
  import { QUERY_KEYS } from '@/lib/query-keys';
  import { apiRoute } from '@/lib/api/endpoints';
  import { usePermissionStore } from '@/stores/permissions';
  import { useModal } from '@/composables';
  import AssetFormDialog from '@/modules/assets/components/AssetFormDialog.vue';
  import AssetFiltersDialog from '@/modules/assets/components/AssetFiltersDialog.vue';

  const { can } = usePermissionStore();

  const { isOpen: isFiltersOpen, openModal: openFiltersModal } = useModal();
  const { isOpen: isCreateModalOpen, openModal: openCreateModal } = useModal();

  // ── Data fetching ───────────────────────────────────────────────────────────
  const {
    data,
    meta,
    isLoading,
    isEmpty,
    isSearchEmpty,
    isFilteredEmpty,
    search,
    goToPage,
    goToNext,
    goToPrev,
    changeLimit,
    filters,
    setFilters,
    clearFilters,
    sort,
  } = useDataTable<AssetVault, AssetFilter>({
    queryKey: QUERY_KEYS.assets.list(),
    endpoint: apiRoute('assets.list'),
    queryOptions: {
      enabled: computed(() => can('assets.listView')),
    },
  });

  // ── Page title ───────────────────────────────────────────────────────────────
  const title = computed(() => {
    const total = (meta.value as Meta | null)?.totalItems;
    return total != null ? `Assets (${total})` : 'Assets';
  });
</script>

<template>
  <PageWrapper
    :title="!isEmpty ? title : ''"
    :subtitle="!isEmpty ? 'Manage your assets and add new ones.' : ''"
    fit-height
  >
    <template v-if="!isEmpty" #actions>
      <div class="flex items-center justify-between gap-3">
        <Field.Text
          v-model="search"
          :test-id="TEST_IDS.assets.search"
          placeholder="Search assets"
          icon="hugeicons--search-01"
          class="max-w-96"
        />

        <div class="flex shrink-0 items-center gap-4">
          <Button
            :test-id="TEST_IDS.assets.filterBtn"
            variant="outline"
            icon="hugeicons--filter"
            @click="openFiltersModal"
          >
            Filter
          </Button>

          <Button
            v-if="can('assets.create')"
            icon="hugeicons--plus-sign"
            :test-id="TEST_IDS.assets.addAssetBtn"
            @click="openCreateModal"
          >
            Add Asset
          </Button>
        </div>
      </div>
    </template>

    <EmptyPlaceholder
      v-if="isEmpty"
      icon="hugeicons--coins-01"
      icon-class="size-35 text-foreground-primary-caption"
      title="Your crypto assets is looking a little empty!"
      description="Explore our diverse range of assets and become part of a thriving community of investors."
    >
      <template #action>
        <Button
          v-if="can('assets.create')"
          icon="hugeicons--plus-sign"
          :test-id="TEST_IDS.assets.addAssetBtn"
          @click="openCreateModal"
        >
          Add Asset
        </Button>
      </template>
    </EmptyPlaceholder>

    <Table
      v-else
      :columns="assetColumns"
      :value="data"
      :loading="isLoading"
      :is-filtered-empty="isFilteredEmpty"
      :is-search-empty="isSearchEmpty"
      :meta="meta"
      @page-change="goToPage"
      @next="goToNext"
      @prev="goToPrev"
      @limit-change="changeLimit"
      @sort="sort"
    />
  </PageWrapper>

  <AssetFormDialog v-if="isCreateModalOpen" v-model:open="isCreateModalOpen" />

  <AssetFiltersDialog
    v-if="isFiltersOpen"
    v-model:open="isFiltersOpen"
    :filters="filters"
    @apply="setFilters"
    @clear="clearFilters"
  />
</template>
