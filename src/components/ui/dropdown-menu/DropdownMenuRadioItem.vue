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
        'group relative flex cursor-pointer items-center gap-2 rounded-md px-4 py-3 text-sm transition-colors duration-500 outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50',
        props.class
      )
    "
  >
    <span
      class="border-border-default group-data-[state=checked]:border-bg-primary-default flex size-3 items-center justify-center rounded-full border p-1"
    >
      <DropdownMenuItemIndicator>
        <slot name="indicator">
          <span class="bg-bg-primary-default block size-1.5 rounded-full"></span>
        </slot>
      </DropdownMenuItemIndicator>
    </span>

    <slot />
  </DropdownMenuRadioItem>
</template>
