import { ref, computed, toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { refDebounced } from "@vueuse/core";

export interface TableParams {
  per_page: number;
  search?: string;
  cursor?: string;
  filters?: object;
}

export interface BaseTableOptions<TFilters extends object = object> {
  query?: MaybeRefOrGetter<TFilters>;
  perPage?: number;
  searchDebounce?: number;
  initialSearch?: string;
  /** When set, use this ref instead of an internal search ref (e.g. injected parent search). */
  searchRef?: Ref<string>;
  initialFilters?: object;
}

export function useTableState<TFilters extends object = object>(
  options: BaseTableOptions<TFilters>,
) {
  const {
    query,
    perPage = 10,
    searchDebounce = 500,
    initialSearch = "",
    searchRef: externalSearchRef,
    initialFilters = {},
  } = options;

  const search = externalSearchRef ?? ref(initialSearch);
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

  const itemsPerPage = ref(perPage);

  const baseParams = computed(() => ({
    search: debouncedSearch.value || undefined,
    per_page: itemsPerPage.value,
    ...filters.value,
    ...(query ? toValue(query) : {}),
  }));

  return {
    search,
    debouncedSearch,
    isDebouncing,
    filters,
    setFilters,
    itemsPerPage,
    baseParams,
  };
}
