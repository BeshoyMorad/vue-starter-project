import {
  ref,
  computed,
  watch,
  toValue,
  type MaybeRefOrGetter,
  type Ref,
  type ComputedRef,
} from 'vue';
import { refDebounced } from '@vueuse/core';

export interface TableParams {
  page?: number;
  cursor?: string;
  limit: number;
  search?: string;
  filters?: object;
  sortKey?: string;
  order?: 'ASC' | 'DESC';
  [key: string]: unknown;
}

export interface TableStateOptions<TFilters extends object> {
  query?: MaybeRefOrGetter<TFilters>;
  limit?: number;
  searchDebounce?: number;
  initialSearch?: string;
  initialFilters?: object;
  initialSort?: {
    sortKey?: string;
    order?: 'ASC' | 'DESC';
  };
  paginationType?: 'offset' | 'cursor' | 'none';
}

export interface TableStateReturn<TFilters extends object> {
  search: Ref<string>;
  debouncedSearch: Ref<string>;
  isDebouncing: ComputedRef<boolean>;
  filters: Ref<TFilters>;
  setFilters: (newFilters: Partial<TFilters>) => void;
  clearFilters: () => void;
  itemsPerPage: Ref<number>;
  baseParams: ComputedRef<TableParams>;
  page: Ref<number>;
  cursor: Ref<string | null>;
  sortKey: Ref<string | undefined>;
  order: Ref<'ASC' | 'DESC' | undefined>;
  sort: (sorting: { sortKey?: string; order?: 'ASC' | 'DESC' }) => void;
}

// eslint-disable-next-line max-lines-per-function
export function useTableState<TFilters extends object>(
  options: TableStateOptions<TFilters>
): TableStateReturn<TFilters> {
  const {
    query,
    limit = 10,
    searchDebounce = 500,
    initialSearch = '',
    initialFilters = {},
    initialSort = {},
    paginationType = 'offset',
  } = options;

  const search = ref(initialSearch);
  const debouncedSearch = refDebounced(search, searchDebounce);
  const isDebouncing = computed(() => search.value !== debouncedSearch.value);

  const filters = ref<TFilters>({
    ...initialFilters,
  } as TFilters);

  const setFilters = (newFilters: Partial<TFilters>) => {
    if (Object.keys(newFilters).length === 0) {
      filters.value = {} as TFilters;
    } else {
      filters.value = { ...filters.value, ...newFilters } as TFilters;
    }
  };

  const clearFilters = () => {
    filters.value = {} as TFilters;
  };

  const itemsPerPage = ref(limit);

  const sortKey = ref<string | undefined>(initialSort.sortKey);
  const order = ref<'ASC' | 'DESC' | undefined>(initialSort.order);

  const sort = (sorting: { sortKey?: string; order?: 'ASC' | 'DESC' }) => {
    sortKey.value = sorting.sortKey;
    order.value = sorting.order;
  };

  // Pagination states
  const page = ref(1);
  const cursor = ref<string | null>(null);

  // Reset pagination when search, filters, itemsPerPage, or sorting change
  watch(
    [debouncedSearch, filters, itemsPerPage, sortKey, order],
    () => {
      page.value = 1;
      cursor.value = null;
    },
    { deep: true }
  );

  const baseParams = computed<TableParams>(() => {
    const params: TableParams = {
      search: debouncedSearch.value || undefined,
      limit: itemsPerPage.value,
      sortKey: sortKey.value || undefined,
      order: order.value || undefined,
      ...filters.value,
      ...(query ? toValue(query) : {}),
    };

    if (paginationType === 'cursor') {
      if (cursor.value !== null) {
        params.cursor = cursor.value;
      }
    } else if (paginationType === 'offset') {
      params.page = page.value;
    }

    return params;
  });

  return {
    search,
    debouncedSearch,
    isDebouncing,
    filters: filters as Ref<TFilters>,
    setFilters,
    clearFilters,
    itemsPerPage,
    baseParams,
    page,
    cursor,
    sortKey,
    order,
    sort,
  };
}
