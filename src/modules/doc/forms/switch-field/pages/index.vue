<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    SWITCH_IMPORT_CODE,
    SWITCH_BASIC_CODE,
    SWITCH_SIZES_CODE,
    SWITCH_V_MODEL_CODE,
    SWITCH_DOC,
  } from '../constants/constants';

  const switchValue = ref(false);
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ SWITCH_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ SWITCH_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="SWITCH_DOC.import.title"
      :description="SWITCH_DOC.import.description"
      :code="SWITCH_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ SWITCH_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ SWITCH_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="SWITCH_DOC.basic.title"
          :description="SWITCH_DOC.basic.description"
          :how-to-use="SWITCH_DOC.basic.howToUse"
          :code="SWITCH_BASIC_CODE"
        >
          <template #preview>
            <Field.Switch :label="SWITCH_DOC.basic.label" :test-id="SWITCH_DOC.basic.testId" />
          </template>
        </Card>

        <!-- Sizes -->
        <Card
          :title="SWITCH_DOC.sizes.title"
          :description="SWITCH_DOC.sizes.description"
          :how-to-use="SWITCH_DOC.sizes.howToUse"
          :code="SWITCH_SIZES_CODE"
        >
          <template #preview>
            <div class="flex flex-col gap-5">
              <Field.Switch
                size="small"
                :label="SWITCH_DOC.sizes.smallLabel"
                :test-id="SWITCH_DOC.sizes.smallTestId"
              />

              <Field.Switch
                :label="SWITCH_DOC.sizes.defaultLabel"
                :test-id="SWITCH_DOC.sizes.defaultTestId"
              />

              <Field.Switch
                size="large"
                :label="SWITCH_DOC.sizes.largeLabel"
                :test-id="SWITCH_DOC.sizes.largeTestId"
              />
            </div>
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="SWITCH_DOC.vModel.title"
          :description="SWITCH_DOC.vModel.description"
          :how-to-use="SWITCH_DOC.vModel.howToUse"
          :code="SWITCH_V_MODEL_CODE"
        >
          <template #preview>
            <div class="space-y-4">
              <Field.Switch
                v-model="switchValue"
                :label="SWITCH_DOC.vModel.label"
                :test-id="SWITCH_DOC.vModel.testId"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ SWITCH_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{
                    switchValue ? SWITCH_DOC.vModel.enabledValue : SWITCH_DOC.vModel.disabledValue
                  }}
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
