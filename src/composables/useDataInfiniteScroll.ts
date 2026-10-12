import { computed, toValue } from 'vue';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/vue-query';
import { fetchTableData } from '@/lib/api/table';
import { useTableState } from './useTableState';
import type {
  InfiniteScrollDataState,
  TableParams,
  UseDataInfiniteScrollOptions,
  UseDataInfiniteScrollReturn,
} from './types';

// eslint-disable-next-line max-lines-per-function
export function useDataInfiniteScroll<
  TData = unknown,
  TFilters extends object = object,
  TError = Error,
>(
  options: UseDataInfiniteScrollOptions<TFilters>
): UseDataInfiniteScrollReturn<TData, TFilters, TError> {
  const state = useTableState<TFilters>(options);
  const paginationType = options.paginationType ?? 'offset';

  const dynamicQueryKey = computed(() => [
    ...toValue(options.queryKey),
    'infinite',
    state.baseParams.value,
  ]);

  const {
    data: rawPages,
    fetchNextPage,
    hasNextPage,
    ...query
  } = useInfiniteQuery<CursorPaginatedResponse<TData> | OffsetPaginatedResponse<TData>, TError>({
    queryKey: dynamicQueryKey,
    queryFn: ({ pageParam }) => {
      const cleanParams = state.baseParams.value as unknown as TableParams;
      if (paginationType === 'cursor') {
        return fetchTableData<CursorPaginatedResponse<TData>>(toValue(options.endpoint), {
          ...cleanParams,
          cursor: (pageParam as string | null) ?? undefined,
        } as unknown as TableParams);
      } else {
        return fetchTableData<OffsetPaginatedResponse<TData>>(toValue(options.endpoint), {
          ...cleanParams,
          page: pageParam as number,
        } as unknown as TableParams);
      }
    },
    getNextPageParam: (lastPage) => {
      if (paginationType === 'cursor') {
        const meta = (lastPage as CursorPaginatedResponse<TData>).meta;
        return meta?.nextCursor ?? undefined;
      } else {
        const meta = (lastPage as OffsetPaginatedResponse<TData>).meta;
        return meta?.hasNextPage ? meta.currentPage + 1 : undefined;
      }
    },
    initialPageParam: (paginationType === 'cursor' ? null : 1) as string | null | number,
    placeholderData: keepPreviousData,
    staleTime: 0,
    ...(options.queryOptions ?? {}),
  });

  const data = computed<TData[]>(
    () =>
      rawPages.value?.pages.flatMap((p) => {
        return options.extractData
          ? (options.extractData(p.data) as TData[])
          : (p.data as unknown as TData[]);
      }) ?? []
  );

  const meta = computed(() => {
    const rawMeta = rawPages.value?.pages.at(0)?.meta;
    return (rawMeta as Meta | CursorMeta) ?? undefined;
  });

  const isEmpty = computed(() => {
    if (query.isLoading.value || query.isError.value) return false;
    return data.value.length === 0 && !state.hasSearch.value && !state.hasFilters.value;
  });

  const isSearchEmpty = computed(() => {
    if (query.isLoading.value || query.isError.value) return false;
    return data.value.length === 0 && state.hasSearch.value && !state.hasFilters.value;
  });

  const isFilteredEmpty = computed(() => {
    if (query.isLoading.value || query.isError.value) return false;
    return data.value.length === 0 && state.hasFilters.value;
  });

  const tableState = computed<InfiniteScrollDataState>(() => {
    if (query.isLoading.value) return 'loading';
    if (query.isError.value) return 'error';
    if (data.value.length === 0) {
      if (state.hasFilters.value) return 'filtered-empty';
      if (state.hasSearch.value) return 'search-empty';
      return 'empty';
    }
    return 'success';
  });

  const changeLimit = (newLimit: number) => {
    state.itemsPerPage.value = newLimit;
  };

  const extraData = computed(() => {
    return rawPages.value?.pages.at(0)?.data ?? null;
  });

  return {
    ...state,
    data,
    meta,
    isEmpty, // Data is empty and no search or filters are applied
    isSearchEmpty, // Data is empty and search is applied
    isFilteredEmpty, // Data is empty and filters are applied
    tableState,
    dynamicQueryKey,
    fetchNextPage,
    hasMore: hasNextPage,
    extraData,
    changeLimit,
    ...query,
  };
}
