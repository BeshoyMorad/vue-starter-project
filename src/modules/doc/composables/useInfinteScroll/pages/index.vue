<script setup lang="ts">
  import { USE_DATA_INFINITE_SCROLL_DOM } from '../constants/constants.ts';
  import UseInfiniteScrollImport from './useInfiniteScrollImport.vue';
  import UseInfiniteScrollDefination from './useInfiniteScrollDefination.vue';
  import UseInfiniteScrollOffset from './useInfiniteScrollOffset.vue';
  import UseInfiniteScrollCursor from './useInfiniteScrollCursor.vue';
  import UesInfiniteScrollFilter from './uesInfiniteScrollFilter.vue';
  import UseInfiniteScrollSearch from './useInfiniteScrollSearch.vue';
  import UseInfiniteScrollVirtual from './useInfiniteScrollVirtual.vue';
  import UseInfiniteScrollTable from './useInfiniteScrollTable.vue';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ USE_DATA_INFINITE_SCROLL_DOM.title }}
      </h1>

      <p class="text-text-secondary max-w-3xl text-sm leading-6">
        {{ USE_DATA_INFINITE_SCROLL_DOM.description }}
      </p>
    </section>

    <!-- Import -->
    <UseInfiniteScrollImport />

    <!-- What is useDataInfiniteScroll? -->
    <UseInfiniteScrollDefination />

    <!-- Examples -->
    <section class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-text-primary text-xl font-semibold">Pagination</h2>

        <p class="text-text-secondary text-sm">
          useDataInfiniteScroll supports offset and cursor pagination. Choose the pagination type
          that matches your API.
        </p>
      </div>
      <!-- Offset Pagination -->
      <UseInfiniteScrollOffset />
      <!-- Cursor Pagination -->
      <UseInfiniteScrollCursor />
    </section>
    <!-- Filter -->
    <UesInfiniteScrollFilter />

    <!-- Search -->
    <UseInfiniteScrollSearch />

    <!-- Virtual Scroll -->
    <UseInfiniteScrollVirtual />

    <!-- InfiniteScrollTable -->
    <UseInfiniteScrollTable />
  </div>
</template>
