<script setup lang="ts">
  import { ref } from 'vue';
  import { MultiStepForm, Field, Button } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';
  import type { GenericObject } from 'vee-validate';
  import type { StepDefinition } from '@/components';

  import {
    MULTI_STEP_FORM_IMPORT_CODE,
    MULTI_STEP_FORM_BASIC_CODE,
    MULTI_STEP_FORM_VALIDATION_CODE,
    MULTI_STEP_FORM_PERSIST_CODE,
    MULTI_STEP_FORM_DOC,
    MULTI_STEP_FORM_CODE_HEADER,
  } from '../constants/constants';

  import * as yup from 'yup';

  // Example data
  const countries = [
    { value: 'eg', label: 'Egypt' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  // Step definitions
  const steps: StepDefinition[] = [
    {
      title: 'Account details',
      description: 'Setup your account',
      fields: ['username', 'password'],
      schema: yup.object({
        username: yup
          .string()
          .required('Username is required')
          .min(3, 'Username must be at least 3 characters'),

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
        fullName: yup.string().required('Full name is required'),

        age: yup
          .number()
          .typeError('Age must be a number')
          .required('Age is required')
          .min(18, 'You must be at least 18 years old'),

        country: yup.string().required('Country is required'),
      }),
    },
  ];

  const isSubmitting = ref(false);
  const submittedValues = ref<GenericObject | null>(null);

  const onSubmit = async (values: GenericObject) => {
    isSubmitting.value = true;

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      submittedValues.value = values;
    } finally {
      isSubmitting.value = false;
    }
  };

  const resetForm = () => {
    submittedValues.value = null;
  };
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ MULTI_STEP_FORM_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ MULTI_STEP_FORM_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      title="Import"
      description="Import the MultiStepForm component and the required Field components from the shared components library."
      :code="MULTI_STEP_FORM_IMPORT_CODE"
      :header="MULTI_STEP_FORM_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ MULTI_STEP_FORM_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ MULTI_STEP_FORM_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic Multi-Step Form -->
        <Card
          :title="MULTI_STEP_FORM_DOC.basic.title"
          :description="MULTI_STEP_FORM_DOC.basic.description"
          :how-to-use="MULTI_STEP_FORM_DOC.basic.howToUse"
          :code-arr="[
            {
              code: MULTI_STEP_FORM_BASIC_CODE.script,
              header: MULTI_STEP_FORM_CODE_HEADER.script,
            },
            {
              code: MULTI_STEP_FORM_BASIC_CODE.template,
              header: MULTI_STEP_FORM_CODE_HEADER.template,
            },
          ]"
          :header="MULTI_STEP_FORM_CODE_HEADER.script"
        >
          <template #preview>
            <div class="w-full max-w-2xl">
              <div v-if="submittedValues" class="space-y-4">
                <div
                  class="border-bg-success-default/20 bg-bg-success-default/5 space-y-4 rounded-xl border p-5"
                >
                  <h3 class="text-text-success font-semibold">
                    {{ MULTI_STEP_FORM_DOC.basic.successTitle }}
                  </h3>

                  <p class="text-text-secondary mt-1 text-sm">
                    {{ MULTI_STEP_FORM_DOC.basic.successDescription }}
                  </p>

                  <pre
                    class="bg-bg-success-default/10 border-border-success mt-4 overflow-x-auto rounded-lg border p-4 font-mono text-xs"
                    >{{ JSON.stringify(submittedValues, null, 2) }}</pre
                  >
                  <div class="flex justify-end">
                    <Button test-id="" variant="success" outline @click="resetForm">
                      Fill Again
                    </Button>
                  </div>
                </div>
              </div>

              <MultiStepForm
                v-else
                test-id="multi-step-form-doc"
                class="border-border-primary rounded-lg border p-8"
                :steps="steps"
                :persist="{
                  key: 'user-form',
                  excludeFields: ['password'],
                }"
                :loading="isSubmitting"
                body-class="space-y-6 pt-4"
                @submit="onSubmit"
              >
                <template #step-0>
                  <div class="space-y-4">
                    <Field.Text
                      name="username"
                      label="Username"
                      placeholder="e.g. johndoe"
                      test-id=""
                    />

                    <Field.Password
                      test-id=""
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                    />
                  </div>
                </template>

                <template #step-1>
                  <div class="space-y-4">
                    <Field.Text
                      test-id=""
                      name="fullName"
                      label="Full Name"
                      placeholder="e.g. John Doe"
                    />

                    <Field.Number test-id="" name="age" label="Age" placeholder="e.g. 25" />

                    <Field.Select
                      test-id=""
                      name="country"
                      label="Country"
                      :options="countries"
                      option-label="label"
                      option-value="value"
                      placeholder="Select your country..."
                    />
                  </div>
                </template>
              </MultiStepForm>
            </div>
          </template>
        </Card>

        <!-- Step Validation -->
        <Card
          :title="MULTI_STEP_FORM_DOC.validation.title"
          :description="MULTI_STEP_FORM_DOC.validation.description"
          :how-to-use="MULTI_STEP_FORM_DOC.validation.howToUse"
          :code="MULTI_STEP_FORM_VALIDATION_CODE"
          :header="MULTI_STEP_FORM_CODE_HEADER.script"
        >
          <template #preview>
            <div class="text-text-secondary max-w-2xl space-y-4 text-sm">
              <div class="rounded-lg border border-zinc-200 p-4">
                <p class="text-text-primary font-medium">Step 1</p>

                <p class="mt-1">
                  Only <code>username</code> and <code>password</code> are validated before moving
                  to the next step.
                </p>
              </div>

              <div class="rounded-lg border border-zinc-200 p-4">
                <p class="text-text-primary font-medium">Step 2</p>

                <p class="mt-1">The remaining fields are validated before submitting the form.</p>
              </div>
            </div>
          </template>
        </Card>

        <!-- Persistence -->
        <Card
          :title="MULTI_STEP_FORM_DOC.persist.title"
          :description="MULTI_STEP_FORM_DOC.persist.description"
          :how-to-use="MULTI_STEP_FORM_DOC.persist.howToUse"
          :code="MULTI_STEP_FORM_PERSIST_CODE"
          :header="MULTI_STEP_FORM_CODE_HEADER.template"
        >
          <template #preview>
            <div class="max-w-2xl space-y-3 text-sm">
              <p class="text-text-secondary">
                Form values can be persisted between page refreshes.
              </p>

              <div class="bg-bg-primary-default/5 rounded-lg border border-zinc-200 p-4">
                <code class="text-xs">
                  :persist="{ key: 'user-form', excludeFields: ['password'] }"
                </code>
              </div>

              <p class="text-text-secondary">
                Sensitive fields such as passwords can be excluded from persistence.
              </p>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
