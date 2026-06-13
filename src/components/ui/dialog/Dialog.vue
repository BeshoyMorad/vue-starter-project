<script setup lang="ts">
  import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit } from '@vueuse/core';
  import { useForwardPropsEmits } from 'reka-ui';
  import { Icon } from '@/components';
  import { Button } from '@/components';
  import { cn } from '@/utils';
  import DialogClose from './DialogClose.vue';
  import DialogContent from './DialogContent.vue';
  import DialogDescription from './DialogDescription.vue';
  import DialogFooter from './DialogFooter.vue';
  import DialogHeader from './DialogHeader.vue';
  import DialogRoot from './DialogRoot.vue';
  import DialogTitle from './DialogTitle.vue';
  import DialogTrigger from './DialogTrigger.vue';

  type Props = DialogRootProps & {
    title?: string;
    description?: string;
    hideCloseIcon?: boolean;
    hideHeader?: boolean;
    contentClass?: HTMLAttributes['class'];
    bodyClass?: HTMLAttributes['class'];
    dismissable?: boolean;
    closeOnEscape?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    title: undefined,
    description: undefined,
    hideCloseIcon: false,
    hideHeader: false,
    contentClass: undefined,
    bodyClass: undefined,
    dismissable: true,
    closeOnEscape: true,
  });
  const emits = defineEmits<DialogRootEmits>();

  const delegatedRootProps = reactiveOmit(
    props,
    'title',
    'description',
    'hideHeader',
    'hideCloseIcon',
    'contentClass',
    'bodyClass',
    'dismissable',
    'closeOnEscape'
  );

  const forwarded = useForwardPropsEmits(delegatedRootProps, emits);
</script>

<template>
  <DialogRoot v-bind="forwarded" data-slot="dialog">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogContent
      :class="props.contentClass"
      :dismissable="dismissable"
      :close-on-escape="closeOnEscape"
    >
      <DialogHeader v-if="!props.hideHeader">
        <slot name="header">
          <div class="flex flex-col gap-1">
            <DialogTitle v-if="props.title">{{ props.title }}</DialogTitle>
            <DialogDescription v-if="props.description">
              {{ props.description }}
            </DialogDescription>
          </div>
        </slot>

        <DialogClose v-if="!props.hideCloseIcon" as-child>
          <Button test-id="dialog-close-button" variant="ghost" size="icon" aria-label="Close">
            <Icon icon="hugeicons--cancel-01" />
          </Button>
        </DialogClose>
      </DialogHeader>

      <div :class="cn('p-6', props.bodyClass)">
        <slot />
      </div>

      <DialogFooter v-if="$slots.footer">
        <slot name="footer" />
      </DialogFooter>
    </DialogContent>
  </DialogRoot>
</template>
