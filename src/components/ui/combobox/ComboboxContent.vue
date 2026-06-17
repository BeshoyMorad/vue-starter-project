<script setup lang="ts">
  import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { ComboboxContent, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = ComboboxContentProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();
  const emits = defineEmits<ComboboxContentEmits>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxContent
    v-bind="forwarded"
    :class="
      cn(
        'z-50 w-(--reka-combobox-trigger-width) overflow-auto rounded-md border border-border-disabled bg-bg-surface text-text-default shadow-sm',
        props.class
      )
    "
  >
    <slot />
  </ComboboxContent>
</template>
