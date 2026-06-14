<script setup lang="ts">
  import type { PaginationEllipsisProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { PaginationEllipsis } from 'reka-ui';
  import { cn } from '@/utils';
  import { Icon } from '@/components';

  const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <PaginationEllipsis
    data-slot="pagination-ellipsis"
    v-bind="delegatedProps"
    :class="cn('flex size-9 items-center justify-center', props.class)"
  >
    <slot>
      <Icon icon="hugeicons--more-horizontal" />
      <span class="sr-only">More pages</span>
    </slot>
  </PaginationEllipsis>
</template>
