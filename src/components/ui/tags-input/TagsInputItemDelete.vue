<script setup lang="ts">
  import type { TagsInputItemDeleteProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { TagsInputItemDelete, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';
  import { Icon } from '@/components';

  const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TagsInputItemDelete
    v-bind="forwardedProps"
    :class="
      cn(
        'text-text-caption flex cursor-pointer rounded bg-transparent transition-colors',
        props.class
      )
    "
  >
    <slot>
      <Icon icon="hugeicons--cancel-01" />
    </slot>
  </TagsInputItemDelete>
</template>
