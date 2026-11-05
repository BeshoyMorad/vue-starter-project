<script setup lang="ts">
  import DocPage from '@/modules/doc/shared/DocPage.vue';
  import {
    FILE_UPLOADS_DOC,
    FILE_UPLOADS_SECTIONS,
  } from '@/modules/doc/documentation/file-uploads/constants/constants';

  const content = { ...FILE_UPLOADS_DOC, sections: FILE_UPLOADS_SECTIONS };
</script>

<template>
  <DocPage :content="content" />
</template>
