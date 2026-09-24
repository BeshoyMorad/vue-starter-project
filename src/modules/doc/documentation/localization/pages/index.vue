```vue
<script setup lang="ts">
  import { computed, ref } from 'vue';
  import dayjs from 'dayjs';

  import Card from '@/components/card/ExampleCard.vue';
  import { Button, LanguageSwitcher } from '@/components';
  import { useAppLocale } from '@/composables/useAppLocale';

  import {
    LOCALIZATION_DOM,
    LOCALIZATION_INTERPOLATION_CODE,
    LOCALIZATION_PLURALIZATION_CODE,
    LOCALIZATION_FORMATTING_CODE,
    LOCALIZATION_DATE_CODE,
    LOCALIZATION_USAGE_CODE,
    LOCALIZATION_PROJECT_STRUCTURE,
  } from '../constants/constants';

  const { t, d, n, currentLocale, currentLocaleMeta, isRTL } = useAppLocale();

  // Interactive demo states
  const customName = ref('Alex');
  const appleCount = ref(3);
  const sampleAmount = ref(1250.75);
  const samplePercent = ref(0.85);
  const sampleDate = ref(new Date());

  const relativeTimeAgo = computed(() => {
    const locale = currentLocale.value;

    return dayjs().subtract(3, 'hour').locale(locale).fromNow();
  });

  const incrementApples = () => {
    appleCount.value++;
  };

  const decrementApples = () => {
    if (appleCount.value > 0) {
      appleCount.value--;
    }
  };
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ LOCALIZATION_DOM.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ LOCALIZATION_DOM.description }}
      </p>
    </section>
    <!-- Project Structure -->
    <Card
      :title="LOCALIZATION_DOM.structure.title"
      :description="LOCALIZATION_DOM.structure.description"
      :structure="LOCALIZATION_PROJECT_STRUCTURE"
    />
    <!-- Implementation Guide -->
    <Card
      :title="LOCALIZATION_DOM.implementation.title"
      :description="LOCALIZATION_DOM.implementation.description"
      :code-arr="LOCALIZATION_USAGE_CODE.steps"
      :show-preview="false"
    />

    <!-- Current Locale -->
    <Card
      :title="LOCALIZATION_DOM.currentLocale.title"
      :description="LOCALIZATION_DOM.currentLocale.description"
      :code-arr="[
        {
          code: LOCALIZATION_USAGE_CODE.locale,
          header: 'Script',
        },
        {
          code: LOCALIZATION_USAGE_CODE.localeTemplate,
          header: 'Template',
        },
      ]"
    >
      <template #preview>
        <div class="flex flex-wrap items-center gap-3">
          <span
            class="border-primary-500/30 bg-primary-500/10 text-primary-600 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
          >
            <span>{{ currentLocaleMeta.flag }}</span>

            <span>
              {{ currentLocaleMeta.nativeLabel }}
              ({{ currentLocaleMeta.code.toUpperCase() }})
            </span>

            <span class="text-text-disabled">•</span>

            <span class="font-mono tracking-wider uppercase">
              {{ currentLocaleMeta.direction }}
            </span>

            <span class="text-text-disabled">•</span>

            <span class="text-[11px] font-normal"> isRTL: {{ isRTL ? 'true' : 'false' }} </span>
          </span>
          <LanguageSwitcher />
        </div>
      </template>
    </Card>
    <!-- Interactive Demos -->
    <section class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Interpolation -->
      <Card
        :title="LOCALIZATION_DOM.interpolation.title"
        :description="LOCALIZATION_DOM.interpolation.description"
        :how-to-use="LOCALIZATION_DOM.interpolation.howToUse"
        :show-preview="true"
        :code="LOCALIZATION_INTERPOLATION_CODE"
      >
        <template #preview>
          <div class="space-y-4">
            <div class="space-y-1">
              <label class="text-text-secondary text-xs font-medium">
                {{ LOCALIZATION_DOM.interpolation.inputLabel }}
              </label>

              <input
                v-model="customName"
                type="text"
                :placeholder="LOCALIZATION_DOM.interpolation.inputPlaceholder"
                class="border-border-secondary bg-surface-secondary text-text-primary focus:border-primary-500 w-full rounded-lg border px-3 py-2 text-sm focus:outline-hidden"
              />
            </div>

            <div
              class="bg-surface-secondary text-text-primary border-border-secondary rounded-lg border p-3 text-sm"
            >
              <span class="text-text-disabled mb-1 block font-mono text-xs">
                {{ LOCALIZATION_DOM.interpolation.renderedLabel }}
              </span>

              <p class="text-primary-600 font-medium">
                {{ t('demo.interpolation.greeting', { name: customName }) }}
              </p>

              <p class="text-text-secondary mt-2">
                {{ t('demo.interpolation.userStats', { count: 5, points: 240 }) }}
              </p>
            </div>
          </div>
        </template>
      </Card>

      <!-- Pluralization -->
      <Card
        :title="LOCALIZATION_DOM.pluralization.title"
        :description="LOCALIZATION_DOM.pluralization.description"
        :how-to-use="LOCALIZATION_DOM.pluralization.howToUse"
        :show-preview="true"
        :code="LOCALIZATION_PLURALIZATION_CODE"
      >
        <template #preview>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-text-secondary text-xs font-medium">
                {{ LOCALIZATION_DOM.pluralization.quantityLabel }}
              </span>

              <div class="flex items-center gap-2">
                <Button test-id="dec-apples" outline size="sm" @click="decrementApples"> - </Button>

                <span class="text-text-primary min-w-8 text-center font-bold">
                  {{ appleCount }}
                </span>

                <Button test-id="inc-apples" outline size="sm" @click="incrementApples"> + </Button>
              </div>
            </div>

            <div
              class="bg-surface-secondary text-text-primary border-border-secondary space-y-2 rounded-lg border p-3 text-sm"
            >
              <div>
                <span class="text-text-disabled block font-mono text-xs">
                  {{ LOCALIZATION_DOM.pluralization.applesLabel }}
                </span>

                <p class="text-primary-600 text-base font-semibold">
                  {{ t('demo.pluralization.apples', appleCount, { named: { count: appleCount } }) }}
                </p>
              </div>

              <div class="border-border-secondary border-t pt-2">
                <span class="text-text-disabled block font-mono text-xs">
                  {{ LOCALIZATION_DOM.pluralization.membersLabel }}
                </span>

                <p class="text-text-secondary text-sm font-medium">
                  {{
                    t('demo.pluralization.members', appleCount, { named: { count: appleCount } })
                  }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Number & Currency -->
      <Card
        :title="LOCALIZATION_DOM.formatting.title"
        :description="LOCALIZATION_DOM.formatting.description"
        :how-to-use="LOCALIZATION_DOM.formatting.howToUse"
        :show-preview="true"
        :code="LOCALIZATION_FORMATTING_CODE"
      >
        <template #preview>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
              <span class="text-text-disabled block text-xs">
                {{ LOCALIZATION_DOM.formatting.currencyLabel }}
              </span>

              <span class="text-text-primary text-base font-bold">
                {{ n(sampleAmount, 'currency') }}
              </span>
            </div>

            <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
              <span class="text-text-disabled block text-xs">
                {{ LOCALIZATION_DOM.formatting.percentLabel }}
              </span>

              <span class="text-text-primary text-base font-bold">
                {{ n(samplePercent, 'percent') }}
              </span>
            </div>
          </div>
        </template>
      </Card>

      <!-- Date & Relative Time -->
      <Card
        :title="LOCALIZATION_DOM.dateTime.title"
        :description="LOCALIZATION_DOM.dateTime.description"
        :how-to-use="LOCALIZATION_DOM.dateTime.howToUse"
        :show-preview="true"
        :code="LOCALIZATION_DATE_CODE"
      >
        <template #preview>
          <div class="space-y-3">
            <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
              <span class="text-text-disabled block text-xs">
                {{ LOCALIZATION_DOM.dateTime.dateLabel }}
              </span>

              <span class="text-text-primary text-sm font-medium">
                {{ d(sampleDate, 'short') }}
              </span>
            </div>

            <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
              <span class="text-text-disabled block text-xs">
                {{ LOCALIZATION_DOM.dateTime.relativeTimeLabel }}
              </span>

              <span class="text-primary-600 text-sm font-bold">
                {{ relativeTimeAgo }}
              </span>
            </div>
          </div>
        </template>
      </Card>
    </section>
  </div>
</template>
```
