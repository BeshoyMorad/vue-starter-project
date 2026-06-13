<script setup lang="ts">
  import { useTemplateRef, type HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
    containerClass?: HTMLAttributes['class'];
  }>();

  const containerRef = useTemplateRef<HTMLElement>('containerRef');

  defineExpose({
    containerRef,
  });
</script>

<template>
  <div
    ref="containerRef"
    data-slot="table-container"
    :class="cn('relative w-full overflow-auto rounded-md bg-bg-surface', props.containerClass)"
  >
    <table data-slot="table" :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>

    <slot name="footer" />
  </div>
</template>
