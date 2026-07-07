<script setup lang="ts" generic="TRow extends { id: number | string }">
  import { ref, computed } from 'vue';
  import { cn } from '@/utils';
  import {
    getCoreRowModel,
    useVueTable,
    type ColumnDef,
    type SortingState,
  } from '@tanstack/vue-table';
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
    (e: 'sort', sorting: { sort_by?: string; sort_order?: 'asc' | 'desc' }): void;
    (e: 'pageChange', page: number): void;
    (e: 'limitChange', limit: number): void;
    (e: 'next'): void;
    (e: 'prev'): void;
    (e: 'rowClick', row: TRow): void;
  }>();

  const isRowClickable = computed(() => props.clickable || false);

  const handleRowClick = (row: TRow, event: MouseEvent) => {
    if (!isRowClickable.value) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const isInteractive = target.closest(
      'button, a, input, select, textarea, [role="menuitem"], [role="button"], svg, path'
    );
    if (isInteractive) return;

    emit('rowClick', row);
  };

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
