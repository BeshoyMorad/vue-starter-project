import { cva, type VariantProps } from 'class-variance-authority';

export interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export const checkboxGroupVariants = cva('flex flex-wrap', {
  variants: {
    layout: {
      vertical: 'flex-col',
      horizontal: 'flex-row gap-x-6 gap-y-2',
    },
    size: {
      small: 'gap-x-4 gap-y-0.5',
      default: 'gap-x-5 gap-y-1',
      large: 'gap-x-6 gap-y-2',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

export type CheckboxGroupVariants = VariantProps<typeof checkboxGroupVariants>;
