<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <tr
    data-slot="table-row"
    :class="cn('border-border-disabled border-b transition-colors', props.class)"
  >
    <slot />
  </tr>
</template>
