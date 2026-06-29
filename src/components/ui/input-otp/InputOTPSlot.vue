<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { useForwardProps } from 'reka-ui';
  import { computed } from 'vue';
  import { useVueOTPContext } from 'vue-input-otp';
  import { cn } from '@/utils';

  const props = defineProps<{ index: number; class?: HTMLAttributes['class'] }>();

  const delegatedProps = reactiveOmit(props, 'class');

  const forwarded = useForwardProps(delegatedProps);

  const context = useVueOTPContext();

  const slot = computed(() => context?.value.slots[props.index]);
</script>

<template>
  <div
    v-bind="forwarded"
    data-slot="input-otp-slot"
    :data-active="slot?.isActive"
    :class="
      cn(
        'border-border-disabled relative flex size-12 items-center justify-center border border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md',
        'data-[active=true]:ring-border-primary data-[active=true]:z-10 data-[active=true]:ring-3',
        'data-[active=true]:aria-invalid:border-border-danger/20 aria-invalid:border-border-danger',
        props.class
      )
    "
  >
    {{ slot?.char }}
    <div
      v-if="slot?.hasFakeCaret"
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div class="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
    </div>
  </div>
</template>
