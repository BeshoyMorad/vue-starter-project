<script setup lang="ts">
  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import {
    DropdownMenuCheckboxItem,
    DropdownMenuItemIndicator,
    useForwardPropsEmits,
  } from 'reka-ui';
  import { cn } from '@/utils';

  const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes['class'] }>();
  const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuCheckboxItem
    data-slot="dropdown-menu-checkbox-item"
    v-bind="forwarded"
    :class="
      cn(
        'relative flex select-none items-center gap-2 rounded-md py-3 px-4 text-sm outline-none transition-colors  duration-500 data-disabled:pointer-events-none cursor-pointer data-disabled:opacity-50',
        props.class
      )
    "
  >
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <slot name="indicator">✓</slot>
      </DropdownMenuItemIndicator>
    </span>

    <slot />
  </DropdownMenuCheckboxItem>
</template>
