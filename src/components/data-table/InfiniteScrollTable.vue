<script setup lang="ts" generic="TRow extends { id: number | string }">
  import { ref, computed, useTemplateRef, onMounted } from 'vue';
  import type { HTMLAttributes } from 'vue';
  import { useInfiniteScroll } from '@vueuse/core';
  import { type ColumnDef } from '@tanstack/vue-table';
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
  import { useTableRowClick } from './useTableRowClick';
  import { useDataTableState } from './useDataTableState';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    columns: ColumnDef<TRow, unknown>[];
    value: TRow[];
    loading?: boolean;
    isFetchingNextPage?: boolean;
    hasMore?: boolean;
    height?: string;
    maxHeight?: string;
    skeletonRows?: number;
    class?: HTMLAttributes['class'];
    clickable?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    height: 'auto',
    maxHeight: '500px',
    skeletonRows: 10,
    class: '',
    clickable: false,
  });
  const emit = defineEmits<{
    (e: 'load-more'): void;
    (e: 'sort', sorting: { sortKey?: string; order?: 'ASC' | 'DESC' }): void;
    (e: 'rowClick', row: TRow): void;
  }>();

  const { isRowClickable, handleRowClick } = useTableRowClick<TRow>(
    () => props.clickable || false,
    (row) => emit('rowClick', row)
  );

  const { table } = useDataTableState<TRow>({
    value: () => props.value,
    columns: () => props.columns,
    onSort: (sorting) => emit('sort', sorting),
  });

  // VueUse Infinite Scroll Container Setup
  const tableRef = useTemplateRef<InstanceType<typeof Table>>('tableRef');
  const scrollContainer = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (tableRef.value?.$el) {
      const scrollable: HTMLElement | null = tableRef.value.$el.querySelector(
        '[data-slot="table-wrapper"]'
      );
      scrollContainer.value = scrollable || tableRef.value.$el;
    }
  });

  const canLoadMore = computed(() => props.hasMore && !props.isFetchingNextPage && !props.loading);

  useInfiniteScroll(
    scrollContainer,
    () => {
      emit('load-more');
    },
    {
      distance: 150,
      canLoadMore() {
        return canLoadMore.value;
      },
    }
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
          : 'overflow-y-hidden',
        props.class
      )
    "
    :style="{
      height: props.height,
      maxHeight: props.maxHeight,
    }"
  >
    <TableHeader class="bg-background-surface sticky top-0 z-20 shadow-sm">
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
          :class="cn(isRowClickable && 'hover:bg-default-hovered cursor-pointer transition-colors')"
          @click="handleRowClick(row.original, $event)"
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
