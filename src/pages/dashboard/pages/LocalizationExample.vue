<script setup lang="ts">
  /* eslint-disable max-lines */
  import { ref, computed } from 'vue';
  import { useAppLocale } from '@/composables/useAppLocale';
  import { Button, LanguageSwitcher, PageWrapper } from '@/components';
  import dayjs from 'dayjs';
  import { paths } from '@/router/paths';

  const { t, d, n, currentLocale, currentLocaleMeta, isRTL, setLocale, isLoadingLocale } =
    useAppLocale();

  // Interactive demo states
  const customName = ref('Alex');
  const appleCount = ref(3);
  const sampleAmount = ref(1250.75);
  const samplePercent = ref(0.85);
  const sampleDate = ref(new Date());

  const relativeTimeAgo = computed(() => {
    // Force reactivity with currentLocale
    const _locale = currentLocale.value;
    return dayjs().subtract(3, 'hour').locale(_locale).fromNow();
  });

  const incrementApples = () => appleCount.value++;
  const decrementApples = () => {
    if (appleCount.value > 0) appleCount.value--;
  };
</script>

<template>
  <PageWrapper>
    <div class="space-y-6 pb-12">
      <!-- Breadcrumb & Top Bar -->
      <div
        class="border-border-secondary flex flex-wrap items-center justify-between gap-4 border-b pb-4"
      >
        <div class="flex items-center gap-3">
          <RouterLink
            :to="{ name: paths.dashboard.root }"
            class="text-text-secondary hover:text-text-primary text-sm font-medium"
          >
            ← {{ t('common.back') }} {{ t('nav.dashboard') }}
          </RouterLink>
          <span class="text-text-disabled">/</span>
          <span class="text-text-primary text-sm font-medium">{{ t('nav.localization') }}</span>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-text-secondary text-xs font-medium"
            >{{ t('common.activeLanguage') }}:</span
          >
          <LanguageSwitcher />
        </div>
      </div>

      <!-- Hero Header -->
      <div
        class="from-primary-900/10 via-primary-500/5 to-surface-secondary border-border-secondary relative overflow-hidden rounded-2xl border bg-linear-to-br p-6 sm:p-8"
      >
        <div class="max-w-3xl space-y-3">
          <div
            class="border-primary-500/30 bg-primary-500/10 text-primary-600 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
          >
            <span>{{ currentLocaleMeta.flag }}</span>
            <span
              >{{ currentLocaleMeta.nativeLabel }} ({{
                currentLocaleMeta.code.toUpperCase()
              }})</span
            >
            <span class="text-text-disabled">•</span>
            <span class="font-mono tracking-wider uppercase">{{
              currentLocaleMeta.direction
            }}</span>
            <span class="text-text-disabled">•</span>
            <span class="text-[11px] font-normal">isRTL: {{ isRTL ? 'true' : 'false' }}</span>
          </div>

          <h1 class="text-text-primary text-2xl font-bold tracking-tight sm:text-3xl">
            {{ t('demo.title') }}
          </h1>
          <p class="text-text-secondary text-sm leading-relaxed sm:text-base">
            {{ t('demo.subtitle') }}
          </p>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <Button
              test-id="toggle-lang-en-btn"
              variant="outline"
              size="sm"
              :loading="isLoadingLocale"
              :class="{
                'border-primary-500 bg-primary-50 text-primary-700': currentLocale === 'en',
              }"
              @click="setLocale('en')"
            >
              🇺🇸 English (LTR)
            </Button>
            <Button
              test-id="toggle-lang-ar-btn"
              variant="outline"
              size="sm"
              :loading="isLoadingLocale"
              :class="{
                'border-primary-500 bg-primary-50 text-primary-700': currentLocale === 'ar',
              }"
              @click="setLocale('ar')"
            >
              🇸🇦 العربية (RTL)
            </Button>
          </div>
        </div>
      </div>

      <!-- Architecture Highlights Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="border-border-secondary bg-surface-primary rounded-xl border p-4 shadow-xs">
          <div
            class="mb-2 inline-flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-lg text-emerald-600"
          >
            ⚡
          </div>
          <h3 class="text-text-primary text-sm font-semibold">Lazy Loaded Chunks</h3>
          <p class="text-text-secondary mt-1 text-xs leading-relaxed">
            Only initial locale is loaded at bootstrap. Extra languages are loaded asynchronously
            via dynamic imports.
          </p>
        </div>

        <div class="border-border-secondary bg-surface-primary rounded-xl border p-4 shadow-xs">
          <div
            class="mb-2 inline-flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-lg text-blue-600"
          >
            🛡️
          </div>
          <h3 class="text-text-primary text-sm font-semibold">Type-Safe Schema</h3>
          <p class="text-text-secondary mt-1 text-xs leading-relaxed">
            Full compiler verification and autocompletion for translation keys using TypeScript
            schema augmentation.
          </p>
        </div>

        <div class="border-border-secondary bg-surface-primary rounded-xl border p-4 shadow-xs">
          <div
            class="mb-2 inline-flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-lg text-purple-600"
          >
            ↔️
          </div>
          <h3 class="text-text-primary text-sm font-semibold">Dynamic RTL / LTR</h3>
          <p class="text-text-secondary mt-1 text-xs leading-relaxed">
            Automatically updates
            <code class="bg-surface-secondary rounded px-1">&lt;html dir="..."&gt;</code> and
            mirrors UI layouts instantly.
          </p>
        </div>

        <div class="border-border-secondary bg-surface-primary rounded-xl border p-4 shadow-xs">
          <div
            class="mb-2 inline-flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-lg text-amber-600"
          >
            📅
          </div>
          <h3 class="text-text-primary text-sm font-semibold">Intl & Dayjs Sync</h3>
          <p class="text-text-secondary mt-1 text-xs leading-relaxed">
            Seamlessly handles native date, time, currency, and Dayjs relative timestamps.
          </p>
        </div>
      </div>

      <!-- Live Interactive Demos -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- 1. Interpolation Demo -->
        <div
          class="border-border-secondary bg-surface-primary space-y-4 rounded-xl border p-5 shadow-xs"
        >
          <div class="border-border-secondary border-b pb-3">
            <h2 class="text-text-primary text-base font-semibold">
              {{ t('demo.interpolation.title') }}
            </h2>
            <p class="text-text-secondary text-xs">Testing variable interpolation in messages</p>
          </div>

          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-text-secondary text-xs font-medium">Input Name:</label>
              <input
                v-model="customName"
                type="text"
                placeholder="Enter name..."
                class="border-border-secondary bg-surface-secondary text-text-primary focus:border-primary-500 w-full rounded-lg border px-3 py-2 text-sm focus:outline-hidden"
              />
            </div>

            <div
              class="bg-surface-secondary text-text-primary border-border-secondary rounded-lg border p-3 text-sm"
            >
              <span class="text-text-disabled mb-1 block font-mono text-xs">Rendered:</span>
              <p class="text-primary-600 font-medium">
                {{ t('demo.interpolation.greeting', { name: customName }) }}
              </p>
              <p class="text-text-secondary mt-2">
                {{ t('demo.interpolation.userStats', { count: 5, points: 240 }) }}
              </p>
            </div>
          </div>
        </div>

        <!-- 2. Pluralization Demo -->
        <div
          class="border-border-secondary bg-surface-primary space-y-4 rounded-xl border p-5 shadow-xs"
        >
          <div class="border-border-secondary border-b pb-3">
            <h2 class="text-text-primary text-base font-semibold">
              {{ t('demo.pluralization.title') }}
            </h2>
            <p class="text-text-secondary text-xs">{{ t('demo.pluralization.description') }}</p>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-text-secondary text-xs font-medium">Quantity:</span>
              <div class="flex items-center gap-2">
                <Button test-id="dec-apples" variant="outline" size="sm" @click="decrementApples">
                  -
                </Button>
                <span class="text-text-primary min-w-8 text-center font-bold">{{
                  appleCount
                }}</span>
                <Button test-id="inc-apples" variant="outline" size="sm" @click="incrementApples">
                  +
                </Button>
              </div>
            </div>

            <div
              class="bg-surface-secondary text-text-primary border-border-secondary space-y-2 rounded-lg border p-3 text-sm"
            >
              <div>
                <span class="text-text-disabled block font-mono text-xs">Apples Plural Rule:</span>
                <p class="text-primary-600 text-base font-semibold">
                  {{ t('demo.pluralization.apples', appleCount, { named: { count: appleCount } }) }}
                </p>
              </div>

              <div class="border-border-secondary border-t pt-2">
                <span class="text-text-disabled block font-mono text-xs">Members Plural Rule:</span>
                <p class="text-text-secondary text-sm font-medium">
                  {{
                    t('demo.pluralization.members', appleCount, { named: { count: appleCount } })
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Number & Currency Formatting -->
        <div
          class="border-border-secondary bg-surface-primary space-y-4 rounded-xl border p-5 shadow-xs"
        >
          <div class="border-border-secondary border-b pb-3">
            <h2 class="text-text-primary text-base font-semibold">
              {{ t('demo.formatting.title') }}
            </h2>
            <p class="text-text-secondary text-xs">Intl-based localized numbers & currencies</p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
              <span class="text-text-disabled block text-xs">{{
                t('demo.formatting.currency')
              }}</span>
              <span class="text-text-primary text-base font-bold">
                {{ n(sampleAmount, 'currency') }}
              </span>
            </div>

            <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
              <span class="text-text-disabled block text-xs">{{
                t('demo.formatting.percent')
              }}</span>
              <span class="text-text-primary text-base font-bold">
                {{ n(samplePercent, 'percent') }}
              </span>
            </div>
          </div>
        </div>

        <!-- 4. Date & Relative Time Formatting -->
        <div
          class="border-border-secondary bg-surface-primary space-y-4 rounded-xl border p-5 shadow-xs"
        >
          <div class="border-border-secondary border-b pb-3">
            <h2 class="text-text-primary text-base font-semibold">
              {{ t('demo.formatting.dateLong') }} & Dayjs
            </h2>
            <p class="text-text-secondary text-xs">Localized timestamps and relative duration</p>
          </div>

          <div class="space-y-3">
            <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
              <span class="text-text-disabled block text-xs">{{
                t('demo.formatting.dateShort')
              }}</span>
              <span class="text-text-primary text-sm font-medium">
                {{ d(sampleDate, 'short') }}
              </span>
            </div>

            <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
              <span class="text-text-disabled block text-xs">{{
                t('demo.formatting.relativeTime')
              }}</span>
              <span class="text-primary-600 text-sm font-bold">
                {{ relativeTimeAgo }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Developer Implementation Guide -->
      <div
        class="border-border-secondary bg-surface-primary space-y-4 rounded-xl border p-6 shadow-xs"
      >
        <h2 class="text-text-primary text-lg font-bold">
          {{ t('demo.howToUse.title') }}
        </h2>

        <div class="grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
          <div class="bg-surface-secondary border-border-secondary space-y-2 rounded-lg border p-4">
            <h3 class="text-text-primary font-semibold">{{ t('demo.howToUse.step1Title') }}</h3>
            <pre class="text-text-secondary overflow-x-auto font-mono text-[11px]">
import { useAppLocale } from '@/composables';

const { t, d, n, currentLocale, isRTL } = useAppLocale();
const label = t('common.save');
            </pre>
          </div>

          <div class="bg-surface-secondary border-border-secondary space-y-2 rounded-lg border p-4">
            <h3 class="text-text-primary font-semibold">{{ t('demo.howToUse.step2Title') }}</h3>
            <pre class="text-text-secondary overflow-x-auto font-mono text-[11px]">
&lt;template&gt;
  &lt;h1&gt;&#123;&#123; t('common.save') &#125;&#125;&lt;/h1&gt;
  &lt;p&gt;&#123;&#123; n(150, 'currency') &#125;&#125;&lt;/p&gt;
  &lt;p&gt;&#123;&#123; d(new Date(), 'short') &#125;&#125;&lt;/p&gt;
&lt;/template&gt;
            </pre>
          </div>

          <div class="bg-surface-secondary border-border-secondary space-y-2 rounded-lg border p-4">
            <h3 class="text-text-primary font-semibold">{{ t('demo.howToUse.step3Title') }}</h3>
            <pre class="text-text-secondary overflow-x-auto font-mono text-[11px]">
const { setLocale } = useAppLocale();

// Switches to Arabic & updates DOM dir="rtl"
await setLocale('ar');
            </pre>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
