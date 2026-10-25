<script setup lang="ts">
  import { useFieldId } from '@/components/form/shared';
  import { computed, useAttrs } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
  import { cn } from '@/utils';
  import type { BaseRadioProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<BaseRadioProps>(), {
    modelValue: undefined,
    defaultValue: undefined,
    value: '',
    disabled: false,
    label: undefined,
    id: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });

  const attrs = useAttrs();

  const resolvedId = useFieldId(props);

  const isInvalid = computed(() => {
    return attrs['aria-invalid'] === 'true' || attrs['aria-invalid'] === true;
  });
</script>

<template>
  <RadioGroup v-bind="attrs" v-model="modelValue" class="inline-flex" :data-test-id="testId">
    <div class="flex items-center gap-2.5">
      <RadioGroupItem
        :id="resolvedId"
        :aria-invalid="isInvalid || undefined"
        :disabled="disabled"
        :data-test-id="testId"
        :value="value"
      />
      <label
        v-if="label"
        :for="resolvedId"
        :class="
          cn('text-text-default cursor-pointer text-sm select-none', {
            'text-text-disabled cursor-default': disabled,
            'text-text-danger': isInvalid,
          })
        "
      >
        {{ label }}
      </label>
    </div>
  </RadioGroup>
</template>
