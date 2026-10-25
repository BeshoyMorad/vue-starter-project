<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel, useBaseSlots } from '@/components/form/shared';
  import type { MediaValue } from '@/types/media';
  import BaseFileUpload from './BaseFileUpload.vue';
  import type { FileUploadProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<FileUploadProps>(), {
    modelValue: () => [],
    disabled: false,
    placeholder: undefined,
    buttonLabel: undefined,
    allowedTypes: undefined,
    maxFiles: undefined,
    maxSizeMb: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: MediaValue[]): void;
  }>();

  const modelValue = useFieldModel(props, emits, []);
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
      <BaseFileUpload
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :allowed-types="allowedTypes"
        :button-label="buttonLabel"
        :disabled="disabled"
        :max-files="maxFiles"
        :max-size-mb="maxSizeMb"
        :placeholder="placeholder"
        :test-id="testId"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </BaseFileUpload>
    </template>
  </FieldShell>
</template>
