<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { useForwardProps } from 'reka-ui';
  import { Icon } from '@/components';

  const props = defineProps<{ class?: HTMLAttributes['class'] }>();

  const forwarded = useForwardProps(props);
</script>

<template>
  <div data-slot="input-otp-separator" role="separator" v-bind="forwarded">
    <slot>
      <Icon icon="hugeicons--minus-sign" test-id="otp-separator" />
    </slot>
  </div>
</template>
