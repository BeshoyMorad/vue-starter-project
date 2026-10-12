<script setup lang="ts">
  import { ref } from 'vue';
  import {
    COLOR_IMPORT_CODE,
    COLOR_BASIC_CODE,
    COLOR_WITH_LABEL_CODE,
    COLOR_EYE_DROPPER_CODE,
    COLOR_CUSTOM_PRESETS_CODE,
    COLOR_DISABLED_CODE,
    COLOR_LIVE_PREVIEW_CODE,
    COLOR_DOC,
  } from '@/modules/doc/forms/color-field/constants';
  import Card from '@/components/card/ExampleCard.vue';
  import { Field } from '@/components';

  const basicColor = ref('#3b82f6');
  const brandColor = ref('#6366f1');
  const eyedropperColor = ref('#06b6d4');
  const presetColor = ref('#10b981');
  const disabledColor = ref('#8b5cf6');
  const readonlyColor = ref('#f59e0b');
  const liveCardColor = ref('#3b82f6');
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <div class="flex items-center gap-3">
        <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
          {{ COLOR_DOC.title }}
        </h1>
        <span
          class="bg-primary-500/10 text-primary-500 border-primary-500/20 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
        >
          Form Field
        </span>
      </div>

      <p class="text-text-secondary max-w-3xl text-sm leading-6">
        {{ COLOR_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="COLOR_DOC.import.title"
      :description="COLOR_DOC.import.description"
      :code="COLOR_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ COLOR_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ COLOR_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="COLOR_DOC.basic.title"
          :description="COLOR_DOC.basic.description"
          :how-to-use="COLOR_DOC.basic.howToUse"
          :code="COLOR_BASIC_CODE"
        >
          <template #preview>
            <div class="w-full max-w-sm">
              <Field.Color v-model="basicColor" test-id="color-basic" />
            </div>
          </template>
        </Card>

        <!-- With Label & Description -->
        <Card
          :title="COLOR_DOC.withLabel.title"
          :description="COLOR_DOC.withLabel.description"
          :how-to-use="COLOR_DOC.withLabel.howToUse"
          :code="COLOR_WITH_LABEL_CODE"
        >
          <template #preview>
            <div class="w-full max-w-sm">
              <Field.Color
                v-model="brandColor"
                label="Primary Brand Color"
                description="Choose the primary accent hue for your application theme."
                test-id="color-with-label"
              />
            </div>
          </template>
        </Card>

        <!-- Optional Eye Dropper -->
        <Card
          :title="COLOR_DOC.eyeDropper.title"
          :description="COLOR_DOC.eyeDropper.description"
          :how-to-use="COLOR_DOC.eyeDropper.howToUse"
          :code="COLOR_EYE_DROPPER_CODE"
        >
          <template #preview>
            <div class="w-full max-w-sm">
              <Field.Color
                v-model="eyedropperColor"
                label="Screen Eye Dropper Enabled"
                description="The eye dropper is disabled by default. Enable it with show-eye-dropper."
                show-eye-dropper
                test-id="color-eyedropper"
              />
            </div>
          </template>
        </Card>

        <!-- Custom Presets -->
        <Card
          :title="COLOR_DOC.customPresets.title"
          :description="COLOR_DOC.customPresets.description"
          :how-to-use="COLOR_DOC.customPresets.howToUse"
          :code="COLOR_CUSTOM_PRESETS_CODE"
        >
          <template #preview>
            <div class="w-full max-w-sm">
              <Field.Color
                v-model="presetColor"
                label="Curated Palette"
                description="Choose from a custom restricted set of branded swatches."
                :presets="[
                  '#6366f1',
                  '#3b82f6',
                  '#06b6d4',
                  '#10b981',
                  '#f59e0b',
                  '#ef4444',
                  '#ec4899',
                  '#1e293b',
                ]"
                test-id="color-custom-presets"
              />
            </div>
          </template>
        </Card>

        <!-- Interactive Live Theme Preview -->
        <Card
          :title="COLOR_DOC.livePreview.title"
          :description="COLOR_DOC.livePreview.description"
          :how-to-use="COLOR_DOC.livePreview.howToUse"
          :code="COLOR_LIVE_PREVIEW_CODE"
        >
          <template #preview>
            <div class="flex w-full max-w-md flex-col gap-5">
              <Field.Color
                v-model="liveCardColor"
                label="Card Accent Preview"
                test-id="color-preview-input"
              />

              <div
                class="flex items-center justify-between rounded-xl border p-5 shadow-sm transition-all duration-300"
                :style="{
                  backgroundColor: liveCardColor + '15',
                  borderColor: liveCardColor + '60',
                  boxShadow: '0 8px 24px ' + liveCardColor + '20',
                }"
              >
                <div class="space-y-1">
                  <p class="text-sm font-bold tracking-wide" :style="{ color: liveCardColor }">
                    Interactive Dynamic Card
                  </p>
                  <p class="text-text-secondary text-xs">
                    Hex Value: <span class="font-mono font-medium">{{ liveCardColor }}</span>
                  </p>
                </div>
                <div
                  class="size-10 transform rounded-xl border border-white/20 shadow-md transition-all duration-300 hover:scale-110"
                  :style="{ backgroundColor: liveCardColor }"
                />
              </div>
            </div>
          </template>
        </Card>

        <!-- States: Disabled & Readonly -->
        <Card
          :title="COLOR_DOC.states.title"
          :description="COLOR_DOC.states.description"
          :how-to-use="COLOR_DOC.states.howToUse"
          :code="COLOR_DISABLED_CODE"
        >
          <template #preview>
            <div class="grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
              <Field.Color
                v-model="disabledColor"
                label="Disabled State"
                disabled
                test-id="color-disabled"
              />

              <Field.Color
                v-model="readonlyColor"
                label="Read-only State"
                readonly
                test-id="color-readonly"
              />
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
