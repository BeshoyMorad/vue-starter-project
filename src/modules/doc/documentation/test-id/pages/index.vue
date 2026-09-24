<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import {
    TEST_IDS_BUTTON_CODE,
    TEST_IDS_CODE,
    TEST_IDS_COMPONENT_CODE,
    TEST_IDS_DOM,
    TEST_IDS_IMPORT_CODE,
    TEST_IDS_PROJECT_STRUCTURE,
  } from '../constants/constants';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ TEST_IDS_DOM.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ TEST_IDS_DOM.description }}
      </p>
    </section>

    <!-- Structure -->
    <Card
      :title="TEST_IDS_DOM.structure.title"
      :description="TEST_IDS_DOM.location.description"
      :border="false"
      :code="TEST_IDS_IMPORT_CODE"
      :structure="TEST_IDS_PROJECT_STRUCTURE"
    >
    </Card>

    <!-- Centralized Test IDs -->
    <Card
      :title="TEST_IDS_DOM.centralized.title"
      :description="TEST_IDS_DOM.centralized.description"
      :how-to-use="TEST_IDS_DOM.centralized.howToUse"
      header="src/lib/test-ids.ts"
      :show-preview="false"
      :code="TEST_IDS_CODE"
    />

    <!-- Component Usage -->
    <Card
      :title="TEST_IDS_DOM.componentUsage.title"
      :description="TEST_IDS_DOM.componentUsage.description"
      :how-to-use="TEST_IDS_DOM.componentUsage.howToUse"
      header="Usage"
      :show-preview="false"
      :code-arr="[
        {
          code: TEST_IDS_BUTTON_CODE,
          header: 'Button Usage',
        },
        {
          code: TEST_IDS_COMPONENT_CODE,
          header: 'Component',
        },
      ]"
    />
  </div>
</template>
