<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { cn } from '@/utils';

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
        'appearance-none text-text-default rounded-md border-[1.5px] focus:ring-2 focus:outline-0',
        'text-sm font-medium px-3 py-3.5 min-h-24',
        'border-border-disabled hover:border-border-primary focus:ring-border-ring focus-visible:ring-border-ring',
        'placeholder:text-text-disabled read-only:bg-bg-default',
        'disabled:text-text-disabled aria-invalid:border-border-danger disabled:border-border-disabled disabled:bg-bg-disabled disabled:cursor-not-allowed',
        props.class
      )
    "
  />
</template>
