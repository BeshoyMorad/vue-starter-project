export const PASSWORD_IMPORT_CODE = `import { Field } from '@/components';`;

export const PASSWORD_BASIC_CODE = `<Field.Password
  placeholder="Enter password..."
  test-id="password-basic"
/>`;

export const PASSWORD_LOADING_CODE = `<Field.Password
  placeholder="Loading..."
  loading
  test-id="password-loading"
/>`;

export const PASSWORD_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';
import { Field } from '@/components';

const passwordValue = ref('');
</script>

<template>
  <Field.Password
    v-model="passwordValue"
    placeholder="Enter password..."
    test-id="password-v-model"
  />
</template>`;

export const PASSWORD_DOC = {
  title: 'Password Input',

  description: 'A password input field for securely collecting password values.',

  import: {
    title: 'Import',
    description: 'Import the Password field from the shared components library.',
  },

  examples: {
    title: 'Examples',
    description: 'Common usage examples of the Password field.',
  },

  howToUseTitle: 'How to use',

  basic: {
    title: 'Basic',
    description: 'Use the Password field to collect a password from the user.',
    placeholder: 'Enter password...',
    testId: 'password-basic',
    howToUse: 'Render the Password field with a placeholder to provide a basic password input.',
  },

  loading: {
    title: 'Loading',
    description: 'Display the Password field in a loading state while data is being processed.',
    placeholder: 'Loading...',
    testId: 'password-loading',
    howToUse: 'Set the loading prop to display the loading state of the Password field.',
  },

  vModel: {
    title: 'v-model',
    description: 'Bind the Password field to a reactive value using v-model.',
    placeholder: 'Enter password...',
    testId: 'password-v-model',
    currentValueLabel: 'Current value:',
    emptyValue: 'Empty',
    howToUse: 'Use v-model to keep the Password field value synchronized with a reactive variable.',
  },
};
