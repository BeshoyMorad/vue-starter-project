export const SELECT_IMPORT_CODE = `import { Field } from '@/components';`;

export const SELECT_BASIC_CODE_TEMPLATE = {
  code: `<Field.Select
  :options="countries"
  option-label="label"
  option-value="value"
  placeholder="Select a country..."
  test-id="basic-select"
/>`,
  header: `<Template/>`,
};
export const SELECT_BASIC_CODE_SCRIPT = {
  code: `  const countries = [
    { label: 'Egypt', value: 'eg' },
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
  ];`,
  header: `<script/>`,
};

export const SELECT_SEARCHABLE_CODE = `<Field.Select
  :options="countries"
  option-label="label"
  option-value="value"
  placeholder="Select a country..."
  search-placeholder="Search countries..."
  test-id="searchable-select"
  searchable
  show-clear
/>`;

export const SELECT_MULTIPLE_CODE = `<Field.Select
  v-model="selectedCountries"
  multiple
  :options="countries"
  option-label="label"
  option-value="value"
  placeholder="Select countries..."
  :max-selected-labels="2"
  test-id="multiple-select"
  show-clear
/>`;

export const SELECT_CUSTOM_VALUE_CODE = `<Field.Select
  v-model="selectedCountry"
  :options="countries"
  option-label="label"
  option-value="value"
  placeholder="Select a country..."
  test-id="custom-value-select"
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
</Field.Select>`;

export const SELECT_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';

const selectedValue = ref<string>();
</script>

<template>
  <Field.Select
    v-model="selectedValue"
    :options="countries"
    option-label="label"
    option-value="value"
    placeholder="Select a country..."
    test-id="select-v-model"
  />
</template>`;

export const SELECT_FORM_CODE = `<Field.Select
  v-model="selectedCountry"
  name="country"
  label="Country"
  description="Select your country"
  :options="countries"
  option-label="label"
  option-value="value"
  placeholder="Select a country..."
  test-id="select-form"
/>`;

export const SELECT_DOC = {
  title: 'Select',
  description:
    'A flexible select component for choosing one or multiple options. It supports searching, clearing, custom value rendering, v-model binding, and form validation.',

  import: {
    title: 'Import',
    description: 'Import the Select component from the shared Field components.',
  },

  examples: {
    title: 'Examples',
    description: 'Explore the different ways to use the Select component.',
  },

  basic: {
    title: 'Basic',
    description:
      'Use Select with an options array and specify which properties represent the label and value.',
    howToUse:
      'Pass your options through the options prop, then use option-label and option-value to define the displayed label and selected value.',
    placeholder: 'Select a country...',
    testId: 'select-basic',
  },

  searchable: {
    title: 'Searchable & Clearable',
    description:
      'Enable searching to allow users to quickly find an option and show-clear to allow them to remove the current selection.',
    howToUse: 'Set searchable to enable the search input and show-clear to display a clear action.',
    placeholder: 'Select a country...',
    searchPlaceholder: 'Search countries...',
  },

  multiple: {
    title: 'Multiple Selection',
    description: 'Enable multiple selection when users need to choose more than one option.',
    howToUse:
      'Set multiple to true and bind the selected values with v-model. Use max-selected-labels to control how many selected labels are displayed.',
    placeholder: 'Select countries...',
  },

  customValue: {
    title: 'Custom Value',
    description: 'Customize how the selected option is displayed using the value slot.',
    howToUse:
      'Use the #value slot to customize the selected value. The slot exposes the selected option and its label.',
    placeholder: 'Select a country...',
  },

  vModel: {
    title: 'v-model',
    description: 'Use v-model to control and react to the currently selected value.',
    howToUse:
      'Bind v-model to a ref. For single selection the value is a single value, while multiple selection returns an array of values.',
    placeholder: 'Select a country...',
    currentValueLabel: 'Current value:',
    emptyValue: 'No selection',
  },

  form: {
    title: 'Form Integration',
    description:
      'Select can be integrated with the form validation system by providing a name prop.',
    howToUse:
      'Pass name to enable the form field wrapper. You can also provide label and description for the field.',
  },

  howToUseTitle: 'How to use',
};
