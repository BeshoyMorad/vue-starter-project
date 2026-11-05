<script setup lang="ts">
  import DocPage from '@/modules/doc/shared/DocPage.vue';
  import { DOC_CONTENT } from '@/modules/doc/composables/useDataTableGuide/constants/constants';
</script>

<template>
  <DocPage :content="DOC_CONTENT" />
</template>
