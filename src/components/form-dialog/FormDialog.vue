<script setup lang="ts">
  import { useId } from 'vue';
  import { Dialog, DialogClose } from '@/components/ui/dialog';
  import { Button } from '@/components';
  import { cn } from '@/utils';
  import type { ButtonVariants } from '@/components/ui/button';
  import type { HTMLAttributes } from 'vue';

  interface FormDialogProps {
    testId: string;
    title?: string;
    description?: string;
    cancelLabel?: string;
    submitLabel?: string;
    submitVariant?: ButtonVariants['variant'];
    loading?: boolean;
    isDirty?: boolean;
    hideCloseIcon?: boolean;
    hideHeader?: boolean;
    dismissable?: boolean;
    closeOnEscape?: boolean;
    contentClass?: HTMLAttributes['class'];
    bodyClass?: HTMLAttributes['class'];
  }

  interface FormDialogEmits {
    (e: 'cancel'): void;
    (e: 'submit', event: SubmitEvent): void;
  }
  const {
    testId,
    title = undefined,
    description = undefined,
    cancelLabel = 'Cancel',
    submitLabel = 'Confirm',
    submitVariant = 'default',
    loading = false,
    isDirty = false,
    hideCloseIcon = false,
    hideHeader = false,
    dismissable = true,
    closeOnEscape = true,
    contentClass = '',
    bodyClass = '',
  } = defineProps<FormDialogProps>();

  const isOpen = defineModel<boolean>('open');
  const emit = defineEmits<FormDialogEmits>();

  const formId = `${useId()}-form`;

  const onFormSubmit = (event: SubmitEvent) => {
    emit('submit', event);
  };
</script>

<template>
  <Dialog
    v-model:open="isOpen"
    :title="title"
    :description="description"
    :hide-close-icon="hideCloseIcon"
    :hide-header="hideHeader"
    :content-class="contentClass"
    :body-class="
      cn('flex flex-col items-center justify-center p-6 grow w-full gap-6 relative', bodyClass)
    "
    :dismissable="dismissable"
    :close-on-escape="closeOnEscape"
  >
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>

    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <form v-auto-animate :id="formId" :test-id="testId" @submit.prevent="onFormSubmit">
      <slot />
    </form>

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
          :variant="submitVariant"
          class="min-w-35.5"
          :disabled="!isDirty"
          :loading="loading"
        >
          {{ submitLabel }}
        </Button>
      </slot>
    </template>
  </Dialog>
</template>
