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
    :class="cn('font-medium text-text-disabled rounded-md flex-1 text-[0.8rem]', props.class)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
