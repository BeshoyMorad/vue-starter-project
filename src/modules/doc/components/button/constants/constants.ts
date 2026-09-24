export const BUTTON_IMPORT_CODE = `import { Button } from '@/components';`;

export const BUTTON_VARIANTS = [
  {
    variant: 'default',
    nameKey: 'button.variants.default.name',
    descriptionKey: 'button.variants.default.description',
    code: `<Button variant="default"> Default </Button>`,
  },
  {
    variant: 'danger',
    nameKey: 'button.variants.danger.name',
    descriptionKey: 'button.variants.danger.description',
    code: `<Button variant="danger">
  Danger
</Button>`,
  },
  {
    variant: 'success',
    nameKey: 'button.variants.success.name',
    descriptionKey: 'button.variants.success.description',
    code: `<Button variant="success">
  Success
</Button>`,
  },
  {
    variant: 'warning',
    nameKey: 'button.variants.warning.name',
    descriptionKey: 'button.variants.warning.description',
    code: `<Button variant="warning">
  Warning
</Button>`,
  },
  {
    variant: 'ghost',
    nameKey: 'button.variants.ghost.name',
    descriptionKey: 'button.variants.ghost.description',
    code: `<Button variant="ghost">
  Ghost
</Button>`,
  },
  {
    variant: 'link',
    nameKey: 'button.variants.link.name',
    descriptionKey: 'button.variants.link.description',
    code: `<Button variant="link">
  link
</Button>`,
  },
] as const;

export const BUTTON_OUTLINE = {
  variant: 'default',
  outline: true,
  nameKey: 'button.outline.title',
  descriptionKey: 'button.outline.description',
  descriptionKeyOutline: 'button.outline.default.description',
  onKey: 'button.outline.on',
  offKey: 'button.outline.off',
  code: `<Button :outline="true">
  Cancel
</Button>`,
} as const;
