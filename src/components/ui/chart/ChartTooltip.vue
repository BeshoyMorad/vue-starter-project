<script setup lang="ts">
  defineProps<{
    title?: string;
    data: {
      name: string;
      color: string;
      value: string | number;
    }[];
  }>();
</script>

<template>
  <div
    class="border-border-default bg-bg-surface/95 min-w-40 rounded-xl border px-3 py-2.5 text-xs shadow-xl backdrop-blur-md transition-all"
  >
    <div
      v-if="title"
      class="border-border-default/60 text-text-primary mb-2 border-b pb-1.5 text-xs font-semibold"
    >
      {{ title }}
    </div>
    <div class="flex flex-col gap-1.5">
      <div v-for="(item, key) in data" :key="key" class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="size-2 shrink-0 rounded-full" :style="{ backgroundColor: item.color }" />
          <span class="text-text-caption text-xs font-medium">
            {{ item.name }}
          </span>
        </div>
        <span class="text-text-primary text-xs font-bold tabular-nums">
          {{ item.value }}
        </span>
      </div>
    </div>
  </div>
</template>
