<script setup lang="ts">
  import type { DropdownMenuSubTriggerProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';
  import { Icon } from '@/components';

  const props = defineProps<
    DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class']; inset?: boolean }
  >();

  const delegatedProps = reactiveOmit(props, 'class', 'inset');
  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    v-bind="forwardedProps"
    :data-inset="inset ? '' : undefined"
    :class="
      cn(
        'relative flex select-none items-center gap-2 rounded-md py-3 px-4 text-sm outline-none transition-colors  duration-500 data-disabled:pointer-events-none cursor-pointer data-disabled:opacity-50',
        props.class
      )
    "
  >
    <slot />
    <Icon icon="hugeicons--arrow-right-01" />
  </DropdownMenuSubTrigger>
</template>
