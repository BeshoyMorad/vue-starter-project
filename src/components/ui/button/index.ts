import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-bg-primary-default text-text-base hover:bg-bg-primary-default/90',
        danger:
          'bg-bg-danger-default text-text-base hover:bg-bg-danger-default/90 focus-visible:ring-bg-danger-default/20',
        success:
          'bg-bg-success-default text-text-base hover:bg-bg-success-default/90 focus-visible:ring-bg-success-default/20',
        warning:
          'bg-bg-warning-default text-text-base hover:bg-bg-warning-default/90 focus-visible:ring-bg-warning-default/20',
        outline: 'border shadow-xs hover:bg-bg-hovered',
        ghost: 'hover:bg-bg-hovered text-text-default',
        link: 'text-text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
      iconPosition: {
        left: '',
        right: 'flex-row-reverse',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      iconPosition: 'left',
    },
  }
);
export type ButtonVariants = VariantProps<typeof buttonVariants>;
