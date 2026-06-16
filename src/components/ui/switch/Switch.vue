<script setup lang="ts">
  import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/utils';

  interface SwitchProps extends SwitchRootProps {
    class?: HTMLAttributes['class'];
    size?: 'small' | 'default' | 'large';
  }

  const props = withDefaults(defineProps<SwitchProps>(), {
    class: undefined,
    size: 'default',
  });

  const emits = defineEmits<SwitchRootEmits>();

  const trackVariants = cva(
    [
      'relative z-0 items-center transition-colors duration-200 shrink-0 inline-flex cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-border-ring focus-visible:ring-offset-2',
      'bg-bg-pressed rounded-full',
      'hover:bg-bg-hovered-invert',
      'data-[state=checked]:bg-bg-primary-default',
      'hover:data-[state=checked]:bg-bg-primary-hovered',
      'disabled:bg-bg-disabled disabled:cursor-not-allowed disabled:opacity-50',
      'data-[disabled]:bg-bg-disabled data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      'aria-invalid:bg-bg-danger-default',
    ],
    {
      variants: {
        size: {
          small: 'h-4 w-8 px-0.5 py-0.5',
          default: 'h-6 w-12 px-1 py-0.5',
          large: 'h-7 w-14 px-1 py-0.5',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  );

  const thumbVariants = cva(
    [
      'rounded-full pointer-events-none absolute top-1/2 -translate-y-1/2 bg-bg-surface shadow-xs transition-[left,inset-inline-start] duration-200',
    ],
    {
      variants: {
        size: {
          small: 'h-2.5 w-2.5 start-[2px] data-[state=checked]:start-[18px]',
          default: 'size-4 start-1 data-[state=checked]:start-7',
          large: 'size-5 start-1 data-[state=checked]:start-8',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  );

  const delegatedProps = reactiveOmit(props, 'class', 'size');

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SwitchRoot
    v-slot="slotProps"
    data-slot="switch"
    v-bind="forwarded"
    :true-value="true"
    :false-value="false"
    :class="cn(trackVariants({ size }), props.class)"
  >
    <SwitchThumb data-slot="switch-thumb" :class="cn(thumbVariants({ size }))">
      <slot name="thumb" v-bind="slotProps" />
    </SwitchThumb>
  </SwitchRoot>
</template>
