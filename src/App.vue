<script setup lang="ts">
  import { useDarkTheme, useNetwork } from '@/composables';
  import { ErrorBoundary, Toaster } from '@/components';

  useDarkTheme();

  const { initListeners } = useNetwork();
  initListeners();
</script>

<template>
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>

  <Toaster />
</template>
