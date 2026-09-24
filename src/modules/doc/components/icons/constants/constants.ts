export const ICON_IMPORT_CODE = `import { Icon } from '@/components';`;

export const ICON_BASIC_CODE = `<Icon icon="hugeicons--arrow-down-01" />`;

export const ICON_SIZES_CODE = `<div class="flex items-center gap-6">
  <Icon icon="hugeicons--volleyball" size="xs" />
  <Icon icon="hugeicons--volleyball" size="sm" />
  <Icon icon="hugeicons--volleyball" size="md" />
  <Icon icon="hugeicons--volleyball" size="lg" />
  <Icon icon="hugeicons--volleyball" size="xl" />
  <Icon icon="hugeicons--volleyball" size="2xl" />
 </div>`;

export const ICON_COLORED_CODE = `<div class="flex items-center gap-6">
  <Icon
    icon="hugeicons--arrow-down-01"
    :colored="true"
  />
  <Icon
    icon="hugeicons--checkmark-circle-02"
    :colored="true"
  />
  <Icon
    icon="hugeicons--star"
    :colored="true"
  />
</div>`;

export const ICON_SIZE_COLOR_CODE = `<div class="flex items-center gap-6">
  <Icon
    icon="hugeicons--arrow-down-01"
    size="sm"
    :colored="true"
  />
  <Icon
    icon="hugeicons--checkmark-circle-02"
    size="md"
    :colored="true"
  />
  <Icon
    icon="hugeicons--star"
    size="lg"
    :colored="true"
  />
</div>`;

export const ICON_DOC = {
  title: 'Icon',
  description:
    'A reusable icon component for displaying Huge Icons with consistent sizing and color variants across the application.',

  import: {
    title: 'Import',
    description: 'Import the Icon component from the shared components package.',
  },

  examples: {
    title: 'Examples',
    description:
      'The project uses Huge Icons for its icon library. Use Huge Icons icon classes with the Icon component and customize them using the available variants.',
  },

  basic: {
    title: 'Basic',
    description: 'Display a Huge Icon by passing its icon class to the icon prop.',
    howToUse: 'Pass a Huge Icons class such as hugeicons--arrow-down-01 to the icon prop.',
  },

  sizes: {
    title: 'Sizes',
    description: 'Control the size of Huge Icons using the size prop.',
    howToUse: 'Use one of the supported size variants defined by the Icon component.',
  },

  colored: {
    title: 'Colored',
    description:
      'Enable the colored variant when the Huge Icon should use the configured color style.',
    howToUse: 'Set the colored prop to true.',
  },

  sizeColor: {
    title: 'Size & Color',
    description: 'Combine size and color variants to customize the appearance of a Huge Icon.',
    howToUse: 'Pass both size and colored props to the Icon component.',
  },
};
export const ICON_CODE_HEADER = {
  import: 'typescript',
  template: 'vue',
};
