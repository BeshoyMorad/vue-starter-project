<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import { USE_DATA_INFINITE_SCROLL_BASIC_CODE } from '../constants/constants';
</script>
<template>
  <!-- Import -->
  <Card
    title="What is useDataInfiniteScroll?"
    description="Use useDataInfiniteScroll when data should be loaded progressively as the user reaches the bottom of a scrollable list."
    :code="USE_DATA_INFINITE_SCROLL_BASIC_CODE"
    header="Definition"
    :show-preview="false"
  />
</template>
