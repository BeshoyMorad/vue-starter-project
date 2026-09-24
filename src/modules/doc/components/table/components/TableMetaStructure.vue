<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';
  import {
    PAGINATION_META_COMPARISON_CODE_OFFSET,
    PAGINATION_META_COMPARISON_CODE_CURSOR,
  } from '../constants/constants';
  import { Table } from '@/components';
  const paginationMetaColumns = [
    {
      accessorKey: 'property',
      header: 'Property',
    },
    {
      accessorKey: 'offset',
      header: 'Offset',
    },
    {
      accessorKey: 'cursor',
      header: 'Cursor',
    },
  ];

  const paginationMetaValue = [
    {
      property: 'currentPage',
      offset: '✓',
      cursor: '—',
    },
    {
      property: 'totalPages',
      offset: '✓',
      cursor: '—',
    },
    {
      property: 'totalItems',
      offset: '✓',
      cursor: '—',
    },
    {
      property: 'itemsPerPage',
      offset: '✓',
      cursor: '—',
    },
    {
      property: 'nextCursor',
      offset: '—',
      cursor: '✓',
    },
    {
      property: 'previousCursor',
      offset: '—',
      cursor: '✓',
    },
    {
      property: 'hasNextPage',
      offset: '✓',
      cursor: '✓',
    },
    {
      property: 'hasPreviousPage',
      offset: '✓',
      cursor: '✓',
    },
  ];
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <h2 class="text-text-primary text-xl font-semibold">Pagination Meta</h2>

      <p class="text-text-secondary text-sm">
        The table uses different meta structures depending on the pagination type. Offset pagination
        uses page information, while cursor pagination uses cursors to navigate between results.
      </p>
    </div>

    <Card
      title="Offset vs Cursor Meta"
      description="The meta object returned by the API depends on the pagination strategy."
      header="Comparison"
      :code-arr="[
        { code: PAGINATION_META_COMPARISON_CODE_OFFSET },
        { code: PAGINATION_META_COMPARISON_CODE_CURSOR },
      ]"
    >
      <template #preview>
        <Table :columns="paginationMetaColumns" :value="paginationMetaValue" />
      </template>
    </Card>
  </section>
</template>
