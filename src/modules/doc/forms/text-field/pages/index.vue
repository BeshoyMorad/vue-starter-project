<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    TEXT_IMPORT_CODE,
    TEXT_BASIC_CODE,
    TEXT_ICON_CODE,
    TEXT_LOADING_CODE,
    TEXT_V_MODEL_CODE,
    TEXT_DOC,
  } from '../constants/constants';

  const textValue = ref('');
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">Text Input</h1>

      <p class="text-text-secondary text-sm leading-6">
        A text input field for collecting single-line user input.
      </p>
    </section>

    <!-- Import -->
    <Card
      title="Import"
      description="Import the Text field from the shared components library."
      :code="TEXT_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">Examples</h2>

        <p class="text-text-secondary mt-1 text-sm">Common usage examples of the Text field.</p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="TEXT_DOC.basic.title"
          :description="TEXT_DOC.basic.description"
          :how-to-use="TEXT_DOC.basic.howToUse"
          :code="TEXT_BASIC_CODE"
        >
          <template #preview>
            <Field.Text placeholder="Enter your name..." test-id="text-basic" />
          </template>
        </Card>

        <!-- With Icon -->
        <Card
          :title="TEXT_DOC.icon.title"
          :description="TEXT_DOC.icon.description"
          :how-to-use="TEXT_DOC.icon.howToUse"
          :code="TEXT_ICON_CODE"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Field.Text
                placeholder="Search..."
                icon="hugeicons--search-01"
                icon-position="left"
                test-id="text-icon-left"
              />

              <Field.Text
                placeholder="Search..."
                icon="hugeicons--search-01"
                icon-position="right"
                test-id="text-icon-right"
              />
            </div>
          </template>
        </Card>

        <!-- Loading -->
        <Card
          :title="TEXT_DOC.loading.title"
          :description="TEXT_DOC.loading.description"
          :how-to-use="TEXT_DOC.loading.howToUse"
          :code="TEXT_LOADING_CODE"
        >
          <template #preview>
            <Field.Text
              placeholder="Loading data..."
              loading
              icon-position="right"
              test-id="text-loading"
            />
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="TEXT_DOC.vModel.title"
          :description="TEXT_DOC.vModel.description"
          :how-to-use="TEXT_DOC.vModel.howToUse"
          :code="TEXT_V_MODEL_CODE"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Field.Text
                v-model="textValue"
                placeholder="Type something..."
                test-id="text-v-model"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">Current value:</span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ textValue || 'Empty' }}
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
