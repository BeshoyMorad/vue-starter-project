<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  const props = withDefaults(
    defineProps<{
      class?: HTMLAttributes['class'];
    }>(),
    {
      class: undefined,
    }
  );
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="
      cn(
        'border-border-disabled bg-bg-surface flex w-full items-center justify-end gap-4 border-t px-6 py-4',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
