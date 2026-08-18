<script setup lang="ts">
  import { useAppLocale } from '@/composables/useAppLocale';
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components';
  import type { LocaleCode } from '@/locales/config';

  const { currentLocaleMeta, supportedLocales, setLocale, isLoadingLocale } = useAppLocale();

  const handleLocaleSelect = (locale: LocaleCode) => {
    setLocale(locale);
  };
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        test-id="language-switcher-trigger"
        :loading="isLoadingLocale"
        class="border-border-secondary bg-surface-primary text-text-primary hover:bg-surface-secondary inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium shadow-xs transition-all"
      >
        <span class="text-base leading-none">{{ currentLocaleMeta.flag }}</span>
        <span>{{ currentLocaleMeta.nativeLabel }}</span>
        <span class="text-text-disabled text-xs uppercase"
          >({{ currentLocaleMeta.direction }})</span
        >
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="min-w-44 p-1">
      <DropdownMenuItem
        v-for="locale in supportedLocales"
        :key="locale.code"
        :test-id="`locale-option-${locale.code}`"
        class="hover:bg-surface-secondary flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors"
        :class="{ 'bg-surface-secondary/60 font-semibold': locale.code === currentLocaleMeta.code }"
        @click="handleLocaleSelect(locale.code)"
      >
        <div class="flex items-center gap-2.5">
          <span class="text-base leading-none">{{ locale.flag }}</span>
          <div class="flex flex-col">
            <span class="text-text-primary">{{ locale.nativeLabel }}</span>
            <span class="text-text-disabled text-xs">{{ locale.label }}</span>
          </div>
        </div>

        <span
          v-if="locale.code === currentLocaleMeta.code"
          class="bg-primary-600 size-2 rounded-full"
        />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
