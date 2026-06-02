<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner";
import { Toaster as Sonner } from "vue-sonner";
import { cn } from "@/utils";
import { Icon } from "@/components";
import { TEST_IDS } from "@/lib/test-ids";

const props = defineProps<ToasterProps>();
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
  >
    <template #success-icon>
      <Icon
        icon="custom--check"
        :test-id="TEST_IDS.toast.success"
        class="size-4"
      />
    </template>

    <template #info-icon>
      <Icon
        icon="hugeicons--info"
        :test-id="TEST_IDS.toast.info"
        class="size-4"
      />
    </template>

    <template #warning-icon>
      <Icon
        icon="hugeicons--alert-02"
        :test-id="TEST_IDS.toast.warning"
        class="size-4"
      />
    </template>

    <template #error-icon>
      <Icon
        icon="hugeicons--cancel-circle"
        :test-id="TEST_IDS.toast.error"
        class="size-4"
      />
    </template>

    <template #loading-icon>
      <Icon
        icon="hugeicons--loading-03"
        :test-id="TEST_IDS.toast.loading"
        class="size-4 animate-spin"
      />
    </template>

    <template #close-icon>
      <Icon
        icon="hugeicons--cancel-01"
        :test-id="TEST_IDS.toast.close"
        class="size-4"
      />
    </template>
  </Sonner>
</template>
