<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel, useBaseSlots } from '@/components/form/shared';
  import BaseInputColor from './BaseInputColor.vue';
  import type { InputColorProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<InputColorProps>(), {
    modelValue: undefined,
    defaultValue: '#3b82f6',
    placeholder: '#3b82f6',
    disabled: false,
    readonly: false,
    showPresets: true,
    showCustomPicker: true,
    showEyeDropper: false,
    showCopy: true,
    testId: 'input-color',
    variant: 'default',
    shape: 'square',
    showInput: undefined,
    required: false,
    validate: true,
    errorMessage: undefined,
    ariaInvalid: undefined,
    wrapperClass: undefined,
    inputClass: undefined,
    triggerClass: undefined,
    wheelClass: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
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
    :required="required"
  >
    <template v-if="$slots['label-action']" #label-action>
      <slot name="label-action" />
    </template>

    <template #default="{ componentField, errorMessage: fieldError }">
      <BaseInputColor
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :test-id="testId"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :validate="validate"
        :error-message="errorMessage"
        :aria-invalid="Boolean(fieldError) || ariaInvalid || undefined"
        :presets="presets"
        :show-presets="showPresets"
        :show-custom-picker="showCustomPicker"
        :show-eye-dropper="showEyeDropper"
        :show-copy="showCopy"
        :variant="variant"
        :shape="shape"
        :show-input="showInput"
        :wrapper-class="wrapperClass"
        :input-class="inputClass"
        :trigger-class="triggerClass"
        :wheel-class="wheelClass"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </BaseInputColor>
    </template>
  </FieldShell>
</template>
