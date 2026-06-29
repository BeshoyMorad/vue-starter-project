<script setup lang="ts">
  withDefaults(
    defineProps<{
      message?: string;
    }>(),
    {
      message: 'This tab is coming soon',
    }
  );
</script>

<template>
  <div class="text-text-placeholder flex flex-col items-center justify-center py-16">
    <span class="mb-3 text-4xl" aria-hidden="true">&#x1F6A7;</span>
    <p class="text-sm font-medium">{{ message }}</p>
  </div>
</template>
