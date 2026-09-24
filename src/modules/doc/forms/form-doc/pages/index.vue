<script setup lang="ts">
  import { ref } from 'vue';
  import * as yup from 'yup';
  import { toTypedSchema } from '@vee-validate/yup';
  import { Form } from 'vee-validate';

  import { Button, Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    FORM_IMPORT_CODE,
    FORM_BASIC_CODE,
    FORM_SUBMIT_CODE,
    FORM_VALIDATION_CODE,
    FORM_COMPLETE_CODE,
    FORM_DOC,
    FORM_CODE_HEADER,
  } from '../constants/constants';

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
    })
  );

  function onFormSubmit(values: Record<string, unknown>) {
    submittedValues.value = values;
  }
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ FORM_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ FORM_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="FORM_DOC.import.title"
      :description="FORM_DOC.import.description"
      :code="FORM_IMPORT_CODE"
      :header="FORM_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ FORM_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ FORM_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic Form -->
        <Card
          :title="FORM_DOC.basic.title"
          :description="FORM_DOC.basic.description"
          :how-to-use="FORM_DOC.basic.howToUse"
          :code="FORM_BASIC_CODE"
          :header="FORM_CODE_HEADER.template"
          :usage-label="FORM_DOC.howToUseTitle"
        >
          <template #preview>
            <Form class="w-full space-y-4">
              <Field.Text
                label="Username"
                name="username"
                placeholder="shadcn"
                test-id="basic-form-username"
              />

              <Field.Password
                label="Password"
                name="password"
                placeholder="••••••••"
                test-id="basic-form-password"
              />

              <Button test-id="" class="w-full" type="submit"> Submit </Button>
            </Form>
          </template>
        </Card>

        <!-- Submit -->
        <Card
          :title="FORM_DOC.submit.title"
          :description="FORM_DOC.submit.description"
          :how-to-use="FORM_DOC.submit.howToUse"
          :code-arr="[
            {
              code: FORM_SUBMIT_CODE.script,
              header: FORM_CODE_HEADER.script,
            },
            {
              code: FORM_SUBMIT_CODE.template,
              header: FORM_CODE_HEADER.template,
            },
          ]"
          :usage-label="FORM_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Form class="space-y-4" @submit="onFormSubmit">
                <Field.Text
                  label="Username"
                  name="username"
                  placeholder="Enter username..."
                  test-id="submit-form-username"
                />

                <Field.Password
                  label="Password"
                  name="password"
                  placeholder="••••••••"
                  test-id="submit-form-password"
                />

                <Button test-id="" class="w-full" type="submit"> Submit Form </Button>
              </Form>

              <div v-if="submittedValues" class="bg-primary-500/5 rounded-md border p-3">
                <p class="text-text-secondary mb-2 text-xs">Submitted values</p>

                <pre class="overflow-x-auto text-xs">{{
                  JSON.stringify(submittedValues, null, 2)
                }}</pre>
              </div>
            </div>
          </template>
        </Card>

        <!-- Validation -->
        <Card
          :title="FORM_DOC.validation.title"
          :description="FORM_DOC.validation.description"
          :how-to-use="FORM_DOC.validation.howToUse"
          :code-arr="[
            { code: FORM_VALIDATION_CODE.script, header: FORM_CODE_HEADER.script },
            { code: FORM_VALIDATION_CODE.template, header: FORM_CODE_HEADER.template },
          ]"
          :usage-label="FORM_DOC.howToUseTitle"
        >
          <template #preview>
            <Form :validation-schema="validationSchema" class="w-full space-y-4">
              <Field.Text
                label="Username"
                name="username"
                placeholder="Try entering less than 3 characters..."
                test-id="validation-form-username"
              />

              <Field.Password
                label="Password"
                name="password"
                placeholder="Try entering less than 6 characters..."
                test-id="validation-form-password"
              />

              <Button test-id="" class="w-full" type="submit"> Validate Form </Button>
            </Form>
          </template>
        </Card>

        <!-- Complete Example -->
        <Card
          :title="FORM_DOC.complete.title"
          :description="FORM_DOC.complete.description"
          :how-to-use="FORM_DOC.complete.howToUse"
          :code-arr="[
            { code: FORM_COMPLETE_CODE.script, header: FORM_CODE_HEADER.script },
            { code: FORM_COMPLETE_CODE.template, header: FORM_CODE_HEADER.template },
          ]"
          :usage-label="FORM_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="w-full space-y-4">
              <Form :validation-schema="validationSchema" class="space-y-4" @submit="onFormSubmit">
                <Field.Text
                  label="Username"
                  name="username"
                  placeholder="Enter username..."
                  test-id="complete-form-username"
                />

                <Field.Password
                  label="Password"
                  name="password"
                  placeholder="••••••••"
                  test-id="complete-form-password"
                />

                <Button test-id="" class="w-full" type="submit"> Submit Form </Button>
              </Form>

              <div v-if="submittedValues" class="rounded-md border p-3">
                <p class="text-text-secondary mb-2 text-sm">Submitted values</p>

                <pre class="overflow-x-auto text-sm">{{
                  JSON.stringify(submittedValues, null, 2)
                }}</pre>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
