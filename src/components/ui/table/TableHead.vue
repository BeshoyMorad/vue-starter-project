<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <th
    data-slot="table-head"
    :class="
      cn(
        'text-text-placeholder px-2 py-3 text-left align-middle text-sm font-normal whitespace-nowrap has-[[role=checkbox]]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        props.class
      )
    "
  >
    <slot />
  </th>
</template>
