<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import { cn } from '@/utils';
  import { Input } from '@/components/ui/input';
  import { Icon } from '@/components';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string | number;
    defaultValue?: string | number;
    icon?: string;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    icon: undefined,
    iconPosition: 'left',
    loading: false,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <div class="relative flex items-center w-full">
    <span
      v-if="
        $slots.left || (icon && iconPosition === 'left') || (loading && iconPosition === 'left')
      "
      class="absolute left-3 flex items-center justify-center text-text-disabled"
      :class="{ 'pointer-events-none': !$slots.left }"
    >
      <slot name="left">
        <Icon
          v-if="loading"
          icon="hugeicons--loading-03"
          class="animate-spin duration-500 size-5"
          :test-id="`${testId}-loading`"
        />
        <Icon v-else-if="icon" :icon="icon" class="size-5" :test-id="`${testId}-icon`" />
      </slot>
    </span>

    <Input
      v-model="modelValue"
      v-bind="$attrs"
      :class="
        cn('w-full', {
          'pl-10':
            $slots.left ||
            (icon && iconPosition === 'left') ||
            (loading && iconPosition === 'left'),
          'pr-10':
            $slots.right ||
            (icon && iconPosition === 'right') ||
            (loading && iconPosition === 'right'),
        })
      "
    />

    <span
      v-if="
        $slots.right || (icon && iconPosition === 'right') || (loading && iconPosition === 'right')
      "
      class="absolute right-3 flex items-center justify-center text-text-disabled"
      :class="{ 'pointer-events-none': !$slots.right }"
    >
      <slot name="right">
        <Icon
          v-if="loading"
          icon="hugeicons--loading-03"
          class="animate-spin duration-500 size-5"
          :test-id="`${testId}-loading`"
        />
        <Icon v-else-if="icon" :icon="icon" class="size-5" :test-id="`${testId}-icon`" />
      </slot>
    </span>
  </div>
</template>
