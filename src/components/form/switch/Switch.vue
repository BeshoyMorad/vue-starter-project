<script setup lang="ts">
  import { FieldShell, useBaseSlots, useFieldModel } from '@/components/form/shared';
  import type { SwitchProps } from './types';
  import BaseSwitch from './BaseSwitch.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<SwitchProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    size: 'default',
    disabled: false,
    readonly: false,
    label: undefined,
    id: undefined,
    name: undefined,
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
      <BaseSwitch
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :disabled="disabled"
        :label="label"
        :readonly="readonly"
        :size="size"
        :test-id="testId"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </BaseSwitch>
    </template>
  </FieldShell>
</template>
