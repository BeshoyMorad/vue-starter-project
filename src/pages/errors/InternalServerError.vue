<script setup lang="ts">
  import { ExceptionState } from '@/components';
  import { paths } from '@/router/paths';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const goHome = () => router.push({ name: paths.dashboard.root });
</script>

<template>
  <ExceptionState
    image="/images/internal-server-error.png"
    title="Internal Server Error"
    description="We apologize for the inconvenience. Please try again later."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
