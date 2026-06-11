<script setup lang="ts">
  import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { DialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';
  import DialogOverlay from './DialogOverlay.vue';

  type Props = DialogContentProps & { class?: HTMLAttributes['class'] };

  const props = defineProps<Props>();
  const emits = defineEmits<DialogContentEmits>();

  const delegatedProps = reactiveOmit(props, 'class');
  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-bg-surface text-text-default shadow-2xl rounded-3xl overflow-y-auto max-h-[94svh] hide-scrollbar data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border duration-200 sm:max-w-lg',
          props.class
        )
      "
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
