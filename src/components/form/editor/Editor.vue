<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel } from '@/components/form/shared';
  import BaseEditor from './BaseEditor.vue';
  import type { EditorProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<EditorProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    placeholder: undefined,
    disabled: false,
    readonly: false,
    minHeight: undefined,
    maxHeight: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    class: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur', event: Event): void;
    (e: 'focus', event: Event): void;
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

    <template #default="{ componentField, errorMessage: fieldError }">
      <BaseEditor
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :class="props.class"
        :disabled="disabled"
        :invalid="!!fieldError"
        :max-height="maxHeight"
        :min-height="minHeight"
        :placeholder="placeholder"
        :readonly="readonly"
        :test-id="testId"
        @blur="(e: Event) => emits('blur', e)"
        @focus="(e: Event) => emits('focus', e)"
      />
    </template>
  </FieldShell>
</template>
