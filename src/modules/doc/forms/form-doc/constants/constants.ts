export const FORM_IMPORT_CODE = `import { Form } from 'vee-validate';
import { Field } from '@/components';`;

export const FORM_CODE_HEADER = {
  import: 'Import',
  script: 'Script',
  template: 'Template',
};
export const FORM_BASIC_CODE = `<Form class="space-y-4">
  <Field.Text
    label="Username"
    name="username"
    placeholder="shadcn"
  />

  <Field.Password
    label="Password"
    name="password"
    placeholder="••••••••"
  />

  <Button type="submit">
    Submit
  </Button>
</Form>`;

export const FORM_SUBMIT_CODE = {
  script: `<script setup lang="ts">
import { ref } from 'vue';

const submittedValues = ref<Record<string, unknown> | null>(null);

function onFormSubmit(values: Record<string, unknown>) {
  submittedValues.value = values;
}
</script>`,
  template: `<template>
  <Form
    class="space-y-4"
    @submit="onFormSubmit"
  >
    <Field.Text
      label="Username"
      name="username"
      placeholder="Enter username..."
    />

    <Field.Password
      label="Password"
      name="password"
      placeholder="••••••••"
    />

    <Button type="submit">
      Submit Form
    </Button>
  </Form>
</template>`,
};

export const FORM_VALIDATION_CODE = {
  script: `<script setup lang="ts">
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

const validationSchema = toTypedSchema(
  yup.object({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),

    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  }),
);
</script>`,
  template: `<template>
  <Form
    :validation-schema="validationSchema"
    class="space-y-4"
  >
    <Field.Text
      label="Username"
      name="username"
      placeholder="Enter username..."
    />

    <Field.Password
      label="Password"
      name="password"
      placeholder="••••••••"
    />

    <Button type="submit">
      Submit Form
    </Button>
  </Form>
</template>`,
};

export const FORM_COMPLETE_CODE = {
  script: `<script setup lang="ts">
import { ref } from 'vue';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { Form } from 'vee-validate';

import { Button, Field } from '@/components';

const submittedValues = ref<Record<string, unknown> | null>(null);

const validationSchema = toTypedSchema(
  yup.object({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),

    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  }),
);

function onFormSubmit(values: Record<string, unknown>) {
  submittedValues.value = values;
}
</script>`,
  template: `<template>
  <div class="space-y-4">
    <Form
      :validation-schema="validationSchema"
      class="space-y-4"
      @submit="onFormSubmit"
    >
      <Field.Text
        label="Username"
        name="username"
        placeholder="Enter username..."
      />

      <Field.Password
        label="Password"
        name="password"
        placeholder="••••••••"
      />

      <Button
        class="w-full"
        type="submit"
      >
        Submit Form
      </Button>
    </Form>

    <div
      v-if="submittedValues"
      class="rounded-md border p-3"
    >
      <p class="text-text-secondary mb-2 text-sm">
        Submitted values
      </p>

      <pre class="text-sm">{{ submittedValues }}</pre>
    </div>
  </div>
</template>`,
};

export const FORM_DOC = {
  title: 'Form',
  description:
    'A form component built with vee-validate that provides form state management, validation, and submission handling. Use it with the Field components to build consistent and validated forms.',

  import: {
    title: 'Import',
    description:
      'Import the Form component from vee-validate and the Field components from the project component library.',
  },

  examples: {
    title: 'Examples',
    description:
      'Learn how to create a form, handle submitted values, add validation, and combine everything into a complete form.',
  },

  howToUseTitle: 'How to use',

  basic: {
    title: 'Basic Form',
    description:
      'Create a basic form by placing Field components inside the vee-validate Form component. Each field must have a unique name.',
    howToUse:
      'Use the Form component as the container for your fields. The name prop on each Field identifies the value in the form state.',
  },

  submit: {
    title: 'Submit Form',
    description:
      'Handle form submission using the submit event. The submit handler receives an object containing the values of all fields.',
    howToUse:
      'Pass a submit handler to the Form using @submit. When the form is submitted successfully, vee-validate passes the form values to the handler.',
  },

  validation: {
    title: 'Form Validation',
    description:
      'Validate form values by defining a Yup schema and passing it to the Form through the validation-schema prop.',
    howToUse:
      'Create a Yup object schema, convert it with toTypedSchema, and pass the result to the Form. Validation errors are handled automatically by the Field components.',
  },

  complete: {
    title: 'Complete Example',
    description:
      'A complete form combining fields, Yup validation, form submission, and displaying the submitted values.',
    howToUse:
      'Define the validation schema, pass it to the Form, add your Field components with matching names, and handle the submitted values in the submit handler.',
  },
};
