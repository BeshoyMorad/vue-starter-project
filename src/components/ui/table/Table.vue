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
    :class="cn('bg-bg-surface relative w-full overflow-auto rounded-md', props.containerClass)"
  >
    <div data-slot="table-wrapper" class="hide-scrollbar w-full overflow-x-auto">
      <table data-slot="table" :class="cn('w-full caption-bottom text-sm', props.class)">
        <slot />
      </table>
    </div>

    <slot name="footer" />
  </div>
</template>
