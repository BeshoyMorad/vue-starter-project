import type { DocPageContent, DocSection } from '@/modules/doc/shared/types';

const USAGE_CODE = `// Normally you never call it: useDataTable and useDataInfiniteScroll spread its result.
// Call it directly for a custom list, an export button, or a client side table
// that still needs search / filters / sort / paging state.
const state = useTableState<AssetFilter>({
  limit: 20,
  searchDebounce: 300,
  initialSort: { sortKey: 'createdAt', order: 'DESC' },
  paginationType: 'offset',
});

const { data } = useQuery({
  queryKey: computed(() => [...QUERY_KEYS.assets.list(), state.baseParams.value]),
  queryFn: () => fetchTableData<OffsetPaginatedResponse<Asset>>(apiRoute('assets.list'), state.baseParams.value),
});`;

const PARAMS_CODE = `baseParams = {
  search:   debouncedSearch || undefined,
  limit:    itemsPerPage,
  sortKey, order,
  ...query(),                          // extra params option
  'filters[status]': 'ACTIVE',         // or status: 'ACTIVE' with flatFilters
  page: 1,                             // offset      |  cursor: 'abc' (only when not null)
}
// false and 0 are kept. null, undefined and '' filter values are dropped.`;

const RESET_CODE = `// A watcher resets page = 1 and cursor = null when any of these change:
debouncedSearch, filters, itemsPerPage, sortKey, order
// so a user on page 5 who searches always sees page 1 of the results.`;

const SECTIONS: readonly DocSection[] = [
  {
    title: 'What it is',
    description:
      'useTableState holds the reactive state of a list: search with debounce, filters, sort, page or cursor, and page size. It builds the cleaned params object. It does no fetching.',
    code: USAGE_CODE,
    header: 'useTableState',
  },
  {
    title: 'baseParams',
    description: 'The single computed object the fetch functions send.',
    code: PARAMS_CODE,
    header: 'params',
  },
  {
    title: 'Automatic page reset',
    description: 'Why you never reset the page manually.',
    code: RESET_CODE,
    header: 'watch',
  },
  {
    title: 'Returned values',
    description: 'Same names you see on useDataTable.',
    items: [
      {
        name: 'search, debouncedSearch, isDebouncing',
        description: 'Bind search to the input; isDebouncing is true while the user is typing.',
      },
      { name: 'filters, setFilters, clearFilters', description: 'Merge or reset filters.' },
      {
        name: 'hasSearch, hasFilters, hasActiveFilters',
        description: 'Empty arrays, empty objects and blank values do not count as a filter.',
      },
      { name: 'page, cursor, itemsPerPage', description: 'Pagination refs.' },
      { name: 'sortKey, order, sort()', description: 'Sort state and its setter.' },
      { name: 'baseParams', description: 'Computed request params.' },
    ],
  },
];

export const DOC_CONTENT: DocPageContent = {
  title: 'useTableState',
  description:
    'The state engine under useDataTable and useDataInfiniteScroll. Know it to understand the request parameters and to build custom list screens.',
  sections: SECTIONS,
};
