<script setup lang="ts">
  import type { ComboboxCancelProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { ComboboxCancel, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = ComboboxCancelProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxCancel
    v-bind="forwarded"
    :class="cn('inline-flex shrink-0 items-center justify-center', props.class)"
  >
    <slot />
  </ComboboxCancel>
</template>
