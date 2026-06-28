<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import type { CountryCode } from 'libphonenumber-js';
  import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/components/ui/form';
  import BasePhoneInput from './BasePhoneInput.vue';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string;
    defaultCountry?: CountryCode;
    placeholder?: string;
    disabled?: boolean;
    showClear?: boolean;
    // Form validation wrapper props
    name?: string;
    label?: string;
    description?: string;
    containerClass?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    defaultCountry: 'US',
    placeholder: '000 000 0000',
    disabled: false,
    showClear: false,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: '',
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ value, handleChange, errorMessage }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BasePhoneInput
            :test-id="testId"
            :default-country="defaultCountry"
            :placeholder="placeholder"
            :disabled="disabled"
            :show-clear="showClear"
            :aria-invalid="!!errorMessage"
            :model-value="(value as string) ?? ''"
            v-bind="$attrs"
            @update:model-value="handleChange"
          />
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BasePhoneInput
      v-model="modelValue"
      v-bind="$attrs"
      :test-id="testId"
      :default-country="defaultCountry"
      :placeholder="placeholder"
      :disabled="disabled"
      :show-clear="showClear"
      :class="containerClass"
    />
  </template>
</template>
