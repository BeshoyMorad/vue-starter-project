<script setup lang="ts">
  import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="flex flex-col gap-2">
    <Skeleton class="h-4 w-24 rounded" />
    <Skeleton class="h-32 w-full rounded-xl" />
  </div>
</template>
