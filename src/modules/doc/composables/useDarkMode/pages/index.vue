<script setup lang="ts">
  import { useDarkTheme } from '@/composables';
  import { Button } from '@/components';

  import Card from '@/components/card/ExampleCard.vue';

  import {
    USE_DARK_THEME_DOM,
    USE_DARK_THEME_IMPORT_CODE,
    USE_DARK_THEME_BASIC_CODE,
    USE_DARK_THEME_TEMPLATE_CODE,
    USE_DARK_THEME_PERSISTENCE_CODE,
  } from '../constants/constants';

  const { isDark, toggleDark } = useDarkTheme();
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ USE_DARK_THEME_DOM.title }}
      </h1>

      <p class="text-text-secondary max-w-3xl text-sm leading-6">
        {{ USE_DARK_THEME_DOM.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="USE_DARK_THEME_DOM.import.title"
      :description="USE_DARK_THEME_DOM.import.description"
      :code="USE_DARK_THEME_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- What is useDarkTheme? -->
    <Card
      :title="USE_DARK_THEME_DOM.whatIs.title"
      :description="USE_DARK_THEME_DOM.whatIs.description"
      :code="USE_DARK_THEME_BASIC_CODE"
      :show-preview="false"
    />

    <!-- Basic Usage -->
    <Card
      :title="USE_DARK_THEME_DOM.basicUsage.title"
      :description="USE_DARK_THEME_DOM.basicUsage.description"
      :how-to-use="USE_DARK_THEME_DOM.basicUsage.howToUse"
      header="Usage"
      :code-arr="[
        { code: USE_DARK_THEME_BASIC_CODE, header: 'script' },
        { code: USE_DARK_THEME_TEMPLATE_CODE, header: 'template' },
      ]"
    >
      <template #preview>
        <div class="flex items-center gap-4">
          <Button test-id="" @click="toggleDark()">
            {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
          </Button>
        </div>
      </template>
    </Card>

    <!-- Persistence -->
    <Card
      :title="USE_DARK_THEME_DOM.persistence.title"
      :description="USE_DARK_THEME_DOM.persistence.description"
      :code="USE_DARK_THEME_PERSISTENCE_CODE"
      :show-preview="false"
    />
  </div>
</template>
