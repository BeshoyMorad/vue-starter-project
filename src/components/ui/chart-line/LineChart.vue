<script setup lang="ts" generic="T extends Record<string, any>">
  import type { BulletLegendItemInterface } from '@unovis/ts';
  import type { Component } from 'vue';
  import type { BaseChartProps } from '.';
  import { CurveType, Line } from '@unovis/ts';

  import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue';
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
         * Type of curve
         */
        curveType?: CurveType | `${CurveType}`;
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
      customTooltip: undefined,
    }
  );

  const emits = defineEmits<{
    legendItemClick: [d: BulletLegendItemInterface, i: number];
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
      :margin="defaultMargin"
      :data="data"
      :style="{ height: isMounted ? '100%' : 'auto' }"
    >
      <ChartCrosshair
        v-if="showTooltip"
        :colors="colors"
        :items="legendItems"
        :value-formatter="yFormatter"
        :index="index"
        :custom-tooltip="resolvedTooltip"
      />

      <template v-for="(category, i) in categories" :key="category">
        <VisLine
          :x="(_d: Data, i: number) => i"
          :y="(d: Data) => d[category]"
          :curve-type="curveType"
          :color="colors[i]"
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
