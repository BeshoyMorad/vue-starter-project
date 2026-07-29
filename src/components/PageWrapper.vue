<script setup lang="ts">
  defineProps<{
    title?: string;
    subtitle?: string;
    fitHeight?: boolean;
    transparent?: boolean;
  }>();
</script>

<template>
  <div
    class="rounded-lg"
    :class="{
      'flex min-h-0 flex-1 flex-col gap-4 overflow-hidden': fitHeight,
      'space-y-4': !fitHeight,
      'bg-background-surface': !transparent,
    }"
  >
    <div v-if="title || subtitle" class="shrink-0 px-6 pt-6">
      <h1 v-if="title" class="text-txt-default text-xl font-medium">{{ title }}</h1>
      <p v-if="subtitle" class="text-txt-caption text-sm">{{ subtitle }}</p>
    </div>

    <div v-if="$slots.actions" class="shrink-0 px-6">
      <slot name="actions" />
    </div>

    <slot />
  </div>
</template>
