<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { Icon } from '@/components';
  import { cn } from '@/utils';

  withDefaults(
    defineProps<{
      icon?: string;
      iconClass?: HTMLAttributes['class'];
      title?: string;
      description?: string;
    }>(),
    {
      icon: 'hugeicons--search-remove',
      iconClass: '',
      title: 'No Data Found',
      description: 'There’s nothing to display here.',
    }
  );
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-6 py-8">
    <Icon
      :icon="icon"
      :class="cn('text-foreground size-32', iconClass)"
      test-id="empty-placeholder-icon"
    />

    <slot>
      <div class="space-y-2 text-center">
        <p class="text-foreground text-xl font-bold">{{ title }}</p>
        <p class="text-foreground-caption text-sm font-medium">
          {{ description }}
        </p>
      </div>
    </slot>

    <slot name="action" />
  </div>
</template>
