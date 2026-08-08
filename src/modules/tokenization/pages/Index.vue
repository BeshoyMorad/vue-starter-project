<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { TokenFilter, Token } from '@/modules/tokenization/types';
  import { Table, Field, PageWrapper, Button, EmptyPlaceholder } from '@/components';
  import { tokenColumns } from '@/modules/tokenization/columns';
  import { useDataTable } from '@/composables/useDataTable';
  import { TEST_IDS } from '@/lib/test-ids';
  import { QUERY_KEYS } from '@/lib/query-keys';
  import { apiRoute } from '@/lib/api/endpoints';
  import { usePermissionStore } from '@/stores/permissions';
  import { useModal } from '@/composables';
  import { paths } from '@/router/paths';
  import { TokenDetailsDialog, TokenFiltersDialog } from '@/modules/tokenization/components';

  const { can } = usePermissionStore();

  const { isOpen: isFiltersOpen, openModal: openFiltersModal } = useModal();

  const { isOpen, openModal } = useModal();
  const selectedTokenId = ref<number | null>(null);

  const handleRowClick = (row: Token) => {
    selectedTokenId.value = Number(row.id);
    openModal();
  };

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
  } = useDataTable<Token, TokenFilter>({
    queryKey: QUERY_KEYS.tokenization.list(),
    endpoint: apiRoute('tokenization.list'),
    queryOptions: {
      enabled: computed(() => can('securityTokens.listView')),
    },
  });

  // ── Page title ───────────────────────────────────────────────────────────────
  const title = computed(() => {
    const total = (meta.value as Meta | null)?.totalItems;
    return total != null ? `Tokens (${total})` : 'Tokens';
  });
</script>

<template>
  <PageWrapper
    :title="!isEmpty ? title : ''"
    :subtitle="!isEmpty ? 'Manage your tokens and add new ones.' : ''"
    fit-height
  >
    <template v-if="!isEmpty" #actions>
      <div class="flex items-center justify-between gap-3">
        <Field.Text
          v-model="search"
          :test-id="TEST_IDS.tokenization.search"
          placeholder="Search tokens"
          icon="hugeicons--search-01"
          class="max-w-96"
        />

        <div class="flex shrink-0 items-center gap-4">
          <Button
            :test-id="TEST_IDS.tokenization.filterBtn"
            variant="outline"
            icon="hugeicons--filter"
            @click="openFiltersModal"
          >
            Filter
          </Button>

          <RouterLink v-if="can('securityTokens.create')" :to="{ name: paths.tokenization.create }">
            <Button icon="hugeicons--plus-sign" :test-id="TEST_IDS.tokenization.addTokenBtn">
              Add Tokens
            </Button>
          </RouterLink>
        </div>
      </div>
    </template>

    <EmptyPlaceholder
      v-if="isEmpty"
      icon="hugeicons--token-circle"
      icon-class="size-35 text-foreground-primary-caption"
      title="Ready to unlock the power of tokenized assets?"
      description="Get started by creating your security token here."
    >
      <template #action>
        <RouterLink v-if="can('securityTokens.create')" :to="{ name: paths.tokenization.create }">
          <Button icon="hugeicons--plus-sign" :test-id="TEST_IDS.tokenization.addTokenBtn">
            Create New Token
          </Button>
        </RouterLink>
      </template>
    </EmptyPlaceholder>

    <Table
      v-else
      :columns="tokenColumns"
      :value="data"
      :loading="isLoading"
      :is-filtered-empty="isFilteredEmpty"
      :is-search-empty="isSearchEmpty"
      :meta="meta"
      clickable
      @row-click="handleRowClick"
      @page-change="goToPage"
      @next="goToNext"
      @prev="goToPrev"
      @limit-change="changeLimit"
      @sort="sort"
    />
  </PageWrapper>

  <TokenFiltersDialog
    v-if="isFiltersOpen"
    v-model:open="isFiltersOpen"
    :filters="filters"
    @apply="setFilters"
    @clear="clearFilters"
  />

  <TokenDetailsDialog
    v-if="isOpen && selectedTokenId"
    v-model:open="isOpen"
    :token-id="selectedTokenId"
  />
</template>
