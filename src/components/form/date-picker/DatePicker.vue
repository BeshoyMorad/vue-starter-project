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
  import BaseDatePicker from './BaseDatePicker.vue';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: Date | string | null;
    defaultValue?: Date | string | null;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    id?: string;
    // Form validation wrapper props
    name?: string;
    description?: string;
    containerClass?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    dateFormat: undefined,
    minDate: undefined,
    maxDate: undefined,
    disabled: false,
    placeholder: undefined,
    label: undefined,
    id: undefined,
    name: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: Date | null): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue ?? null,
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ componentField, errorMessage }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BaseDatePicker
            :id="id"
            :aria-invalid="!!errorMessage"
            :date-format="dateFormat"
            :disabled="disabled"
            :max-date="maxDate"
            :min-date="minDate"
            :placeholder="placeholder"
            :test-id="testId"
            v-bind="componentField"
          />
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BaseDatePicker
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :date-format="dateFormat"
      :disabled="disabled"
      :max-date="maxDate"
      :min-date="minDate"
      :placeholder="placeholder"
      :test-id="testId"
    />
  </template>
</template>
