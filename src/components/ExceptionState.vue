<script setup lang="ts">
  import { Button } from '@/components/ui/button';

  defineProps<{
    image: string;
    title: string;
    description: string;
    buttonLabel?: string;
    buttonAction?: () => void;
  }>();
</script>

<template>
  <div class="bg-bg-default flex min-h-screen flex-col items-center justify-center p-8 text-center">
    <div class="relative mb-16 h-95.5 w-95.5">
      <img :src="image" :alt="title" class="h-full w-full object-contain mix-blend-multiply" />
    </div>

    <h1 class="text-text-default mb-6 text-6xl font-bold">
      {{ title }}
    </h1>

    <p class="text-text-placeholder mb-6 max-w-lg text-2xl leading-relaxed">
      {{ description }}
    </p>

    <Button
      v-if="buttonLabel"
      color="primary"
      size="lg"
      test-id="exception-state-action"
      @click="buttonAction"
    >
      {{ buttonLabel }}
    </Button>
  </div>
</template>
