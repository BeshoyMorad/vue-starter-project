<script setup lang="ts">
  import type { ComboboxPortalProps } from 'reka-ui';
  import { ComboboxPortal, useForwardProps } from 'reka-ui';

  const props = defineProps<ComboboxPortalProps>();

  const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxPortal v-bind="forwarded">
    <slot />
  </ComboboxPortal>
</template>
