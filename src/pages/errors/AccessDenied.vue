<script setup lang="ts">
import ExceptionState from '@/components/ExceptionState.vue';
import { useRouter } from 'vue-router';
import { paths } from '@/router/paths';

const router = useRouter();
const goHome = () => router.push({ name: paths.dashboard.root });
</script>

<template>
  <ExceptionState
    image="/images/access-denied.png"
    title="Access Forbidden"
    description="The page you're trying to access is completely forbidden for some reason."
    button-label="Back to home"
    :button-action="goHome"
  />
</template>
