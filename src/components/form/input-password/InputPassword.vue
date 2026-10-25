<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel } from '@/components/form/shared';
  import BaseInputPassword from './BaseInputPassword.vue';
  import type { InputPasswordProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<InputPasswordProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const modelValue = useFieldModel(props, emits);
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
      <BaseInputPassword
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :test-id="testId"
      />
    </template>
  </FieldShell>
</template>
