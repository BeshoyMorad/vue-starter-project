<script setup lang="ts">
  import type { ComboboxViewportProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { ComboboxViewport, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = ComboboxViewportProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxViewport v-bind="forwarded" :class="cn('p-1', props.class)">
    <slot />
  </ComboboxViewport>
</template>
