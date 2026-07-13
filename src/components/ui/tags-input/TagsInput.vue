<script setup lang="ts">
  import type { TagsInputRootEmits, TagsInputRootProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { TagsInputRoot, useForwardPropsEmits } from 'reka-ui';
  import { cn } from '@/utils';
  import { inputVariants } from '@/components/ui/input';

  const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes['class'] }>();
  const emits = defineEmits<TagsInputRootEmits>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <TagsInputRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="
      cn(
        inputVariants(),
        'border-border-disabled focus-within:ring-border-primary focus-within:border-border-primary bg-bg-surface flex min-h-10 w-full flex-wrap items-center gap-1.5 px-2 py-1.5 text-sm focus-within:ring-2 focus-within:outline-none focus:ring-0 focus-visible:ring-0',
        'aria-invalid:border-border-danger aria-invalid:focus-within:ring-danger-300',
        props.class
      )
    "
  >
    <slot v-bind="slotProps" />
  </TagsInputRoot>
</template>
