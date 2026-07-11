<script setup lang="ts">
  import type { AccordionTriggerProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { AccordionHeader, AccordionTrigger } from 'reka-ui';
  import { cn } from '@/utils';
  import { Icon } from '@/components';

  const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <AccordionHeader
    class="bg-background border-border font-heading text-foreground flex rounded-xl border border-b data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
  >
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="delegatedProps"
      :class="
        cn(
          'focus-visible:border-border-ring focus-visible:ring-border-ring-/50 flex flex-1 cursor-pointer items-center justify-between gap-3 rounded-xl p-6 text-left text-xl font-semibold transition-all outline-none hover:underline focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          props.class
        )
      "
    >
      <slot />
      <slot name="icon">
        <Icon icon="hugeicons--arrow-down-01" size="xl" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
