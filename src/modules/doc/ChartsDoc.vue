<script setup lang="ts">
  import { AreaChart, BarChart, DonutChart } from '@/components/ui/chart';
  import EntityAvatar from '@/components/EntityAvatar.vue';
  import ExampleCard from '@/components/card/ExampleCard.vue';
  import { formatCurrency } from '@/utils/formatter';
  import { TEST_IDS } from '@/lib/test-ids';
  import {
    CHART_IMPORT_CODE,
    CHART_DONUT_CODE,
    CHART_AREA_CODE,
    CHART_BAR_CODE,
  } from '@/modules/doc/constants/chart.constants';

  // ============================================================================
  // Mock Data
  // ============================================================================

  // Example 1: KPI Donut Chart (Asset Allocation / Total Funds)
  const donutData = [
    { asset: 'Equities', funds: 9 },
    { asset: 'Fixed Income', funds: 5 },
    { asset: 'Real Estate', funds: 3 },
    { asset: 'Private Equity', funds: 2 },
  ];

  // Example 2: Area Chart with Smooth Curve and Tooltip (Performance Metric)
  const areaData = [
    { month: 'Jan', performance: 28 },
    { month: 'Feb', performance: 45 },
    { month: 'Mar', performance: 38 },
    { month: 'Apr', performance: 62 },
    { month: 'May', performance: 56 },
    { month: 'Jun', performance: 81 },
    { month: 'Jul', performance: 74 },
    { month: 'Aug', performance: 92 },
  ];

  // Example 3: Bar Chart (Redemption Velocity - Deposits vs Withdrawals)
  const barData = [
    { period: 'Q1', deposits: 1250000, withdrawals: 450000 },
    { period: 'Q2', deposits: 1850000, withdrawals: 720000 },
    { period: 'Q3', deposits: 1420000, withdrawals: 980000 },
    { period: 'Q4', deposits: 2400000, withdrawals: 610000 },
  ];

  function formatYAxisCurrency(tick: number | Date): string {
    return typeof tick === 'number'
      ? formatCurrency(tick, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : String(tick);
  }
</script>

<template>
  <div class="mx-auto w-full space-y-10 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-4">
      <div class="space-y-2">
        <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
          Charts Documentation
        </h1>
        <p class="text-text-secondary text-sm leading-6">
          Domain-driven visualization primitives powered by Unovis and Shadcn-Vue. Fully configured
          with our design system tokens, Tailwind CSS variables, dark mode, and RTL support.
        </p>
      </div>
    </section>
    <ExampleCard
      title="Installation & Imports"
      description="Base primitives reside in @/components/ui/chart. All charts are SSR-safe and tree-shakeable."
      header="TypeScript"
      :code="CHART_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Example 1: KPI Donut Chart -->
    <section :data-test="TEST_IDS.charts.donutCard" class="space-y-3">
      <ExampleCard
        title="1. The KPI Donut Chart (Asset Allocation)"
        description="Donut chart with custom center hole metrics (19 Total Funds) and a neat side-by-side legend."
        how-to-use="Use the #center slot or central-label and central-sub-label props to render summary indicators in the center hole."
        header="Vue Template"
        :code="CHART_DONUT_CODE"
      >
        <template #preview>
          <div class="w-full max-w-xl py-4">
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
              class="w-full"
            >
              <template #center>
                <div class="flex flex-col items-center justify-center">
                  <span class="text-text-primary text-2xl font-bold tracking-tight">19</span>
                  <span class="text-text-caption text-xs font-medium">Total Funds</span>
                </div>
              </template>
            </DonutChart>
          </div>
        </template>
      </ExampleCard>
    </section>

    <!-- Example 2: Smooth Area Chart with Custom Tooltip -->
    <section :data-test="TEST_IDS.charts.areaCard" class="space-y-3">
      <ExampleCard
        title="2. Smooth Area Chart with Custom Tooltip"
        description="Curved Area Chart (curveType='monotoneX') filled with an SVG linear gradient linked to the existing primary color token and showcasing an EntityAvatar inside #custom-tooltip."
        how-to-use="Leverage the #custom-tooltip slot to override default popovers with rich interactive components like EntityAvatar."
        header="Vue Template"
        :code="CHART_AREA_CODE"
      >
        <template #preview>
          <div class="w-full py-4">
            <AreaChart
              :data="areaData"
              index="month"
              :categories="['performance']"
              :colors="['var(--color-primary-500)']"
              curve-type="monotoneX"
              class="h-80 w-full"
            >
              <template #custom-tooltip="{ title, data }">
                <div
                  class="border-border-default bg-bg-surface/95 flex min-w-44 flex-col gap-2 rounded-xl border p-3 shadow-xl backdrop-blur-md"
                >
                  <p class="text-text-caption text-xs font-semibold tracking-wider uppercase">
                    {{ title }} Performance
                  </p>
                  <div
                    v-for="item in data"
                    :key="item.name"
                    class="flex items-center justify-between gap-3"
                  >
                    <EntityAvatar name="Sarah Connor" size="sm" />
                    <span class="text-text-primary text-sm font-bold tabular-nums">
                      {{ item.value }}%
                    </span>
                  </div>
                </div>
              </template>
            </AreaChart>
          </div>
        </template>
      </ExampleCard>
    </section>

    <!-- Example 3: Bar & Combo Chart -->
    <section :data-test="TEST_IDS.charts.barCard" class="space-y-3">
      <ExampleCard
        title="3. Bar Chart (Redemption Velocity)"
        description="Grouped bar chart displaying comparative datasets side-by-side with an explicit h-[300px] container and Y-axis formatted via centralized formatter.ts."
        how-to-use="Pass a formatting callback to the :y-formatter prop using formatCurrency() from @/utils/formatter."
        header="Vue Template"
        :code="CHART_BAR_CODE"
      >
        <template #preview>
          <div class="w-full py-4">
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
          </div>
        </template>
      </ExampleCard>
    </section>

    <!-- Customization Guidelines -->
    <section :data-test="TEST_IDS.charts.guidelinesCard" class="space-y-4">
      <div class="border-border-base/50 bg-bg-surface rounded-xl border p-6 shadow-xs">
        <h2 class="text-text-primary text-xl font-bold tracking-tight">
          Developer Customization Guidelines
        </h2>
        <p class="text-text-secondary mt-1 text-sm">
          Best practices and conventions for maintaining consistency, responsiveness, and dark-mode
          compliance across all chart instances.
        </p>

        <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Guideline 1: Container Sizing -->
          <div
            class="border-border-base/40 bg-surface-secondary flex flex-col rounded-lg border p-5"
          >
            <div class="flex items-center gap-2">
              <span
                class="bg-primary-500/10 text-text-primary flex size-7 items-center justify-center rounded-md font-mono text-xs font-bold"
              >
                1
              </span>
              <h3 class="text-text-primary text-sm font-semibold">Tailwind Container Sizing</h3>
            </div>
            <p class="text-text-secondary mt-3 text-xs leading-5">
              Charts automatically expand to 100% of their container's height and width. Rather than
              setting rigid pixel dimensions in code, manage sizing purely through responsive
              utility classes on a wrapping container:
            </p>
            <div
              class="bg-primary-900/10 border-border-base/30 text-2xs mt-3 rounded-md border p-2.5 font-mono"
            >
              &lt;div class="w-full h-72 md:h-96"&gt;<br />
              &nbsp;&nbsp;&lt;BarChart class="h-full" /&gt;<br />
              &lt;/div&gt;
            </div>
          </div>

          <!-- Guideline 2: Theme Colors Mapping -->
          <div
            class="border-border-base/40 bg-surface-secondary flex flex-col rounded-lg border p-5"
          >
            <div class="flex items-center gap-2">
              <span
                class="bg-primary-500/10 text-text-primary flex size-7 items-center justify-center rounded-md font-mono text-xs font-bold"
              >
                2
              </span>
              <h3 class="text-text-primary text-sm font-semibold">Existing Colors Usage</h3>
            </div>
            <p class="text-text-secondary mt-3 text-xs leading-5">
              Never invent ad-hoc hex values. Always pass existing color variables from
              <code>src/css/colors.css</code> via the <code>colors</code> prop:
            </p>
            <div
              class="bg-primary-900/10 border-border-base/30 text-2xs mt-3 rounded-md border p-2.5 font-mono"
            >
              :colors="[<br />
              &nbsp;&nbsp;'var(--color-primary-500)',<br />
              &nbsp;&nbsp;'var(--color-info-500)',<br />
              &nbsp;&nbsp;'var(--color-success-500)'<br />
              ]"
            </div>
          </div>

          <!-- Guideline 3: RTL & Dark Mode Safety -->
          <div
            class="border-border-base/40 bg-surface-secondary flex flex-col rounded-lg border p-5"
          >
            <div class="flex items-center gap-2">
              <span
                class="bg-primary-500/10 text-text-primary flex size-7 items-center justify-center rounded-md font-mono text-xs font-bold"
              >
                3
              </span>
              <h3 class="text-text-primary text-sm font-semibold">
                RTL & Dark Mode Synchronization
              </h3>
            </div>
            <p class="text-text-secondary mt-3 text-xs leading-5">
              All charts leverage existing tokens from <code>src/css/colors.css</code> and
              <code>src/css/token.css</code>. Gridlines automatically sync with neutral tokens.
              Unovis handles RTL coordinate flipping while tooltips and legends use Tailwind logical
              properties (<code>ms-*</code>, <code>me-*</code>).
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
