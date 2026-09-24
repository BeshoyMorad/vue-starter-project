/* eslint-disable max-lines-per-function */
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
import { computed, type ComputedRef } from 'vue';

export interface UseTableOptions<
  TFilters extends object = object,
> extends TableStateOptions<TFilters> {
  queryKey: QueryKey;
  endpoint: string;
  queryOptions?: object;
  extractData?: (data: unknown) => unknown[];
}

export type DataTableState =
  | 'loading'
  | 'empty'
  | 'search-empty'
  | 'filtered-empty'
  | 'success'
  | 'error';

export type UseDataTableReturn<
  TData,
  TFilters extends object = object,
  TError = Error,
> = TableStateReturn<TFilters> &
  Omit<UseQueryReturnType<unknown, TError>, 'data' | 'meta'> & {
    data: ComputedRef<TData[]>;
    meta: ComputedRef<Meta | CursorMeta | null>;
    isEmpty: ComputedRef<boolean>;
    isSearchEmpty: ComputedRef<boolean>;
    isFilteredEmpty: ComputedRef<boolean>;
    tableState: ComputedRef<DataTableState>;
    dynamicQueryKey: ComputedRef<QueryKey>;
    goToNext: () => void;
    goToPrev: () => void;
    goToPage: (page: number) => void;
    changeLimit: (limit: number) => void;
    extraData: ComputedRef<unknown>;
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

  const data = computed<TData[]>(() => {
    const rawData = rawResponse.value?.data;
    if (rawData == null) return [];
    return options.extractData
      ? (options.extractData(rawData) as TData[])
      : (rawData as unknown as TData[]);
  });

  const extraData = computed(() => {
    return rawResponse.value?.data ?? null;
  });

  const isEmpty = computed(() => {
    if (query.isLoading.value) return false;
    return data.value.length === 0 && !state.hasSearch.value && !state.hasFilters.value;
  });

  const isSearchEmpty = computed(() => {
    if (query.isLoading.value) return false;
    return data.value.length === 0 && state.hasSearch.value && !state.hasFilters.value;
  });

  const isFilteredEmpty = computed(() => {
    if (query.isLoading.value) return false;
    return data.value.length === 0 && state.hasFilters.value;
  });

  const tableState = computed<DataTableState>(() => {
    if (query.isLoading.value) return 'loading';
    if (query.isError.value) return 'error';
    if (data.value.length === 0) {
      if (state.hasFilters.value) return 'filtered-empty';
      if (state.hasSearch.value) return 'search-empty';
      return 'empty';
    }
    return 'success';
  });

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
    dynamicQueryKey,
    data,
    meta,
    isEmpty, // Data is empty and no search or filters are applied
    isSearchEmpty, // Data is empty and search is applied
    isFilteredEmpty, // Data is empty and filters are applied
    tableState,
    goToNext,
    goToPrev,
    goToPage,
    changeLimit,
    extraData,
    ...query,
  };
}
