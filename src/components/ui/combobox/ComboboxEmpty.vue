<script setup lang="ts">
  import type { ComboboxEmptyProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { ComboboxEmpty, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = ComboboxEmptyProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxEmpty
    v-bind="forwarded"
    :class="cn('px-3 py-2 text-center text-sm text-text-placeholder', props.class)"
  >
    <slot />
  </ComboboxEmpty>
</template>
