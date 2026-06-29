<script lang="ts" setup>
  import type { CalendarHeadCellProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { CalendarHeadCell, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  const props = defineProps<CalendarHeadCellProps & { class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarHeadCell
    data-slot="calendar-head-cell"
    :class="cn('text-text-disabled flex-1 rounded-md text-[0.8rem] font-medium', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
