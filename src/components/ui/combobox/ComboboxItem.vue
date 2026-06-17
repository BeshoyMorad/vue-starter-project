<script setup lang="ts">
  import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = ComboboxItemProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();
  const emits = defineEmits<ComboboxItemEmits>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :class="
      cn(
        'relative flex cursor-pointer items-center gap-1 overflow-hidden rounded-sm border-none bg-transparent p-2 font-normal whitespace-nowrap transition-colors duration-200 hover:bg-bg-hovered data-highlighted:bg-bg-focused data-[state=checked]:bg-bg-default data-highlighted:data-[state=checked]:bg-bg-hovered',
        props.class
      )
    "
  >
    <slot />
  </ComboboxItem>
</template>
