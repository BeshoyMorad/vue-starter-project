<script setup lang="ts">
import ExceptionState from '@/components/ExceptionState.vue';
import { useRouter } from 'vue-router';
import { paths } from '@/router/paths';

const router = useRouter();
const goHome = () => router.push({ name: paths.dashboard.root });
</script>

<template>
  <ExceptionState
    image="/images/no-internet.png"
    title="This page not found"
    description="You can either stay and chill here, or go back to the beginning."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
