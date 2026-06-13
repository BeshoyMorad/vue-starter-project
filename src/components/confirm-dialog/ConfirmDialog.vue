<script setup lang="ts">
  import { watch } from 'vue';
  import { Dialog, DialogClose } from '@/components/ui/dialog';
  import { Button, Icon } from '@/components';
  import { cn } from '@/utils';
  import type { ConfirmDialogEmits, ConfirmDialogProps } from '.';

  const {
    testId,
    icon = undefined,
    title = undefined,
    description = undefined,
    cancelLabel = 'Cancel',
    confirmLabel = 'Confirm',
    confirmVariant = 'default',
    loading = false,
    autoClose = true,
    hideCloseIcon = false,
    hideHeader = true,
    contentClass = '',
    bodyClass = '',
    iconClass = 'text-text-primary',
  } = defineProps<ConfirmDialogProps>();

  const isOpen = defineModel<boolean>('open');
  const emit = defineEmits<ConfirmDialogEmits>();

  // Track if close was triggered by confirm to prevent double-canceling
  let isConfirming = false;

  const confirm = () => {
    isConfirming = true;
    if (autoClose) {
      isOpen.value = false;
    }
    emit('confirm');
  };

  // Handle Cancel event when dialog is closed externally (Escape, Overlay click, etc.)
  watch(isOpen, (newVal) => {
    if (!newVal) {
      if (!isConfirming) {
        emit('cancel');
      }
      isConfirming = false; // Reset state
    }
  });
</script>

<template>
  <Dialog
    v-model:open="isOpen"
    :hide-close-icon="hideCloseIcon"
    :hide-header="hideHeader"
    :content-class="contentClass"
    :body-class="
      cn(
        'flex flex-col items-center justify-center px-6 py-16 grow w-full gap-6 relative',
        bodyClass
      )
    "
  >
    <!-- Forward trigger and header slots -->
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>

    <slot>
      <div class="flex flex-col items-center gap-2 text-center">
        <div v-if="icon" class="flex items-center justify-center p-5 rounded-full">
          <Icon :test-id="`${testId}-icon`" :icon="icon" :class="cn('w-8 h-8', iconClass)" />
        </div>

        <p v-if="title" class="font-semibold text-xl text-text-default m-0">
          {{ title }}
        </p>

        <p
          v-if="description"
          class="font-medium text-sm text-text-disabled m-0 whitespace-pre-line"
        >
          {{ description }}
        </p>
      </div>
    </slot>

    <template #footer>
      <slot name="footer">
        <DialogClose :as-child="true">
          <Button
            :test-id="`${testId}-cancel-button`"
            variant="ghost"
            class="min-w-35.5"
            @click="emit('cancel')"
          >
            {{ cancelLabel }}
          </Button>
        </DialogClose>

        <Button
          :test-id="`${testId}-confirm-button`"
          :variant="confirmVariant"
          class="min-w-35.5"
          :loading="loading"
          @click="confirm"
        >
          {{ confirmLabel }}
        </Button>
      </slot>
    </template>
  </Dialog>
</template>
