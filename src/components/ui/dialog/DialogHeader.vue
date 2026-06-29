<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <div
    data-slot="dialog-header"
    :class="
      cn(
        'border-border-disabled bg-bg-default flex shrink-0 items-center justify-between border-b-[0.5px] px-6 py-4 text-lg font-medium',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
