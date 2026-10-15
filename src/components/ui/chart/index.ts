import type { Component, Ref } from 'vue';
import { createContext } from 'reka-ui';

export { default as ChartCrosshair } from './ChartCrosshair.vue';
export { default as ChartLegend } from './ChartLegend.vue';
export { default as ChartSingleTooltip } from './ChartSingleTooltip.vue';
export { default as ChartTooltip } from './ChartTooltip.vue';
export { default as ChartContainer } from './ChartContainer.vue';
export { default as ChartLegendContent } from './ChartLegendContent.vue';
export { default as ChartTooltipContent } from './ChartTooltipContent.vue';
export { default as AreaChart } from '@/components/ui/chart-area/AreaChart.vue';
export { default as BarChart } from '@/components/ui/chart-bar/BarChart.vue';
export { default as DonutChart } from '@/components/ui/chart-donut/DonutChart.vue';
export { default as LineChart } from '@/components/ui/chart-line/LineChart.vue';

export { componentToString } from './utils';

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: string | Component;
    icon?: string | Component;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

interface ChartContextProps {
  id: string;
  config: Ref<ChartConfig>;
}

export const [useChart, provideChartContext] = createContext<ChartContextProps>('Chart');

const DEFAULT_CHART_COLORS = [
  'var(--color-primary-500)',
  'var(--color-info-500)',
  'var(--color-success-500)',
  'var(--color-warning-500)',
  'var(--color-danger-500)',
];

export function defaultColors(count: number = 3) {
  return Array.from(
    { length: count },
    (_, i) => DEFAULT_CHART_COLORS[i % DEFAULT_CHART_COLORS.length]
  );
}

export * from './interface';
