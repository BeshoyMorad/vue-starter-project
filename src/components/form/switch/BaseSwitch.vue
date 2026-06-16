<script setup lang="ts">
  import { computed, useAttrs, useId, useSlots } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { Switch } from '@/components/ui/switch';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/utils';

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

  interface Props {
    testId: string;
    modelValue?: boolean;
    defaultValue?: boolean;
    size?: 'small' | 'default' | 'large';
    disabled?: boolean;
    readonly?: boolean;
    label?: string;
    id?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
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
  const attrs = useAttrs();

  const resolvedId = computed(() => {
    if (props.id) return props.id;
    if (typeof attrs.id === 'string') return attrs.id;
    return useId();
  });
</script>

<template>
  <div :class="cn(toggleRowVariants({ size }), $attrs.class)">
    <Switch
      :id="resolvedId"
      v-model="modelValue"
      v-bind="$attrs"
      :disabled="disabled || readonly"
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
        })
      "
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
