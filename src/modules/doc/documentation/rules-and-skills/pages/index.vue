<script setup lang="ts">
  import DocPage from '@/modules/doc/shared/DocPage.vue';
  import {
    RULES_SKILLS_DOC,
    RULES_SKILLS_SECTIONS,
  } from '@/modules/doc/documentation/rules-and-skills/constants/constants';

  const content = { ...RULES_SKILLS_DOC, sections: RULES_SKILLS_SECTIONS };
</script>

<template>
  <DocPage :content="content" />
</template>
