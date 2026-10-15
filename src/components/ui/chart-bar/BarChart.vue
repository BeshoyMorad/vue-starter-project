<script setup lang="ts" generic="T extends Record<string, any>">
  import type { BulletLegendItemInterface } from '@unovis/ts';
  import type { Component } from 'vue';
  import type { BaseChartProps } from '.';
  import { GroupedBar, StackedBar } from '@unovis/ts';
  import { VisAxis, VisGroupedBar, VisStackedBar, VisXYContainer } from '@unovis/vue';
  import { useMounted } from '@vueuse/core';
  import { computed, defineComponent, h, ref, useSlots } from 'vue';
  import { cn } from '@/utils';
  import { ChartCrosshair, ChartLegend, defaultColors } from '@/components/ui/chart';

  const props = withDefaults(
    defineProps<
      BaseChartProps<T> & {
        /**
         * Render custom tooltip component.
         */
        customTooltip?: Component;
        /**
         * Change the type of the chart
         * @default "grouped"
         */
        type?: 'stacked' | 'grouped';
        /**
         * Rounded bar corners
         * @default 6
         */
        roundedCorners?: number;
        /**
         * Bar padding
         * @default 0.2
         */
        barPadding?: number;
      }
    >(),
    {
      type: 'grouped',
      margin: () => ({}),
      filterOpacity: 0.2,
      roundedCorners: 6,
      barPadding: 0.2,
      showXAxis: true,
      showYAxis: true,
      showTooltip: true,
      showLegend: true,
      showGridLine: true,
      customTooltip: undefined,
    }
  );
  const emits = defineEmits<{
    legendItemClick: [d: BulletLegendItemInterface, i: number];
  }>();

  defineSlots<{
    default?: () => unknown;
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

  type KeyOfT = Extract<keyof T, string>;
  type Data = (typeof props.data)[number];

  const index = computed(() => props.index as KeyOfT);
  const colors = computed(() =>
    props.colors?.length ? props.colors : defaultColors(props.categories.length)
  );
  const legendItems = ref<BulletLegendItemInterface[]>(
    props.categories.map((category, i) => ({
      name: category,
      color: colors.value[i],
      inactive: false,
    }))
  );

  const isMounted = useMounted();

  const defaultMargin = computed(() => ({
    top: props.margin?.top ?? 10,
    bottom: props.margin?.bottom ?? 24,
    left: props.margin?.left ?? 75,
    right: props.margin?.right ?? 20,
  }));

  function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
    emits('legendItemClick', d, i);
  }

  const VisBarComponent = computed(() =>
    props.type === 'grouped' ? VisGroupedBar : VisStackedBar
  );
  const selectorsBar = computed(() =>
    props.type === 'grouped' ? GroupedBar.selectors.bar : StackedBar.selectors.bar
  );
</script>

<template>
  <div
    :class="cn('flex h-100 w-full flex-col items-end', $attrs.class ?? '')"
    :data-show-grid="showGridLine ? 'true' : 'false'"
  >
    <ChartLegend
      v-if="showLegend"
      v-model:items="legendItems"
      @legend-item-click="handleLegendItemClick"
    />

    <VisXYContainer
      :data="data"
      :style="{ height: isMounted ? '100%' : 'auto' }"
      :margin="defaultMargin"
    >
      <ChartCrosshair
        v-if="showTooltip"
        :colors="colors"
        :items="legendItems"
        :value-formatter="yFormatter"
        :custom-tooltip="resolvedTooltip"
        :index="index"
      />

      <VisBarComponent
        :x="(_d: Data, i: number) => i"
        :y="categories.map((category) => (d: Data) => d[category])"
        :color="colors"
        :rounded-corners="roundedCorners"
        :bar-padding="barPadding"
        :attributes="{
          [selectorsBar]: {
            opacity: (_d: Data, i: number) => {
              const pos = i % categories.length;
              return legendItems[pos]?.inactive ? filterOpacity : 1;
            },
          },
        }"
      />

      <VisAxis
        v-if="showXAxis"
        type="x"
        :num-ticks="data.length"
        :tick-values="data.map((_, i) => i)"
        :tick-format="xFormatter ?? ((v: number) => data[v]?.[index] ?? '')"
        :grid-line="false"
        :tick-line="false"
        :domain-line="true"
        tick-text-color="var(--vis-text-color)"
      />
      <VisAxis
        v-if="showYAxis"
        type="y"
        :tick-line="false"
        :tick-format="yFormatter"
        :domain-line="true"
        :grid-line="showGridLine"
        tick-text-color="var(--vis-text-color)"
      />

      <slot />
    </VisXYContainer>
  </div>
</template>
