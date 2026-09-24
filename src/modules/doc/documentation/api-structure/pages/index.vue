<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import {
    API_ENDPOINTS_CODE,
    API_QUERY_KEYS_CODE,
    API_ROUTE_USAGE_CODE,
    API_QUERY_KEYS_USAGE_CODE,
    API_STRUCTURE_DOM,
    API_STRUCTURE_IMPORT_CODE,
    API_QUERY_KEYS_USAGE_CODE_MUTATION,
    API_PROJECT_STRUCTURE,
  } from '../constants/constants';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ API_STRUCTURE_DOM.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ API_STRUCTURE_DOM.description }}
      </p>
    </section>

    <!-- Project Structure -->
    <Card
      :title="API_STRUCTURE_DOM.structure.title"
      :description="API_STRUCTURE_DOM.location.description"
      :code="API_STRUCTURE_IMPORT_CODE"
      :structure="API_PROJECT_STRUCTURE"
    >
    </Card>

    <!-- API Endpoints -->
    <Card
      :title="API_STRUCTURE_DOM.endpoints.title"
      :description="API_STRUCTURE_DOM.endpoints.description"
      :how-to-use="API_STRUCTURE_DOM.endpoints.howToUse"
      :show-preview="false"
      header="Usage"
      :code-arr="[
        {
          code: API_ENDPOINTS_CODE,
          header: 'src/lib/api/endpoints.ts',
        },
        {
          code: API_ROUTE_USAGE_CODE,
          header: 'usage',
        },
      ]"
    >
    </Card>
    <!-- Query Keys -->
    <Card
      :title="API_STRUCTURE_DOM.queryKeys.title"
      :description="API_STRUCTURE_DOM.queryKeys.description"
      :how-to-use="API_STRUCTURE_DOM.queryKeys.howToUse"
      header="src/lib/query-keys.ts"
      :show-preview="false"
      :code="API_QUERY_KEYS_CODE"
      :code-arr="[
        {
          code: API_QUERY_KEYS_USAGE_CODE,
          header: 'Query Usage',
        },
        {
          code: API_QUERY_KEYS_USAGE_CODE_MUTATION,
          header: 'Mutation Usage',
        },
      ]"
    >
    </Card>
  </div>
</template>
