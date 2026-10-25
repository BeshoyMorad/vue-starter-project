<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel } from '@/components/form/shared';
  import BasePhoneInput from './BasePhoneInput.vue';
  import type { PhoneInputProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<PhoneInputProps>(), {
    modelValue: '',
    defaultCountry: 'US',
    placeholder: '000 000 0000',
    disabled: false,
    showClear: false,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const modelValue = useFieldModel(props, emits, '');
  const attrs = useAttrs();
  const attrId = computed(() => (typeof attrs.id === 'string' ? attrs.id : undefined));
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
      <BasePhoneInput
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :default-country="defaultCountry"
        :disabled="disabled"
        :placeholder="placeholder"
        :show-clear="showClear"
        :test-id="testId"
      />
    </template>
  </FieldShell>
</template>
