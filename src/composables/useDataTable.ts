/* eslint-disable max-lines-per-function */
import { computed, type ComputedRef } from 'vue';
import {
  keepPreviousData,
  useQuery,
  type QueryKey,
  type UseQueryReturnType,
} from '@tanstack/vue-query';
import { fetchTableData } from '@/lib/api/table';
import {
  useTableState,
  type TableStateOptions,
  type TableStateReturn,
  type TableParams,
} from './useTableState';

export interface UseTableOptions<
  TFilters extends object = object,
> extends TableStateOptions<TFilters> {
  queryKey: QueryKey;
  endpoint: string;
  queryOptions?: object;
}

export type UseDataTableReturn<
  TData,
  TFilters extends object = object,
  TError = Error,
> = TableStateReturn<TFilters> &
  Omit<UseQueryReturnType<unknown, TError>, 'data' | 'meta'> & {
    data: ComputedRef<TData[]>;
    meta: ComputedRef<Meta | CursorMeta | null>;
    goToNext: () => void;
    goToPrev: () => void;
    goToPage: (page: number) => void;
    changeLimit: (limit: number) => void;
  };

export function useDataTable<TData = unknown, TFilters extends object = object, TError = Error>(
  options: UseTableOptions<TFilters>
): UseDataTableReturn<TData, TFilters, TError> {
  const state = useTableState<TFilters>(options);
  const paginationType = options.paginationType ?? 'offset';

  const dynamicQueryKey = computed(() => [...options.queryKey, state.baseParams.value]);

  const { data: rawResponse, ...query } = useQuery<
    CursorPaginatedResponse<TData> | OffsetPaginatedResponse<TData>,
    TError
  >({
    queryKey: dynamicQueryKey,
    queryFn: () => {
      const cleanParams = state.baseParams.value as unknown as TableParams;
      if (paginationType === 'cursor') {
        return fetchTableData<CursorPaginatedResponse<TData>>(options.endpoint, cleanParams);
      } else {
        return fetchTableData<OffsetPaginatedResponse<TData>>(options.endpoint, cleanParams);
      }
    },
    staleTime: 0,
    placeholderData: keepPreviousData,
    ...(options.queryOptions ?? {}),
  });

  const meta = computed(() => {
    const rawMeta = rawResponse.value?.meta;
    return (rawMeta as Meta | CursorMeta) ?? null;
  });

  const data = computed<TData[]>(() => rawResponse.value?.data ?? []);

  const goToNext = () => {
    if (paginationType === 'cursor') {
      const next = (meta.value as CursorMeta | null)?.nextCursor;
      if (next) state.cursor.value = next;
    } else {
      const hasNext = (meta.value as Meta | null)?.hasNextPage;
      if (hasNext) state.page.value += 1;
    }
  };

  const goToPrev = () => {
    if (paginationType === 'cursor') {
      const prev = (meta.value as CursorMeta | null)?.previousCursor;
      if (prev) state.cursor.value = prev;
    } else {
      const hasPrev = (meta.value as Meta | null)?.hasPreviousPage;
      if (hasPrev && state.page.value > 1) state.page.value -= 1;
    }
  };

  const goToPage = (newPage: number) => {
    if (paginationType === 'offset') {
      state.page.value = newPage;
    }
  };

  const changeLimit = (newLimit: number) => {
    state.itemsPerPage.value = newLimit;
  };

  return {
    ...state,
    data,
    meta,
    goToNext,
    goToPrev,
    goToPage,
    changeLimit,
    ...query,
  };
}
