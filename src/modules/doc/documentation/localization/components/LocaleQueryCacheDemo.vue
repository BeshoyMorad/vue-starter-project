<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useQuery } from '@tanstack/vue-query';

  import { LanguageSwitcher } from '@/components';
  import type { LocaleCode } from '@/locales/config';

  const { t, locale } = useI18n();
  const fetchCount = ref(0);

  const { data, isFetching } = useQuery({
    queryKey: computed(() => ['docs', 'locale-query-cache', locale.value] as const),
    queryFn: async () => {
      fetchCount.value += 1;
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { locale: locale.value as LocaleCode };
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
</script>

<template>
  <div class="w-full max-w-md space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="text-text-secondary text-xs leading-5">
        {{ t('demo.queryCache.hint') }}
      </p>
      <LanguageSwitcher />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
        <span class="text-text-disabled block text-xs">
          {{ t('demo.queryCache.requests') }}
        </span>
        <span class="text-text-primary text-base font-bold">
          {{ fetchCount }}
        </span>
      </div>

      <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
        <span class="text-text-disabled block text-xs">
          {{ t('demo.queryCache.status') }}
        </span>
        <span class="text-primary-600 text-base font-bold">
          {{ isFetching ? t('demo.queryCache.fetching') : t('demo.queryCache.cached') }}
        </span>
      </div>

      <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
        <span class="text-text-disabled block text-xs">
          {{ t('demo.queryCache.locale') }}
        </span>
        <span class="text-text-primary font-mono text-sm font-semibold uppercase">
          {{ locale }}
        </span>
      </div>

      <div class="bg-surface-secondary border-border-secondary rounded-lg border p-3">
        <span class="text-text-disabled block text-xs">
          {{ t('demo.queryCache.payload') }}
        </span>
        <span class="text-text-primary font-mono text-sm font-semibold uppercase">
          {{ data?.locale ?? '—' }}
        </span>
      </div>
    </div>
  </div>
</template>
