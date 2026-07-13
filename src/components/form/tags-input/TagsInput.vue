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
  import BaseTagsInput from './BaseTagsInput.vue';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string[];
    defaultValue?: string[];
    placeholder?: string;
    disabled?: boolean;
    tagClass?: string;
    // Form validation wrapper props
    name?: string;
    label?: string;
    description?: string;
    containerClass?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    defaultValue: () => [],
    placeholder: undefined,
    disabled: false,
    tagClass: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ value, handleChange, errorMessage }" v-model="modelValue" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <BaseTagsInput
            v-bind="$attrs"
            :model-value="value"
            :disabled="disabled"
            :aria-invalid="!!errorMessage"
            :test-id="testId"
            :tag-class="tagClass"
            :placeholder="placeholder"
            @update:model-value="handleChange"
          >
            <template v-if="$slots.tag" #tag="{ value: tagValue }">
              <slot name="tag" :value="tagValue" />
            </template>
          </BaseTagsInput>
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <BaseTagsInput
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
      :disabled="disabled"
      :test-id="testId"
      :tag-class="tagClass"
      :placeholder="placeholder"
    >
      <template v-if="$slots.tag" #tag="{ value }">
        <slot name="tag" :value="value" />
      </template>
    </BaseTagsInput>
  </template>
</template>
