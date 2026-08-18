<script setup lang="ts">
  import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="flex flex-col gap-2">
    <Skeleton class="h-4 w-32 rounded" />
    <div
      class="border-border-disabled/50 bg-background flex w-full flex-col overflow-hidden rounded-xl border-[1.5px]"
    >
      <div
        class="bg-background-surface/50 border-border-disabled/50 flex h-10 w-full items-center gap-2 border-b p-2"
      >
        <Skeleton class="h-6 w-14 rounded" />
        <Skeleton class="h-6 w-24 rounded" />
        <Skeleton class="h-6 w-28 rounded" />
      </div>
      <Skeleton class="h-36 w-full rounded-b-xl" />
    </div>
  </div>
</template>
