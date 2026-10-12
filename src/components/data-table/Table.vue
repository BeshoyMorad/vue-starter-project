<script setup lang="ts" generic="TRow">
  import { cn } from '@/utils';
  import { type ColumnDef } from '@tanstack/vue-table';
  import { Skeleton, EmptyPlaceholder, TableErrorState } from '@/components';
  import {
    Table,
    TableHeader,
    TableRow as UITableRow,
    TableCell,
    TableBody,
  } from '@/components/ui/table';
  import TableHead from './TableHead.vue';
  import TableRow from './TableRow.vue';
  import TablePagination from './TablePagination.vue';
  import { useTableRowClick } from './useTableRowClick';
  import { useDataTableState } from './useDataTableState';

  interface Props {
    columns: ColumnDef<TRow, unknown>[];
    value: TRow[];
    loading?: boolean;
    skeletonRows?: number;
    meta?: Meta | CursorMeta | null;
    limitOptions?: number[];
    clickable?: boolean;
    isFilteredEmpty?: boolean;
    isSearchEmpty?: boolean;
    isError?: boolean;
    errorAction?: () => void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'sort', sorting: { sortKey?: string; order?: 'ASC' | 'DESC' }): void;
    (e: 'pageChange', page: number): void;
    (e: 'limitChange', limit: number): void;
    (e: 'next'): void;
    (e: 'prev'): void;
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
</script>

<template>
  <Table container-class="rounded-md relative w-full">
    <TableHeader>
      <TableHead :table="table" />
    </TableHeader>

    <TableBody>
      <UITableRow v-if="isError">
        <TableCell :colspan="columns.length">
          <TableErrorState :button-action="errorAction" />
        </TableCell>
      </UITableRow>

      <template v-else-if="loading">
        <UITableRow v-for="i in skeletonRows ?? 10" :key="`skeleton-row-${i}`">
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
          <slot name="empty">
            <EmptyPlaceholder
              v-if="isSearchEmpty"
              image="no-search-results.png"
              title="No Results Found"
              description="No data matches your current search."
            />

            <EmptyPlaceholder
              v-else-if="isFilteredEmpty"
              image="no-search-results.png"
              title="No Results Found"
              description="No data matches your current filters."
            />

            <EmptyPlaceholder v-else image="no-search-results.png" />
          </slot>
        </TableCell>
      </UITableRow>
    </TableBody>

    <template v-if="!isError" #footer>
      <TablePagination
        :meta="meta"
        :limit-options="limitOptions"
        @page-change="emit('pageChange', $event)"
        @limit-change="emit('limitChange', $event)"
        @next="emit('next')"
        @prev="emit('prev')"
      />
    </template>
  </Table>
</template>
