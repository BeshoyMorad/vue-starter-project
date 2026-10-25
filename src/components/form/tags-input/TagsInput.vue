<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel, useBaseSlots } from '@/components/form/shared';
  import BaseTagsInput from './BaseTagsInput.vue';
  import type { TagsInputProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<TagsInputProps>(), {
    modelValue: () => [],
    defaultValue: () => [],
    placeholder: undefined,
    disabled: false,
    tagClass: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
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
      <BaseTagsInput
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :disabled="disabled"
        :placeholder="placeholder"
        :tag-class="tagClass"
        :test-id="testId"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </BaseTagsInput>
    </template>
  </FieldShell>
</template>
