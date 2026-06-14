<script setup lang="ts">
  import type { NumberFieldDecrementProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { NumberFieldDecrement, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';
  import { Icon } from '@/components';

  const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <NumberFieldDecrement
    data-slot="decrement"
    v-bind="forwarded"
    :class="
      cn(
        'absolute top-1/2 -translate-y-1/2 left-0 px-2.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-20',
        props.class
      )
    "
  >
    <slot>
      <Icon test-id="number-field-decrement-icon" icon="hugeicons--minus-sign" />
    </slot>
  </NumberFieldDecrement>
</template>
