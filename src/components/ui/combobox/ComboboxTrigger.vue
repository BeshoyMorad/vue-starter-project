<script setup lang="ts">
  import type { ComboboxTriggerProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { ComboboxTrigger, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = ComboboxTriggerProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxTrigger
    v-bind="forwarded"
    :class="
      cn(
        'flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 outline-none',
        props.class
      )
    "
  >
    <slot />
  </ComboboxTrigger>
</template>
