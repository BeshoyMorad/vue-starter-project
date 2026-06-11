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
        'flex items-center justify-end gap-4 px-6 py-4 border-t border-border-disabled w-full bg-bg-surface',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
