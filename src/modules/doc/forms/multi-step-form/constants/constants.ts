export const MULTI_STEP_FORM_IMPORT_CODE = `import {
  MultiStepForm,
  Field,
} from '@/components';

import type { StepDefinition } from '@/components';`;

export const MULTI_STEP_FORM_BASIC_CODE = {
  script: `<script setup lang="ts">
import { ref } from 'vue';
import { MultiStepForm, Field } from '@/components';
import type { StepDefinition } from '@/components';
import type { GenericObject } from 'vee-validate';
import * as yup from 'yup';

const steps: StepDefinition[] = [
  {
    title: 'Account details',
    description: 'Setup your account',
    fields: ['username', 'password'],
    schema: yup.object({
      username: yup
        .string()
        .required('Username is required'),

      password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    }),
  },

  {
    title: 'Personal information',
    description: 'Tell us about yourself',
    fields: ['fullName', 'age', 'country'],
    schema: yup.object({
      fullName: yup
        .string()
        .required('Full name is required'),

      age: yup
        .number()
        .required('Age is required')
        .min(18, 'You must be at least 18'),

      country: yup
        .string()
        .required('Country is required'),
    }),
  },
];

const isSubmitting = ref(false);

const onSubmit = async (values: GenericObject) => {
  isSubmitting.value = true;

  try {
    await saveForm(values);
  } finally {
    isSubmitting.value = false;
  }
};
</script>`,
  template: `<template>
  <MultiStepForm
    :steps="steps"
    :loading="isSubmitting"
    @submit="onSubmit"
  >
    <template #step-0>
      <div class="space-y-4">
        <Field.Text
          name="username"
          label="Username"
        />

        <Field.Password
          name="password"
          label="Password"
        />
      </div>
    </template>

    <template #step-1>
      <div class="space-y-4">
        <Field.Text
          name="fullName"
          label="Full Name"
        />

        <Field.Number
          name="age"
          label="Age"
        />

        <Field.Select
          name="country"
          label="Country"
          :options="countries"
        />
      </div>
    </template>
  </MultiStepForm>
</template>`,
};

export const MULTI_STEP_FORM_VALIDATION_CODE = `const steps: StepDefinition[] = [
  {
    title: 'Account details',
    fields: ['username', 'password'],
    schema: yup.object({
      username: yup
        .string()
        .required('Username is required'),

      password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    }),
  },
  {
    title: 'Personal information',
    fields: ['fullName', 'age'],
    schema: yup.object({
      fullName: yup
        .string()
        .required('Full name is required'),

      age: yup
        .number()
        .required('Age is required'),
    }),
  },
];`;

export const MULTI_STEP_FORM_PERSIST_CODE = `<MultiStepForm
  :steps="steps"
  :persist="{
    key: 'user-form',
    excludeFields: ['password'],
  }"
  @submit="onSubmit"
/>`;

export const MULTI_STEP_FORM_DOC = {
  title: 'Multi-Step Form',
  description:
    'A reusable form wizard for building multi-step forms with declarative step definitions, per-step validation, loading states, and optional form persistence.',

  examples: {
    title: 'Examples',
    description:
      'Use MultiStepForm with reusable Field components and define validation rules for each step.',
  },

  basic: {
    title: 'Basic Multi-Step Form',
    description:
      'Create a multi-step form by defining the fields and validation schema for each step, then provide the step content using named slots.',

    howToUse:
      'Define a StepDefinition for each step, provide its fields and schema, then use #step-0, #step-1, and so on to render the corresponding form fields.',

    successTitle: 'Form submitted successfully',
    successDescription: 'The following values were collected after completing all steps.',
  },

  validation: {
    title: 'Step Definitions and Validation',
    description:
      'Each step can define its own fields and validation schema. The current step must pass validation before the user can continue.',

    howToUse:
      'Add the field names to the fields array and define the validation rules inside the step schema.',
  },

  persist: {
    title: 'Persist Form Values',
    description:
      'Persist form values so users can continue where they left off after refreshing the page.',

    howToUse:
      'Pass a persist configuration with a unique key. Use excludeFields to prevent specific fields from being persisted.',
  },
};

export const MULTI_STEP_FORM_CODE_HEADER = {
  import: 'script',
  script: 'script',
  template: 'template',
};
