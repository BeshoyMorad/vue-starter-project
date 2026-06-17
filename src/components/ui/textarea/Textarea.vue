<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { cn } from '@/utils';
  import { inputVariants } from '@/components/ui/input';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
    defaultValue?: string | number;
    modelValue?: string | number;
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
  <textarea
    v-model="modelValue"
    data-slot="textarea"
    :class="
      cn(
        inputVariants(),
        'appearance-none text-sm font-medium px-3 py-3.5 min-h-24 disabled:bg-bg-disabled',
        props.class
      )
    "
  />
</template>
