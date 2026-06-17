<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { cn } from '@/utils';
  import { inputVariants } from '.';

  const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes['class'];
  }>();

  const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="
      cn(
        inputVariants(),
        'h-10 text-sm px-2 py-2 inline-flex aria-invalid:focus:ring-danger-300',
        props.class
      )
    "
  />
</template>
