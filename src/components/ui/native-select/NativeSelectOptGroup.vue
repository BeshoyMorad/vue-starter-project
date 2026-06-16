<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <optgroup
    data-slot="native-select-optgroup"
    :class="cn('bg-bg-surface text-text-default', props.class)"
  >
    <slot />
  </optgroup>
</template>
