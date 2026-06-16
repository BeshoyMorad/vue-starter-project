<script setup lang="ts">
  import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/utils';
  import { Icon } from '@/components';

  interface CheckboxProps extends CheckboxRootProps {
    class?: HTMLAttributes['class'];
    size?: 'small' | 'default' | 'large';
    shape?: 'circle' | 'square';
  }

  const props = withDefaults(defineProps<CheckboxProps>(), {
    class: undefined,
    size: 'default',
    shape: 'square',
  });

  const emits = defineEmits<CheckboxRootEmits>();

  const trackVariants = cva(
    [
      'peer shrink-0 border shadow-xs transition-shadow outline-none',
      'focus-visible:bg-bg-pressed',
      'data-[state=checked]:bg-bg-primary-default data-[state=checked]:border-bg-primary-default',
      'aria-invalid:border-border-danger aria-invalid:bg-bg-danger-default-invert',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-disabled disabled:border-border-disabled',
    ],
    {
      variants: {
        size: {
          small: 'size-3.5',
          default: 'size-4',
          large: 'size-5',
        },
        shape: {
          square: 'rounded-sm',
          circle: 'rounded-full',
        },
      },
      defaultVariants: {
        size: 'default',
        shape: 'square',
      },
    }
  );

  const iconSize = computed(() => {
    switch (props.size) {
      case 'small':
        return 'xs';
      case 'large':
        return 'md';
      default:
        return 'sm';
    }
  });

  const delegatedProps = reactiveOmit(props, 'class', 'size', 'shape');

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :true-value="true"
    :false-value="false"
    :class="cn(trackVariants({ size, shape }), props.class)"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current transition-none"
    >
      <slot v-bind="slotProps">
        <Icon test-id="checked-icon" icon="custom--check" :size="iconSize" class="text-text-base" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
