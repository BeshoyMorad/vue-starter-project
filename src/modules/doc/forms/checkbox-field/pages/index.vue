<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    CHECKBOX_IMPORT_CODE,
    CHECKBOX_BASIC_CODE,
    CHECKBOX_SIZES_CODE,
    CHECKBOX_SHAPES_CODE,
    CHECKBOX_V_MODEL_CODE,
    CHECKBOX_DOC,
  } from '../constants/constants';

  const checkboxValue = ref(false);
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ CHECKBOX_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ CHECKBOX_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="CHECKBOX_DOC.import.title"
      :description="CHECKBOX_DOC.import.description"
      :code="CHECKBOX_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ CHECKBOX_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ CHECKBOX_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="CHECKBOX_DOC.basic.title"
          :description="CHECKBOX_DOC.basic.description"
          :how-to-use="CHECKBOX_DOC.basic.howToUse"
          :code="CHECKBOX_BASIC_CODE"
          :usage-label="CHECKBOX_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.Checkbox
              :label="CHECKBOX_DOC.basic.label"
              :test-id="CHECKBOX_DOC.basic.testId"
            />
          </template>
        </Card>

        <!-- Sizes -->
        <Card
          :title="CHECKBOX_DOC.sizes.title"
          :description="CHECKBOX_DOC.sizes.description"
          :how-to-use="CHECKBOX_DOC.sizes.howToUse"
          :code="CHECKBOX_SIZES_CODE"
          :usage-label="CHECKBOX_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="flex flex-col gap-5">
              <Field.Checkbox
                size="small"
                :label="CHECKBOX_DOC.sizes.smallLabel"
                :test-id="CHECKBOX_DOC.sizes.smallTestId"
              />

              <Field.Checkbox
                :label="CHECKBOX_DOC.sizes.defaultLabel"
                :test-id="CHECKBOX_DOC.sizes.defaultTestId"
              />

              <Field.Checkbox
                size="large"
                :label="CHECKBOX_DOC.sizes.largeLabel"
                :test-id="CHECKBOX_DOC.sizes.largeTestId"
              />
            </div>
          </template>
        </Card>

        <!-- Shapes -->
        <Card
          :title="CHECKBOX_DOC.shapes.title"
          :description="CHECKBOX_DOC.shapes.description"
          :how-to-use="CHECKBOX_DOC.shapes.howToUse"
          :code="CHECKBOX_SHAPES_CODE"
          :usage-label="CHECKBOX_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="flex flex-col gap-5">
              <Field.Checkbox
                shape="square"
                :label="CHECKBOX_DOC.shapes.squareLabel"
                :test-id="CHECKBOX_DOC.shapes.squareTestId"
              />

              <Field.Checkbox
                shape="circle"
                :label="CHECKBOX_DOC.shapes.circleLabel"
                :test-id="CHECKBOX_DOC.shapes.circleTestId"
              />
            </div>
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="CHECKBOX_DOC.vModel.title"
          :description="CHECKBOX_DOC.vModel.description"
          :how-to-use="CHECKBOX_DOC.vModel.howToUse"
          :code="CHECKBOX_V_MODEL_CODE"
          :usage-label="CHECKBOX_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="space-y-4">
              <Field.Checkbox
                v-model="checkboxValue"
                :label="CHECKBOX_DOC.vModel.label"
                :test-id="CHECKBOX_DOC.vModel.testId"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ CHECKBOX_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{
                    checkboxValue
                      ? CHECKBOX_DOC.vModel.checkedValue
                      : CHECKBOX_DOC.vModel.uncheckedValue
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
