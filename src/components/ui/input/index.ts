import { cva, type VariantProps } from 'class-variance-authority';

export { default as Input } from './Input.vue';

export const inputVariants = cva(
  'text-text-default rounded-md border-[1.5px] focus:ring-2 focus:outline-0 placeholder:text-text-disabled read-only:bg-bg-default disabled:text-text-disabled disabled:border-border-disabled disabled:cursor-not-allowed aria-invalid:border-border-danger border-border-disabled hover:border-border-primary focus:ring-border-primary focus-visible:ring-border-primary'
);

export type InputVariants = VariantProps<typeof inputVariants>;
