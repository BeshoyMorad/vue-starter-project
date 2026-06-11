import { cva, type VariantProps } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
  `inline-flex rounded-md font-medium cursor-pointer select-none items-center justify-center border relative disabled:pointer-events-none transition-colors duration-200 disabled:cursor-not-allowed
    disabled:[--color-accent-pressed:var(--color-border-disabled)]!
    disabled:[--color-accent-soft:var(--color-border-disabled)]!
    disabled:[--color-accent-solid:var(--color-bg-disabled)]!
    disabled:[--color-accent-contrast:var(--color-text-disabled)]!
  `,
  {
    variants: {
      color: {
        default: `
                [--color-accent-solid:var(--color-text-default)]
                [--color-accent-soft:var(--color-bg-hovered)]
                [--color-accent-contrast:var(--color-text-base)]
                [--color-accent-pressed:var(--color-border-default)]
                `,
        primary: `
                [--color-accent-solid:var(--color-bg-primary-default)]
                [--color-accent-soft:var(--color-bg-primary-hovered-invert)]
                [--color-accent-contrast:var(--color-text-base)]
                [--color-accent-pressed:var(--color-bg-primary-pressed)]
                `,
        info: `
                [--color-accent-solid:var(--color-bg-info-default)]
                [--color-accent-soft:var(--color-bg-info-hovered-invert)]
                [--color-accent-contrast:var(--color-text-base)]
                [--color-accent-pressed:var(--color-bg-info-pressed)]
                `,
        success: `
                [--color-accent-solid:var(--color-bg-success-default)]
                [--color-accent-soft:var(--color-bg-success-hovered-invert)]
                [--color-accent-contrast:var(--color-text-base)]
                [--color-accent-pressed:var(--color-bg-success-pressed)]
                `,
        warning: `
                [--color-accent-solid:var(--color-bg-warning-default)]
                [--color-accent-soft:var(--color-bg-warning-hovered-invert)]
                [--color-accent-contrast:var(--color-text-base)]
                [--color-accent-pressed:var(--color-bg-warning-pressed)]
                `,
        danger: `
                [--color-accent-solid:var(--color-bg-danger-default)]
                [--color-accent-soft:var(--color-bg-danger-hovered-invert)]
                [--color-accent-contrast:var(--color-text-base)]
                [--color-accent-pressed:var(--color-bg-danger-pressed)]
                `,
      },
      variant: {
        filled: `
          bg-(--color-accent-solid) hover:bg-(--color-accent-pressed) active:bg-(--color-accent-pressed)
          text-(--color-accent-contrast)
          border-(--color-accent-solid) hover:border-(--color-accent-pressed) active:border-(--color-accent-pressed)
          `,

        outlined: `
          hover:bg-(--color-accent-soft) active:bg-(--color-accent-solid)
          text-(--color-accent-solid) active:text-text-base
          border-(--color-accent-solid)
          `,

        dashed: `
          hover:bg-(--color-accent-soft) active:bg-(--color-accent-solid)
          text-(--color-accent-solid) active:text-text-base
          border-(--color-accent-solid) border-dashed
          `,

        text: `
          text-(--color-accent-solid) hover:text-(--color-accent-pressed)
          border-transparent
          `,

        soft: `
          bg-(--color-accent-soft) hover:bg-(--color-accent-solid)/70 active:bg-(--color-accent-pressed)
          text-(--color-accent-solid) hover:text-text-base
          border-(--color-accent-soft) active:border-(--color-accent-pressed)
          `,

        ghost: `
          bg-transparent hover:bg-bg-hovered
          text-text-default
          border-transparent
          `,
      },
      size: {
        'x-small': 'h-6 gap-1 text-xs',
        small: 'h-10 py-2 px-2 gap-2 text-xs',
        default: 'h-10 py-2 px-3 gap-2.5 text-sm',
        large: 'h-12 py-2 px-3.5 gap-3 text-lg',
        icon: 'size-9 shrink-0 gap-0 p-0',
      },
      iconPos: {
        left: '',
        right: 'flex-row-reverse',
      },
    },
    defaultVariants: {
      color: 'default',
      variant: 'filled',
      size: 'default',
      iconPos: 'left',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
