<script setup lang="ts">
  import { computed, useSlots } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { cn } from '@/utils';
  import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
  } from '@/components/ui/number-field';
  import { Icon } from '@/components';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: number;
    defaultValue?: number;
    icon?: string;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    hideSteppers?: boolean;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    formatOptions?: Intl.NumberFormatOptions;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    icon: undefined,
    iconPosition: 'left',
    loading: false,
    hideSteppers: false,
    min: undefined,
    max: undefined,
    step: undefined,
    disabled: false,
    formatOptions: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number | undefined): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });

  const slots = useSlots();

  const hasLeftIcon = computed(() => {
    return (
      !!slots.left ||
      (props.icon && props.iconPosition === 'left') ||
      (props.loading && props.iconPosition === 'left')
    );
  });

  const hasRightIcon = computed(() => {
    return (
      !!slots.right ||
      (props.icon && props.iconPosition === 'right') ||
      (props.loading && props.iconPosition === 'right')
    );
  });

  const inputClass = computed(() => {
    const hasDecrement = !props.hideSteppers;
    const hasIncrement = !props.hideSteppers;

    return cn('w-full', {
      'pl-16': hasDecrement && hasLeftIcon.value,
      'pl-10': (hasDecrement && !hasLeftIcon.value) || (!hasDecrement && hasLeftIcon.value),
      'pr-16': hasIncrement && hasRightIcon.value,
      'pr-10': (hasIncrement && !hasRightIcon.value) || (!hasIncrement && hasRightIcon.value),
    });
  });

  const leftIconClass = computed(() => {
    const hasDecrement = !props.hideSteppers;
    return cn(
      'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-text-disabled',
      {
        'left-10': hasDecrement,
        'left-3': !hasDecrement,
        'pointer-events-none': !slots.left,
      }
    );
  });

  const rightIconClass = computed(() => {
    const hasIncrement = !props.hideSteppers;
    return cn(
      'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-text-disabled',
      {
        'right-10': hasIncrement,
        'right-3': !hasIncrement,
        'pointer-events-none': !slots.right,
      }
    );
  });
</script>

<template>
  <NumberField
    v-model="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :format-options="formatOptions"
    :class="cn('w-full')"
  >
    <NumberFieldContent>
      <NumberFieldDecrement v-if="!hideSteppers" :test-id="`${testId}-decrement`" />

      <!-- Left slot or icon/loading -->
      <span v-if="hasLeftIcon" :class="leftIconClass">
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

      <NumberFieldInput v-bind="$attrs" :class="inputClass" :test-id="testId" />

      <!-- Right slot or icon/loading -->
      <span v-if="hasRightIcon" :class="rightIconClass">
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

      <NumberFieldIncrement v-if="!hideSteppers" :test-id="`${testId}-increment`" />
    </NumberFieldContent>
  </NumberField>
</template>
