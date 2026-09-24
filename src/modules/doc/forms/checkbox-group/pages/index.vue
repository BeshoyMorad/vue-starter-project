<script setup lang="ts">
  import { ref } from 'vue';
  import Card from '@/components/card/ExampleCard.vue';
  import { Field } from '@/components';

  import {
    CHECKBOX_GROUP_IMPORT_CODE,
    CHECKBOX_GROUP_BASIC_CODE,
    CHECKBOX_GROUP_LAYOUT_CODE,
    CHECKBOX_GROUP_SIZES_CODE,
    CHECKBOX_GROUP_SHAPES_CODE,
    CHECKBOX_GROUP_DISABLED_CODE,
    CHECKBOX_GROUP_V_MODEL_CODE,
    CHECKBOX_GROUP_FORM_CODE,
    CHECKBOX_GROUP_DOC,
  } from '../constants/constants';

  import type { CheckboxGroupOption } from '@/components/form/checkbox-group';

  const roles: CheckboxGroupOption[] = [
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Editor',
      value: 'editor',
    },
    {
      label: 'Viewer',
      value: 'viewer',
    },
  ];

  const layoutRoles: CheckboxGroupOption[] = [
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'Editor',
      value: 'editor',
    },
    {
      label: 'Viewer',
      value: 'viewer',
    },
  ];

  const sizeRoles: CheckboxGroupOption[] = [
    {
      label: 'Small',
      value: 'small',
    },
    {
      label: 'Default',
      value: 'default',
    },
    {
      label: 'Large',
      value: 'large',
    },
  ];

  const shapeRoles: CheckboxGroupOption[] = [
    {
      label: 'Option One',
      value: 'one',
    },
    {
      label: 'Option Two',
      value: 'two',
    },
    {
      label: 'Option Three',
      value: 'three',
    },
  ];

  const disabledRoles: CheckboxGroupOption[] = [
    {
      label: 'Available Option',
      value: 'available',
    },
    {
      label: 'Disabled Option',
      value: 'disabled',
      disabled: true,
    },
    {
      label: 'Another Option',
      value: 'another',
    },
  ];
  const selectedRoles = ref<string[]>(['admin']);
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ CHECKBOX_GROUP_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ CHECKBOX_GROUP_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="CHECKBOX_GROUP_DOC.import.title"
      :description="CHECKBOX_GROUP_DOC.import.description"
      :code="CHECKBOX_GROUP_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ CHECKBOX_GROUP_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ CHECKBOX_GROUP_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="CHECKBOX_GROUP_DOC.basic.title"
          :description="CHECKBOX_GROUP_DOC.basic.description"
          :how-to-use="CHECKBOX_GROUP_DOC.basic.howToUse"
          :code="CHECKBOX_GROUP_BASIC_CODE"
          :usage-label="CHECKBOX_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.CheckboxGroup :options="roles" :test-id="CHECKBOX_GROUP_DOC.basic.testId" />
          </template>
        </Card>

        <!-- Layout -->
        <Card
          :title="CHECKBOX_GROUP_DOC.layout.title"
          :description="CHECKBOX_GROUP_DOC.layout.description"
          :how-to-use="CHECKBOX_GROUP_DOC.layout.howToUse"
          :code="CHECKBOX_GROUP_LAYOUT_CODE"
          :usage-label="CHECKBOX_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="space-y-6">
              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ CHECKBOX_GROUP_DOC.layout.verticalLabel }}
                </span>

                <Field.CheckboxGroup
                  :options="layoutRoles"
                  layout="vertical"
                  :test-id="CHECKBOX_GROUP_DOC.layout.verticalTestId"
                />
              </div>

              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ CHECKBOX_GROUP_DOC.layout.horizontalLabel }}
                </span>

                <Field.CheckboxGroup
                  :options="layoutRoles"
                  layout="horizontal"
                  :test-id="CHECKBOX_GROUP_DOC.layout.horizontalTestId"
                />
              </div>
            </div>
          </template>
        </Card>

        <!-- Sizes -->
        <Card
          :title="CHECKBOX_GROUP_DOC.sizes.title"
          :description="CHECKBOX_GROUP_DOC.sizes.description"
          :how-to-use="CHECKBOX_GROUP_DOC.sizes.howToUse"
          :code="CHECKBOX_GROUP_SIZES_CODE"
          :usage-label="CHECKBOX_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="space-y-6">
              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ CHECKBOX_GROUP_DOC.sizes.smallLabel }}
                </span>

                <Field.CheckboxGroup
                  size="small"
                  :options="sizeRoles"
                  :test-id="CHECKBOX_GROUP_DOC.sizes.smallTestId"
                />
              </div>

              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ CHECKBOX_GROUP_DOC.sizes.defaultLabel }}
                </span>

                <Field.CheckboxGroup
                  :options="sizeRoles"
                  :test-id="CHECKBOX_GROUP_DOC.sizes.defaultTestId"
                />
              </div>

              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ CHECKBOX_GROUP_DOC.sizes.largeLabel }}
                </span>

                <Field.CheckboxGroup
                  size="large"
                  :options="sizeRoles"
                  :test-id="CHECKBOX_GROUP_DOC.sizes.largeTestId"
                />
              </div>
            </div>
          </template>
        </Card>

        <!-- Shapes -->
        <Card
          :title="CHECKBOX_GROUP_DOC.shapes.title"
          :description="CHECKBOX_GROUP_DOC.shapes.description"
          :how-to-use="CHECKBOX_GROUP_DOC.shapes.howToUse"
          :code="CHECKBOX_GROUP_SHAPES_CODE"
          :usage-label="CHECKBOX_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="space-y-6">
              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ CHECKBOX_GROUP_DOC.shapes.squareLabel }}
                </span>

                <Field.CheckboxGroup
                  shape="square"
                  :options="shapeRoles"
                  :test-id="CHECKBOX_GROUP_DOC.shapes.squareTestId"
                />
              </div>

              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ CHECKBOX_GROUP_DOC.shapes.circleLabel }}
                </span>

                <Field.CheckboxGroup
                  shape="circle"
                  :options="shapeRoles"
                  :test-id="CHECKBOX_GROUP_DOC.shapes.circleTestId"
                />
              </div>
            </div>
          </template>
        </Card>

        <!-- Disabled -->
        <Card
          :title="CHECKBOX_GROUP_DOC.disabled.title"
          :description="CHECKBOX_GROUP_DOC.disabled.description"
          :how-to-use="CHECKBOX_GROUP_DOC.disabled.howToUse"
          :code="CHECKBOX_GROUP_DISABLED_CODE"
          :usage-label="CHECKBOX_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.CheckboxGroup
              :options="disabledRoles"
              :test-id="CHECKBOX_GROUP_DOC.disabled.testId"
            />
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="CHECKBOX_GROUP_DOC.vModel.title"
          :description="CHECKBOX_GROUP_DOC.vModel.description"
          :how-to-use="CHECKBOX_GROUP_DOC.vModel.howToUse"
          :code="CHECKBOX_GROUP_V_MODEL_CODE"
          :usage-label="CHECKBOX_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="space-y-4">
              <Field.CheckboxGroup
                v-model="selectedRoles"
                :options="roles"
                :test-id="CHECKBOX_GROUP_DOC.vModel.testId"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ CHECKBOX_GROUP_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ selectedRoles.join(', ') || CHECKBOX_GROUP_DOC.vModel.emptyValue }}
                </span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Form -->
        <Card
          :title="CHECKBOX_GROUP_DOC.form.title"
          :description="CHECKBOX_GROUP_DOC.form.description"
          :how-to-use="CHECKBOX_GROUP_DOC.form.howToUse"
          :code="CHECKBOX_GROUP_FORM_CODE"
          :usage-label="CHECKBOX_GROUP_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.CheckboxGroup
              label="User Roles"
              description="Select the roles assigned to this user."
              name="roles"
              :options="roles"
              :test-id="CHECKBOX_GROUP_DOC.form.testId"
            />
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
