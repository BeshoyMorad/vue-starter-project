<script setup lang="ts">
  import { Button } from '@/components';
  import Codeblock from '@/components/codeblock/codeblock.vue';
  import { BUTTON_IMPORT_CODE, BUTTON_VARIANTS, BUTTON_OUTLINE } from '../constants/constants';
  import Card from '@/components/card/ExampleCard.vue';
  import { useAppLocale } from '@/composables';
  import { ref } from 'vue';

  type ButtonVariant = (typeof BUTTON_VARIANTS)[number]['variant'];
  const { t } = useAppLocale();
  const isOutline = ref(true);
  const selectedVariant = ref<ButtonVariant>(BUTTON_VARIANTS[0].variant);
  const getButtonCode = (outline: boolean, label: string, variant?: string) => {
    const outlineProp = outline ? 'outline' : '';
    const variantProp = variant ? `variant="${variant}"` : '';
    return `<Button ${outlineProp} ${variantProp}>
  ${label}
</Button>`;
  };

  function toggleOutline() {
    isOutline.value = !isOutline.value;
  }
</script>
<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ t('button.title') }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ t('button.description') }}
      </p>
    </section>
    <Card
      :title="t('button.import.title')"
      :description="t('button.import.description')"
      :code="BUTTON_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Variants -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ t('button.variants.title') }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ t('button.variants.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card
          v-for="item in BUTTON_VARIANTS"
          :key="item.variant"
          :title="t(item.nameKey)"
          :description="t(item.descriptionKey)"
          :how-to-use="t('button.howToUse.description')"
          :code="item.code"
          :preview-label="t('button.preview')"
          :usage-label="t('button.howToUse.title')"
        >
          <template #preview>
            <div class="flex min-h-24 items-center">
              <Button test-id="" :variant="item.variant">
                {{ t(item.nameKey) }}
              </Button>
            </div>
          </template>
        </Card>
      </div>
    </section>
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ t(BUTTON_OUTLINE.nameKey) }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ t(BUTTON_OUTLINE.descriptionKey) }}
        </p>
      </div>
      <div
        class="border-border-base bg-surface-primary overflow-hidden rounded-xl border shadow-xs"
      >
        <div class="flex items-center justify-between px-6 py-4">
          <div>
            <h3 class="text-text-primary font-semibold">
              {{ t(BUTTON_OUTLINE.nameKey) }}
            </h3>

            <p class="text-text-secondary mt-1 text-sm">
              {{ t(BUTTON_OUTLINE.descriptionKeyOutline) }}
            </p>
          </div>
          <Button test-id="" @click="toggleOutline">{{
            isOutline ? t(BUTTON_OUTLINE.offKey) : t(BUTTON_OUTLINE.onKey)
          }}</Button>
        </div>

        <div class="space-y-3 px-6">
          <span class="text-text-disabled text-xs font-semibold tracking-wider uppercase">
            {{ t('button.preview') }}
          </span>

          <div
            class="bg-surface-secondary flex min-h-24 flex-wrap items-center justify-around gap-4 rounded-lg border p-6"
          >
            <div v-for="item in BUTTON_VARIANTS" :key="item.variant">
              <Button
                test-id=""
                :variant="item.variant"
                :outline="isOutline"
                @click="selectedVariant = item.variant"
              >
                {{ t(item.nameKey) }}
              </Button>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="mb-3">
            <h4 class="text-text-primary text-sm font-semibold">
              {{ t('button.howToUse.title') }}
            </h4>

            <p class="text-text-secondary mt-1 text-xs">
              {{ t('button.howToUse.description') }}
            </p>
          </div>
          <div>
            <div>
              <Codeblock
                :code="getButtonCode(isOutline, t(BUTTON_OUTLINE.nameKey), selectedVariant)"
                :header="t('button.howToUse.codeHeader')"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
