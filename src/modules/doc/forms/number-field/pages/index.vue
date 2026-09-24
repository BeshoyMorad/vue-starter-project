<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';
  import {
    NUMBER_IMPORT_CODE,
    NUMBER_BASIC_CODE,
    NUMBER_ICON_CODE,
    NUMBER_NO_STEPPERS_CODE,
    NUMBER_STEP_CODE,
    NUMBER_DOC,
    NUMBER_V_MODEL_CODE,
  } from '../constants/constants';

  const numberValue = ref<number | undefined>(undefined);
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <!-- TODO: create reusable component -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ NUMBER_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ NUMBER_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="NUMBER_DOC.import.title"
      :description="NUMBER_DOC.import.description"
      :code="NUMBER_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ NUMBER_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ NUMBER_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="NUMBER_DOC.basic.title"
          :description="NUMBER_DOC.basic.description"
          :how-to-use="NUMBER_DOC.basic.howToUse"
          :code="NUMBER_BASIC_CODE"
        >
          <template #preview>
            <Field.Number
              :placeholder="NUMBER_DOC.basic.placeholder"
              :test-id="NUMBER_DOC.basic.testId"
            />
          </template>
        </Card>

        <!-- With Icon -->
        <Card
          :title="NUMBER_DOC.icon.title"
          :description="NUMBER_DOC.icon.description"
          :how-to-use="NUMBER_DOC.icon.howToUse"
          :code="NUMBER_ICON_CODE"
        >
          <template #preview>
            <Field.Number
              :placeholder="NUMBER_DOC.icon.placeholder"
              :icon="NUMBER_DOC.icon.icon"
              :icon-position?="NUMBER_DOC.icon.iconPosition"
              :test-id="NUMBER_DOC.icon.testId"
            />
          </template>
        </Card>

        <!-- Hide Steppers -->
        <Card
          :title="NUMBER_DOC.noSteppers.title"
          :description="NUMBER_DOC.noSteppers.description"
          :how-to-use="NUMBER_DOC.noSteppers.howToUse"
          :code="NUMBER_NO_STEPPERS_CODE"
        >
          <template #preview>
            <Field.Number
              :placeholder="NUMBER_DOC.noSteppers.placeholder"
              hide-steppers
              :step="NUMBER_DOC.noSteppers.step"
              :test-id="NUMBER_DOC.noSteppers.testId"
            />
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="NUMBER_DOC.vModel.title"
          :description="NUMBER_DOC.vModel.description"
          :how-to-use="NUMBER_DOC.vModel.howToUse"
          :code="NUMBER_V_MODEL_CODE"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Field.Number
                v-model="numberValue"
                :placeholder="NUMBER_DOC.vModel.placeholder"
                :test-id="NUMBER_DOC.vModel.testId"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ NUMBER_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ numberValue ?? NUMBER_DOC.vModel.emptyValue }}
                </span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Custom Step -->
        <Card
          :title="NUMBER_DOC.step.title"
          :description="NUMBER_DOC.step.description"
          :how-to-use="NUMBER_DOC.step.howToUse"
          :code="NUMBER_STEP_CODE"
        >
          <template #preview>
            <Field.Number
              :placeholder="NUMBER_DOC.step.placeholder"
              :step="NUMBER_DOC.step.step"
              :test-id="NUMBER_DOC.step.testId"
            />
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
