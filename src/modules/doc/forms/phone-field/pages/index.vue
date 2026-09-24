<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    PHONE_IMPORT_CODE,
    PHONE_BASIC_CODE,
    PHONE_DEFAULT_COUNTRY_CODE,
    PHONE_V_MODEL_CODE_SCRIPT,
    PHONE_V_MODEL_CODE_TEMPLATE,
    PHONE_DOC,
  } from '../constants/constants';

  const phoneValue = ref('');
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ PHONE_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ PHONE_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="PHONE_DOC.import.title"
      :description="PHONE_DOC.import.description"
      :code="PHONE_IMPORT_CODE"
      header="Import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ PHONE_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ PHONE_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="PHONE_DOC.basic.title"
          :description="PHONE_DOC.basic.description"
          :how-to-use="PHONE_DOC.basic.howToUse"
          :code="PHONE_BASIC_CODE"
          header="template"
          :usage-label="PHONE_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.Phone placeholder="12 345 6789" test-id="direct-phone-input" />
          </template>
        </Card>

        <!-- Default Country -->
        <Card
          :title="PHONE_DOC.defaultCountry.title"
          :description="PHONE_DOC.defaultCountry.description"
          :how-to-use="PHONE_DOC.defaultCountry.howToUse"
          :code="PHONE_DEFAULT_COUNTRY_CODE"
          header="template"
          :usage-label="PHONE_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.Phone
              default-country="EG"
              placeholder="10 1234 5678"
              test-id="direct-phone-input-eg"
            />
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="PHONE_DOC.vModel.title"
          :description="PHONE_DOC.vModel.description"
          :how-to-use="PHONE_DOC.vModel.howToUse"
          :code-arr="[
            { code: PHONE_V_MODEL_CODE_SCRIPT, header: 'script' },
            { code: PHONE_V_MODEL_CODE_TEMPLATE, header: 'template' },
          ]"
          :usage-label="PHONE_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Field.Phone
                v-model="phoneValue"
                placeholder="10 1234 5678"
                test-id="phone-v-model"
                default-country="EG"
                show-clear
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ PHONE_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ phoneValue || PHONE_DOC.vModel.emptyValue }}
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
