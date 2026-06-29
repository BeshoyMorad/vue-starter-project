<script setup lang="ts">
  import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { DialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';
  import DialogOverlay from './DialogOverlay.vue';

  type Props = DialogContentProps & {
    class?: HTMLAttributes['class'];
    dismissable?: boolean;
    closeOnEscape?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    class: undefined,
    dismissable: true,
    closeOnEscape: true,
  });
  const emits = defineEmits<DialogContentEmits>();

  const delegatedProps = reactiveOmit(props, 'class', 'dismissable', 'closeOnEscape');
  const forwarded = useForwardPropsEmits(delegatedProps, emits);

  const onEscapeKeyDown = (event: KeyboardEvent) => {
    if (!props.closeOnEscape) {
      event.preventDefault();
    }
  };

  const onInteractOutside = (event: Event) => {
    if (!props.dismissable) {
      event.preventDefault();
    }
  };

  const onPointerDownOutside = (event: Event) => {
    if (!props.dismissable) {
      event.preventDefault();
    }
  };
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-bg-surface text-text-default hide-scrollbar data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid max-h-[94svh] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-3xl border shadow-2xl duration-200 sm:max-w-lg',
          props.class
        )
      "
      @escape-key-down="onEscapeKeyDown"
      @interact-outside="onInteractOutside"
      @pointer-down-outside="onPointerDownOutside"
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
