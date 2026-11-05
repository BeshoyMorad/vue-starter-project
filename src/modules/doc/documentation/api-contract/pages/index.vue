<script setup lang="ts">
  import DocPage from '@/modules/doc/shared/DocPage.vue';
  import {
    API_CONTRACT_DOC,
    API_CONTRACT_SECTIONS,
  } from '@/modules/doc/documentation/api-contract/constants/constants';

  const content = { ...API_CONTRACT_DOC, sections: API_CONTRACT_SECTIONS };
</script>

<template>
  <DocPage :content="content" />
</template>
