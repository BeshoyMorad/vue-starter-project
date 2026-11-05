<script setup lang="ts">
  import DocPage from '@/modules/doc/shared/DocPage.vue';
  import {
    SERVICES_DOC,
    SERVICES_SECTIONS,
  } from '@/modules/doc/documentation/services/constants/constants';

  const content = { ...SERVICES_DOC, sections: SERVICES_SECTIONS };
</script>

<template>
  <DocPage :content="content" />
</template>
