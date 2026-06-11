<script setup lang="ts">
  import type { DialogCloseProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { DialogClose, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  type Props = DialogCloseProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <DialogClose v-bind="forwarded" data-slot="dialog-close" :class="cn(props.class)">
    <slot />
  </DialogClose>
</template>
