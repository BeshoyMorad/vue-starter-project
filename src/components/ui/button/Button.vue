<script setup lang="ts">
  import type { PrimitiveProps } from 'reka-ui';
  import { computed, type HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '.';
  import { Primitive } from 'reka-ui';
  import { cn } from '@/utils';
  import { buttonVariants } from '.';
  import type { IconVariants } from '@/components/icon';
  import { Icon } from '@/components';

  interface Props extends PrimitiveProps {
    testId: string;
    variant?: ButtonVariants['variant'];
    size?: ButtonVariants['size'];
    class?: HTMLAttributes['class'];

    disabled?: boolean;
    loading?: boolean;

    icon?: HTMLAttributes['class'];
    iconSize?: IconVariants['size'];
    iconPosition?: ButtonVariants['iconPosition'];
    iconClass?: HTMLAttributes['class'];
    isIconColored?: IconVariants['colored'];
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button',

    variant: 'default',
    size: 'default',
    class: undefined,

    disabled: false,
    loading: false,
    icon: undefined,
    iconSize: undefined,
    iconPosition: 'left',
    iconClass: undefined,
    isIconColored: undefined,
  });

  const resolvedDisabled = computed(() => Boolean(props.disabled || props.loading));

  const testIdPrefix = computed(() => props.testId ?? 'button');
</script>

<template>
  <Primitive
    :as="as"
    data-slot="button"
    :disabled="resolvedDisabled"
    :data-test-id="testId ?? undefined"
    :data-variant="variant"
    :data-size="size"
    :as-child="asChild"
    :aria-busy="loading ? 'true' : undefined"
    :class="cn(buttonVariants({ variant, size, iconPosition }), props.class)"
  >
    <Icon
      v-if="loading"
      :test-id="`${testIdPrefix}-loading-icon`"
      icon="hugeicons--loading-03"
      class="animate-spin"
    />
    <Icon
      v-else-if="icon"
      :test-id="`${testIdPrefix}-icon`"
      :icon="icon"
      :size="iconSize"
      :colored="isIconColored"
      :class="iconClass"
    />

    <slot />
  </Primitive>
</template>
