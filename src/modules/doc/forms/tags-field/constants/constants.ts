export const TAGS_INPUT_IMPORT_CODE = `import { Field } from '@/components';`;

export const TAGS_INPUT_BASIC_CODE = `<Field.TagsInput
  v-model="directEmails"
  placeholder="Add email tag..."
  test-id="direct-emails-input"
/>`;
export const TAGS_CODE_HEARDER = {
  import: 'Import',
  script: 'Script',
  template: 'Template',
};
export const TAGS_INPUT_DEFAULT_VALUE_CODE = `<Field.TagsInput
  :default-value="['Vue', 'TypeScript']"
  placeholder="Add another tag..."
  test-id="tags-default-value"
/>`;

export const TAGS_INPUT_DISABLED_CODE = `<Field.TagsInput
  :default-value="['Vue', 'TypeScript']"
  disabled
  test-id="tags-disabled"
/>`;

export const TAGS_INPUT_CUSTOM_TAG_CODE = `<Field.TagsInput
  v-model="tags"
  placeholder="Add a tag..."
  tag-class="font-medium text-primary-600 rounded-full px-2 py-1"
  test-id="tags-custom-class"
/>`;

export const TAGS_INPUT_CUSTOM_SLOT_CODE = `<Field.TagsInput
  v-model="tags"
  placeholder="Add a tag..."
  test-id="tags-custom-slot"
>
  <template #tag="{ value }">
    <span class="flex items-center gap-1">
      <span>#</span>
      <span>{{ value }}</span>
    </span>
  </template>
</Field.TagsInput>`;

export const TAGS_INPUT_V_MODEL_SCRIPT = `<script setup lang="ts">
import { ref } from 'vue';
const tags = ref<string[]>([]);
</script>`;

export const TAGS_INPUT_V_MODEL_TEMPLATE = `<script setup lang="ts">
import { ref } from 'vue';
const tags = ref<string[]>([]);
</script>`;

export const TAGS_INPUT_DOC = {
  title: 'Tags Input',

  description:
    'A tags input field that allows users to add, remove, and manage multiple string values as tags.',

  howToUseTitle: 'How to use',

  import: {
    title: 'Import',
    description: 'Import the TagsInput field from the components library.',
  },

  examples: {
    title: 'Examples',
    description: 'Different ways to configure and use the TagsInput field.',
  },

  basic: {
    title: 'Basic',
    description: 'A basic tags input for entering multiple values.',
    howToUse:
      'Use v-model with a string array to manage the tags. Users can add and remove tags interactively.',
  },

  defaultValue: {
    title: 'Default Value',
    description: 'Initialize the input with a predefined list of tags.',
    howToUse:
      'Use default-value when you want to provide initial tags without controlling the value with v-model.',
  },

  disabled: {
    title: 'Disabled',
    description: 'Disable the tags input to prevent users from adding or removing tags.',
    howToUse: 'Set disabled to true when the tags input should not be editable.',
  },

  customTag: {
    title: 'Custom Tag Class',
    description: 'Customize the appearance of individual tags.',
    howToUse: 'Use tag-class to apply custom Tailwind CSS classes to the rendered tags.',
  },

  customSlot: {
    title: 'Custom Tag',
    description: 'Customize the content of each tag using the tag slot.',
    howToUse:
      'Use the tag slot to control how each tag is rendered. The slot exposes the current tag through the value property.',
  },

  vModel: {
    title: 'v-model',
    description: 'Control the tags value using Vue reactive state.',
    howToUse: 'Bind v-model to a string array to read and update the current list of tags.',
    currentValueLabel: 'Current tags:',
    emptyValue: 'No tags',
  },
};
