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
        'min-w-0 flex flex-1 gap-1.5 items-center border-none bg-transparent p-0 outline-none',
        props.class
      )
    "
  >
    <slot />
  </ComboboxTrigger>
</template>
