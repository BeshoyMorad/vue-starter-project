<script setup lang="ts">
  import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="flex flex-col gap-2">
    <Skeleton class="h-4 w-28 rounded" />
    <Skeleton class="h-14 w-full rounded-lg" />
  </div>
</template>
