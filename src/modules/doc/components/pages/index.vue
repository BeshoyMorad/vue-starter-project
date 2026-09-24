<script setup lang="ts">
  import RouteCards from '@/modules/doc/shared/RouteCards.vue';
  import {
    COMPONENTS_PAGE_DESCRIPTION,
    COMPONENTS_PAGE_FOOTER,
    COMPONENTS_PAGE_TITLE,
  } from '../constants/constansts';
  import { componentsPaths } from '../components.paths';
</script>

<template>
  <RouteCards
    :title="COMPONENTS_PAGE_TITLE"
    :description="COMPONENTS_PAGE_DESCRIPTION"
    :footer="COMPONENTS_PAGE_FOOTER"
    :paths="componentsPaths"
  />
</template>
