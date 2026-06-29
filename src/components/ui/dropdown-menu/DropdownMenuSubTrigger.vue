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
        'relative flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 text-sm transition-colors duration-500 outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50',
        props.class
      )
    "
  >
    <slot />
    <Icon icon="hugeicons--arrow-right-01" />
  </DropdownMenuSubTrigger>
</template>
