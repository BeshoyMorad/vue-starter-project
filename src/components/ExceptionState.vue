<script setup lang="ts">
  import { Icon, Button } from '.';

  defineProps<{
    icon: string;
    title: string;
    description: string;
    buttonLabel?: string;
    buttonAction?: () => void;
  }>();
</script>

<template>
  <div class="bg-background flex min-h-screen flex-col items-center justify-center p-8 text-center">
    <Icon :icon="icon" class="mb-10 size-60" />

    <div class="mb-6 max-w-4xl space-y-2 text-center">
      <h1 class="text-foreground-default text-4xl-line-height font-semibold">
        {{ title }}
      </h1>

      <p class="text-foreground-placeholder leading-relaxed">
        {{ description }}
      </p>
    </div>

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
