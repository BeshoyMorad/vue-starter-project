```vue
<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    SELECT_IMPORT_CODE,
    SELECT_BASIC_CODE_TEMPLATE,
    SELECT_SEARCHABLE_CODE,
    SELECT_MULTIPLE_CODE,
    SELECT_CUSTOM_VALUE_CODE,
    SELECT_V_MODEL_CODE,
    SELECT_DOC,
  } from '../constants/constants';

  const selectedCountry = ref<string>();
  const selectedCountries = ref<string[]>([]);
  const selectedValue = ref<string>();

  const countries = [
    { label: 'Egypt', value: 'eg' },
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
  ];
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ SELECT_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ SELECT_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="SELECT_DOC.import.title"
      :description="SELECT_DOC.import.description"
      :code="SELECT_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ SELECT_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ SELECT_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="SELECT_DOC.basic.title"
          :description="SELECT_DOC.basic.description"
          :how-to-use="SELECT_DOC.basic.howToUse"
          :code-arr="[
            { code: SELECT_BASIC_CODE_TEMPLATE.code, header: SELECT_BASIC_CODE_TEMPLATE.header },
            { code: SELECT_BASIC_CODE_TEMPLATE.code, header: SELECT_BASIC_CODE_TEMPLATE.header },
          ]"
          :usage-label="SELECT_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.Select
              :options="countries"
              option-label="label"
              option-value="value"
              :placeholder="SELECT_DOC.basic.placeholder"
              :test-id="SELECT_DOC.basic.testId"
            />
          </template>
        </Card>

        <!-- Searchable -->
        <Card
          :title="SELECT_DOC.searchable.title"
          :description="SELECT_DOC.searchable.description"
          :how-to-use="SELECT_DOC.searchable.howToUse"
          :code="SELECT_SEARCHABLE_CODE"
          :usage-label="SELECT_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.Select
              :options="countries"
              option-label="label"
              option-value="value"
              :placeholder="SELECT_DOC.searchable.placeholder"
              :search-placeholder="SELECT_DOC.searchable.searchPlaceholder"
              test-id="select-searchable"
              searchable
              show-clear
            />
          </template>
        </Card>

        <!-- Multiple -->
        <Card
          :title="SELECT_DOC.multiple.title"
          :description="SELECT_DOC.multiple.description"
          :how-to-use="SELECT_DOC.multiple.howToUse"
          :code="SELECT_MULTIPLE_CODE"
          :usage-label="SELECT_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.Select
              v-model="selectedCountries"
              multiple
              :options="countries"
              option-label="label"
              option-value="value"
              :placeholder="SELECT_DOC.multiple.placeholder"
              :max-selected-labels="2"
              test-id="select-multiple"
              show-clear
            />
          </template>
        </Card>

        <!-- Custom Value -->
        <Card
          :title="SELECT_DOC.customValue.title"
          :description="SELECT_DOC.customValue.description"
          :how-to-use="SELECT_DOC.customValue.howToUse"
          :code="SELECT_CUSTOM_VALUE_CODE"
          :usage-label="SELECT_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.Select
              v-model="selectedCountry"
              :options="countries"
              option-label="label"
              option-value="value"
              :placeholder="SELECT_DOC.customValue.placeholder"
              test-id="select-custom-value"
              show-clear
              searchable
            >
              <template #value="{ label, selectedOption }">
                <span class="flex items-center gap-2">
                  <span v-if="selectedOption?.value === 'eg'">🇪🇬</span>
                  <span v-else-if="selectedOption?.value === 'us'">🇺🇸</span>
                  <span v-else-if="selectedOption?.value === 'uk'">🇬🇧</span>
                  <span v-else-if="selectedOption?.value === 'ca'">🇨🇦</span>

                  <span>{{ label }}</span>
                </span>
              </template>
            </Field.Select>
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="SELECT_DOC.vModel.title"
          :description="SELECT_DOC.vModel.description"
          :how-to-use="SELECT_DOC.vModel.howToUse"
          :code="SELECT_V_MODEL_CODE"
          :usage-label="SELECT_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Field.Select
                v-model="selectedValue"
                :options="countries"
                option-label="label"
                option-value="value"
                :placeholder="SELECT_DOC.vModel.placeholder"
                test-id="select-v-model"
                show-clear
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ SELECT_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ selectedValue || SELECT_DOC.vModel.emptyValue }}
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
```
