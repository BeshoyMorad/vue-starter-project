<script setup lang="ts">
  import { Tooltip } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';
  import { useAppLocale } from '@/composables';

  import { TOOLTIP_IMPORT_CODE, TOOLTIP_EXAMPLES } from '../constants/constants';

  const { t } = useAppLocale();
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ t('tooltip.title') }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ t('tooltip.description') }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="t('tooltip.import.title')"
      :description="t('tooltip.import.description')"
      :code="TOOLTIP_IMPORT_CODE"
      header="Import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ t('tooltip.examples.title') }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ t('tooltip.examples.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5">
        <Card
          v-for="item in TOOLTIP_EXAMPLES"
          :key="item.nameKey"
          :title="t(item.nameKey)"
          :description="t(item.descriptionKey)"
          :how-to-use="t('tooltip.howToUse.description')"
          :code="item.code"
          header="<scripts>"
          :preview-label="t('tooltip.preview')"
          :usage-label="t('tooltip.howToUse.title')"
        >
          <template #preview>
            <div
              class="bg-surface-secondary flex min-h-24 items-center justify-center rounded-lg border p-6"
            >
              <Tooltip>
                <template #trigger>
                  <p class="cursor-pointer">
                    {{ t('tooltip.examples.basic.trigger') }}
                  </p>
                </template>

                <div>
                  {{ t('tooltip.examples.basic.content') }}
                </div>
              </Tooltip>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
