<script setup lang="ts">
  import type { DropdownMenuItemProps } from 'reka-ui';
  import type { HTMLAttributes, HtmlHTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { DropdownMenuItem, useForwardProps } from 'reka-ui';
  import { cn } from '@/utils';
  import { Icon } from '@/components';

  const props = withDefaults(
    defineProps<
      DropdownMenuItemProps & {
        testId: string;
        class?: HTMLAttributes['class'];
        inset?: boolean;
        icon?: HtmlHTMLAttributes['class'];
        loading?: boolean;
      }
    >(),
    {
      class: '',
      variant: 'default',
      icon: undefined,
      loading: false,
    }
  );

  const delegatedProps = reactiveOmit(props, 'inset', 'class', 'icon', 'loading');

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex select-none items-center gap-2 rounded-md py-3 px-4 text-sm outline-none transition-colors duration-500 cursor-pointer data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8',
        props.class
      )
    "
  >
    <slot name="icon">
      <Icon
        v-if="icon"
        :test-id="`${testId}-icon`"
        :icon="loading ? 'hugeicons--loading-03' : icon"
        :class="[
          {
            'animate-spin duration-500': loading,
          },
        ]"
        size="sm"
      />
    </slot>

    <slot />
  </DropdownMenuItem>
</template>
