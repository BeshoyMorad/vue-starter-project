<script setup lang="ts">
  import { FieldShell, useFieldModel } from '@/components/form/shared';
  import BaseRadio from './BaseRadio.vue';
  import type { RadioProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<RadioProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    value: '',
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
    label-mode="none"
    :name="name"
    :description="description"
    :container-class="containerClass"
  >
    <template #default="{ componentField }">
      <BaseRadio
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :disabled="disabled"
        :label="label"
        :test-id="testId"
        :value="value"
      />
    </template>
  </FieldShell>
</template>
