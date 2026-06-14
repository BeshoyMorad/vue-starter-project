<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import { Textarea as UITextarea } from '@/components/ui/textarea';
  import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/components/ui/form';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string | number;
    defaultValue?: string | number;
    // Form validation wrapper props
    name?: string;
    label?: string;
    description?: string;
    containerClass?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
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
          <UITextarea v-bind="{ ...$attrs, ...componentField }" :test-id="testId" />
        </FormControl>
        <FormDescription v-if="description">{{ description }}</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <UITextarea v-model="modelValue" v-bind="$attrs" :class="containerClass" :test-id="testId" />
  </template>
</template>
