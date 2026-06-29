<script setup lang="ts">
  import type { RadioGroupItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'border-border-default aria-checked:border-border-primary aria-invalid:ring-danger-300 aria-invalid:border-border-danger aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="relative flex items-center justify-center"
    >
      <slot>
        <span
          class="bg-bg-primary-default absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </slot>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
