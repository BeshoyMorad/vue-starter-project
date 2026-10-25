<script setup lang="ts">
  import { useId } from 'vue';
  import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/components/ui/form';
  import { Label } from '@/components/ui/label';
  import { cn } from '@/utils';
  import type { FieldShellProps } from './types';

  const props = withDefaults(defineProps<FieldShellProps>(), {
    name: undefined,
    id: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
    labelMode: 'header',
    required: false,
  });

  const generatedId = useId();
  const standaloneId = () => props.id ?? generatedId;
</script>

<template>
  <FormField v-if="name" v-slot="{ componentField, errorMessage }" :name="name">
    <FormItem :class="containerClass">
      <div
        v-if="labelMode === 'header' && (label || $slots['label-action'])"
        class="flex items-center justify-between"
      >
        <FormLabel v-if="label">
          {{ label }}
          <span v-if="required" class="text-danger-500 ms-0.5">*</span>
        </FormLabel>
        <slot name="label-action" />
      </div>

      <FormControl>
        <slot :component-field="componentField" :error-message="errorMessage" />
      </FormControl>

      <FormDescription v-if="description">{{ description }}</FormDescription>

      <FormMessage />
    </FormItem>
  </FormField>

  <div v-else :class="cn('space-y-2', containerClass)">
    <div
      v-if="labelMode === 'header' && (label || $slots['label-action'])"
      class="flex items-center justify-between"
    >
      <Label v-if="label" :for="standaloneId()">
        {{ label }}
        <span v-if="required" class="text-danger-500 ms-0.5">*</span>
      </Label>
      <slot name="label-action" />
    </div>

    <slot :component-field="{ id: standaloneId() }" :error-message="undefined" />

    <p v-if="description" class="text-text-default text-sm">{{ description }}</p>
  </div>
</template>
