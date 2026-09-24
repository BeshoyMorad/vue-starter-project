export const SWITCH_IMPORT_CODE = `import { Field } from '@/components';
`;

export const SWITCH_BASIC_CODE = `<Field.Switch
  label="Default Toggle Switch"
  test-id="direct-switch-default"
/>`;

export const SWITCH_SIZES_CODE = `<Field.Switch
  size="small"
  label="Small Switch"
  test-id="direct-switch-small"
/>

<Field.Switch
  label="Default Switch"
  test-id="direct-switch-default"
/>

<Field.Switch
  size="large"
  label="Large Switch"
  test-id="direct-switch-large"
/>`;

export const SWITCH_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';

const switchValue = ref(false);
</script>

<template>
  <Field.Switch
    v-model="switchValue"
    label="Enable notifications"
    test-id="direct-switch-v-model"
  />

  <p>Current value: {{ switchValue }}</p>
</template>`;

export const SWITCH_DOC = {
  title: 'Switch',
  description:
    'A toggle control that allows users to switch between two states. Use it for simple boolean settings and preferences.',

  howToUseTitle: 'How to use',

  import: {
    title: 'Import',
    description: 'Import the Switch field from the shared Field components.',
  },

  examples: {
    title: 'Examples',
    description: 'Explore the basic ways to use the Switch field component.',
  },

  basic: {
    title: 'Basic',
    description: 'Use the Switch with a label for a simple toggle control.',
    label: 'Default Toggle Switch',
    testId: 'direct-switch-default',
    howToUse:
      'Use Field.Switch directly when you need a simple boolean toggle without manually managing its state.',
  },

  sizes: {
    title: 'Sizes',
    description: 'The Switch supports small, default, and large sizes.',
    smallLabel: 'Small Toggle Switch',
    defaultLabel: 'Default Toggle Switch',
    largeLabel: 'Large Toggle Switch',
    smallTestId: 'direct-switch-small',
    defaultTestId: 'direct-switch-default-size',
    largeTestId: 'direct-switch-large',
    howToUse:
      'Use the size prop to control the visual size of the Switch. The available sizes are small, default, and large.',
  },

  vModel: {
    title: 'v-model',
    description: 'Use v-model when you need to read and control the Switch state.',
    label: 'Enable notifications',
    testId: 'direct-switch-v-model',
    currentValueLabel: 'Current value:',
    enabledValue: 'Enabled',
    disabledValue: 'Disabled',
    howToUse:
      'Bind a boolean ref with v-model to keep the Switch state synchronized with your component state.',
  },
};
