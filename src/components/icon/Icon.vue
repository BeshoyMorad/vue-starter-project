<script setup lang="ts">
  import type { HTMLAttributes, HtmlHTMLAttributes } from 'vue';
  import { cn } from '@/utils';
  import { iconVariants, type IconVariants } from '.';

  const props = defineProps<{
    testId: string;
    icon: HtmlHTMLAttributes['class'];
    colored?: IconVariants['colored'];
    size?: IconVariants['size'];
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <span
    :data-test-id="props.testId"
    :class="cn([iconVariants({ colored, size }), props.class, icon])"
  />
</template>
