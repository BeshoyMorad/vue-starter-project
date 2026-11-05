<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';
  import type { DocPageContent } from './types';

  defineProps<{
    content: DocPageContent;
  }>();
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ content.title }}
      </h1>

      <p class="text-text-secondary max-w-3xl text-sm leading-6">
        {{ content.description }}
      </p>
    </section>

    <!-- Sections -->
    <Card
      v-for="section in content.sections"
      :key="section.title"
      :title="section.title"
      :description="section.description"
      :how-to-use="section.howToUse"
      :header="section.header"
      :code="section.code"
      :code-arr="section.codeArr"
      :structure="section.structure"
      :border="false"
      :show-preview="Boolean(section.items?.length)"
    >
      <template v-if="section.items?.length" #preview>
        <div class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in section.items"
            :key="item.name"
            class="border-border-base hover:bg-primary-500/10 hover:border-border-primary rounded-xl border p-4 transition-all"
          >
            <p class="text-text-primary font-mono text-sm font-semibold">
              {{ item.name }}
            </p>

            <p class="text-text-secondary mt-2 text-xs leading-6">
              {{ item.description }}
            </p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
