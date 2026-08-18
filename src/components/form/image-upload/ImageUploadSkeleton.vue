<script setup lang="ts">
  import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="flex items-center gap-2">
    <Skeleton class="size-24 rounded-full" />

    <div class="flex flex-col gap-2">
      <Skeleton class="h-5 w-24 rounded" />
      <Skeleton class="h-5 w-60 rounded" />
    </div>
  </div>
</template>
