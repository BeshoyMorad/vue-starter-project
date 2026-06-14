<script setup lang="ts">
  import type { PaginationFirstProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@/components/ui/button';
  import { reactiveOmit } from '@vueuse/core';
  import { PaginationFirst, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';
  import { buttonVariants } from '@/components/ui/button';
  import { Icon } from '@/components';

  const props = withDefaults(
    defineProps<
      PaginationFirstProps & {
        size?: ButtonVariants['size'];
        class?: HTMLAttributes['class'];
      }
    >(),
    {
      size: 'default',
      class: '',
    }
  );

  const delegatedProps = reactiveOmit(props, 'class', 'size');
  const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <PaginationFirst
    data-slot="pagination-first"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
    v-bind="forwarded"
  >
    <slot> </slot>
    <Icon icon="hugeicons--arrow-left-double" />
  </PaginationFirst>
</template>
