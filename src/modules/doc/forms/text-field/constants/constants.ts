export const TEXT_IMPORT_CODE = `import { Field } from '@/components';`;

export const TEXT_BASIC_CODE = `<Field.Text
  placeholder="Enter your name..."
/>`;

export const TEXT_ICON_CODE = `<Field.Text
  placeholder="Search..."
  icon="hugeicons--search-01"
  icon-position="left"
/>`;

export const TEXT_LOADING_CODE = `<Field.Text
  placeholder="Loading data..."
  loading
  icon-position="right" 
/>`;

export const TEXT_V_MODEL_CODE = `<Field.Text
  v-model="textValue"
  placeholder="Type something..."
/>`;

export const TEXT_DOC = {
  basic: {
    title: 'Basic',
    description: 'A basic text input field.',
    howToUse: 'Use the Text field with a placeholder to collect text input.',
  },
  icon: {
    title: 'With Icon',
    description: 'Add an icon to the left or right side of the input.',
    howToUse: 'Use the icon and icon-position props to add an icon to the input.',
  },
  loading: {
    title: 'Loading',
    description: 'Display a loading state while data is being processed.',
    howToUse: 'Set the loading prop to display the loading state.',
  },
  vModel: {
    title: 'v-model',
    description: 'Bind the Text field value to a reactive variable.',
    howToUse: 'Use v-model to create a two-way binding with the input value.',
  },
};
