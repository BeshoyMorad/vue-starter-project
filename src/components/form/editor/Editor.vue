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
  import BaseEditor from './BaseEditor.vue';
  import type { HTMLAttributes } from 'vue';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    minHeight?: string;
    maxHeight?: string;
    // Form validation wrapper props
    name?: string;
    label?: string;
    description?: string;
    class?: HTMLAttributes['class'];
    containerClass?: HTMLAttributes['class'];
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    placeholder: undefined,
    disabled: false,
    readonly: false,
    minHeight: undefined,
    maxHeight: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    class: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur', event: Event): void;
    (e: 'focus', event: Event): void;
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
        <div v-if="label || $slots['label-action']" class="flex items-center justify-between">
          <FormLabel v-if="label">{{ label }}</FormLabel>
          <slot name="label-action" />
        </div>

        <FormControl>
          <BaseEditor
            v-bind="{ ...$attrs, ...componentField }"
            :test-id="testId"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :min-height="minHeight"
            :max-height="maxHeight"
            :invalid="!!errorMessage"
            :class="props.class"
            @focus="(e: Event) => emits('focus', e)"
          />
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <div :class="containerClass">
      <div v-if="label || $slots['label-action']" class="mb-2 flex items-center justify-between">
        <label v-if="label" class="text-foreground text-sm font-medium">{{ label }}</label>
        <slot name="label-action" />
      </div>

      <BaseEditor
        v-model="modelValue"
        v-bind="$attrs"
        :test-id="testId"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :min-height="minHeight"
        :max-height="maxHeight"
        :class="props.class"
        @blur="(e: Event) => emits('blur', e)"
        @focus="(e: Event) => emits('focus', e)"
      />

      <p v-if="description" class="text-foreground-caption mt-1.5 text-xs">{{ description }}</p>
    </div>
  </template>
</template>
