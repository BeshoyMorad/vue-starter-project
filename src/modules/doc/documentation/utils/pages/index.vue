<script setup lang="ts">
  import DocPage from '@/modules/doc/shared/DocPage.vue';
  import { UTILS_DOC, UTILS_SECTIONS } from '@/modules/doc/documentation/utils/constants/constants';

  const content = { ...UTILS_DOC, sections: UTILS_SECTIONS };
</script>

<template>
  <DocPage :content="content" />
</template>
