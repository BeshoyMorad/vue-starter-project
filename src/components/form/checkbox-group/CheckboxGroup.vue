<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel } from '@/components/form/shared';
  import BaseCheckboxGroup from './BaseCheckboxGroup.vue';
  import type { CheckboxGroupProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<CheckboxGroupProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    layout: 'vertical',
    size: 'default',
    shape: 'square',
    disabled: false,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: unknown[]): void;
  }>();

  const modelValue = useFieldModel(props, emits, []);
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
      <BaseCheckboxGroup
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :disabled="disabled"
        :layout="layout"
        :options="options"
        :shape="shape"
        :size="size"
        :test-id="testId"
      />
    </template>
  </FieldShell>
</template>
