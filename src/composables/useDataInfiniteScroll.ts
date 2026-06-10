import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import { keepPreviousData, useInfiniteQuery, type QueryKey } from '@tanstack/vue-query';
import { fetchTableData } from '@/lib/api/table';
import { useTableState, type BaseTableOptions } from './useTableState';

export interface UseDataInfiniteScrollOptions<
  TFilters extends object = object,
> extends BaseTableOptions<TFilters> {
  queryKey: MaybeRefOrGetter<QueryKey>;
  endpoint: MaybeRefOrGetter<string>;
  queryOptions?: object;
}

export function useDataInfiniteScroll<TData = unknown, TFilters extends object = object>(
  options: UseDataInfiniteScrollOptions<TFilters>
) {
  const state = useTableState<TFilters>(options);

  const dynamicQueryKey = computed(() => [...toValue(options.queryKey), state.baseParams.value]);

  const {
    data: rawPages,
    fetchNextPage,
    hasNextPage,
    ...query
  } = useInfiniteQuery({
    queryKey: dynamicQueryKey,
    queryFn: ({ pageParam }) =>
      fetchTableData<TData>(toValue(options.endpoint), {
        ...state.baseParams.value,
        cursor: pageParam as string | undefined,
      }),
    getNextPageParam: (lastPage) => lastPage.meta.next_cursor ?? undefined,
    initialPageParam: null as string | null,
    placeholderData: keepPreviousData,
    staleTime: 0,
    ...(options.queryOptions ?? {}),
  });

  const data = computed<TData[]>(() => rawPages.value?.pages.flatMap((p) => p.data) ?? []);

  const meta = computed(() => rawPages.value?.pages.at(0)?.meta);

  return {
    ...state,
    data,
    meta,
    fetchNextPage,
    hasMore: hasNextPage,
    ...query,
  };
}
