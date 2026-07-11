<script setup lang="ts">
  import type { AccordionContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { AccordionContent } from 'reka-ui';
  import { cn } from '@/utils';

  const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="delegatedProps"
    class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down border-border overflow-hidden rounded-b-xl border border-t-0 text-sm data-[state=closed]:border-b-0"
  >
    <div :class="cn('bg-background-surface p-6', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
