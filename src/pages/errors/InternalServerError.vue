<script setup lang="ts">
  import { ExceptionState } from '@/components';
  import { useRouter } from 'vue-router';
  import { paths } from '@/router/paths';

  const router = useRouter();
  const goHome = () => router.push({ name: paths.dashboard.root });
</script>

<template>
  <ExceptionState
    icon="hugeicons--work-alert"
    title="Oops! Something went wrong on our end."
    description="Server issues are often temporary. Try accessing the Packages module again in a few minutes."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
