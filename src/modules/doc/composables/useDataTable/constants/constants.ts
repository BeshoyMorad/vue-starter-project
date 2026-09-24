export const USE_DATA_TABLE_DOM = {
  title: 'useDataTable',
  description:
    'A composable for managing table data, pagination, search, filters, sorting, and table states.',
  import: {
    title: 'Import',
    description: 'Import useDataTable from the composables module.',
  },
};

export const USE_DATA_TABLE_IMPORT_CODE = `import { useDataTable } from '@/composables';
import { Table } from '@/components';`;

export const USE_DATA_TABLE_BASIC_CODE = `const {
data,              // Get the current table data
meta,              // Get pagination metadata
isEmpty,           // Check if data is empty without search or filters
isSearchEmpty,     // Check if data is empty after searching
isFilteredEmpty,   // Check if data is empty after filtering
goToNext,          // Go to the next page
goToPrev,          // Go to the previous page
goToPage,          // Go to a specific page
changeLimit,       // Change the items per page
sort,              // Sort table data
search,            // Search table data
filters,           // Get the current table filters
clearFilters,      // Clear all table filters
} = useDataTable<User>({
  queryKey: ['users'],
  endpoint: '/users',
  paginationType: 'offset',
  limit: 5,
});`;

export const USE_DATA_TABLE_OFFSET_CODE = `const { 
data, 
meta, 
isLoading,
isSearchEmpty, 
isFilteredEmpty,
goToNext, 
goToPrev, 
goToPage, 
changeLimit
} = useDataTable<User>({
  queryKey: ['users'],
  endpoint: '/users',
  paginationType: 'offset', // --> Pagination type can be 'offset' or 'cursor'
  limit: 5,
});`;

export const USE_DATA_TABLE_OFFSET_TABLE_CODE = `<Table
    :columns="columns"
    :value="data"
    :meta="meta"
    :loading="isLoading"
    :is-search-empty="isSearchEmpty"
    :is-filtered-empty="isFilteredEmpty"
    :limit-options="[5, 10, 20]"
    @next="goToNext"
    @prev="goToPrev"
    @page-change="goToPage"
    @limit-change="changeLimit"
/>
`;

export const USE_DATA_TABLE_CURSOR_CODE = `const {
data,
meta,
isLoading,
isSearchEmpty,
isFilteredEmpty,
goToNext,
goToPrev,
changeLimit
} = useDataTable<User>({
  queryKey: ['users'],
  endpoint: '/users',
  paginationType: 'cursor',
  limit: 5,
});`;

export const USE_DATA_TABLE_CURSOR_TABLE_CODE = `<Table
    :columns="columns"
    :value="data"
    :meta="meta"
    :loading="isLoading"
    :is-search-empty="isSearchEmpty"
    :is-filtered-empty="isFilteredEmpty"
    @next="goToNext"
    @prev="goToPrev"
    @limit-change="changeLimit"
 />
`;
export const USE_DATA_TABLE_DEFINED_COLUMNS = `const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];`;
export const USE_DATA_TABLE_SEARCH_CODE = `<Field.Text
   v-model="search"     // --> Bind an input to the search ref returned by useDataTable
   type="text"
   placeholder="Search users..."
   test-id="searchTestId"
/>
<Table
    :columns="columns"
    :value="data"
    :meta="meta"
    :loading="isLoading"
    :is-search-empty="isSearchEmpty"
    :is-filtered-empty="isFilteredEmpty"
    @next="goToNext"
    @prev="goToPrev"
    @page-change="goToPage"
    @limit-change="changeLimit"
/>`;

export const USE_DATA_TABLE_FILTER_CODE_SCRIPT = `  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
    { label: 'Manager', value: 'Manager' },
  ];

  // {lable & value} will be passed to the option-label and option-value props
  `;
export const USE_DATA_TABLE_FILTER_CODE = `<div class="flex flex-wrap gap-3">
<Field.Select
  v-model="filters.role"   // --> Bind an input to the filters ref returned by useDataTable 
  show-clear
  test-id="select-role-filter"
  :options="filterOptions"
  option-label="label"    // --> Passed to the option-label prop from the options
  option-value="value"    // --> Passed to the option-value prop from the options
/>
<Button
  @click="filterTable.clearFilters"
>
  Clear Filters
</Button>
</div>

<Table
:columns="columns"
:value="data"
:meta="meta"
:loading="isLoading"
:is-search-empty="isSearchEmpty"
:is-filtered-empty="isFilteredEmpty"
@next="goToNext"
@prev="goToPrev"
@page-change="goToPage"
@limit-change="changeLimit"
/>`;

export const USE_DATA_TABLE_INITIAL_SORT_CODE = `const { 
data, 
meta, 
isLoading,
isSearchEmpty, 
isFilteredEmpty,
sort,
goToNext, 
goToPrev, 
goToPage, 
changeLimit
} = useDataTable<User>({
  queryKey: ['users'],
  endpoint: '/users',
  paginationType: 'offset',
  limit: 5,
  // initial sort declared with sortKey and order .
  initialSort: {
    sortKey: 'id',  // accessorKey of the column you want to be initial sort
    order: 'ASC',   // 'ASC' or 'DESC' for ascending or descending order
  },
});`;

export const USE_DATA_TABLE_SORT_CODE = `<Table
    :columns="columns"
    :value="data"
    :meta="meta"
    :loading="isLoading"
    :is-search-empty="isSearchEmpty"
    :is-filtered-empty="isFilteredEmpty"
    @sort="sort"  // Pass the sort function to the table component
    @next="goToNext"
    @prev="goToPrev"
    @page-change="goToPage"
    @limit-change="changeLimit"
/>`;

export const USE_DATA_TABLE_INFINITE_SCROLL_CODE = `import { useDataTable } from '@/composables';
import { getMockCursorUsers } from '../constants/mockApi';

const {
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
} = useDataTable<MockUser>({
  queryKey: ['docs-infinite-scroll-users'],
  endpoint: '/users',
  paginationType: 'cursor',
  limit: 5,
  queryOptions: {
    queryFn: ({ queryKey }) => {
      return getMockCursorUsers(queryKey[1]);
    },
  },
});

const loadMore = () => {
  if (hasNextPage.value) {
    fetchNextPage();
  }
};`;
export const USE_DATA_TABLE_INFINITE_SCROLL_TABLE_CODE = `<InfiniteScrollTable
  :columns="columns"
  :value="data"
  :loading="isLoading"
  :is-fetching-next-page="isFetchingNextPage"
  :has-more="hasNextPage"
  @load-more="loadMore"
/>`;
