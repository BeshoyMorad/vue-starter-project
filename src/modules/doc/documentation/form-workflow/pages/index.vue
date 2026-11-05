<script setup lang="ts">
  import DocPage from '@/modules/doc/shared/DocPage.vue';
  import {
    FORM_WORKFLOW_DOC,
    FORM_WORKFLOW_SECTIONS,
  } from '@/modules/doc/documentation/form-workflow/constants/constants';

  const content = { ...FORM_WORKFLOW_DOC, sections: FORM_WORKFLOW_SECTIONS };
</script>

<template>
  <DocPage :content="content" />
</template>
