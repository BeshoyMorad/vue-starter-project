export const PHONE_IMPORT_CODE = `import { Field } from '@/components';`;

export const PHONE_BASIC_CODE = `<Field.Phone
  placeholder="12 345 6789"
  test-id="direct-phone-input"
/>`;

export const PHONE_DEFAULT_COUNTRY_CODE = `<Field.Phone
  default-country="EG"
  placeholder="10 1234 5678"
  test-id="direct-phone-input-eg"
/>`;

export const PHONE_V_MODEL_CODE_SCRIPT = `<script setup lang="ts">
import { ref } from 'vue';

const phoneValue = ref('');
</script>`;
export const PHONE_V_MODEL_CODE_TEMPLATE = `<template>
  <Field.Phone
    v-model="phoneValue"
    default-country="EG"
    placeholder="10 1234 5678"
    test-id="phone-v-model"
    show-clear
  />

  <div>
    Current value: {{ phoneValue }}
  </div>
</template>`;

export const PHONE_DOC = {
  title: 'Phone Input',
  description:
    'A phone number input component with country selection, formatting, validation support, and v-model integration.',

  howToUseTitle: 'How to use',

  import: {
    title: 'Import',
    description: 'Import the Phone field from the components library.',
  },

  examples: {
    title: 'Examples',
    description: 'Different ways to use the Phone field in your application.',
  },

  basic: {
    title: 'Basic',
    description: 'A basic phone input with the default country configuration.',
    howToUse:
      'Use Field.Phone with a placeholder and test-id. The component provides country selection and phone number formatting.',
  },

  defaultCountry: {
    title: 'Default Country',
    description: 'Set the initial country using the default-country prop.',
    howToUse:
      'Pass an ISO 3166-1 alpha-2 country code to default-country. For example, EG sets Egypt as the default country.',
  },

  vModel: {
    title: 'v-model',
    description: 'Bind the phone number value using v-model.',
    howToUse: 'Use v-model to keep the phone number synchronized with your component state.',
    currentValueLabel: 'Current value:',
    emptyValue: 'No phone number',
  },
};
