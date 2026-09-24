export const TOOLTIP_IMPORT_CODE = `import { Tooltip } from '@/components';`;

export const TOOLTIP_BASIC_CODE = `<Tooltip>
  <template #trigger>
    <p>tooltip</p>
  </template>

  <div>
    data here
  </div>
</Tooltip>`;

export const TOOLTIP_EXAMPLES = [
  {
    nameKey: 'tooltip.examples.basic.name',
    descriptionKey: 'tooltip.examples.basic.description',
    code: `<Tooltip>
  <template #trigger>
    <p>tooltip</p>
  </template>

  <div>
    data here
  </div>
</Tooltip>`,
  },
] as const;
