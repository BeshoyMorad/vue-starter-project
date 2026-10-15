<script setup lang="ts">
  import type { BulletLegendItemInterface } from '@unovis/ts';
  import type { Component } from 'vue';
  import { omit } from '@unovis/ts';
  import { VisCrosshair, VisTooltip } from '@unovis/vue';
  import { createApp, h, render } from 'vue';
  import { ChartTooltip } from '.';

  const props = withDefaults(
    defineProps<{
      colors?: string[];
      index: string;
      items?: BulletLegendItemInterface[];
      customTooltip?: Component;
      valueFormatter?: (tick: number | Date, i: number, ticks: number[] | Date[]) => string;
    }>(),
    {
      colors: () => [],
      items: () => [],
      customTooltip: undefined,
      valueFormatter: undefined,
    }
  );

  // Use weakmap to store reference to each datapoint for Tooltip
  const wm = new WeakMap();
  function template(d: Record<string, unknown>) {
    if (wm.has(d)) {
      return wm.get(d);
    } else {
      const componentDiv = document.createElement('div');
      const formatter =
        props.valueFormatter ??
        ((v: number | Date) => (typeof v === 'number' ? v.toLocaleString() : String(v ?? '')));
      const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {
        const legendReference = props.items.find((i) => i.name === key);
        const formattedVal =
          typeof value === 'number' ? formatter(value, 0, []) : String(value ?? '');
        return { ...legendReference, name: legendReference?.name ?? key, value: formattedVal };
      });
      const TooltipComponent = props.customTooltip ?? ChartTooltip;
      try {
        render(
          h(TooltipComponent, { title: String(d[props.index] ?? ''), data: omittedData }),
          componentDiv
        );
      } catch {
        createApp(TooltipComponent, {
          title: String(d[props.index] ?? ''),
          data: omittedData,
        }).mount(componentDiv);
      }
      wm.set(d, componentDiv.innerHTML);
      return componentDiv.innerHTML;
    }
  }

  function color(_d: unknown, i: number) {
    return props.colors[i] ?? 'transparent';
  }
</script>

<template>
  <VisTooltip :horizontal-shift="20" :vertical-shift="20" />
  <VisCrosshair :template="template" :color="color" />
</template>
