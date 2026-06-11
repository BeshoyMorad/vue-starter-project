<script setup lang="ts" generic="T extends Array<any>">
  import { computed, ref } from 'vue';
  import { useInfiniteScroll } from '@vueuse/core';
  import { Icon } from '@/components';
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/utils';

  interface Props {
    hasMore: boolean;
    loading: boolean;
    disabled?: boolean;
    distance?: number;
    height?: string;
    maxHeight?: string;
    class?: HTMLAttributes['class'];
    hideScrollbar?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    distance: 120,
    height: 'auto',
    maxHeight: '400px',
    class: '',
    hideScrollbar: true,
  });

  const emit = defineEmits<{
    'load-more': [];
  }>();

  const containerRef = ref<HTMLElement | null>(null);

  const canLoad = computed(() => {
    return !props.disabled && !props.loading && props.hasMore;
  });

  useInfiniteScroll(
    containerRef,
    () => {
      if (!canLoad.value) return;
      emit('load-more');
    },
    {
      distance: props.distance,
      canLoadMore: () => canLoad.value,
      direction: 'bottom',
    }
  );

  defineExpose({
    containerRef,
  });
</script>

<template>
  <div
    ref="containerRef"
    :class="
      cn('w-full overflow-y-auto ', [
        {
          'hide-scrollbar': hideScrollbar,
        },
      ])
    "
    :style="{ height: props.height, maxHeight: props.maxHeight }"
  >
    <slot />

    <div
      v-if="props.loading"
      class="flex justify-center items-center text-sm text-text-placeholder shrink-0 py-4"
    >
      <slot name="loading">
        <Icon icon="hugeicons--loading-03" class="animate-spin size-5" />
      </slot>
    </div>
  </div>
</template>
