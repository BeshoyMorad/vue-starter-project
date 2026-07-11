<script setup lang="ts">
  import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui';
  import { AccordionRoot, useForwardPropsEmits } from 'reka-ui';

  const props = defineProps<AccordionRootProps>();
  const emits = defineEmits<AccordionRootEmits>();

  const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AccordionRoot
    v-slot="slotProps"
    data-slot="accordion"
    v-bind="forwarded"
    class="flex flex-col gap-6"
  >
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>
