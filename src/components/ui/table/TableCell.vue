<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <td
    data-slot="table-cell"
    :class="
      cn(
        'text-text-default px-2 py-3 align-middle text-sm whitespace-nowrap has-[[role=checkbox]]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        props.class
      )
    "
  >
    <slot />
  </td>
</template>
