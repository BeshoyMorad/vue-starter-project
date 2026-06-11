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
  <div class="flex flex-col items-center justify-center py-16 text-text-placeholder">
    <span class="text-4xl mb-3" aria-hidden="true">&#x1F6A7;</span>
    <p class="text-sm font-medium">{{ message }}</p>
  </div>
</template>
