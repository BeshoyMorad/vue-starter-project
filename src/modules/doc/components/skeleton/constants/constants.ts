export const SKELETON_IMPORT_CODE = `import { Skeleton } from '@/components';`;

export const SKELETON_BASIC_CODE = `<Skeleton class="h-12 w-12" />`;

export const SKELETON_TEXT_CODE = `<div class="flex w-full max-w-md flex-col gap-3">
  <Skeleton class="h-4 w-full" />
  <Skeleton class="h-4 w-4/5" />
  <Skeleton class="h-4 w-3/5" />
</div>`;

export const SKELETON_CARD_CODE = `<div class="flex w-full flex-col items-center justify-center space-x-6 md:flex-row">
  <div class="w-full max-w-md space-y-4">
      <Skeleton class="h-48 w-full" />
      <div class="space-y-3">
        <Skeleton class="h-6 w-3/5" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-4/5" />
      </div>
  </div>
  <div class="w-full max-w-md space-y-4">
      <Skeleton class="h-48 w-full" />
      <div class="space-y-3">
        <Skeleton class="h-6 w-3/5" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-4/5" />
    </div>
</div>`;

export const SKELETON_CODE_HEADER = {
  import: 'Import',
  template: 'Template',
};

export const SKELETON_DOC = {
  title: 'Skeleton',

  description:
    'A loading placeholder that displays a visual representation of content while data is being loaded.',

  import: {
    title: 'Import',
    description: 'Import the Skeleton component from the shared components entry point.',
  },

  examples: {
    title: 'Examples',
    description:
      'Use the Skeleton component with custom dimensions to represent different types of loading content.',
  },

  basic: {
    title: 'Basic Skeleton',
    description: 'A simple Skeleton placeholder that can be customized using utility classes.',

    howToUse:
      'Use the class prop to define the width and height of the Skeleton based on the content it represents.',
  },

  text: {
    title: 'Text Skeleton',
    description:
      'Create multiple Skeleton elements to represent lines of text while content is loading.',

    howToUse:
      'Combine multiple Skeleton components with different widths to create a realistic text loading state.',
  },

  card: {
    title: 'Card Skeleton',
    description:
      'Combine multiple Skeleton components to create a loading placeholder for a card layout.',

    howToUse:
      'Use Skeleton components with different sizes to represent the image, title, and text areas of a card.',
  },
};
