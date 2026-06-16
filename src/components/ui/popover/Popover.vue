<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { computed, useAttrs } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { cn } from '@/utils';
  import { type PopoverContentProps } from 'reka-ui';
  import PopoverContent from './PopoverContent.vue';
  import PopoverRoot from './PopoverRoot.vue';
  import PopoverTrigger from './PopoverTrigger.vue';

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      modal?: boolean;
      showArrow?: boolean;
      align?: PopoverContentProps['align'];
      class?: HTMLAttributes['class'];
    }>(),
    {
      modal: false,
      showArrow: true,
      align: 'start',
      class: '',
    }
  );

  const attrs = useAttrs();

  const open = defineModel<boolean>('open', { default: false });

  const contentAttrs = computed(() => reactiveOmit(attrs, 'class'));

  const contentClass = computed(() => cn(props.class, attrs.class as HTMLAttributes['class']));
</script>

<template>
  <PopoverRoot v-model:open="open" :modal="props.modal" data-slot="popover">
    <PopoverTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverContent
      v-bind="contentAttrs"
      :show-arrow="showArrow"
      :align="align"
      :class="contentClass"
    >
      <slot />
    </PopoverContent>
  </PopoverRoot>
</template>
