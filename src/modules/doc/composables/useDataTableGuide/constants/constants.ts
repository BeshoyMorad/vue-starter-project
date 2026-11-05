import type { DocPageContent, DocSection } from '@/modules/doc/shared/types';
import { TABLE_GUIDE_RETURN_SECTIONS } from './returns';

const SIGNATURE_CODE = `useDataTable<TData, TFilters, TError>(options: UseTableOptions<TFilters>)

TData     row type            useDataTable<AssetVault, AssetFilter>(...)
TFilters  shape of filters    { networkId?: number; status?: AssetStatus }

options (from src/composables/types.ts)
  queryKey        required  QUERY_KEYS.assets.list()      (never an inline array)
  endpoint        required  apiRoute('assets.list')
  paginationType  'offset' (default) | 'cursor' | 'none'
  limit           page size, default 10
  initialSearch / searchDebounce (default 500 ms)
  initialFilters / flatFilters   (flatFilters: send status=x instead of filters[status]=x)
  initialSort     { sortKey, order: 'ASC' | 'DESC' }
  query           extra params (ref / getter) merged into every request, e.g. a parent id
  extractData     (data) => rows    when the list is nested inside data
  queryOptions    any useQuery option: enabled, staleTime, refetchInterval, queryFn (mocks)`;

const REAL_CODE = `// src/modules/helper/pages/Index.vue
const {
  data, meta, isLoading, isError, refetch,
  isEmpty, isSearchEmpty, isFilteredEmpty,
  search, goToPage, goToNext, goToPrev, changeLimit,
  filters, setFilters, clearFilters, sort,
} = useDataTable<AssetVault, AssetFilter>({
  queryKey: QUERY_KEYS.assets.list(),
  endpoint: apiRoute('assets.list'),
});

// <Table
//   :columns="assetColumns" :value="data" :loading="isLoading"
//   :is-error="isError" :error-action="refetch"
//   :is-search-empty="isSearchEmpty" :is-filtered-empty="isFilteredEmpty"
//   :meta="meta"
//   @page-change="goToPage" @next="goToNext" @prev="goToPrev"
//   @limit-change="changeLimit" @sort="sort" />`;

const WHAT_CODE = `One call replaces: query, loading flags, page state, search debounce, filter state,
sort state, empty states, and cache keys.

 search / filters / sort / page / limit      (useTableState: refs)
        |  baseParams (computed, cleaned of empty values)
        v
 queryKey = [...options.queryKey, baseParams]   <- every change is a new cache entry
        |
 useQuery -> fetchTableData(endpoint, params)   -> api.get(endpoint, { params })
        |
 data / meta / tableState / empty flags         (computed from the response)

Changing search, filters, limit or sort resets page to 1 (or cursor to null).
keepPreviousData keeps the old rows visible while the next page loads.`;

const REQUEST_CODE = `GET /assets?page=2&limit=10&search=eth&sortKey=id&order=DESC&filters[networkId]=3

// with flatFilters: true
GET /assets?page=2&limit=10&networkId=3

// cursor
GET /assets?limit=10&cursor=eyJpZCI6MTB9

// empty, null and undefined values are removed before sending`;

const FILTER_CODE = `// 1) the dialog collects values and emits them
emit('apply', { networkId: networkId.value, status: status.value });

// 2) the page forwards them
// <AssetFiltersDialog :filters="filters" @apply="setFilters" @clear="clearFilters" />

// setFilters MERGES:  setFilters({ status: 'ACTIVE' }) keeps networkId
// setFilters({})       or clearFilters() resets all
// Filter badge:        hasFilters / hasActiveFilters (search OR filters)`;

const EMPTY_CODE = `// tableState: 'loading' | 'error' | 'empty' | 'search-empty' | 'filtered-empty' | 'success'

// Page-level empty (no data at all, no search, no filters): show a placeholder, hide toolbar
// <EmptyPlaceholder v-if="isEmpty" ... />
// <Table v-else ... />

// Table handles search-empty and filtered-empty through its props:
// :is-search-empty="isSearchEmpty" :is-filtered-empty="isFilteredEmpty"
// and offers a retry with :error-action="refetch"`;

