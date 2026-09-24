export const NUMBER_IMPORT_CODE = `import { Field } from '@/components';`;

export const NUMBER_BASIC_CODE = `<Field.Number
  placeholder="Enter age..."
  test-id="number-basic"
/>`;

export const NUMBER_ICON_CODE = `<Field.Number
  placeholder="Enter age..."
  icon="hugeicons--user"
  icon-position="left"
  test-id="number-icon"
/>`;

export const NUMBER_NO_STEPPERS_CODE = `<Field.Number
  placeholder="Steppers hidden..."
  hide-steppers
  :step="0.001"
  test-id="number-no-steppers"
/>`;

export const NUMBER_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';
import { Field } from '@/components';

const numberValue = ref<number | undefined>(undefined);
</script>

<template>
  <Field.Number
    v-model="numberValue"
    placeholder="Enter age..."
    test-id="number-v-model"
  />
</template>`;

export const NUMBER_STEP_CODE = `<Field.Number
  placeholder="Enter decimal value..."
  :step="0.001"
  test-id="number-step"
/>`;

export const NUMBER_DOC = {
  title: 'Number Input',

  description:
    'A number input field for collecting numeric values with optional steppers and custom increments.',

  import: {
    title: 'Import',
    description: 'Import the Number field from the shared components library.',
    codeHeader: 'Import',
  },

  examples: {
    title: 'Examples',
    description: 'Common usage examples of the Number field.',
  },

  howToUseTitle: 'How to use',

  usageHeader: 'Usage',

  basic: {
    title: 'Basic',
    description: 'Use the Number field to collect a numeric value from the user.',
    placeholder: 'Enter age...',
    testId: 'number-basic',
    howToUse: 'Render the Number field with a placeholder to provide a basic numeric input.',
  },

  icon: {
    title: 'With Icon',
    description: 'Add an icon to visually indicate the type or purpose of the numeric input.',
    placeholder: 'Enter age...',
    icon: 'hugeicons--user',
    iconPosition: 'left',
    testId: 'number-icon',
    howToUse: 'Use the icon and icon-position props to display an icon inside the Number field.',
  },

  noSteppers: {
    title: 'Hide Steppers',
    description: 'Hide the increment and decrement controls when they are not needed.',
    placeholder: 'Steppers hidden...',
    step: 0.001,
    testId: 'number-no-steppers',
    howToUse:
      'Set hide-steppers to remove the stepper controls while keeping the numeric input behavior.',
  },

  vModel: {
    title: 'v-model',
    description: 'Bind the Number field to a reactive value using v-model.',
    placeholder: 'Enter age...',
    testId: 'number-v-model',
    currentValueLabel: 'Current value:',
    emptyValue: 'Empty',
    howToUse:
      'Use v-model to keep the Number field value synchronized with a reactive numeric variable.',
  },

  step: {
    title: 'Custom Step',
    description: 'Control the amount by which the numeric value changes using the step prop.',
    placeholder: 'Enter decimal value...',
    step: 0.001,
    testId: 'number-step',
    howToUse:
      'Use the step prop to define the increment and decrement amount for the Number field.',
  },
};
