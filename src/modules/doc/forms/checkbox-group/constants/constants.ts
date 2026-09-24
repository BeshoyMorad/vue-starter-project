export const CHECKBOX_GROUP_IMPORT_CODE = `import { Field } from '@/components';
`;

export const CHECKBOX_GROUP_BASIC_CODE = `<script setup lang="ts">
import { Field } from '@/components';

const roles = [
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
</script>

<template>
  <Field.CheckboxGroup
    :options="roles"
    test-id="checkbox-group-options"
  />
</template>`;

export const CHECKBOX_GROUP_LAYOUT_CODE = `<Field.CheckboxGroup
  :options="roles"
  layout="horizontal"
  test-id="checkbox-group-horizontal"
/>`;

export const CHECKBOX_GROUP_SIZES_CODE = `<Field.CheckboxGroup
  :options="roles"
  size="small"
  test-id="checkbox-group-small"
/>

<Field.CheckboxGroup
  :options="roles"
  size="default"
  test-id="checkbox-group-default"
/>

<Field.CheckboxGroup
  :options="roles"
  size="large"
  test-id="checkbox-group-large"
/>`;

export const CHECKBOX_GROUP_SHAPES_CODE = `<Field.CheckboxGroup
  :options="roles"
  shape="square"
  test-id="checkbox-group-square"
/>

<Field.CheckboxGroup
  :options="roles"
  shape="circle"
  test-id="checkbox-group-circle"
/>`;

export const CHECKBOX_GROUP_DISABLED_CODE = `<script setup lang="ts">
const roles = [
  {
    label: 'Available Option',
    value: 'available',
  },
  {
    label: 'Disabled Option',
    value: 'disabled',
    disabled: true,
  },
];
</script>

<template>
  <Field.CheckboxGroup
    :options="roles"
    test-id="checkbox-group-disabled"
  />
</template>`;

export const CHECKBOX_GROUP_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';

const selectedRoles = ref<string[]>(['admin']);
</script>

<template>
  <Field.CheckboxGroup
    v-model="selectedRoles"
    :options="roles"
    test-id="checkbox-group-v-model"
  />
</template>`;

export const CHECKBOX_GROUP_FORM_CODE = `<Field.CheckboxGroup
  name="roles"
  label="User Roles"
  description="Select the roles assigned to this user."
  :options="roles"
  test-id="checkbox-group-form"
/>`;

export const CHECKBOX_GROUP_DOC = {
  title: 'Checkbox Group',
  description:
    'A group of checkbox inputs that allows users to select multiple values from a list of options.',

  import: {
    title: 'Import',
    description: 'Import the CheckboxGroup field from the shared component library.',
  },

  examples: {
    title: 'Examples',
    description:
      'Explore the available CheckboxGroup options, layouts, sizes, shapes, states, and form integration.',
  },

  howToUseTitle: 'How to use',

  basic: {
    title: 'Basic',
    description:
      'Use the options prop to provide the list of values that should be displayed in the checkbox group.',
    howToUse: 'Pass an array of options containing a label and value for each checkbox item.',
    testId: 'checkbox-group-options',
  },

  layout: {
    title: 'Layout',
    description: 'Control how the checkbox items are arranged using the layout prop.',
    howToUse:
      'Use vertical for a stacked layout or horizontal to display the checkbox items in a row.',
    verticalLabel: 'Vertical',
    horizontalLabel: 'Horizontal',
    verticalTestId: 'checkbox-group-vertical',
    horizontalTestId: 'checkbox-group-horizontal',
  },

  sizes: {
    title: 'Sizes',
    description: 'CheckboxGroup supports small, default, and large sizes.',
    howToUse:
      'Set the size prop to small, default, or large to control the size of all checkbox items in the group.',
    smallLabel: 'Small',
    defaultLabel: 'Default',
    largeLabel: 'Large',
    smallTestId: 'checkbox-group-small',
    defaultTestId: 'checkbox-group-default',
    largeTestId: 'checkbox-group-large',
  },

  shapes: {
    title: 'Shapes',
    description: 'Choose between square and circular checkbox shapes.',
    howToUse: 'Set the shape prop to square or circle to change the shape of all checkbox items.',
    squareLabel: 'Square',
    circleLabel: 'Circle',
    squareTestId: 'checkbox-group-square',
    circleTestId: 'checkbox-group-circle',
  },

  disabled: {
    title: 'Disabled',
    description: 'Disable the entire checkbox group or individual options.',
    howToUse:
      'Set disabled to true to disable the whole group, or set disabled to true on an individual option to disable only that checkbox.',
    testId: 'checkbox-group-disabled',
  },

  vModel: {
    title: 'v-model',
    description:
      'Use v-model to control the selected values and react to changes in the checkbox group.',
    howToUse:
      'The v-model value is an array containing the values of all currently selected options.',
    currentValueLabel: 'Selected values:',
    emptyValue: 'None',
    testId: 'checkbox-group-v-model',
  },

  form: {
    title: 'Form Integration',
    description:
      'CheckboxGroup can be integrated with the form validation system using the name prop.',
    howToUse:
      'Provide a name to enable form integration. You can also provide a label and description for the field.',
    testId: 'checkbox-group-form',
  },
};
