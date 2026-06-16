<script setup lang="ts">
  import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { PopoverArrow, PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(
    defineProps<PopoverContentProps & { class?: HTMLAttributes['class']; showArrow?: boolean }>(),
    {
      align: 'center',
      sideOffset: 4,
      class: '',
      showArrow: true,
    }
  );
  const emits = defineEmits<PopoverContentEmits>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-bg-surface text-text-default z-50 w-72 rounded-xl p-4 shadow-2xl outline-hidden',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'origin-(--reka-popover-content-transform-origin)',
          props.class
        )
      "
    >
      <slot />

      <PopoverArrow
        v-if="showArrow"
        class="fill-bg-surface shadow-[1px_1px_0_0_rgba(0,0,0,0.05)]"
        :width="10"
        :height="5"
      />
    </PopoverContent>
  </PopoverPortal>
</template>
