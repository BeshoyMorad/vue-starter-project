<script setup lang="ts">
  import type { ComboboxItemIndicatorProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { ComboboxItemIndicator, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = ComboboxItemIndicatorProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxItemIndicator v-bind="forwarded" :class="cn(props.class)">
    <slot />
  </ComboboxItemIndicator>
</template>
