<script setup lang="ts">
  import { paths } from '@/router/paths';
  import { LanguageSwitcher } from '@/components';
  import { useAppLocale } from '@/composables/useAppLocale';

  const { t } = useAppLocale();
</script>

<template>
  <div class="bg-surface-secondary flex h-screen flex-col overflow-hidden">
    <header
      class="border-border-secondary bg-surface-primary flex shrink-0 items-center justify-between border-b px-6 py-3 shadow-xs"
    >
      <div class="flex items-center gap-6">
        <RouterLink
          :to="{ name: paths.dashboard.root }"
          class="text-text-primary flex items-center gap-2 text-base font-bold"
        >
          <span
            class="bg-primary-600 inline-flex size-7 items-center justify-center rounded-lg text-xs font-bold text-white"
          >
            V
          </span>
          <span>Vue Starter</span>
        </RouterLink>

        <nav class="hidden items-center gap-2 md:flex">
          <RouterLink
            :to="{ name: paths.dashboard.root }"
            class="text-text-secondary hover:bg-surface-secondary hover:text-text-primary rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            active-class="bg-surface-secondary text-primary-600 font-semibold"
          >
            {{ t('nav.dashboard') }}
          </RouterLink>
          <RouterLink
            :to="{ name: paths.dashboard.starter }"
            class="text-text-secondary hover:bg-surface-secondary hover:text-text-primary rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            active-class="bg-surface-secondary text-primary-600 font-semibold"
          >
            {{ t('nav.starter') }}
          </RouterLink>
          <RouterLink
            :to="{ name: paths.dashboard.multiStepForm }"
            class="text-text-secondary hover:bg-surface-secondary hover:text-text-primary rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            active-class="bg-surface-secondary text-primary-600 font-semibold"
          >
            {{ t('nav.multiStepForm') }}
          </RouterLink>
          <RouterLink
            :to="{ name: paths.dashboard.virtualScrollExample }"
            class="text-text-secondary hover:bg-surface-secondary hover:text-text-primary rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            active-class="bg-surface-secondary text-primary-600 font-semibold"
          >
            {{ t('nav.virtualScroll') }}
          </RouterLink>
          <RouterLink
            :to="{ name: paths.dashboard.localizationExample }"
            class="text-text-secondary hover:bg-surface-secondary hover:text-text-primary rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            active-class="bg-surface-secondary text-primary-600 font-semibold"
          >
            {{ t('nav.localization') }}
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <LanguageSwitcher />
      </div>
    </header>

    <main class="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
      <RouterView />
    </main>
  </div>
</template>
