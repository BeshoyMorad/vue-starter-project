<script setup lang="ts">
  import { computed, useAttrs, useId } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
  import { cn } from '@/utils';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string;
    defaultValue?: string;
    value?: string;
    disabled?: boolean;
    label?: string;
    id?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
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

  const resolvedId = computed(() => {
    if (props.id) return props.id;
    if (typeof attrs.id === 'string') return attrs.id;
    return useId();
  });

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
        :test-id="testId"
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
