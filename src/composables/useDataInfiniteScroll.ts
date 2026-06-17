import { computed, toValue, type MaybeRefOrGetter, type ComputedRef, type Ref } from 'vue';
import {
  keepPreviousData,
  useInfiniteQuery,
  type QueryKey,
  type UseInfiniteQueryReturnType,
} from '@tanstack/vue-query';
import { fetchTableData } from '@/lib/api/table';
import {
  useTableState,
  type TableStateOptions,
  type TableParams,
  type TableStateReturn,
} from './useTableState';

export interface UseDataInfiniteScrollOptions<
  TFilters extends object = object,
> extends TableStateOptions<TFilters> {
  queryKey: MaybeRefOrGetter<QueryKey>;
  endpoint: MaybeRefOrGetter<string>;
  queryOptions?: object;
}

export type UseDataInfiniteScrollReturn<
  TData,
  TFilters extends object = object,
  TError = Error,
> = TableStateReturn<TFilters> &
  Omit<UseInfiniteQueryReturnType<unknown, TError>, 'data' | 'meta'> & {
    data: ComputedRef<TData[]>;
    meta: ComputedRef<Meta | CursorMeta | null | undefined>;
    hasMore: Ref<boolean>;
    changeLimit: (limit: number) => void;
  };

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

  const dynamicQueryKey = computed(() => [...toValue(options.queryKey), state.baseParams.value]);

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
        return meta.nextCursor ?? undefined;
      } else {
        const meta = (lastPage as OffsetPaginatedResponse<TData>).meta;
        return meta.hasNextPage ? meta.currentPage + 1 : undefined;
      }
    },
    initialPageParam: (paginationType === 'cursor' ? null : 1) as string | null | number,
    placeholderData: keepPreviousData,
    staleTime: 0,
    ...(options.queryOptions ?? {}),
  });

  const data = computed<TData[]>(() => rawPages.value?.pages.flatMap((p) => p.data) ?? []);

  const meta = computed(() => {
    const rawMeta = rawPages.value?.pages.at(0)?.meta;
    return (rawMeta as Meta | CursorMeta) ?? undefined;
  });

  const changeLimit = (newLimit: number) => {
    state.itemsPerPage.value = newLimit;
  };

  return {
    ...state,
    data,
    meta,
    fetchNextPage,
    hasMore: hasNextPage,
    changeLimit,
    ...query,
  } as unknown as UseDataInfiniteScrollReturn<TData, TFilters, TError>;
}
