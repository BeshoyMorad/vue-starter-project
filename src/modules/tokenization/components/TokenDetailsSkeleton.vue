<script setup lang="ts">
  import { Skeleton } from '@/components';
</script>

<template>
  <!-- Token card skeleton -->
  <div class="bg-gray-900 p-6">
    <div class="flex items-start justify-between">
      <div class="flex gap-3">
        <Skeleton class="size-12 rounded-full" />

        <div class="flex flex-col items-start gap-2 align-baseline">
          <Skeleton class="h-5 w-24" />
          <Skeleton class="h-4 w-36" />
          <Skeleton class="h-4 w-20" />
        </div>
      </div>

      <Skeleton class="h-5 w-16" />
    </div>

    <div class="mt-6 flex items-center justify-between">
      <Skeleton class="h-5 w-28" />
      <Skeleton class="h-4 w-32" />
    </div>
  </div>

  <div class="h-px bg-neutral-600" />

  <!-- Detail rows skeleton -->
  <div class="bg-gray-900 p-6">
    <div class="mb-4 flex items-center justify-between">
      <Skeleton class="h-5 w-24" />
      <Skeleton class="h-5 w-24" />
    </div>

    <div v-for="i in 6" :key="i" class="mb-3">
      <div class="flex items-center justify-between py-2">
        <Skeleton class="h-4 w-28" />
        <Skeleton class="h-4 w-48" />
      </div>
      <div class="mt-2 h-px bg-neutral-600" />
    </div>
  </div>
</template>

<style scoped>
  :deep([data-slot='skeleton']) {
    background-color: rgb(64 64 64); /* neutral-600 */
  }
</style>
