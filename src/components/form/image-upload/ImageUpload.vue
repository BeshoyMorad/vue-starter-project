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
  import BaseImageUpload from './BaseImageUpload.vue';
  import type { MediaValue } from '@/types/media';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: MediaValue | null;
    disabled?: boolean;
    placeholder?: string;
    sizePreset?: 'logo' | 'smallLogo' | 'avatar' | 'default';
    allowedTypes?: string[];
    // Form validation wrapper props
    name?: string;
    label?: string;
    description?: string;
    containerClass?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    disabled: false,
    placeholder: 'Upload image',
    sizePreset: 'default',
    allowedTypes: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: MediaValue | null): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: null,
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ value, handleChange, errorMessage }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BaseImageUpload
            :test-id="testId"
            :disabled="disabled"
            :placeholder="placeholder"
            :size-preset="sizePreset"
            :allowed-types="allowedTypes"
            :aria-invalid="!!errorMessage"
            :model-value="value"
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
    <BaseImageUpload
      v-model="modelValue"
      v-bind="$attrs"
      :test-id="testId"
      :disabled="disabled"
      :placeholder="placeholder"
      :size-preset="sizePreset"
      :allowed-types="allowedTypes"
      :class="containerClass"
    />
  </template>
</template>
