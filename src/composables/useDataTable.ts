import { ref, computed, watch } from "vue";
import { keepPreviousData, useQuery, type QueryKey } from "@tanstack/vue-query";
import { fetchTableData } from "@/lib/api/table";
import { useTableState, type BaseTableOptions } from "./useTableState";

export interface UseTableOptions<
  TFilters extends object = object,
> extends BaseTableOptions<TFilters> {
  queryKey: QueryKey;
  endpoint: string;
  queryOptions?: object;
}

export function useDataTable<TData = unknown, TFilters extends object = object>(
  options: UseTableOptions<TFilters>,
) {
  const state = useTableState<TFilters>(options);
  const cursor = ref<string | null>(null);

  // Reset cursor when search or filters change
  watch(
    [state.debouncedSearch, state.filters],
    () => {
      cursor.value = null;
    },
    { deep: true },
  );

  const params = computed(() => ({
    ...state.baseParams.value,
    cursor: cursor.value ?? undefined,
  }));

  const dynamicQueryKey = computed(() => [...options.queryKey, params.value]);

  const { data: rawResponse, ...query } = useQuery({
    queryKey: dynamicQueryKey,
    queryFn: () => fetchTableData<TData>(options.endpoint, params.value),
    staleTime: 0,
    placeholderData: keepPreviousData,
    ...(options.queryOptions ?? {}),
  });

  const meta = computed(() => rawResponse.value?.meta ?? null);
  const data = computed<TData[]>(() => rawResponse.value?.data ?? []);

  return {
    ...state,
    data,
    meta,
    goToNext: () => {
      if (meta.value?.next_cursor) cursor.value = meta.value.next_cursor;
    },
    goToPrev: () => {
      if (meta.value?.prev_cursor) cursor.value = meta.value.prev_cursor;
    },
    resetPagination: () => {
      cursor.value = null;
    },
    ...query,
  };
}
