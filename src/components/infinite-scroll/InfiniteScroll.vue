<script setup lang="ts" generic="T extends unknown[] = unknown[]">
  import type { HTMLAttributes } from 'vue';
  import { computed, ref } from 'vue';
  import { useInfiniteScroll } from '@vueuse/core';
  import { Icon } from '@/components';
  import { cn } from '@/utils';
  import { useVirtualScroll } from '@/composables';

  interface Props {
    hasMore: boolean;
    loading: boolean;
    disabled?: boolean;
    distance?: number;
    height?: string;
    maxHeight?: string;
    class?: HTMLAttributes['class'];
    hideScrollbar?: boolean;

    /** Enable virtual scrolling for large datasets */
    virtual?: boolean;
    /** Array of items required when virtual is true */
    items?: T;
    /** Fixed height in px of each item (required for virtual scroll) */
    itemHeight?: number;
    /** Buffer of items rendered above and below visible area */
    overscan?: number;
    fitHeight?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    distance: 120,
    height: 'auto',
    maxHeight: '400px',
    class: '',
    hideScrollbar: true,
    virtual: false,
    items: () => [] as unknown as T,
    itemHeight: 140,
    overscan: 5,
    fitHeight: false,
  });

  const emit = defineEmits<{
    'load-more': [];
  }>();

  defineSlots<{
    default(props: { items: T; startIndex: number }): unknown;
    loading(): unknown;
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

  const { totalHeight, startIndex, endIndex, visibleItems, offsetTop } = useVirtualScroll<T>({
    containerRef,
    items: () => props.items,
    itemHeight: () => props.itemHeight,
    overscan: () => props.overscan,
    enabled: () => props.virtual,
  });

  const containerStyle = computed(() => {
    if (props.fitHeight) {
      return {
        flex: '1 1 0%',
        minHeight: '0',
      };
    }
    return {
      height: props.height,
      maxHeight: props.maxHeight,
    };
  });

  defineExpose({
    containerRef,
    startIndex,
    endIndex,
    visibleItems,
  });
</script>

<template>
  <div
    ref="containerRef"
    :class="
      cn('w-full overflow-y-auto', [
        {
          'hide-scrollbar': hideScrollbar,
          'min-h-0 flex-1': fitHeight,
        },
        props.class,
      ])
    "
    :style="containerStyle"
  >
    <template v-if="props.virtual">
      <div :style="{ height: `${totalHeight}px`, position: 'relative', width: '100%' }">
        <div :style="{ transform: `translateY(${offsetTop}px)` }">
          <slot :items="visibleItems" :start-index="startIndex" />
        </div>
      </div>
    </template>
    <template v-else>
      <slot :items="props.items" :start-index="0" />
    </template>

    <div
      v-if="props.loading"
      class="text-text-placeholder flex shrink-0 items-center justify-center py-4 text-sm"
    >
      <slot name="loading">
        <Icon icon="hugeicons--loading-03" class="size-5 animate-spin" />
      </slot>
    </div>
  </div>
</template>
