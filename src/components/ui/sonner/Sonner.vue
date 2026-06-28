<script setup lang="ts">
  import 'vue-sonner/style.css';
  import { Icon } from '@/components';
  import { Toaster } from 'vue-sonner';
  import { TEST_IDS } from '@/lib/test-ids';

  const TOAST_COLORS = {
    '--success-bg': 'linear-gradient(135deg, #15803d, #112c2c)',
    '--success-text': '#ffffff',
    '--success-border': '#15803d',

    '--error-bg': 'linear-gradient(135deg, #b91c1c, #330a12)',
    '--error-text': '#ffffff',
    '--error-border': '#b91c1c',

    '--warning-bg': 'linear-gradient(135deg, #b45309, #f59e0b)',
    '--warning-text': '#ffffff',
    '--warning-border': '#d97706',

    '--info-bg': 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
    '--info-text': '#ffffff',
    '--info-border': '#1e3a8a',
  } as const;
</script>

<template>
  <Toaster position="top-right" :duration="5000" close-button rich-colors :style="TOAST_COLORS">
    <template #close-icon>
      <Icon icon="hugeicons--cancel-01" :test-id="TEST_IDS.toast.close" class="size-4" />
    </template>
  </Toaster>
</template>
