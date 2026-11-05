import type { DocSection } from '@/modules/doc/shared/types';

export const TABLE_GUIDE_RETURN_SECTIONS: DocSection[] = [
  {
    title: 'What it returns: data',
    description: 'Server state from TanStack Query plus computed helpers.',
    items: [
      { name: 'data', description: 'Rows (TData[]). Empty array while loading.' },
      {
        name: 'meta',
        description:
          'Meta or CursorMeta, null before the first response. Cast to Meta for totalItems.',
      },
      {
        name: 'extraData',
        description: 'The raw response data, for extra fields next to the rows.',
      },
      {
        name: 'isLoading / isError / isFetching / refetch',
        description:
          'All useQuery fields are spread in. isLoading is only the first load; isFetching also covers page changes.',
      },
      {
        name: 'tableState',
        description:
          '"loading" | "error" | "empty" | "search-empty" | "filtered-empty" | "success".',
      },
      {
        name: 'isEmpty / isSearchEmpty / isFilteredEmpty',
        description: 'No data and no search or filter / because of search / because of filters.',
      },
      {
        name: 'dynamicQueryKey',
        description: 'The full key with params, for setQueryData on one page.',
      },
    ],
  },
  {
    title: 'What it returns: controls',
    description: 'Bind these to the Table events and toolbar.',
    items: [
      {
        name: 'search / debouncedSearch / isDebouncing',
        description:
          'v-model the search field to search. The request uses debouncedSearch (500 ms).',
      },
      {
        name: 'filters / setFilters / clearFilters',
        description: 'Reactive filter object, merge setter, reset.',
      },
      {
        name: 'hasSearch / hasFilters / hasActiveFilters',
        description: 'Booleans for badges and clear buttons.',
      },
      {
        name: 'page / goToPage / goToNext / goToPrev',
        description: 'Offset navigation. goToNext checks meta.hasNextPage first.',
      },
      {
        name: 'cursor',
        description: 'Current cursor in cursor mode. goToNext and goToPrev use the meta cursors.',
      },
      {
        name: 'itemsPerPage / changeLimit',
        description: 'Page size. Changing it resets to page 1.',
      },
      {
        name: 'sortKey / order / sort({ sortKey, order })',
        description: 'Bind to the Table @sort event. Enabled per column with enableSorting.',
      },
      {
        name: 'baseParams',
        description:
          'The cleaned params object that is sent, handy for debugging and export links.',
      },
    ],
  },
];
