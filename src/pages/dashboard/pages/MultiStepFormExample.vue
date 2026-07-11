<script setup lang="ts">
  import { ref } from 'vue';
  import { MultiStepForm, Field, Button, PageWrapper } from '@/components';
  import { paths } from '@/router/paths';
  import { success } from '@/utils/toast';
  import { phoneSchema } from '@/utils/yup-schemas';
  import * as yup from 'yup';
  import type { StepDefinition } from '@/components';
  import type { GenericObject } from 'vee-validate';

  // 1. Define Step Definitions & Schemas
  const steps: StepDefinition[] = [
    {
      title: 'Account details',
      description: 'Setup credential info',
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
      title: 'Personal info',
      description: 'Provide your details',
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
    {
      title: 'Contact info',
      description: 'Add your contacts',
      fields: ['email', 'phone'],
      schema: yup.object({
        email: yup
          .string()
          .required('Email is required')
          .email('Please enter a valid email address'),
        phone: phoneSchema('Please enter a valid phone number').required(
          'Phone number is required'
        ),
      }),
    },
  ];

  // Countries options for the Select field
  const countries = [
    { value: 'eg', label: 'Egypt' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];

  // 2. Submission Handler
  const isSubmitting = ref(false);
  const submittedValues = ref<GenericObject | null>(null);

  const onSubmit = async (values: GenericObject) => {
    isSubmitting.value = true;
    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      submittedValues.value = values;
      success('Multi-step form successfully submitted!');
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleReset = () => {
    submittedValues.value = null;
    window.location.reload();
  };
</script>

<template>
  <PageWrapper
    title="Multi-Step Form Container Example"
    subtitle="Declarative step schemas, step validation, and auto step-error jumping."
    class="mx-auto max-w-2xl border border-zinc-100 bg-white p-6 shadow-sm"
  >
    <template #actions>
      <div class="mb-4 flex items-center justify-between">
        <RouterLink
          :to="{ name: paths.dashboard.root }"
          class="text-text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          &larr; Back to Dashboard
        </RouterLink>
      </div>
    </template>

    <div class="py-4">
      <!-- Submitted state view -->
      <div
        v-if="submittedValues"
        class="bg-bg-success-default/5 border-bg-success-default/20 space-y-4 rounded-xl border p-6"
      >
        <div class="flex items-center gap-3">
          <span class="text-text-success text-2xl">🎉</span>
          <h3 class="text-text-primary text-lg font-semibold">Submission Successful!</h3>
        </div>
        <p class="text-text-secondary text-sm">
          Here are the final collected form values that were submitted after passing all validation
          steps:
        </p>
        <pre
          class="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs text-zinc-800"
          >{{ JSON.stringify(submittedValues, null, 2) }}</pre
        >
        <div class="flex justify-end pt-2">
          <Button test-id="reset-form-button" variant="outline" @click="handleReset">
            Fill Again
          </Button>
        </div>
      </div>

      <!-- Multi-step Form Wizard Container -->
      <MultiStepForm
        v-else
        test-id="wizard-demo"
        :steps="steps"
        :loading="isSubmitting"
        body-class="space-y-6 pt-4"
        @submit="onSubmit"
      >
        <!-- Step 1: Account info -->
        <template #step-0>
          <div class="space-y-4">
            <Field.Text
              name="username"
              label="Username"
              placeholder="e.g. johndoe"
              test-id="wizard-username"
            />
            <Field.Password
              name="password"
              label="Password"
              placeholder="Enter secure password"
              test-id="wizard-password"
            />
          </div>
        </template>

        <!-- Step 2: Personal details -->
        <template #step-1>
          <div class="space-y-4">
            <Field.Text
              name="fullName"
              label="Full Name"
              placeholder="e.g. John Doe"
              test-id="wizard-fullname"
            />
            <Field.Number name="age" label="Age" placeholder="e.g. 25" test-id="wizard-age" />
            <Field.Select
              name="country"
              label="Country"
              :options="countries"
              option-label="label"
              option-value="value"
              placeholder="Select your country..."
              test-id="wizard-country"
              show-clear
              searchable
            />
          </div>
        </template>

        <!-- Step 3: Contacts -->
        <template #step-2>
          <div class="space-y-4">
            <Field.Text
              name="email"
              label="Email Address"
              placeholder="e.g. john@example.com"
              test-id="wizard-email"
            />
            <Field.Phone
              name="phone"
              label="Phone Number"
              default-country="US"
              placeholder="e.g. 201 555 0123"
              show-clear
              test-id="wizard-phone"
            />
          </div>
        </template>
      </MultiStepForm>
    </div>
  </PageWrapper>
</template>
