export const CHART_IMPORT_CODE = `import { DonutChart, AreaChart, BarChart, LineChart } from '@/components/ui/chart';
// Or via domain component barrel:
import { DonutChart, AreaChart, BarChart, LineChart } from '@/components';`;

export const CHART_DONUT_CODE = `<template>
  <DonutChart
    :data="donutData"
    index="asset"
    category="funds"
    :colors="[
      'var(--color-primary-500)',
      'var(--color-info-500)',
      'var(--color-success-500)',
      'var(--color-warning-500)',
    ]"
  >
    <template #center>
      <div class="flex flex-col items-center justify-center">
        <span class="text-text-primary text-2xl font-bold tracking-tight">19</span>
        <span class="text-text-caption text-xs font-medium">Total Funds</span>
      </div>
    </template>
  </DonutChart>
</template>`;

export const CHART_AREA_CODE = `<template>
  <AreaChart
    :data="areaData"
    index="month"
    :categories="['performance']"
    :colors="['var(--color-primary-500)']"
    curve-type="monotoneX"
  >
    <template #defs>
      <linearGradient id="primary-area-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stop-color="var(--color-primary-500)" stop-opacity="0.45" />
        <stop offset="95%" stop-color="var(--color-primary-500)" stop-opacity="0.02" />
      </linearGradient>
    </template>

    <template #custom-tooltip="{ title, data }">
      <div class="border-border-default bg-bg-surface/95 flex min-w-44 flex-col gap-2 rounded-xl border p-3 shadow-xl backdrop-blur-md">
        <p class="text-text-caption text-xs font-semibold uppercase tracking-wider">{{ title }} Performance</p>
        <div v-for="item in data" :key="item.name" class="flex items-center justify-between gap-3">
          <EntityAvatar name="Sarah Connor" size="sm" />
          <span class="text-text-primary text-sm font-bold tabular-nums">{{ item.value }}%</span>
        </div>
      </div>
    </template>
  </AreaChart>
</template>`;

export const CHART_BAR_CODE = `<template>
  <!-- Wrapper controls explicit height and width -->
  <div class="h-75 w-full">
    <BarChart
      :data="barData"
      index="period"
      :categories="['deposits', 'withdrawals']"
      :colors="['var(--color-primary-500)', 'var(--color-danger-500)']"
      :y-formatter="formatYAxisCurrency"
      class="h-full"
      :rounded-corners="6"
    />
  </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/utils/formatter';

function formatYAxisCurrency(tick: number | Date): string {
  return typeof tick === 'number'
    ? formatCurrency(tick, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : String(tick);
}
</script>`;
