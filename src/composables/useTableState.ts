import { refDebounced } from '@vueuse/core';
import {
  computed,
  ref,
  toValue,
  watch,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue';

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

export interface TableSort {
  sortKey?: string;
  order?: 'ASC' | 'DESC';
}

export interface TableStateOptions<TFilters extends object> {
  query?: MaybeRefOrGetter<TFilters>;
  limit?: number;
  searchDebounce?: number;
  initialSearch?: string;
  initialFilters?: object;
  flatFilters?: boolean;
  initialSort?: TableSort;
  paginationType?: 'offset' | 'cursor' | 'none';
}

export interface TableStateReturn<TFilters extends object> {
  search: Ref<string>;
  debouncedSearch: Ref<string>;
  isDebouncing: ComputedRef<boolean>;
  filters: Ref<TFilters>;
  setFilters: (newFilters: Partial<TFilters>) => void;
  clearFilters: () => void;
  hasSearch: ComputedRef<boolean>;
  hasFilters: ComputedRef<boolean>;
  hasActiveFilters: ComputedRef<boolean>;
  itemsPerPage: Ref<number>;
  baseParams: ComputedRef<TableParams>;
  page: Ref<number>;
  cursor: Ref<string | null>;
  sortKey: Ref<string | undefined>;
  order: Ref<'ASC' | 'DESC' | undefined>;
  sort: (sorting: TableSort) => void;
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
    flatFilters = false,
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

  const sort = (sorting: TableSort) => {
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
      ...(query ? toValue(query) : {}),
    };

    Object.entries(filters.value).forEach(([key, value]) => {
      // Allow false/0, but don't allow null/undefined/empty string
      if (value !== undefined && value !== null && value !== '') {
        if (flatFilters) {
          params[key] = value;
        } else {
          params[`filters[${key}]`] = value;
        }
      }
    });

    if (paginationType === 'cursor') {
      if (cursor.value !== null) {
        params.cursor = cursor.value;
      }
    } else if (paginationType === 'offset') {
      params.page = page.value;
    }

    return params;
  });

  const hasSearch = computed(() => {
    return search.value.trim().length > 0 || debouncedSearch.value.trim().length > 0;
  });

  const hasFilters = computed(() => {
    const filterEntries = Object.entries(filters.value as Record<string, unknown>);
    return filterEntries.some(([_, val]) => {
      if (val === undefined || val === null || val === '') return false;
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'object') return Object.keys(val as object).length > 0;
      return true;
    });
  });

  const hasActiveFilters = computed(() => hasSearch.value || hasFilters.value);

  return {
    search,
    debouncedSearch,
    isDebouncing,
    filters: filters as Ref<TFilters>,
    setFilters,
    clearFilters,
    hasSearch,
    hasFilters,
    hasActiveFilters,
    itemsPerPage,
    baseParams,
    page,
    cursor,
    sortKey,
    order,
    sort,
  };
}