const RULES_ITEMS = [
  {
    name: 'Always useDataTable for lists',
    description:
      'Rule data-fetching.md: no manual pagination, no watch on page. For infinite lists use useDataInfiniteScroll (same options).',
  },
  {
    name: 'queryKey from QUERY_KEYS',
    description:
      'The composable appends the params itself, so invalidateQueries({ queryKey: QUERY_KEYS.assets.list() }) refreshes every page, search and filter combination.',
  },
  {
    name: 'endpoint from apiRoute',
    description:
      'For a nested resource pass the id: endpoint: apiRoute("users.wallets", { id }) and a reactive queryKey.',
  },
  {
    name: 'Server side everything',
    description:
      'Search, filter and sort are sent to the API. Do not filter data.value in the component.',
  },
  {
    name: 'Contract',
    description:
      'The response must be { data: T[], meta } (API Contract page). If not, map it in fetchTableData, not in pages.',
  },
  {
    name: 'Columns',
    description:
      'ColumnDef<TRow, unknown>[] in the module columns/ folder. Use formatters and StatusBadge in cells. Hide columns by permission with a computed filter.',
  },
] as const;

const CURSOR_CODE = `// Cursor pagination (CursorPaginatedResponse): hasNextPage / nextCursor / previousCursor
const { data, meta, goToNext, goToPrev } = useDataTable<Row>({
  queryKey: QUERY_KEYS.logs.list(),
  endpoint: apiRoute('logs.list'),
  paginationType: 'cursor',
});
// goToPage does nothing in cursor mode

// Nested rows, extra params, conditional fetch
useDataTable<Wallet>({
  queryKey: QUERY_KEYS.users.wallets(id),
  endpoint: apiRoute('users.wallets', { id }),
  query: () => ({ includeArchived: showArchived.value }),
  extractData: (d) => (d as { wallets: Wallet[] }).wallets,
  queryOptions: { enabled: computed(() => !!id.value) },
});`;

const TYPES_CODE = `// Edit these when the contract changes
src/composables/types.ts        TableParams, TableStateOptions, return types, DataTableState
src/composables/useTableState.ts   param names: page, limit, search, sortKey, order, cursor
src/composables/useDataTable.ts    reads rawResponse.data / .meta
src/lib/api/table.ts               fetchTableData (single place to translate the body)`;

const SECTIONS: readonly DocSection[] = [
  {
    title: 'What it does',
    description:
      'useDataTable is the standard way to show a server list: offset or cursor pagination, search, filters, sorting and empty states.',
    code: WHAT_CODE,
    header: 'overview',
  },
  {
    title: 'A real usage',
    description: 'The helper assets page: copy this shape for every table page.',
    code: REAL_CODE,
    header: 'helper/pages/Index.vue',
  },
  {
    title: 'Options and generics',
    description: 'Only queryKey and endpoint are required.',
    code: SIGNATURE_CODE,
    header: 'signature',
  },
  {
    title: 'The request it sends',
    description: 'Know the query string so you can agree on names with the backend.',
    code: REQUEST_CODE,
    header: 'request',
  },
  ...TABLE_GUIDE_RETURN_SECTIONS,
  {
    title: 'Filters in practice',
    description: 'Filters live in a dialog component and are applied with setFilters.',
    code: FILTER_CODE,
    header: 'filters',
  },
  {
    title: 'Empty and error states',
    description: 'Use the flags, do not compute your own.',
    code: EMPTY_CODE,
    header: 'states',
  },
  {
    title: 'Cursor, nested data and conditional fetch',
    description: 'Less common options.',
    code: CURSOR_CODE,
    header: 'advanced',
  },
  {
    title: 'Where to edit it',
    description: 'Files to touch when the list contract or parameter names change.',
    code: TYPES_CODE,
    header: 'files',
  },
  { title: 'Rules', description: 'What review expects.', items: RULES_ITEMS },
];

export const DOC_CONTENT: DocPageContent = {
  title: 'useDataTable: Deep Dive',
  description:
    'Everything about the table composable: what it replaces, every option, every returned value, filters, search, sorting, empty states, cursor pagination and the files that depend on it. The live examples are on the useDataTable page.',
  sections: SECTIONS,
};
