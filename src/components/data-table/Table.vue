<script setup lang="ts" generic="TRow extends { id: number | string }">
  import { cn } from '@/utils';
  import { type ColumnDef } from '@tanstack/vue-table';
  import { Skeleton, EmptyPlaceholder } from '@/components';
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
    meta?: Meta | CursorMeta | null;
    limitOptions?: number[];
    clickable?: boolean;
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
      <template v-if="loading">
        <UITableRow v-for="i in 10" :key="`skeleton-row-${i}`">
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
