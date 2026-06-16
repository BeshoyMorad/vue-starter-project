<script setup lang="ts">
  import { computed, useAttrs, useId, useSlots } from 'vue';
  import { Checkbox } from '@/components/ui/checkbox';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/utils';
  import { useVModel } from '@vueuse/core';

  defineOptions({
    inheritAttrs: false,
  });

  const checkboxRowVariants = cva('inline-flex items-center', {
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

  interface Props {
    testId: string;
    modelValue?: boolean;
    defaultValue?: boolean;
    size?: 'small' | 'default' | 'large';
    shape?: 'circle' | 'square';
    disabled?: boolean;
    readonly?: boolean;
    label?: string;
    id?: string;
  }

  const slots = useSlots();
  const attrs = useAttrs();

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: false,
    size: 'default',
    shape: 'square',
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
    defaultValue: props.defaultValue,
  });

  const isInvalid = computed(() => {
    return attrs['aria-invalid'] === 'true' || attrs['aria-invalid'] === true;
  });

  const resolvedId = computed(() => {
    if (props.id) return props.id;
    if (typeof attrs.id === 'string') return attrs.id;
    return useId();
  });
</script>

<template>
  <div :class="cn(checkboxRowVariants({ size }), $attrs.class)">
    <Checkbox
      :id="resolvedId"
      v-model="modelValue"
      v-bind="$attrs"
      :aria-invalid="isInvalid || undefined"
      :disabled="disabled || readonly"
      :shape="shape"
      :size="size"
      :test-id="testId"
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
          'text-text-danger': isInvalid,
        })
      "
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
