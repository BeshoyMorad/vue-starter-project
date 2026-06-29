<script lang="ts" setup>
  import type { CalendarCellTriggerProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { CalendarCellTrigger, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';
  import { buttonVariants } from '@/components/ui/button';

  const props = withDefaults(
    defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(),
    {
      as: 'button',
      class: '',
    }
  );

  const delegatedProps = reactiveOmit(props, 'class');

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarCellTrigger
    data-slot="calendar-cell-trigger"
    :class="
      cn(
        buttonVariants({ variant: 'ghost' }),
        'size-8 cursor-default p-0 font-normal aria-selected:opacity-100',
        '[&[data-today]:not([data-selected])]:bg-bg-primary-default-invert [&[data-today]:not([data-selected])]:text-text-primary',
        // Selected
        'data-selected:bg-bg-primary-default data-selected:text-text-base data-selected:opacity-100',
        // Disabled
        'data-disabled:text-text-disabled data-disabled:opacity-50',
        // Unavailable
        'data-unavailable:text-text-disabled data-unavailable:line-through',
        // Outside months
        'data-outside-view:text-text-disabled',
        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
