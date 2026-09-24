export const RADIO_GROUP_IMPORT_CODE = `import { Field } from '@/components';`;

export const RADIO_GROUP_BASIC_CODE = `<Field.RadioGroup
  :options="genders"
  test-id="direct-radio-group"
/>`;

export const RADIO_GROUP_HORIZONTAL_CODE = `<Field.RadioGroup
  :options="genders"
  layout="horizontal"
  test-id="radio-group-horizontal"
/>`;

export const RADIO_GROUP_SIZES_CODE = `<Field.RadioGroup
  :options="genders"
  size="small"
  test-id="radio-group-small"
/>

<Field.RadioGroup
  :options="genders"
  size="default"
  test-id="radio-group-default"
/>

<Field.RadioGroup
  :options="genders"
  size="large"
  test-id="radio-group-large"
/>`;

export const RADIO_GROUP_DISABLED_CODE = `<Field.RadioGroup
  :options="genders"
  disabled
  test-id="radio-group-disabled"
/>`;

export const RADIO_GROUP_DEFAULT_VALUE_CODE = `<Field.RadioGroup
  default-value="male"
  :options="genders"
  test-id="radio-group-default-value"
/>`;

export const RADIO_GROUP_V_MODEL_TEMPLATE = `<template>
  <Field.RadioGroup
    v-model="selectedGender"
    :options="genders"
    layout="horizontal"
    test-id="radio-group-v-model"
  />
</template>`;

export const RADIO_GROUP_V_MODEL_SCRIPT = `<script setup lang="ts">
import { ref } from 'vue';
const selectedGender = ref('');
</script>`;

export const RADIO_GROUP_DOC = {
  title: 'Radio Group',

  description:
    'A group of radio buttons that allows users to select one option from a list of choices.',

  howToUseTitle: 'How to use',

  import: {
    title: 'Import',
    description: 'Import the RadioGroup field from the components library.',
  },

  examples: {
    title: 'Examples',
    description: 'Different ways to configure and use the RadioGroup field.',
  },

  basic: {
    title: 'Basic',
    description: 'A basic radio group using an array of options.',
    howToUse:
      'Pass an array of options to the options prop. Each option contains a label and value.',
  },

  horizontal: {
    title: 'Horizontal',
    description: 'Display radio options horizontally instead of vertically.',
    howToUse: 'Set the layout prop to horizontal to display the options in a row.',
  },

  sizes: {
    title: 'Sizes',
    description: 'Radio groups are available in small, default, and large sizes.',
    howToUse: 'Use the size prop to control the size of the radio buttons.',
  },

  disabled: {
    title: 'Disabled',
    description: 'Disable the entire radio group to prevent user interaction.',
    howToUse: 'Set the disabled prop to true to disable all radio options.',
  },

  defaultValue: {
    title: 'Default Value',
    description: 'Set an initial selected option without using v-model.',
    howToUse: 'Use default-value with the value of the option that should be selected initially.',
  },

  vModel: {
    title: 'v-model',
    description: 'Bind the selected radio option to a reactive value.',
    howToUse: 'Use v-model to keep the selected option synchronized with your component state.',
    currentValueLabel: 'Current value:',
    emptyValue: 'No option selected',
  },
};
