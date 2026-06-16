<script setup lang="ts">
  import { computed, useAttrs } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { checkboxGroupVariants, type CheckboxGroupOption } from './index';
  import BaseCheckbox from '@/components/form/checkbox/BaseCheckbox.vue';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    options: CheckboxGroupOption[];
    modelValue?: unknown[];
    defaultValue?: unknown[];
    layout?: 'vertical' | 'horizontal';
    size?: 'small' | 'default' | 'large';
    shape?: 'circle' | 'square';
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    layout: 'vertical',
    size: 'default',
    shape: 'square',
    disabled: false,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: unknown[]): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue ?? [],
  });

  const attrs = useAttrs();

  const isInvalid = computed(() => {
    return attrs['aria-invalid'] === 'true' || attrs['aria-invalid'] === true;
  });

  const rootClasses = computed(() =>
    checkboxGroupVariants({ layout: props.layout, size: props.size })
  );

  const onOptionChange = (optionValue: unknown, checked: boolean) => {
    const newVal = [...(modelValue.value || [])];
    if (checked === true) {
      if (!newVal.includes(optionValue)) {
        newVal.push(optionValue);
      }
    } else {
      const index = newVal.indexOf(optionValue);
      if (index > -1) {
        newVal.splice(index, 1);
      }
    }
    modelValue.value = newVal;
  };
</script>

<template>
  <div v-bind="attrs" :class="rootClasses" role="group" :data-test-id="props.testId">
    <div v-for="option in options" :key="option.value">
      <BaseCheckbox
        :aria-invalid="isInvalid || undefined"
        :disabled="disabled || option.disabled"
        :label="option.label"
        :model-value="(modelValue || []).includes(option.value)"
        :shape="shape"
        :size="size"
        :test-id="`${props.testId}-${option.value}`"
        @update:model-value="(checked) => onOptionChange(option.value, checked)"
      />
    </div>
  </div>
</template>
