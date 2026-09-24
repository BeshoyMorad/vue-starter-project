<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import {
    ENV_DOM,
    ENV_PROJECT_STRUCTURE,
    ENV_SETUP_CODE,
    ENV_SCHEMA_CODE,
    ENV_VALIDATION_CODE,
    ENV_ERROR_CODE,
  } from '../constants/constants';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ ENV_DOM.title }}
      </h1>

      <p class="text-text-secondary max-w-3xl text-sm leading-6">
        {{ ENV_DOM.description }}
      </p>
    </section>

    <!-- Structure -->
    <Card
      :title="ENV_DOM.structure.title"
      :description="ENV_DOM.structure.description"
      :structure="ENV_PROJECT_STRUCTURE"
    />

    <!-- Environment File -->
    <Card
      :title="ENV_DOM.setup.title"
      :description="ENV_DOM.setup.description"
      :how-to-use="ENV_DOM.setup.howToUse"
      header=".env"
      :show-preview="false"
      :code="ENV_SETUP_CODE"
    />

    <!-- Validation -->
    <Card
      :title="ENV_DOM.validation.title"
      :description="ENV_DOM.validation.description"
      :how-to-use="ENV_DOM.validation.howToUse"
      header="src/config/env.ts"
      :show-preview="false"
      :code-arr="[
        {
          code: ENV_SCHEMA_CODE,
          header: 'Schema',
        },
        {
          code: ENV_VALIDATION_CODE,
          header: 'Validation',
        },
      ]"
    />

    <!-- Errors -->
    <Card
      :title="ENV_DOM.errors.title"
      :description="ENV_DOM.errors.description"
      header="Validation Error"
      :show-preview="false"
      :code="ENV_ERROR_CODE"
    />
  </div>
</template>
