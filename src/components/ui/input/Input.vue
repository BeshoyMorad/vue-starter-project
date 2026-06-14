<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { cn } from '@/utils';

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
        'h-10 text-sm px-2 py-2',
        'inline-flex text-text-default rounded-md border-[1.5px] focus:ring-2 focus:outline-0 placeholder:text-text-disabled read-only:bg-bg-default',
        'disabled:text-text-disabled disabled:border-border-disabled disabled:cursor-not-allowed',
        'aria-invalid:border-border-danger aria-invalid:focus:ring-danger-300',
        'border-border-disabled hover:border-border-primary focus:ring-border-ring focus-visible:ring-border-ring',
        props.class
      )
    "
  />
</template>
