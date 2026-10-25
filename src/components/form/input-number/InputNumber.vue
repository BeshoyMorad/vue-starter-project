<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel, useBaseSlots } from '@/components/form/shared';
  import BaseInputNumber from './BaseInputNumber.vue';
  import type { InputNumberProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<InputNumberProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    icon: undefined,
    iconPosition: 'left',
    loading: false,
    hideSteppers: false,
    min: undefined,
    max: undefined,
    step: undefined,
    disabled: false,
    formatOptions: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number | undefined): void;
  }>();

  const modelValue = useFieldModel(props, emits);
  const attrs = useAttrs();
  const attrId = computed(() => (typeof attrs.id === 'string' ? attrs.id : undefined));
  const baseSlots = useBaseSlots();
</script>

<template>
  <FieldShell
    :id="attrId"
    :name="name"
    :label="label"
    :description="description"
    :container-class="containerClass"
  >
    <template v-if="$slots['label-action']" #label-action>
      <slot name="label-action" />
    </template>

    <template #default="{ componentField }">
      <BaseInputNumber
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :test-id="testId"
        :icon="icon"
        :icon-position="iconPosition"
        :loading="loading"
        :hide-steppers="hideSteppers"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :format-options="formatOptions"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </BaseInputNumber>
    </template>
  </FieldShell>
</template>
