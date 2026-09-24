export const RADIO_IMPORT_CODE = `import { Field } from '@/components';`;

export const RADIO_BASIC_CODE = `<Field.Radio
  label="Standalone Radio (Option A)"
  test-id="direct-radio-standalone"
  value="a"
/>`;

export const RADIO_VALUE_CODE = `<Field.Radio
  label="Option A"
  value="a"
  test-id="radio-option-a"
/>

<Field.Radio
  label="Option B"
  value="b"
  test-id="radio-option-b"
/>

<Field.Radio
  label="Option C"
  value="c"
  test-id="radio-option-c"
/>`;

export const RADIO_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';

const radioValue = ref('a');
</script>

<template>
  <Field.Radio
    v-model="radioValue"
    label="Option A"
    value="a"
    test-id="radio-option-a"
  />

  <Field.Radio
    v-model="radioValue"
    label="Option B"
    value="b"
    test-id="radio-option-b"
  />

  <Field.Radio
    v-model="radioValue"
    label="Option C"
    value="c"
    test-id="radio-option-c"
  />
</template>`;

export const RADIO_DISABLED_CODE = `<Field.Radio
  label="Available Option"
  value="available"
  test-id="radio-available"
/>

<Field.Radio
  disabled
  label="Disabled Option"
  value="disabled"
  test-id="radio-disabled"
/>`;

export const RADIO_DOC = {
  title: 'Radio',

  description: 'A radio input that allows users to select a single option from a set of choices.',

  import: {
    title: 'Import',
    description: 'Import the Radio field from the shared component library.',
  },

  examples: {
    title: 'Examples',
    description: 'Explore the available radio values, value binding, and disabled state.',
  },

  howToUseTitle: 'How to use',

  basic: {
    title: 'Basic',
    description: 'Use the Radio field to display a single radio option.',
    howToUse: 'Provide a label and a unique value for the radio option.',
    label: 'Standalone Radio (Option A)',
    value: 'a',
    testId: 'direct-radio-standalone',
  },

  value: {
    title: 'Values',
    description: 'Use the value prop to identify each radio option.',
    howToUse:
      'Give each radio option a unique value. When multiple radios share the same v-model, the selected value identifies the active option.',
    optionATestId: 'radio-option-a',
    optionBTestId: 'radio-option-b',
    optionCTestId: 'radio-option-c',
  },

  vModel: {
    title: 'v-model',
    description: 'Use v-model to control which radio option is selected.',
    howToUse:
      'Bind the same v-model to multiple radio fields and give each option a different value.',
    currentValueLabel: 'Selected value:',
    optionATestId: 'radio-v-model-a',
    optionBTestId: 'radio-v-model-b',
    optionCTestId: 'radio-v-model-c',
  },

  disabled: {
    title: 'Disabled',
    description: 'Disable a radio option when it should not be selectable.',
    howToUse: 'Set disabled to true to prevent the user from selecting the radio option.',
    availableTestId: 'radio-available',
    disabledTestId: 'radio-disabled',
  },
};
