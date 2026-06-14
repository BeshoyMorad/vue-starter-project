<script setup lang="ts">
  import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';

  const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>();

  const emits = defineEmits<DropdownMenuRadioItemEmits>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    v-bind="forwarded"
    :class="
      cn(
        'group relative flex select-none items-center gap-2 rounded-md py-3 px-4 text-sm outline-none transition-colors  duration-500 data-disabled:pointer-events-none cursor-pointer data-disabled:opacity-50',
        props.class
      )
    "
  >
    <span
      class="flex size-3 p-1 items-center justify-center border border-border-default rounded-full group-data-[state=checked]:border-bg-primary-default"
    >
      <DropdownMenuItemIndicator>
        <slot name="indicator">
          <span class="block size-1.5 bg-bg-primary-default rounded-full"></span>
        </slot>
      </DropdownMenuItemIndicator>
    </span>

    <slot />
  </DropdownMenuRadioItem>
</template>
