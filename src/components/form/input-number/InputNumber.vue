<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/components/ui/form';
  import BaseInputNumber from './BaseInputNumber.vue';

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
    // Form validation wrapper props
    name?: string;
    label?: string;
    description?: string;
    containerClass?: string;
    // NumberField specific props to forward
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
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
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
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ componentField }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BaseInputNumber
            v-bind="{ ...$attrs, ...componentField }"
            :test-id="testId"
            :icon="icon"
            :icon-position="iconPosition"
            :loading="loading"
            :hide-steppers="hideSteppers"
            :min="min"
            :max="max"
            :step="step"
            :disabled="disabled"
            :format-options="formatOptions"
          />
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BaseInputNumber
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :test-id="testId"
      :icon="icon"
      :icon-position="iconPosition"
      :loading="loading"
      :hide-steppers="hideSteppers"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :format-options="formatOptions"
    />
  </template>
</template>
