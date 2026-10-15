<script setup lang="ts" generic="T extends Record<string, any>">
  import type { BulletLegendItemInterface } from '@unovis/ts';
  import type { Component } from 'vue';
  import type { BaseChartProps } from '.';
  import { Area, CurveType, Line } from '@unovis/ts';

  import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue';
  import { useMounted } from '@vueuse/core';
  import { useId } from 'reka-ui';
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
         * Type of curve
         */
        curveType?: CurveType | `${CurveType}`;
        /**
         * Controls the visibility of gradient.
         * @default true
         */
        showGradient?: boolean;
      }
    >(),
    {
      curveType: CurveType.MonotoneX,
      filterOpacity: 0.2,
      margin: () => ({}),
      showXAxis: true,
      showYAxis: true,
      showTooltip: true,
      showLegend: true,
      showGridLine: true,
      showGradient: true,
      customTooltip: undefined,
    }
  );

  const emits = defineEmits<{
    legendItemClick: [d: BulletLegendItemInterface, i: number];
  }>();

  defineSlots<{
    default?: () => unknown;
    defs?: () => unknown;
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

  const chartRef = useId();

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
    left: props.margin?.left ?? 40,
    right: props.margin?.right ?? 20,
  }));

  function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
    emits('legendItemClick', d, i);
  }
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
      :style="{ height: isMounted ? '100%' : 'auto' }"
      :margin="defaultMargin"
      :data="data"
    >
      <svg width="0" height="0">
        <defs>
          <slot name="defs" />
          <linearGradient
            v-for="(color, i) in colors"
            :id="`${chartRef}-color-${i}`"
            :key="i"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <template v-if="showGradient">
              <stop offset="5%" :stop-color="color" stop-opacity="0.35" />
              <stop offset="95%" :stop-color="color" stop-opacity="0" />
            </template>
            <template v-else>
              <stop offset="0%" :stop-color="color" />
            </template>
          </linearGradient>
        </defs>
      </svg>

      <ChartCrosshair
        v-if="showTooltip"
        :colors="colors"
        :items="legendItems"
        :value-formatter="yFormatter"
        :index="index"
        :custom-tooltip="resolvedTooltip"
      />

      <template v-for="(category, i) in categories" :key="category">
        <VisArea
          :x="(_d: Data, i: number) => i"
          :y="(d: Data) => d[category]"
          color="auto"
          :curve-type="curveType"
          :attributes="{
            [Area.selectors.area]: {
              fill: `url(#${chartRef}-color-${i})`,
            },
          }"
          :opacity="
            legendItems.find((item) => item.name === category)?.inactive ? filterOpacity : 1
          "
        />
      </template>

      <template v-for="(category, i) in categories" :key="category">
        <VisLine
          :x="(_d: Data, i: number) => i"
          :y="(d: Data) => d[category]"
          :color="colors[i]"
          :curve-type="curveType"
          :attributes="{
            [Line.selectors.line]: {
              opacity: legendItems.find((item) => item.name === category)?.inactive
                ? filterOpacity
                : 1,
              style: 'stroke-width: 2.5px;',
            },
          }"
        />
      </template>

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
