<script setup lang="ts">
  import { Icon } from '@/components';

  withDefaults(
    defineProps<{
      icon?: string;
      title?: string;
      description?: string;
    }>(),
    {
      icon: 'custom--empty-placeholder',
      title: 'No Data Found',
      description: 'There’s nothing to display here.',
    }
  );
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 py-8 h-full">
    <Icon :icon="icon" class="size-32" test-id="empty-placeholder-icon" :colored="true" />

    <div class="space-y-1.5 text-center">
      <p class="text-xl text-text-placeholder font-bold">{{ title }}</p>
      <p class="text-sm text-text-disabled font-medium">
        {{ description }}
      </p>
    </div>
  </div>
</template>
