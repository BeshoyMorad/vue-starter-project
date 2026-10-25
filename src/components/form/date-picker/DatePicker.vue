<script setup lang="ts">
  import { FieldShell, useFieldModel } from '@/components/form/shared';
  import BaseDatePicker from './BaseDatePicker.vue';
  import type { DatePickerProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<DatePickerProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    dateFormat: undefined,
    minDate: undefined,
    maxDate: undefined,
    disabled: false,
    placeholder: undefined,
    id: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: Date | string | null): void;
  }>();

  const modelValue = useFieldModel(props, emits, null);
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
      <BaseDatePicker
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :date-format="dateFormat"
        :disabled="disabled"
        :max-date="maxDate"
        :min-date="minDate"
        :placeholder="placeholder"
        :test-id="testId"
      />
    </template>
  </FieldShell>
</template>
