<script setup lang="ts">
  import { useDarkTheme } from '@/composables';
  import { ErrorBoundary, Toaster } from '@/components';

  useDarkTheme();
</script>

<template>
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>

  <Toaster />
</template>
