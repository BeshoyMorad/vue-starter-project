<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useBaseSlots, useFieldModel } from '@/components/form/shared';
  import type { InputTextProps } from './types';
  import BaseInputText from './BaseInputText.vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<InputTextProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    icon: undefined,
    iconPosition: 'left',
    loading: false,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const modelValue = useFieldModel(props, emits);
  const baseSlots = useBaseSlots();
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
      <BaseInputText
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :test-id="testId"
        :icon="icon"
        :icon-position="iconPosition"
        :loading="loading"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </BaseInputText>
    </template>
  </FieldShell>
</template>
