<script setup lang="ts">
  import { formsPaths } from '../forms.paths.ts';
  import {
    FORMS_PAGE_DESCRIPTION,
    FORMS_PAGE_FOOTER,
    FORMS_PAGE_TITLE,
  } from '../constants/constansts.ts';
  import FormsDoc from '../form-doc/pages/index.vue';
  import RouteCards from '@/modules/doc/shared/RouteCards.vue';
</script>

<template>
  <div class="flex flex-col space-y-8">
    <FormsDoc />
    <RouteCards
      :title="FORMS_PAGE_TITLE"
      :description="FORMS_PAGE_DESCRIPTION"
      :footer="FORMS_PAGE_FOOTER"
      :paths="formsPaths"
    />
  </div>

  <div></div>
</template>
