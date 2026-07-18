import { ref } from 'vue';
import {
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table';

interface DataTableStateOptions<TRow> {
  value: () => TRow[];
  columns: () => ColumnDef<TRow, unknown>[];
  onSort?: (sorting: { sortKey?: string; order?: 'ASC' | 'DESC' }) => void;
}

export function useDataTableState<TRow>(options: DataTableStateOptions<TRow>) {
  const sorting = ref<SortingState>([]);

  const table = useVueTable({
    get data() {
      return options.value();
    },
    get columns() {
      return options.columns();
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
      options.onSort?.({
        sortKey: currentSort?.id,
        order: currentSort ? (currentSort.desc ? 'DESC' : 'ASC') : undefined,
      });
    },
  });

  return {
    sorting,
    table,
  };
}
