<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import { Icon } from '@/components';
  import {
    ICON_IMPORT_CODE,
    ICON_BASIC_CODE,
    ICON_SIZES_CODE,
    ICON_DOC,
    ICON_CODE_HEADER,
  } from '../constants/constants';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ ICON_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ ICON_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="ICON_DOC.import.title"
      :description="ICON_DOC.import.description"
      :code="ICON_IMPORT_CODE"
      :header="ICON_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ ICON_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ ICON_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="ICON_DOC.basic.title"
          :description="ICON_DOC.basic.description"
          :how-to-use="ICON_DOC.basic.howToUse"
          :header="ICON_CODE_HEADER.template"
          :code-arr="[
            {
              code: ICON_BASIC_CODE,
              header: ICON_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <Icon icon="hugeicons--arrow-down-01" />
          </template>
        </Card>

        <!-- Sizes -->
        <Card
          :title="ICON_DOC.sizes.title"
          :description="ICON_DOC.sizes.description"
          :how-to-use="ICON_DOC.sizes.howToUse"
          :header="ICON_CODE_HEADER.template"
          :code-arr="[
            {
              code: ICON_SIZES_CODE,
              header: ICON_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <div class="flex items-center gap-6">
              <Icon icon="hugeicons--volleyball" size="xs" />
              <Icon icon="hugeicons--volleyball" size="sm" />
              <Icon icon="hugeicons--volleyball" size="md" />
              <Icon icon="hugeicons--volleyball" size="lg" />
              <Icon icon="hugeicons--volleyball" size="xl" />
              <Icon icon="hugeicons--volleyball" size="2xl" />
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
