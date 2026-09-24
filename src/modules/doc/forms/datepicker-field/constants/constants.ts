export const DATE_PICKER_IMPORT_CODE = `import { Field } from '@/components';`;

export const DATE_PICKER_BASIC_CODE = `<Field.DatePicker
  placeholder="Pick a birth date..."
  test-id="direct-date-picker"
/>`;

export const DATE_PICKER_DATE_FORMAT_CODE = `<Field.DatePicker
  placeholder="Pick a date..."
  test-id="date-picker-default"
/>

<Field.DatePicker
  date-format="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
  test-id="date-picker-custom"
/>`;

export const DATE_PICKER_MIN_MAX_CODE = `<Field.DatePicker
  :min-date="new Date()"
  placeholder="Select a future date..."
  test-id="date-picker-min-date"
/>

<Field.DatePicker
  :max-date="new Date()"
  placeholder="Select a past date..."
  test-id="date-picker-max-date"
/>`;

export const DATE_PICKER_DISABLED_CODE = `<Field.DatePicker
  disabled
  placeholder="Date picker disabled"
  test-id="date-picker-disabled"
/>`;

export const DATE_PICKER_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';

const birthDate = ref<Date | null>(null);
</script>

<template>
  <Field.DatePicker
    v-model="birthDate"
    placeholder="Pick a birth date..."
    test-id="date-picker-v-model"
  />
</template>`;

export const DATE_PICKER_FORM_CODE = `<Field.DatePicker
  name="birthDate"
  label="Birth Date"
  description="Select your date of birth."
  placeholder="Pick a birth date..."
  test-id="date-picker-form"
/>`;

export const DATE_PICKER_DOC = {
  title: 'Date Picker',

  description: 'A date input that allows users to select a date from an interactive calendar.',

  import: {
    title: 'Import',
    description: 'Import the DatePicker field from the shared component library.',
  },

  examples: {
    title: 'Examples',
    description:
      'Explore the available date formatting, date constraints, disabled state, value binding, and form integration.',
  },

  howToUseTitle: 'How to use',

  basic: {
    title: 'Basic',
    description: 'Use the DatePicker field to allow users to select a date.',
    howToUse: 'Provide an optional placeholder to guide the user before a date is selected.',
    placeholder: 'Pick a birth date...',
    testId: 'direct-date-picker',
  },

  dateFormat: {
    title: 'Date Format',
    description: 'Customize how the selected date is displayed using the dateFormat prop.',
    howToUse: 'Pass a date format string to dateFormat to control the displayed date format.',
    defaultLabel: 'Default format',
    customLabel: 'Custom format',
    defaultPlaceholder: 'Pick a date...',
    customPlaceholder: 'DD/MM/YYYY',
    defaultTestId: 'date-picker-default-format',
    customTestId: 'date-picker-custom-format',
  },

  minMaxDate: {
    title: 'Minimum & Maximum Date',
    description: 'Restrict the dates that users can select by providing minimum and maximum dates.',
    howToUse:
      'Use minDate to prevent dates before a specific date from being selected, or maxDate to prevent dates after a specific date.',
    minLabel: 'Minimum date',
    maxLabel: 'Maximum date',
    minPlaceholder: 'Select a future date...',
    maxPlaceholder: 'Select a past date...',
    minTestId: 'date-picker-min-date',
    maxTestId: 'date-picker-max-date',
  },

  disabled: {
    title: 'Disabled',
    description: 'Disable the DatePicker when the date should not be editable.',
    howToUse:
      'Set disabled to true to prevent the user from opening or interacting with the date picker.',
    placeholder: 'Date picker disabled',
    testId: 'date-picker-disabled',
  },

  vModel: {
    title: 'v-model',
    description: 'Use v-model to control the selected date and react to changes.',
    howToUse:
      'Bind a ref containing a Date or null to v-model. The value is updated whenever the selected date changes.',
    placeholder: 'Pick a birth date...',
    currentValueLabel: 'Selected date:',
    emptyValue: 'No date selected',
    testId: 'date-picker-v-model',
  },
};
