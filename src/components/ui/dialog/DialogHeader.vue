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
        'flex items-center justify-between shrink-0 py-4 px-6 border-b-[0.5px] border-border-disabled bg-bg-default font-medium text-lg',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
