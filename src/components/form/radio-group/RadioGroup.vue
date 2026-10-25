<script setup lang="ts">
  import { FieldShell, useFieldModel } from '@/components/form/shared';
  import BaseRadioGroup from './BaseRadioGroup.vue';
  import type { RadioGroupProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<RadioGroupProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    layout: 'vertical',
    size: 'default',
    disabled: false,
    id: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const modelValue = useFieldModel(props, emits);
</script>

<template>
  <FieldShell
    :id="id"
    :name="name"
    :label="label"
    :description="description"
    :container-class="containerClass"
  >
    <template v-if="$slots['label-action']" #label-action>
      <slot name="label-action" />
    </template>

    <template #default="{ componentField }">
      <BaseRadioGroup
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :disabled="disabled"
        :layout="layout"
        :options="options"
        :size="size"
        :test-id="testId"
      />
    </template>
  </FieldShell>
</template>
