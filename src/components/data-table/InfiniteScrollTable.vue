<script setup lang="ts" generic="TRow extends { id: number | string }">
  import { ref, computed, useTemplateRef, onMounted } from 'vue';
  import { useInfiniteScroll } from '@vueuse/core';
  import {
    getCoreRowModel,
    useVueTable,
    type ColumnDef,
    type SortingState,
  } from '@tanstack/vue-table';
  import { cn } from '@/utils';
  import { Icon, Skeleton, EmptyPlaceholder } from '@/components';
  import {
    Table,
    TableHeader,
    TableRow as UITableRow,
    TableCell,
    TableBody,
  } from '@/components/ui/table';
  import TableHead from './TableHead.vue';
  import TableRow from './TableRow.vue';

  interface Props {
    columns: ColumnDef<TRow, unknown>[];
    value: TRow[];
    loading?: boolean;
    isFetchingNextPage?: boolean;
    hasMore?: boolean;
    height?: string;
    maxHeight?: string;
    skeletonRows?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    height: 'auto',
    maxHeight: '500px',
    skeletonRows: 10,
  });
  const emit = defineEmits<{
    (e: 'load-more'): void;
    (e: 'sort', sorting: { sort_by?: string; sort_order?: 'asc' | 'desc' }): void;
  }>();

  const sorting = ref<SortingState>([]);
  const table = useVueTable({
    get data() {
      return props.value;
    },
    get columns() {
      return props.columns;
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    state: {
      get sorting() {
        return sorting.value;
      },
    },
    onSortingChange: (updaterOrValue) => {
      sorting.value =
        typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;

      const currentSort = sorting.value[0];
      emit('sort', {
        sort_by: currentSort?.id,
        sort_order: currentSort ? (currentSort.desc ? 'desc' : 'asc') : undefined,
      });
    },
  });

  // VueUse Infinite Scroll Container Setup
  const tableRef = useTemplateRef<InstanceType<typeof Table>>('tableRef');
  const scrollContainer = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (tableRef.value?.containerRef) {
      scrollContainer.value = tableRef.value.containerRef;
    }
  });

  const canLoadMore = computed(() => props.hasMore && !props.isFetchingNextPage && !props.loading);

  useInfiniteScroll(
    scrollContainer,
    () => {
      if (canLoadMore.value) emit('load-more');
    },
    { distance: 150 }
  );
</script>

<template>
  <Table
    ref="tableRef"
    :container-class="
      cn(
        'rounded-md relative w-full',
        (props.maxHeight || props.height) && table.getRowModel().rows?.length
          ? 'overflow-y-auto'
          : 'overflow-y-hidden'
      )
    "
    :style="{
      height: props.height,
      maxHeight: props.maxHeight,
    }"
  >
    <TableHeader class="bg-bg-surface sticky top-0 z-20 shadow-sm">
      <TableHead :table="table" />
    </TableHeader>

    <TableBody>
      <template v-if="loading">
        <UITableRow v-for="i in skeletonRows" :key="`skeleton-row-${i}`">
          <TableCell v-for="(_, index) in columns.length" :key="`skeleton-col-${index}`">
            <Skeleton class="h-4 w-[60%]" />
          </TableCell>
        </UITableRow>
      </template>

      <template v-else-if="table.getRowModel().rows?.length">
        <TableRow
          v-for="(row, index) in table.getRowModel().rows"
          :key="row.id"
          :row="row"
          :index="index"
        />
      </template>

      <UITableRow v-else-if="!loading">
        <TableCell :colspan="columns.length">
          <EmptyPlaceholder />
        </TableCell>
      </UITableRow>
    </TableBody>

    <template #footer>
      <div v-if="isFetchingNextPage" class="flex w-full justify-center py-4">
        <Icon icon="hugeicons--loading-03" class="size-6 animate-spin" test-id="loading-icon" />
      </div>
    </template>
  </Table>
</template>
