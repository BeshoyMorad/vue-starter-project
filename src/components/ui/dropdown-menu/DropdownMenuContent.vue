<script setup lang="ts">
  import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(
    defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>(),
    {
      class: '',
      sideOffset: 4,
    }
  );
  const emits = defineEmits<DropdownMenuContentEmits>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      data-slot="dropdown-menu-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-bg-surface text-text-default z-50 min-w-48 rounded-lg shadow overflow-hidden p-1 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class
        )
      "
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
