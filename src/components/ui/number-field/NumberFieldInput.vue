<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { NumberFieldInput } from 'reka-ui';
  import { cn } from '@/utils';
  import { inputVariants } from '@/components/ui/input';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
  }>();
</script>

<template>
  <NumberFieldInput
    data-slot="input"
    :class="
      cn(
        inputVariants(),
        'aria-invalid:focus:ring-danger-300 inline-flex h-10 px-2 py-2 text-sm',
        props.class
      )
    "
  />
</template>
