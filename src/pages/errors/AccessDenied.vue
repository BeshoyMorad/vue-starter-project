<script setup lang="ts">
  import { ExceptionState } from '@/components';
  import { useRouter } from 'vue-router';
  import { paths } from '@/router/paths';

  const router = useRouter();
  const goHome = () => router.push({ name: paths.dashboard.root });
</script>

<template>
  <ExceptionState
    icon="hugeicons--unavailable"
    title="Access Denied!"
    description="We're sorry, but you don't have permission to access this page."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
