<script setup lang="ts">
  import type { HtmlHTMLAttributes } from 'vue';
  import { cn } from '@/utils';
  import { iconVariants, type IconVariants } from '.';

  const props = defineProps<{
    testId?: string;
    icon: HtmlHTMLAttributes['class'];
    colored?: IconVariants['colored'];
    size?: IconVariants['size'];
  }>();
</script>

<template>
  <span :data-test-id="props.testId" :class="cn([iconVariants({ colored, size }), icon])" />
</template>
