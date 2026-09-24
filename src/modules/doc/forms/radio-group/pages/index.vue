```vue
<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    RADIO_GROUP_IMPORT_CODE,
    RADIO_GROUP_BASIC_CODE,
    RADIO_GROUP_HORIZONTAL_CODE,
    RADIO_GROUP_SIZES_CODE,
    RADIO_GROUP_DISABLED_CODE,
    RADIO_GROUP_DEFAULT_VALUE_CODE,
    RADIO_GROUP_V_MODEL_SCRIPT,
    RADIO_GROUP_V_MODEL_TEMPLATE,
    RADIO_GROUP_DOC,
  } from '../constants/constants';

  const selectedGender = ref('');

  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ RADIO_GROUP_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ RADIO_GROUP_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="RADIO_GROUP_DOC.import.title"
      :description="RADIO_GROUP_DOC.import.description"
      :code="RADIO_GROUP_IMPORT_CODE"
      header="Import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ RADIO_GROUP_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ RADIO_GROUP_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="RADIO_GROUP_DOC.basic.title"
          :description="RADIO_GROUP_DOC.basic.description"
          :how-to-use="RADIO_GROUP_DOC.basic.howToUse"
          :code="RADIO_GROUP_BASIC_CODE"
          header="Template"
          :usage-label="RADIO_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.RadioGroup :options="genders" test-id="direct-radio-group" />
          </template>
        </Card>

        <!-- Horizontal -->
        <Card
          :title="RADIO_GROUP_DOC.horizontal.title"
          :description="RADIO_GROUP_DOC.horizontal.description"
          :how-to-use="RADIO_GROUP_DOC.horizontal.howToUse"
          :code="RADIO_GROUP_HORIZONTAL_CODE"
          header="Template"
          :usage-label="RADIO_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.RadioGroup
              :options="genders"
              layout="horizontal"
              test-id="radio-group-horizontal"
            />
          </template>
        </Card>

        <!-- Sizes -->
        <Card
          :title="RADIO_GROUP_DOC.sizes.title"
          :description="RADIO_GROUP_DOC.sizes.description"
          :how-to-use="RADIO_GROUP_DOC.sizes.howToUse"
          :code="RADIO_GROUP_SIZES_CODE"
          header="Template"
          :usage-label="RADIO_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="space-y-5">
              <Field.RadioGroup :options="genders" size="small" test-id="radio-group-small" />
              <Field.RadioGroup :options="genders" size="default" test-id="radio-group-default" />
              <Field.RadioGroup :options="genders" size="large" test-id="radio-group-large" />
            </div>
          </template>
        </Card>

        <!-- Disabled -->
        <Card
          :title="RADIO_GROUP_DOC.disabled.title"
          :description="RADIO_GROUP_DOC.disabled.description"
          :how-to-use="RADIO_GROUP_DOC.disabled.howToUse"
          header="Template"
          :code="RADIO_GROUP_DISABLED_CODE"
          :usage-label="RADIO_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.RadioGroup :options="genders" disabled test-id="radio-group-disabled" />
          </template>
        </Card>

        <!-- Default Value -->
        <Card
          :title="RADIO_GROUP_DOC.defaultValue.title"
          :description="RADIO_GROUP_DOC.defaultValue.description"
          :how-to-use="RADIO_GROUP_DOC.defaultValue.howToUse"
          :code="RADIO_GROUP_DEFAULT_VALUE_CODE"
          header="Template"
          :usage-label="RADIO_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.RadioGroup
              default-value="male"
              :options="genders"
              test-id="radio-group-default-value"
            />
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="RADIO_GROUP_DOC.vModel.title"
          :description="RADIO_GROUP_DOC.vModel.description"
          :how-to-use="RADIO_GROUP_DOC.vModel.howToUse"
          :code-arr="[
            { code: RADIO_GROUP_V_MODEL_SCRIPT, header: 'script' },
            { code: RADIO_GROUP_V_MODEL_TEMPLATE, header: 'template' },
          ]"
          :usage-label="RADIO_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="space-y-4">
              <Field.RadioGroup
                v-model="selectedGender"
                :options="genders"
                layout="horizontal"
                test-id="radio-group-v-model"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ RADIO_GROUP_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ selectedGender || RADIO_GROUP_DOC.vModel.emptyValue }}
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
