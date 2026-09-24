export const INFINITE_SCROLL_IMPORT_CODE = `import { InfiniteScroll } from '@/components';`;

export const INFINITE_SCROLL_BASIC_CODE = {
  script: `<script setup lang="ts">
import { ref } from 'vue';
import { InfiniteScroll } from '@/components';
const items = ref([]);
const loading = ref(false);
const hasMore = ref(true);
const fetchMoreItems = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    const newItems = await fetchItems();
    items.value.push(...newItems);
    if (newItems.length === 0) {
      hasMore.value = false;
    }
  } finally {
    loading.value = false;
  }
};
</script>
`,
  template: `<template>
  <InfiniteScroll
    max-height="400px"
    :has-more="hasMore"
    :loading="loading"
    @load-more="fetchMoreItems"
  >
    <div
      v-for="item in items"
      :key="item.id"
    >
      {{ item.name }}
    </div>
  </InfiniteScroll>
</template>`,
};

export const INFINITE_SCROLL_VIRTUAL_CODE = `<InfiniteScroll
  :items="items"
  virtual
  :item-height="64"
  :overscan="5"
  max-height="400px"
  :has-more="hasMore"
  :loading="loading"
  @load-more="fetchMoreItems"
>
  <template #default="{ items: visibleItems, startIndex }">
    <div
      v-for="(item, index) in visibleItems"
      :key="item.id"
      class="h-16"
    >
      #{{ startIndex + index + 1 }}
      {{ item.name }}
    </div>
  </template>
</InfiniteScroll>`;

export const INFINITE_SCROLL_FIT_HEIGHT_CODE = `<InfiniteScroll
  :items="items"
  virtual
  :item-height="64"
  fit-height
  :has-more="hasMore"
  :loading="loading"
  @load-more="fetchMoreItems"
>
  <template #default="{ items: visibleItems, startIndex }">
    <div
      v-for="(item, index) in visibleItems"
      :key="item.id"
      class="h-16"
    >
      #{{ startIndex + index + 1 }}
      {{ item.name }}
    </div>
  </template>
</InfiniteScroll>`;

export const INFINITE_SCROLL_DOC = {
  title: 'Infinite Scroll',
  description:
    'A reusable scroll container that automatically loads more items when the user reaches the bottom. It also supports virtual scrolling for large datasets and can fit available parent-container height.',

  examples: {
    title: 'Examples',
    description:
      'Choose the standard infinite scroll for normal lists, or enable virtual scrolling when rendering large datasets.',
  },

  basic: {
    title: 'Basic Infinite Scroll',
    description:
      'Load additional items automatically when the user reaches the bottom of the scroll container.',

    howToUse:
      'Pass hasMore and loading states, then listen to the load-more event to fetch the next batch of data.',
  },

  virtual: {
    title: 'Virtual Infinite Scroll',
    description:
      'Enable virtual scrolling to render only the items currently visible in the viewport instead of rendering the entire dataset.',

    howToUse:
      'Set virtual to true, provide the items array and define a fixed item-height. The default slot receives the visible items and their starting index.',
  },

  fitHeight: {
    title: 'Virtual Scroll with Fit Height',
    description:
      'Make the scroll container automatically fill the available height of its parent while keeping virtual scrolling enabled.',

    howToUse:
      'Use fit-height inside a flex parent with a constrained height. The component uses the available parent space instead of a fixed height.',
  },
};

export const INFINITE_SCROLL_CODE_HEADER = {
  import: 'import',
  script: 'script',
  template: 'template',
};
