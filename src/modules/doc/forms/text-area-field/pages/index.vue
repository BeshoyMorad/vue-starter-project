<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    TEXTAREA_IMPORT_CODE,
    TEXTAREA_BASIC_CODE,
    TEXTAREA_LABEL_CODE,
    TEXTAREA_DESCRIPTION_CODE,
    TEXTAREA_V_MODEL_CODE,
    TEXTAREA_DOC,
  } from '../constants/constants';

  const textAreaValue = ref('');
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">Text Area</h1>

      <p class="text-text-secondary text-sm leading-6">
        A text area field for collecting multi-line user input.
      </p>
    </section>

    <!-- Import -->
    <Card
      title="Import"
      description="Import the TextArea field from the shared components library."
      :code="TEXTAREA_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">Examples</h2>

        <p class="text-text-secondary mt-1 text-sm">Common usage examples of the TextArea field.</p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="TEXTAREA_DOC.basic.title"
          :description="TEXTAREA_DOC.basic.description"
          :how-to-use="TEXTAREA_DOC.basic.howToUse"
          :code="TEXTAREA_BASIC_CODE"
        >
          <template #preview>
            <div class="w-full">
              <Field.Textarea
                name="basic"
                placeholder="Write something..."
                test-id="textarea-basic "
              />
            </div>
          </template>
        </Card>

        <!-- With Label -->
        <Card
          :title="TEXTAREA_DOC.label.title"
          :description="TEXTAREA_DOC.label.description"
          :how-to-use="TEXTAREA_DOC.label.howToUse"
          :code="TEXTAREA_LABEL_CODE"
        >
          <template #preview>
            <div class="w-full">
              <Field.Textarea
                label="Label"
                name="des"
                placeholder="Enter a description..."
                test-id="textarea-label"
              />
            </div>
          </template>
        </Card>

        <!-- With Description -->
        <Card
          :title="TEXTAREA_DOC.description.title"
          :description="TEXTAREA_DOC.description.description"
          :how-to-use="TEXTAREA_DOC.description.howToUse"
          :code="TEXTAREA_DESCRIPTION_CODE"
        >
          <template #preview>
            <div class="w-full">
              <Field.Textarea
                label="Bio"
                name="textarea-description"
                description="Tell us a little about yourself."
                placeholder="Write your bio..."
                test-id="textarea-description"
              />
            </div>
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="TEXTAREA_DOC.vModel.title"
          :description="TEXTAREA_DOC.vModel.description"
          :how-to-use="TEXTAREA_DOC.vModel.howToUse"
          :code="TEXTAREA_V_MODEL_CODE"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Field.Textarea
                v-model="textAreaValue"
                label="Description"
                placeholder="Type something..."
                test-id="textarea-v-model"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">Current value:</span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ textAreaValue || 'Empty' }}
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
