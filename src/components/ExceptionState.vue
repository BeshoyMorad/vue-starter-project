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
  <div
    class="flex flex-col items-center justify-center text-center p-8 min-h-screen bg-bg-default"
  >
    <div class="relative w-95.5 h-95.5 mb-16">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-contain mix-blend-multiply"
      />
    </div>

    <h1 class="text-6xl font-bold text-text-default mb-6">
      {{ title }}
    </h1>

    <p class="text-2xl text-text-placeholder max-w-lg mb-6 leading-relaxed">
      {{ description }}
    </p>

    <Button
      v-if="buttonLabel"
      color="primary"
      size="default"
      test-id="exception-state-action"
      :label="buttonLabel"
      @click="buttonAction"
    />
  </div>
</template>
