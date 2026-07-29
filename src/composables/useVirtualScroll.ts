import type { Ref } from 'vue';
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

export interface UseVirtualScrollOptions<T extends unknown[] = unknown[]> {
  containerRef: Ref<HTMLElement | null>;
  items: Ref<T> | (() => T);
  itemHeight: Ref<number> | (() => number) | number;
  overscan?: Ref<number> | (() => number) | number;
  enabled?: Ref<boolean> | (() => boolean) | boolean;
}

export interface UseVirtualScrollReturn<T extends unknown[] = unknown[]> {
  scrollTop: Ref<number>;
  containerHeight: Ref<number>;
  totalItems: Ref<number>;
  totalHeight: Ref<number>;
  startIndex: Ref<number>;
  endIndex: Ref<number>;
  visibleItems: Ref<T>;
  offsetTop: Ref<number>;
}

function resolveValue<R>(val: Ref<R> | (() => R) | R | undefined, defaultValue: R): R {
  if (val === undefined) return defaultValue;
  if (typeof val === 'function') return (val as () => R)();
  if (typeof val === 'object' && val !== null && 'value' in val) return (val as Ref<R>).value;
  return val as R;
}

function useContainerDimensions(containerRef: Ref<HTMLElement | null>) {
  const scrollTop = ref(0);
  const containerHeight = ref(0);
  let resizeObserver: ResizeObserver | null = null;

  const handleScroll = () => {
    if (containerRef.value) {
      scrollTop.value = containerRef.value.scrollTop;
    }
  };

  const updateHeight = () => {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight;
    }
  };

  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true });
      updateHeight();
      resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(containerRef.value);
    }
  });

  onUnmounted(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', handleScroll);
    }
    resizeObserver?.disconnect();
  });

  watch(
    () => containerRef.value,
    (newEl, oldEl) => {
      if (oldEl) {
        oldEl.removeEventListener('scroll', handleScroll);
        resizeObserver?.unobserve(oldEl);
      }
      if (newEl) {
        newEl.addEventListener('scroll', handleScroll, { passive: true });
        updateHeight();
        if (!resizeObserver) resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(newEl);
      }
    }
  );

  return { scrollTop, containerHeight };
}

export function useVirtualScroll<T extends unknown[] = unknown[]>(
  options: UseVirtualScrollOptions<T>
): UseVirtualScrollReturn<T> {
  const { containerRef } = options;
  const { scrollTop, containerHeight } = useContainerDimensions(containerRef);

  const items = computed(
    () => resolveValue(options.items, [] as unknown as T) || ([] as unknown as T)
  );
  const itemHeight = computed(() => resolveValue(options.itemHeight, 50));
  const overscan = computed(() => resolveValue(options.overscan, 5));
  const enabled = computed(() => resolveValue(options.enabled, true));

  const totalItems = computed(() => items.value.length);
  const totalHeight = computed(() => totalItems.value * itemHeight.value);

  const visibleCount = computed(() => {
    if (!containerHeight.value || !itemHeight.value) return 10;
    return Math.ceil(containerHeight.value / itemHeight.value);
  });

  const startIndex = computed(() => {
    if (!enabled.value) return 0;
    const index = Math.floor(scrollTop.value / itemHeight.value) - overscan.value;
    return Math.max(0, index);
  });

  const endIndex = computed(() => {
    if (!enabled.value) return totalItems.value;
    const index = startIndex.value + visibleCount.value + overscan.value * 2;
    return Math.min(totalItems.value, index);
  });

  const visibleItems = computed(() => {
    if (!enabled.value) return items.value;
    return items.value.slice(startIndex.value, endIndex.value) as unknown as T;
  });

  const offsetTop = computed(() => (enabled.value ? startIndex.value * itemHeight.value : 0));

  return {
    scrollTop,
    containerHeight,
    totalItems,
    totalHeight,
    startIndex,
    endIndex,
    visibleItems,
    offsetTop,
  };
}
