<script setup lang="ts">
  import { useFieldId } from '@/components/form/shared';
  import { useSlots } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { Switch } from '@/components/ui/switch';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/utils';
  import type { BaseSwitchProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const toggleRowVariants = cva('inline-flex items-center', {
    variants: {
      size: {
        small: 'gap-2',
        default: 'gap-2.5',
        large: 'gap-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  });

  const props = withDefaults(defineProps<BaseSwitchProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    size: 'default',
    disabled: false,
    readonly: false,
    label: undefined,
    id: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue ?? false,
  });

  const slots = useSlots();

  const resolvedId = useFieldId(props);
</script>

<template>
  <div :class="cn(toggleRowVariants({ size }), $attrs.class)">
    <Switch
      :id="resolvedId"
      v-model="modelValue"
      v-bind="$attrs"
      :disabled="disabled || readonly"
      :size="size"
      :data-test-id="testId"
    />

    <label
      v-if="label || slots.default"
      :for="resolvedId"
      :class="
        cn('text-text-default cursor-pointer select-none', {
          'text-xs': size === 'small',
          'text-sm': size === 'default',
          'text-base': size === 'large',
          'text-text-disabled cursor-default': disabled,
        })
      "
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
