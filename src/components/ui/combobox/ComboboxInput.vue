<script setup lang="ts">
  import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { ComboboxInput, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = ComboboxInputProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();
  const emits = defineEmits<ComboboxInputEmits>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxInput
    v-bind="forwarded"
    :class="
      cn(
        'border-border-disabled text-text-default placeholder:text-text-placeholder enabled:hover:border-border-primary enabled:focus:border-border-primary disabled:bg-bg-disabled disabled:text-text-disabled w-full appearance-none rounded-md border py-1 ps-3 pe-10 shadow-sm outline-hidden transition-colors duration-200',
        props.class
      )
    "
  >
    <slot />
  </ComboboxInput>
</template>
