<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import {
    FormField,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/components/ui/form';
  import BaseRadio from './BaseRadio.vue';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string;
    defaultValue?: string;
    value?: string;
    disabled?: boolean;
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
    value: '',
    disabled: false,
    label: undefined,
    id: undefined,
    name: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <template v-if="name">
    <FormField
      v-slot="{ value: fieldValue, handleChange, errorMessage }"
      v-model="modelValue"
      :name="name"
    >
      <FormItem :class="containerClass">
        <FormControl>
          <BaseRadio
            :id="id"
            :aria-invalid="!!errorMessage"
            :disabled="disabled"
            :label="label"
            :model-value="fieldValue"
            :test-id="testId"
            :value="props.value"
            @update:model-value="handleChange"
          />
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BaseRadio
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :disabled="disabled"
      :label="label"
      :test-id="testId"
      :value="value"
    />
  </template>
</template>
