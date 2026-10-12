<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { Icon, Image } from '@/components';
  import { cn } from '@/utils';
  import { getImagePath } from '@/utils/getDynamicAssets';

  withDefaults(
    defineProps<{
      icon?: string;
      iconClass?: HTMLAttributes['class'];
      image?: string;
      imageClass?: HTMLAttributes['class'];
      title?: string;
      description?: string;
      darkMode?: boolean;
    }>(),
    {
      icon: '',
      iconClass: '',
      image: 'no-search-results.png',
      imageClass: '',
      title: 'No Data Found',
      description: 'There’s nothing to display here.',
      darkMode: false,
    }
  );
</script>

<template>
  <div :class="cn('flex flex-1 flex-col items-center justify-center gap-6 py-8', $attrs.class)">
    <slot name="icon">
      <Icon v-if="icon" :icon="icon" :class="cn('text-foreground size-32', iconClass)" />

      <Image v-else-if="image" :src="getImagePath(image)" :class="cn('size-36', imageClass)" />
    </slot>

    <slot>
      <div class="space-y-2 text-center">
        <p class="text-foreground text-xl font-bold" :class="{ 'text-white': darkMode }">
          {{ title }}
        </p>
        <p
          class="text-foreground-caption text-sm font-medium"
          :class="{ 'text-neutral-400': darkMode }"
        >
          {{ description }}
        </p>
      </div>
    </slot>

    <slot name="action" />
  </div>
</template>
