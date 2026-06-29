<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  interface SkeletonProps {
    class?: HTMLAttributes['class'];
  }

  const props = defineProps<SkeletonProps>();
</script>

<template>
  <div data-slot="skeleton" :class="cn('bg-bg-loading animate-pulse rounded-md', props.class)" />
</template>
