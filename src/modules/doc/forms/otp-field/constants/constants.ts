export const OTP_IMPORT_CODE = `import { Field } from '@/components';`;

export const OTP_BASIC_CODE = `<Field.Otp
  :length="6"
  test-id="direct-otp"
/>`;

export const OTP_LENGTH_CODE = `<Field.Otp
  :length="4"
  test-id="otp-four"
/>

<Field.Otp
  :length="6"
  test-id="otp-six"
/>

<Field.Otp
  :length="8"
  test-id="otp-eight"
/>`;

export const OTP_INTEGER_ONLY_CODE = `<Field.Otp
  :length="6"
  integer-only
  test-id="otp-integer-only"
/>`;

export const OTP_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';

const otpValue = ref('');
</script>

<template>
  <Field.Otp
    v-model="otpValue"
    :length="6"
    integer-only
    test-id="otp-v-model"
  />

  
</template>`;

export const OTP_DISABLED_CODE = `<Field.Otp
  :length="6"
  disabled
  test-id="otp-disabled"
/>`;

export const OTP_FORM_CODE = `<Field.Otp
  name="otp"
  label="Verification Code"
  description="Enter the 6-digit verification code."
  :length="6"
  integer-only
  test-id="otp-form"
/>`;

export const OTP_DOC = {
  title: 'OTP',
  description:
    'A one-time password input designed for entering verification codes as a sequence of individual characters.',

  import: {
    title: 'Import',
    description: 'Import the Otp field from the shared component library.',
  },

  examples: {
    title: 'Examples',
    description:
      'Explore the available OTP length, input restrictions, states, value binding, and form integration.',
  },

  howToUseTitle: 'How to use',

  basic: {
    title: 'Basic',
    description: 'Use the Otp field to collect a one-time password or verification code.',
    howToUse: 'Set the length prop to define the number of input slots displayed by the component.',
    length: 6,
    testId: 'direct-otp',
  },

  length: {
    title: 'Length',
    description: 'Control the number of OTP input slots using the length prop.',
    howToUse: 'Pass the desired number of characters to the length prop. The default length is 6.',
    fourLabel: '4 characters',
    sixLabel: '6 characters',
    eightLabel: '8 characters',
    fourTestId: 'otp-length-four',
    sixTestId: 'otp-length-six',
    eightTestId: 'otp-length-eight',
  },

  integerOnly: {
    title: 'Integer Only',
    description:
      'Restrict the OTP input to integer characters when the verification code contains numbers only.',
    howToUse: 'Set integer-only to true to allow only numeric characters in the OTP input.',
    testId: 'otp-integer-only',
  },

  vModel: {
    title: 'v-model',
    description:
      'Use v-model to control the OTP value and react to changes as the user enters the code.',
    howToUse:
      'Bind a string ref with v-model. The value contains the characters entered across all OTP slots.',
    currentValueLabel: 'Current value:',
    emptyValue: 'Empty',
    testId: 'otp-v-model',
  },

  disabled: {
    title: 'Disabled',
    description: 'Disable the OTP input when the verification code should not be editable.',
    howToUse: 'Set disabled to true to prevent the user from interacting with the OTP input.',
    testId: 'otp-disabled',
  },
};
