<script setup lang="ts">
  import { ref } from 'vue';
  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';
  import {
    RADIO_IMPORT_CODE,
    RADIO_BASIC_CODE,
    RADIO_VALUE_CODE,
    RADIO_V_MODEL_CODE,
    RADIO_DISABLED_CODE,
    RADIO_DOC,
  } from '../constants/constants';

  const radioValue = ref('a');
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ RADIO_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ RADIO_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="RADIO_DOC.import.title"
      :description="RADIO_DOC.import.description"
      :code="RADIO_IMPORT_CODE"
      :show-preview="false"
    />
    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ RADIO_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ RADIO_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="RADIO_DOC.basic.title"
          :description="RADIO_DOC.basic.description"
          :how-to-use="RADIO_DOC.basic.howToUse"
          :code="RADIO_BASIC_CODE"
        >
          <template #preview>
            <Field.Radio
              :label="RADIO_DOC.basic.label"
              :test-id="RADIO_DOC.basic.testId"
              :value="RADIO_DOC.basic.value"
            />
          </template>
        </Card>

        <!-- Values -->
        <Card
          :title="RADIO_DOC.value.title"
          :description="RADIO_DOC.value.description"
          :how-to-use="RADIO_DOC.value.howToUse"
          :code="RADIO_VALUE_CODE"
        >
          <template #preview>
            <div class="flex flex-col space-y-5">
              <Field.Radio label="Option A" value="a" :test-id="RADIO_DOC.value.optionATestId" />

              <Field.Radio label="Option B" value="b" :test-id="RADIO_DOC.value.optionBTestId" />

              <Field.Radio label="Option C" value="c" :test-id="RADIO_DOC.value.optionCTestId" />
            </div>
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="RADIO_DOC.vModel.title"
          :description="RADIO_DOC.vModel.description"
          :how-to-use="RADIO_DOC.vModel.howToUse"
          :code="RADIO_V_MODEL_CODE"
        >
          <template #preview>
            <div class="flex flex-col space-y-5">
              <Field.Radio
                v-model="radioValue"
                label="Option A"
                value="a"
                :test-id="RADIO_DOC.vModel.optionATestId"
              />

              <Field.Radio
                v-model="radioValue"
                label="Option B"
                value="b"
                :test-id="RADIO_DOC.vModel.optionBTestId"
              />

              <Field.Radio
                v-model="radioValue"
                label="Option C"
                value="c"
                :test-id="RADIO_DOC.vModel.optionCTestId"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ RADIO_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ radioValue }}
                </span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Disabled -->
        <Card
          :title="RADIO_DOC.disabled.title"
          :description="RADIO_DOC.disabled.description"
          :how-to-use="RADIO_DOC.disabled.howToUse"
          :code="RADIO_DISABLED_CODE"
        >
          <template #preview>
            <div class="flex flex-col space-y-5">
              <Field.Radio
                label="Available Option"
                value="available"
                :test-id="RADIO_DOC.disabled.availableTestId"
              />

              <Field.Radio
                disabled
                label="Disabled Option"
                value="disabled"
                :test-id="RADIO_DOC.disabled.disabledTestId"
              />
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
