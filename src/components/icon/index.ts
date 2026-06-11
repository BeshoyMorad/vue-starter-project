import { cva, type VariantProps } from 'class-variance-authority';

export const iconVariants = cva('shrink-0', {
  variants: {
    colored: {
      true: 'iconify-color',
      false: 'iconify',
    },
    size: {
      '2xs': 'size-2', // 8px
      xs: 'size-3', // 12px
      sm: 'size-3.5', // 14px
      default: 'size-4', // 16px - alias for md
      md: 'size-4', // 16px - default
      lg: 'size-5', // 20px
      xl: 'size-6', // 24px
      '2xl': 'size-7', // 28px
      '3xl': 'size-8', // 32px
      '4xl': 'size-9', // 36px
      '5xl': 'size-10', // 40px
      '6xl': 'size-12', // 48px
      '7xl': 'size-16', // 64px
    },
  },
  defaultVariants: {
    colored: false,
    size: 'md',
  },
});

export type IconVariants = VariantProps<typeof iconVariants>;
