<script setup lang="ts" generic="T extends Record<string, any>">
  import type { BulletLegendItemInterface } from '@unovis/ts';
  import type { Component } from 'vue';
  import type { DonutChartProps } from '@/components/ui/chart/interface';
  import { Donut } from '@unovis/ts';
  import { VisDonut, VisSingleContainer } from '@unovis/vue';
  import { useMounted } from '@vueuse/core';
  import { computed, defineComponent, h, nextTick, onMounted, ref, useSlots, watch } from 'vue';
  import { cn } from '@/utils';
  import { ChartLegend, ChartSingleTooltip, defaultColors } from '@/components/ui/chart';

  const props = withDefaults(
    defineProps<
      DonutChartProps<T> & {
        /**
         * Render custom tooltip component.
         */
        customTooltip?: Component;
      }
    >(),
    {
      margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
      sortFunction: () => undefined,
      type: 'donut',
      filterOpacity: 0.2,
      showTooltip: true,
      showLegend: true,
      customTooltip: undefined,
      valueFormatter: undefined,
      centralLabel: undefined,
      centralSubLabel: undefined,
      arcWidth: 28,
      cornerRadius: 4,
      padAngle: 0.02,
    }
  );

  type KeyOfT = Extract<keyof T, string>;
  type Data = (typeof props.data)[number];

  defineSlots<{
    default?: () => unknown;
    center?: () => unknown;
    'custom-tooltip'?: (props: {
      title: string;
      data: { name: string; color: string; value: unknown }[];
    }) => unknown;
  }>();

  const slots = useSlots();

  const resolvedTooltip = computed(() => {
    if (props.customTooltip) return props.customTooltip;
    if (slots['custom-tooltip']) {
      return defineComponent({
        props: {
          title: { type: String, default: '' },
          data: { type: Array, default: () => [] },
        },
        setup(slotProps) {
          return () => h('div', slots['custom-tooltip']?.(slotProps));
        },
      });
    }
    return undefined;
  });

  const valueFormatter = props.valueFormatter ?? ((tick: number) => `${tick}`);
  const category = computed(() => props.category as KeyOfT);
  const index = computed(() => props.index as KeyOfT);

  const isMounted = useMounted();
  const containerRef = ref<HTMLElement>();
  const colors = computed(() =>
    props.colors?.length
      ? props.colors
      : defaultColors(props.data.filter((d) => d[props.category]).filter(Boolean).length)
  );

  const legendItems = ref<BulletLegendItemInterface[]>(
    props.data.map((item, i) => ({
      name: item[props.index],
      color: colors.value[i],
      inactive: false,
    }))
  );

  const activeCategoryIndex = computed(() => {
    const hasInactive = legendItems.value.some((item) => item.inactive);
    if (!hasInactive) return -1;
    return legendItems.value.findIndex((item) => !item.inactive);
  });

  const donutColors = computed(() => {
    const hasInactive = legendItems.value.some((item) => item.inactive);
    if (!hasInactive) return colors.value;
    return colors.value.map((c, i) => {
      const isInactive = legendItems.value[i]?.inactive;
      return isInactive ? `color-mix(in srgb, ${c} ${props.filterOpacity * 100}%, transparent)` : c;
    });
  });

  function syncSegmentStates() {
    const container = containerRef.value;
    if (!container) return;
    const segments = container.querySelectorAll<SVGPathElement>('path[unovis-pattern-index]');
    const hasInactive = legendItems.value.some((item) => item.inactive);
    segments.forEach((el) => {
      const idxAttr = el.getAttribute('unovis-pattern-index');
      const idx = idxAttr !== null ? parseInt(idxAttr, 10) : NaN;
      const item = !isNaN(idx) ? legendItems.value[idx] : undefined;
      const isInactive = hasInactive && (item ? item.inactive : false);
      if (isInactive) {
        el.setAttribute('data-inactive', 'true');
        el.style.setProperty('opacity', `${props.filterOpacity}`, 'important');
      } else {
        el.removeAttribute('data-inactive');
        el.style.setProperty('opacity', '1', 'important');
      }
    });
  }

  function handleLegendItemClick(_d: BulletLegendItemInterface, _i: number) {
    nextTick(() => {
      syncSegmentStates();
    });
  }

  watch(
    legendItems,
    () => {
      nextTick(() => {
        syncSegmentStates();
      });
    },
    { deep: true, flush: 'post' }
  );

  onMounted(() => {
    nextTick(() => {
      syncSegmentStates();
    });
  });

  function handleSegmentClick(d: { index?: number }, _ev: PointerEvent, i: number) {
    const sliceIndex = typeof d?.index === 'number' ? d.index : i;
    const isBulletActive = !legendItems.value[sliceIndex]?.inactive;
    const isFilterApplied = legendItems.value.some((item) => item.inactive);
    if (isFilterApplied && isBulletActive) {
      legendItems.value = legendItems.value.map((item) => ({ ...item, inactive: false }));
    } else {
      legendItems.value = legendItems.value.map((item, idx) =>
        idx === sliceIndex ? { ...item, inactive: false } : { ...item, inactive: true }
      );
    }
    nextTick(() => {
      syncSegmentStates();
    });
  }

  watch(
    () => props.data,
    (newData) => {
      legendItems.value = newData.map((item, i) => ({
        name: item[props.index],
        color: colors.value[i],
        inactive: false,
      }));
      nextTick(() => {
        syncSegmentStates();
      });
    }
  );

  const totalValue = computed(() =>
    props.data.reduce((prev, curr) => {
      return prev + curr[props.category];
    }, 0)
  );
</script>

<template>
  <div
    :class="
      cn('flex w-full flex-col items-center justify-between gap-6 md:flex-row', $attrs.class ?? '')
    "
  >
    <div
      ref="containerRef"
      class="relative flex min-h-55 w-full flex-1 items-center justify-center"
      :style="{ '--vis-donut-filter-opacity': `${filterOpacity}` }"
      :data-active-index="activeCategoryIndex"
    >
      <VisSingleContainer
        :style="{ height: isMounted ? '100%' : 'auto' }"
        :margin="margin"
        :data="data"
      >
        <ChartSingleTooltip
          :selector="Donut.selectors.segment"
          :index="index"
          :category="category"
          :items="legendItems"
          :value-formatter="valueFormatter"
          :custom-tooltip="resolvedTooltip"
        />

        <VisDonut
          :value="(d: Data) => d[category]"
          :sort-function="sortFunction"
          :color="donutColors"
          :arc-width="type === 'donut' ? arcWidth : 0"
          :corner-radius="cornerRadius"
          :pad-angle="padAngle"
          :central-label="
            $slots.center
              ? undefined
              : (centralLabel ?? (type === 'donut' ? valueFormatter(totalValue) : undefined))
          "
          :central-sub-label="$slots.center ? undefined : centralSubLabel"
          :events="{
            [Donut.selectors.segment]: {
              click: handleSegmentClick,
            },
          }"
        />

        <slot />
      </VisSingleContainer>

      <div
        v-if="$slots.center"
        class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <slot name="center" />
      </div>
    </div>

    <div v-if="showLegend" class="flex shrink-0 items-center justify-center">
      <ChartLegend v-model:items="legendItems" @legend-item-click="handleLegendItemClick" />
    </div>
  </div>
</template>
