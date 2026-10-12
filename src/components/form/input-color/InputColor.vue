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
  import type { InputColorProps } from './types';
  import BaseInputColor from './BaseInputColor.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<InputColorProps>(), {
    modelValue: undefined,
    defaultValue: '#3b82f6',
    placeholder: '#3b82f6',
    disabled: false,
    readonly: false,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
    showPresets: true,
    showCustomPicker: true,
    showEyeDropper: false,
    showCopy: true,
    testId: 'input-color',
    variant: 'default',
    shape: 'square',
    showInput: undefined,
    required: false,
    validate: true,
    errorMessage: undefined,
    ariaInvalid: undefined,
    wrapperClass: undefined,
    inputClass: undefined,
    triggerClass: undefined,
    wheelClass: undefined,
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
    <FormField v-slot="{ componentField, errorMessage }" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">
          {{ label }}
          <span v-if="required" class="text-danger-500 ml-0.5">*</span>
        </FormLabel>

        <FormControl>
          <BaseInputColor
            v-bind="{ ...$attrs, ...componentField }"
            :test-id="testId"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :required="required"
            :validate="validate"
            :error-message="errorMessage || props.errorMessage"
            :aria-invalid="Boolean(errorMessage) || props.ariaInvalid || undefined"
            :presets="presets"
            :show-presets="showPresets"
            :show-custom-picker="showCustomPicker"
            :show-eye-dropper="showEyeDropper"
            :show-copy="showCopy"
            :variant="variant"
            :shape="shape"
            :show-input="showInput"
            :wrapper-class="wrapperClass"
            :input-class="inputClass"
            :trigger-class="triggerClass"
            :wheel-class="wheelClass"
          >
            <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps" />
            </template>
          </BaseInputColor>
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <div :class="containerClass" class="w-full space-y-1.5">
      <label v-if="label" class="text-text-default text-sm leading-none font-medium">
        {{ label }}
        <span v-if="required" class="text-danger-500 ml-0.5">*</span>
      </label>

      <BaseInputColor
        v-model="modelValue"
        v-bind="$attrs"
        :test-id="testId"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :validate="validate"
        :error-message="errorMessage"
        :aria-invalid="ariaInvalid"
        :presets="presets"
        :show-presets="showPresets"
        :show-custom-picker="showCustomPicker"
        :show-eye-dropper="showEyeDropper"
        :show-copy="showCopy"
        :variant="variant"
        :shape="shape"
        :show-input="showInput"
        :wrapper-class="wrapperClass"
        :input-class="inputClass"
        :trigger-class="triggerClass"
        :wheel-class="wheelClass"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </BaseInputColor>

      <p v-if="description" class="text-text-secondary text-xs">
        {{ description }}
      </p>
    </div>
  </template>
</template>
