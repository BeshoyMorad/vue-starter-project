export const TEXTAREA_IMPORT_CODE = `import { Field } from '@/components';
`;

export const TEXTAREA_BASIC_CODE = `< Field.TextArea
placeholder = "Write something..."
  />`;

export const TEXTAREA_LABEL_CODE = `< Field.Textarea
label = "Label"
name="textarea-description"
placeholder = "Enter a description..."
  /> `;

export const TEXTAREA_DESCRIPTION_CODE = `< Field.Textarea
label = "Bio"
name="textarea-description"
description = "Tell us a little about yourself."
placeholder = "Write your bio..."
  /> `;

export const TEXTAREA_V_MODEL_CODE = `< script setup lang = "ts" >
import { ref } from 'vue';
import { Field } from '@/components';
const textAreaValue = ref('');
</script>

< template >
  <Field.Textarea v-model="textAreaValue" placeholder = "Type something..."/>
  <div class="rounded-md border p-3 text-sm">
      <span class="text-text-secondary">Current value:</span>
      <span class="text-text-primary ml-2 font-medium">{{ textAreaValue || 'Empty' }} </span>
  </div>
</template> `;
export const TEXTAREA_DOC = {
  basic: {
    title: 'Basic',
    description: 'A basic text area field.',
    howToUse: 'Use the TextArea field with a placeholder to collect multi-line text input.',
  },

  label: {
    title: 'With Label',
    description: 'Add a label to describe the purpose of the text area.',
    howToUse: 'Use the label prop to display a label above the text area.',
  },

  description: {
    title: 'With Description',
    description: 'Add supporting text to provide additional information about the field.',
    howToUse: 'Use the description prop to display supporting text below the field.',
  },

  vModel: {
    title: 'v-model',
    description: 'Bind the TextArea field value to a reactive variable.',
    howToUse: 'Use v-model to create a two-way binding with the text area value.',
  },
};
