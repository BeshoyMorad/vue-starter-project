<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { RouterLinkProps } from "vue-router";
import type { ButtonVariants } from ".";
import type { IconVariants } from "@/components/icon";
import { computed, markRaw } from "vue";
import { RouterLink } from "vue-router";
import { Primitive } from "reka-ui";
import { Icon } from "@/components";
import { cn } from "@/utils";
import { buttonVariants } from ".";

interface Props extends PrimitiveProps {
  /** When omitted, no `data-test-id` is set (design demos / icon-only triggers). */
  testId?: string;
  color?: ButtonVariants["color"];
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  iconPos?: ButtonVariants["iconPos"];
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  icon?: HTMLAttributes["class"];
  iconSize?: IconVariants["size"];
  iconClass?: HTMLAttributes["class"];
  isIconColored?: IconVariants["colored"];
  class?: HTMLAttributes["class"];
  to?: RouterLinkProps["to"];
  replace?: RouterLinkProps["replace"];
  type?: HTMLButtonElement["type"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  type: "button",
});

const RouterLinkRaw = markRaw(RouterLink);

const resolvedAs = computed(() =>
  props.to != null ? RouterLinkRaw : props.as,
);

const resolvedDisabled = computed(() =>
  Boolean(props.disabled || props.loading),
);

const linkTo = computed(() => {
  if (props.to == null) return undefined;
  if (resolvedDisabled.value) {
    return {} as RouterLinkProps["to"];
  }
  return props.to;
});

const onRootClick = (event: MouseEvent) => {
  if (props.to != null && resolvedDisabled.value) {
    event.preventDefault();
  }
};

const testIdPrefix = computed(() => props.testId ?? "button");
</script>

<template>
  <Primitive
    :as="resolvedAs"
    :as-child="asChild"
    :disabled="to == null ? resolvedDisabled : undefined"
    :data-test-id="testId ?? undefined"
    data-slot="button"
    :data-color="color"
    :data-variant="variant"
    :data-size="size"
    :aria-busy="loading ? 'true' : undefined"
    :aria-disabled="to != null && resolvedDisabled ? 'true' : undefined"
    v-bind="
      to != null
        ? {
            to: linkTo,
            ...(replace !== undefined ? { replace } : {}),
          }
        : {}
    "
    :class="cn(buttonVariants({ color, variant, size, iconPos }), props.class)"
    :type="type"
    @click="onRootClick"
  >
    <Icon
      v-if="loading"
      :test-id="`${testIdPrefix}-loading-icon`"
      icon="hugeicons--loading-03"
      class="animate-spin"
    />
    <Icon
      v-else-if="icon"
      :test-id="`${testIdPrefix}-icon`"
      :icon="icon"
      :size="iconSize"
      :colored="isIconColored"
      :class="iconClass"
    />
    <span v-if="label || $slots.default" class="truncate whitespace-nowrap">
      <slot v-if="!loading">{{ label }}</slot>
    </span>
  </Primitive>
</template>
