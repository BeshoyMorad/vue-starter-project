<script setup lang="ts">
  import { computed, useAttrs, useId } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { radioGroupVariants, type RadioGroupOption } from './index';
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
  import { cn } from '@/utils';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    options: RadioGroupOption[];
    modelValue?: string;
    defaultValue?: string;
    layout?: 'vertical' | 'horizontal';
    size?: 'small' | 'default' | 'large';
    disabled?: boolean;
    id?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    layout: 'vertical',
    size: 'default',
    disabled: false,
    id: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });

  const attrs = useAttrs();

  const resolvedId = computed(() => {
    if (props.id) return props.id;
    if (typeof attrs.id === 'string') return attrs.id;
    return useId();
  });

  const isInvalid = computed(() => {
    return attrs['aria-invalid'] === 'true' || attrs['aria-invalid'] === true;
  });

  const rootClasses = computed(() =>
    radioGroupVariants({ layout: props.layout, size: props.size })
  );
</script>

<template>
  <RadioGroup
    v-bind="attrs"
    v-model="modelValue"
    :class="rootClasses"
    :data-test-id="testId"
    :disabled="disabled"
  >
    <div
      v-for="option in options"
      :key="option.value"
      :class="
        cn('flex items-center', {
          'gap-2': size === 'small',
          'gap-2.5': size === 'default',
          'gap-3': size === 'large',
        })
      "
    >
      <RadioGroupItem
        :id="`${resolvedId}-${option.value}`"
        :aria-invalid="isInvalid || undefined"
        :disabled="disabled || option.disabled"
        :test-id="`${testId}-${option.value}`"
        :value="option.value"
      />
      <label
        :for="`${resolvedId}-${option.value}`"
        :class="
          cn('text-text-default cursor-pointer select-none', {
            'text-xs': size === 'small',
            'text-sm': size === 'default',
            'text-base': size === 'large',
            'text-text-disabled cursor-default': disabled || option.disabled,
            'text-text-danger': isInvalid,
          })
        "
      >
        {{ option.label }}
      </label>
    </div>
  </RadioGroup>
</template>
