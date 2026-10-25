<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useFieldModel } from '@/components/form/shared';
  import type { MediaValue } from '@/types/media';
  import BaseImageUpload from './BaseImageUpload.vue';
  import type { ImageUploadProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<ImageUploadProps>(), {
    modelValue: null,
    disabled: false,
    placeholder: 'Upload image',
    sizePreset: 'default',
    allowedTypes: undefined,
    crop: false,
    cropAspectRatio: undefined,
    maxSizeMb: undefined,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: MediaValue | null): void;
  }>();

  const modelValue = useFieldModel(props, emits, null);
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
      <BaseImageUpload
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :allowed-types="allowedTypes"
        :crop="crop"
        :crop-aspect-ratio="cropAspectRatio"
        :disabled="disabled"
        :max-size-mb="maxSizeMb"
        :placeholder="placeholder"
        :size-preset="sizePreset"
        :test-id="testId"
      />
    </template>
  </FieldShell>
</template>
