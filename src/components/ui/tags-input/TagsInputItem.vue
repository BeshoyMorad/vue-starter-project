<script setup lang="ts">
  import type { TagsInputItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';

  import { reactiveOmit } from '@vueuse/core';
  import { TagsInputItem, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';

  const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TagsInputItem
    v-bind="forwardedProps"
    :class="
      cn(
        'bg-bg-default border-border-default text-text-default data-[state=active]:ring-border-primary flex h-7 items-center gap-1 rounded-sm border pr-1 pl-2 text-xs transition-all data-[state=active]:ring-2',
        props.class
      )
    "
  >
    <slot />
  </TagsInputItem>
</template>
