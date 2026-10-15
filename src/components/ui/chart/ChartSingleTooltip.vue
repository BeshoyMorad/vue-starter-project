<script setup lang="ts">
  import type { BulletLegendItemInterface } from '@unovis/ts';
  import type { Component } from 'vue';
  import { omit } from '@unovis/ts';
  import { VisTooltip } from '@unovis/vue';
  import { h, render } from 'vue';
  import { ChartTooltip } from '.';

  const props = withDefaults(
    defineProps<{
      selector: string;
      index: string;
      category?: string;
      items?: BulletLegendItemInterface[];
      valueFormatter?: (tick: number, i?: number, ticks?: number[]) => string;
      customTooltip?: Component;
    }>(),
    {
      category: undefined,
      items: () => [],
      valueFormatter: undefined,
      customTooltip: undefined,
    }
  );

  // Use weakmap to store reference to each datapoint for Tooltip
  const wm = new WeakMap();
  function template(d: Record<string, unknown>, i: number, elements: (HTMLElement | SVGElement)[]) {
    const valueFormatter = props.valueFormatter ?? ((tick: number) => `${tick}`);
    if (props.index in d) {
      if (wm.has(d)) {
        return wm.get(d);
      } else {
        const componentDiv = document.createElement('div');
        const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {
          const legendReference = props.items?.find((item) => item.name === key);
          return {
            ...legendReference,
            name: legendReference?.name ?? key,
            value: valueFormatter(Number(value)),
          };
        });
        const TooltipComponent = props.customTooltip ?? ChartTooltip;
        render(
          h(TooltipComponent, { title: String(d[props.index] ?? ''), data: omittedData }),
          componentDiv
        );
        wm.set(d, componentDiv.innerHTML);
        return componentDiv.innerHTML;
      }
    } else {
      const rawData =
        (d as { data?: Record<string, unknown>; index?: number; value?: unknown }).data ?? d;
      const sliceIndex = (d as { index?: number }).index ?? i;
      const legendRef = props.items?.[sliceIndex];
      const title = String(rawData[props.index] || legendRef?.name || '');
      const valKey =
        props.category ||
        Object.keys(rawData).find((k) => k !== props.index && typeof rawData[k] === 'number') ||
        '';
      const val = rawData[valKey] ?? (d as { value?: unknown }).value;
      const style = elements[i] ? getComputedStyle(elements[i]) : null;
      const color = legendRef?.color || style?.fill || 'currentColor';
      const metricLabel = props.category ? String(props.category) : legendRef?.name || 'Value';

      const omittedData = [
        {
          name: metricLabel,
          value: valueFormatter(Number(val)),
          color: String(color),
        },
      ];
      const componentDiv = document.createElement('div');
      const TooltipComponent = props.customTooltip ?? ChartTooltip;
      render(h(TooltipComponent, { title, data: omittedData }), componentDiv);
      return componentDiv.innerHTML;
    }
  }
</script>

<template>
  <VisTooltip
    :horizontal-shift="20"
    :vertical-shift="20"
    :triggers="{
      [selector]: template,
    }"
  />
</template>
