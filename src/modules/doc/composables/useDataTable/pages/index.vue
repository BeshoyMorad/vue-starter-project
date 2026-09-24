<script setup lang="ts">
  import { useDataTable, type TableParams } from '@/composables';
  import { Button, Field, Table } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';
  import {
    USE_DATA_TABLE_IMPORT_CODE,
    USE_DATA_TABLE_BASIC_CODE,
    USE_DATA_TABLE_OFFSET_CODE,
    USE_DATA_TABLE_OFFSET_TABLE_CODE,
    USE_DATA_TABLE_CURSOR_CODE,
    USE_DATA_TABLE_CURSOR_TABLE_CODE,
    USE_DATA_TABLE_SEARCH_CODE,
    USE_DATA_TABLE_FILTER_CODE,
    USE_DATA_TABLE_INITIAL_SORT_CODE,
    USE_DATA_TABLE_DOM,
    USE_DATA_TABLE_DEFINED_COLUMNS,
    USE_DATA_TABLE_SORT_CODE,
    USE_DATA_TABLE_FILTER_CODE_SCRIPT,
  } from '../constants/constants';
  import { getMockOffsetUsers, getMockCursorUsers } from '../constants/mockApi';
  import { type MockUser, type UserFilters } from '../constants/data';
  const {
    data: filterTableData,
    meta: filterTableMeta,
    isLoading: filterTableIsLoading,
    isSearchEmpty: filterTableIsSearchEmpty,
    isFilteredEmpty: filterTableIsFilteredEmpty,
    goToPrev: filterTableGoToPrev,
    goToNext: filterTableGoToNext,
    changeLimit: filterTableChangeLimit,
    goToPage: filterTableGoToPage,
    clearFilters: filterTableClearFilters,
    filters: filterTableFilters,
  } = useDataTable<MockUser, UserFilters>({
    queryKey: ['docs-filter-users'],
    endpoint: '/users',
    paginationType: 'offset',
    limit: 5,
    queryOptions: {
      queryFn: ({ queryKey }: { queryKey: [string, TableParams] }) => {
        return getMockOffsetUsers(queryKey[1]);
      },
    },
  });

  const {
    data: sortedDataTable,
    meta: sortedMeta,
    isLoading: sortedIsLoading,
    isSearchEmpty: sortedIsSearchEmpty,
    isFilteredEmpty: sortedIsFilteredEmpty,
    goToPrev: sortedGoToPrev,
    goToNext: sortedGoToNext,
    changeLimit: sortedChangeLimit,
    goToPage: sortedGoToPage,
    sort: sortedSort,
  } = useDataTable<MockUser>({
    queryKey: ['docs-sort-users'],
    endpoint: '/users',
    paginationType: 'offset',
    limit: 5,
    queryOptions: {
      queryFn: ({ queryKey }: { queryKey: [string, TableParams] }) => {
        return getMockOffsetUsers(queryKey[1]);
      },
    },
  });

  const columns = [
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
  ];

  const {
    data: offsetTable,
    meta: offsetMeta,
    isLoading: offsetIsLoading,
    isSearchEmpty: offsetIsSearchEmpty,
    isFilteredEmpty: offsetIsFilteredEmpty,
    goToPrev: offsetGoToPrev,
    goToNext: offsetGoToNext,
    changeLimit: offsetChangeLimit,
    goToPage: offsetGoToPage,
    search: offsetSearch,
  } = useDataTable<MockUser>({
    queryKey: ['docs-offset-users'],
    endpoint: '/users',
    paginationType: 'offset',
    limit: 5,
    queryOptions: {
      queryFn: ({ queryKey }: { queryKey: [string, TableParams] }) => {
        return getMockOffsetUsers(queryKey[1]);
      },
    },
  });

  const {
    data: cursorTabledata,
    meta: cursorTablemeta,
    isLoading: cursorTableisLoading,
    isSearchEmpty: cursorTableisSearchEmpty,
    isFilteredEmpty: cursorTableisFilteredEmpty,
    goToPrev: cursorTablegoToPrev,
    goToNext: cursorTablegoToNext,
    changeLimit: cursorTablechangeLimit,
  } = useDataTable<MockUser>({
    queryKey: ['docs-cursor-users'],
    endpoint: '/users',
    paginationType: 'cursor',
    limit: 5,

    queryOptions: {
      queryFn: ({ queryKey }: { queryKey: [string, TableParams] }) => {
        return getMockCursorUsers(queryKey[1]);
      },
    },
  });

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
    { label: 'Manager', value: 'Manager' },
  ];
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ USE_DATA_TABLE_DOM.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ USE_DATA_TABLE_DOM.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="USE_DATA_TABLE_DOM.import.title"
      :description="USE_DATA_TABLE_DOM.import.description"
      :code="USE_DATA_TABLE_IMPORT_CODE"
      :show-preview="false"
      header="Import"
    />

    <!-- What is useDataTable? -->
    <Card
      title="What is useDataTable?"
      description="Use useDataTable when a table needs data from an API together with pagination, search, filters, sorting, and loading or empty states."
      :code="USE_DATA_TABLE_BASIC_CODE"
      header="Defination"
      :show-preview="false"
    />

    <!-- Columns -->
    <Card
      title="Define Columns"
      description="Define the columns that Table will use to display your data."
      :code="USE_DATA_TABLE_DEFINED_COLUMNS"
      :show-preview="false"
      header="Defination"
    />

    <!-- Examples -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-text-primary text-xl font-semibold">Pagination</h2>

        <p class="text-text-secondary text-sm">
          useDataTable supports offset and cursor pagination. Choose the type that matches your API.
        </p>
      </div>

      <!-- Offset Pagination -->
      <Card
        title="Offset Pagination"
        description="Use offset pagination when the API uses page numbers and limits."
        how-to-use="Set paginationType to offset. useDataTable manages the current page and provides the pagination metadata to Table."
        header="Usage"
        :code-arr="[
          { code: USE_DATA_TABLE_OFFSET_CODE, header: 'script' },
          { code: USE_DATA_TABLE_OFFSET_TABLE_CODE, header: 'template' },
        ]"
      >
        <template #preview>
          <Table
            :columns="columns"
            :value="offsetTable"
            :meta="offsetMeta"
            :loading="offsetIsLoading"
            :is-search-empty="offsetIsSearchEmpty"
            :is-filtered-empty="offsetIsFilteredEmpty"
            :limit-options="[5, 10, 20]"
            @next="offsetGoToNext"
            @prev="offsetGoToPrev"
            @page-change="offsetGoToPage"
            @limit-change="offsetChangeLimit"
          />
        </template>
      </Card>

      <!-- Cursor Pagination -->
      <Card
        title="Cursor Pagination"
        description="Use cursor pagination when the API uses cursors instead of page numbers. cursor pagination has a different meta structure from offset pagination check table documentation."
        how-to-use="Set paginationType to cursor. useDataTable manages the current cursor and uses nextCursor or previousCursor for navigation."
        header="Usage"
        :code-arr="[
          { code: USE_DATA_TABLE_CURSOR_CODE, header: 'script' },
          { code: USE_DATA_TABLE_CURSOR_TABLE_CODE, header: 'template' },
        ]"
      >
        <template #preview>
          <Table
            :columns="columns"
            :value="cursorTabledata"
            :meta="cursorTablemeta"
            :loading="cursorTableisLoading"
            :limit-options="[5, 10, 20]"
            :is-search-empty="cursorTableisSearchEmpty"
            :is-filtered-empty="cursorTableisFilteredEmpty"
            @next="cursorTablegoToNext"
            @prev="cursorTablegoToPrev"
            @limit-change="cursorTablechangeLimit"
          />
        </template>
      </Card>
    </section>

    <!-- Search -->
    <Card
      title="Search"
      description="Use search to filter table data by a text value."
      how-to-use="Bind an input to the search ref returned by useDataTable. The search value is automatically debounced before the API request."
      header="Usage"
      :code="USE_DATA_TABLE_SEARCH_CODE"
    >
      <template #preview>
        <div class="w-full space-y-4">
          <Field.Text
            v-model="offsetSearch"
            type="text"
            placeholder="Search users..."
            test-id="searchTestId"
          />
          <Table
            :columns="columns"
            :value="offsetTable"
            :meta="offsetMeta"
            :loading="offsetIsLoading"
            :is-search-empty="offsetIsSearchEmpty"
            :is-filtered-empty="offsetIsFilteredEmpty"
            @next="offsetGoToNext"
            @prev="offsetGoToPrev"
            @page-change="offsetGoToPage"
            @limit-change="offsetChangeLimit"
          />
        </div>
      </template>
    </Card>

    <!-- Filters & Sorting -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-text-primary text-xl font-semibold">Filters & Sorting</h2>

        <p class="text-text-secondary text-sm">
          useDataTable also provides methods for updating filters and sorting. Changes automatically
          trigger a new request and reset pagination.
        </p>
      </div>

      <Card
        title="Filters"
        description="Use filters when the API needs additional parameters to narrow the table results."
        how-to-use="Use filters to update filters and clearFilters to remove them."
        header="Usage"
        :code-arr="[
          { code: USE_DATA_TABLE_FILTER_CODE_SCRIPT, header: 'script' },
          { code: USE_DATA_TABLE_FILTER_CODE, header: 'template' },
        ]"
      >
        <template #preview>
          <div class="w-full space-y-4">
            <div class="flex items-center gap-3">
              <Field.Select
                v-model="filterTableFilters.role"
                test-id="select-role-filter"
                show-clear
                :options="filterOptions"
                option-label="label"
                option-value="value"
              />

              <Button test-id="clear-filters" @click="filterTableClearFilters">
                Clear Filters
              </Button>
            </div>

            <Table
              :columns="columns"
              :value="filterTableData"
              :meta="filterTableMeta"
              :loading="filterTableIsLoading"
              :is-search-empty="filterTableIsSearchEmpty"
              :is-filtered-empty="filterTableIsFilteredEmpty"
              @next="filterTableGoToNext"
              @prev="filterTableGoToPrev"
              @page-change="filterTableGoToPage"
              @limit-change="filterTableChangeLimit"
            />
          </div>
        </template>
      </Card>

      <Card
        title="Sort & Initial Sort"
        description="Set the initial sorting field and order when the table is first loaded."
        how-to-use="Use initialSort to define the default sort field and direction, and sort to update it."
        header="Usage"
        :code-arr="[
          { code: USE_DATA_TABLE_INITIAL_SORT_CODE, header: 'script' },
          { code: USE_DATA_TABLE_SORT_CODE, header: 'template' },
        ]"
      >
        <template #preview>
          <div class="w-full space-y-4">
            <Table
              :columns="columns"
              :value="sortedDataTable"
              :meta="sortedMeta"
              :loading="sortedIsLoading"
              :is-search-empty="sortedIsSearchEmpty"
              :is-filtered-empty="sortedIsFilteredEmpty"
              @sort="sortedSort"
              @next="sortedGoToNext"
              @prev="sortedGoToPrev"
              @page-change="sortedGoToPage"
              @limit-change="sortedChangeLimit"
            />
          </div>
        </template>
      </Card>
    </section>
  </div>
</template>
