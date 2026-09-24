<script setup lang="ts">
  import RouteCards from '@/modules/doc/shared/RouteCards.vue';

  import {
    COMPOSABLES_PAGE_TITLE,
    COMPOSABLES_PAGE_DESCRIPTION,
    COMPOSABLES_PAGE_FOOTER,
  } from '../constants/constansts';
  import { composablesPaths } from '../composables.paths';
</script>

<template>
  <RouteCards
    :title="COMPOSABLES_PAGE_TITLE"
    :description="COMPOSABLES_PAGE_DESCRIPTION"
    :footer="COMPOSABLES_PAGE_FOOTER"
    :paths="composablesPaths"
  />
</template>
