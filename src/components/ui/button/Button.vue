<script setup lang="ts">
  import type { PrimitiveProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '.';
  import type { IconVariants } from '@/components/icon';
  import { computed } from 'vue';
  import { Primitive } from 'reka-ui';
  import { Icon } from '@/components';
  import { cn } from '@/utils';
  import { buttonVariants } from '.';

  interface Props extends PrimitiveProps {
    testId: string;
    color?: ButtonVariants['color'];
    variant?: ButtonVariants['variant'];
    size?: ButtonVariants['size'];
    disabled?: boolean;
    loading?: boolean;

    icon?: HTMLAttributes['class'];
    iconSize?: IconVariants['size'];
    iconPos?: ButtonVariants['iconPos'];
    iconClass?: HTMLAttributes['class'];
    isIconColored?: IconVariants['colored'];

    class?: HTMLAttributes['class'];
    type?: HTMLButtonElement['type'];
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    color: 'default',
    variant: 'filled',
    size: 'default',
    disabled: false,
    loading: false,
    icon: undefined,
    iconSize: undefined,
    iconPos: 'left',
    iconClass: undefined,
    isIconColored: undefined,
    class: undefined,
    type: 'button',
  });

  const resolvedDisabled = computed(() => Boolean(props.disabled || props.loading));

  const testIdPrefix = computed(() => props.testId ?? 'button');
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="resolvedDisabled"
    :data-test-id="testId ?? undefined"
    data-slot="button"
    :data-color="color"
    :data-variant="variant"
    :data-size="size"
    :aria-busy="loading ? 'true' : undefined"
    :class="cn(buttonVariants({ color, variant, size, iconPos }), props.class)"
    :type="type"
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
