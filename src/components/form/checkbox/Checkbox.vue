<script setup lang="ts">
  import { FieldShell, useFieldModel, useBaseSlots } from '@/components/form/shared';
  import BaseCheckbox from './BaseCheckbox.vue';
  import type { CheckboxProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<CheckboxProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    size: 'default',
    shape: 'square',
    disabled: false,
    readonly: false,
    id: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const modelValue = useFieldModel(props, emits, false);
  const baseSlots = useBaseSlots();
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
      <BaseCheckbox
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :disabled="disabled"
        :label="label"
        :readonly="readonly"
        :shape="shape"
        :size="size"
        :test-id="testId"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </BaseCheckbox>
    </template>
  </FieldShell>
</template>
