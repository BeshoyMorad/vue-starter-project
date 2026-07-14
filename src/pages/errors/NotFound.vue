<script setup lang="ts">
  import { ExceptionState } from '@/components';
  import { useRouter } from 'vue-router';
  import { paths } from '@/router/paths';

  const router = useRouter();
  const goHome = () => router.push({ name: paths.dashboard.root });
</script>

<template>
  <ExceptionState
    icon="hugeicons--alert-02"
    title="Oops! We can't find that page."
    description="The page you’re looking for doesn’t exist or has been removed. Please go back to the home page."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
