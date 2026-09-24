export const CHECKBOX_IMPORT_CODE = `import { Field } from '@/components';`;

export const CHECKBOX_BASIC_CODE = `<Field.Checkbox
  label="Default Checkbox"
  test-id="direct-checkbox-default"
/>`;

export const CHECKBOX_SIZES_CODE = `<Field.Checkbox
  size="small"
  label="Small Checkbox"
  test-id="direct-checkbox-small"
/>

<Field.Checkbox
  label="Default Checkbox"
  test-id="direct-checkbox-default"
/>

<Field.Checkbox
  size="large"
  label="Large Checkbox"
  test-id="direct-checkbox-large"
/>`;

export const CHECKBOX_SHAPES_CODE = `<Field.Checkbox
  shape="square"
  label="Square Checkbox"
  test-id="direct-checkbox-square"
/>

<Field.Checkbox
  shape="circle"
  label="Circle Checkbox"
  test-id="direct-checkbox-circle"
/>`;

export const CHECKBOX_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';

const checkboxValue = ref(false);
</script>

<template>
  <Field.Checkbox
    v-model="checkboxValue"
    label="Accept terms"
    test-id="direct-checkbox-v-model"
  />

  <p>Current value: {{ checkboxValue }}</p>
</template>`;

export const CHECKBOX_DOC = {
  title: 'Checkbox',
  description:
    'A control that allows users to select or deselect an option. Use it for boolean choices and selections.',
  howToUseTitle: 'How to use',

  import: {
    title: 'Import',
    description: 'Import the Checkbox field from the shared Field components.',
  },

  examples: {
    title: 'Examples',
    description: 'Explore the basic ways to use the Checkbox field component.',
  },

  basic: {
    title: 'Basic',
    description: 'Use the Checkbox with a label for a simple selection control.',
    label: 'Default Checkbox',
    testId: 'direct-checkbox-default',
    howToUse:
      'Use Field.Checkbox directly when you need a simple boolean checkbox without manually managing its state.',
  },

  sizes: {
    title: 'Sizes',
    description: 'The Checkbox supports small, default, and large sizes.',
    smallLabel: 'Small Checkbox',
    defaultLabel: 'Default Checkbox',
    largeLabel: 'Large Checkbox',
    smallTestId: 'direct-checkbox-small',
    defaultTestId: 'direct-checkbox-default-size',
    largeTestId: 'direct-checkbox-large',
    howToUse:
      'Use the size prop to control the visual size of the Checkbox. The available sizes are small, default, and large.',
  },

  shapes: {
    title: 'Shapes',
    description: 'Choose between square and circle shapes for the Checkbox.',
    squareLabel: 'Square Checkbox',
    circleLabel: 'Circle Checkbox',
    squareTestId: 'direct-checkbox-square',
    circleTestId: 'direct-checkbox-circle',
    howToUse:
      'Use the shape prop to control the appearance of the Checkbox. The available shapes are square and circle.',
  },

  vModel: {
    title: 'v-model',
    description: 'Use v-model when you need to read and control the Checkbox state.',
    label: 'Accept terms',
    testId: 'direct-checkbox-v-model',
    currentValueLabel: 'Current value:',
    checkedValue: 'Checked',
    uncheckedValue: 'Unchecked',
    howToUse:
      'Bind a boolean ref with v-model to keep the Checkbox state synchronized with your component state.',
  },
};
