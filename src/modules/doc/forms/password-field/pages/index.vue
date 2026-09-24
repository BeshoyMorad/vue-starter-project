<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    PASSWORD_IMPORT_CODE,
    PASSWORD_BASIC_CODE,
    PASSWORD_V_MODEL_CODE,
    PASSWORD_LOADING_CODE,
    PASSWORD_DOC,
  } from '../constants/constants';

  const passwordValue = ref('');
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ PASSWORD_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ PASSWORD_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="PASSWORD_DOC.import.title"
      :description="PASSWORD_DOC.import.description"
      :code="PASSWORD_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ PASSWORD_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ PASSWORD_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="PASSWORD_DOC.basic.title"
          :description="PASSWORD_DOC.basic.description"
          :how-to-use="PASSWORD_DOC.basic.howToUse"
          :code="PASSWORD_BASIC_CODE"
        >
          <template #preview>
            <Field.Password
              :placeholder="PASSWORD_DOC.basic.placeholder"
              :test-id="PASSWORD_DOC.basic.testId"
            />
          </template>
        </Card>

        <!-- Loading -->
        <Card
          :title="PASSWORD_DOC.loading.title"
          :description="PASSWORD_DOC.loading.description"
          :how-to-use="PASSWORD_DOC.loading.howToUse"
          :code="PASSWORD_LOADING_CODE"
        >
          <template #preview>
            <Field.Password
              :placeholder="PASSWORD_DOC.loading.placeholder"
              loading
              :test-id="PASSWORD_DOC.loading.testId"
            />
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="PASSWORD_DOC.vModel.title"
          :description="PASSWORD_DOC.vModel.description"
          :how-to-use="PASSWORD_DOC.vModel.howToUse"
          :code="PASSWORD_V_MODEL_CODE"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Field.Password
                v-model="passwordValue"
                :placeholder="PASSWORD_DOC.vModel.placeholder"
                :test-id="PASSWORD_DOC.vModel.testId"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ PASSWORD_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ passwordValue || PASSWORD_DOC.vModel.emptyValue }}
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
