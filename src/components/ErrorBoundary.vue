<script setup lang="ts">
  import { ref, onErrorCaptured, nextTick, type ComponentPublicInstance } from 'vue';
  import { ExceptionState } from '@/components';
  import { config } from '@/config/env';

  interface Props {
    fallbackTitle?: string;
    fallbackDescription?: string;
    showDetails?: boolean;
    logError?: (error: Error, info: string, instance: ComponentPublicInstance | null) => void;
  }

  const props = withDefaults(defineProps<Props>(), {
    fallbackTitle: 'Something went wrong',
    fallbackDescription: 'An unexpected error occurred while loading this section.',
    showDetails: () => config.env === 'development',
    logError: undefined,
  });

  const emit = defineEmits<{
    (e: 'error', data: { error: Error; info: string }): void;
    (e: 'reset'): void;
  }>();

  const hasError = ref(false);
  const error = ref<Error | null>(null);
  const errorInfo = ref<string | null>(null);
  const detailsOpen = ref(false);

  onErrorCaptured((err: Error, instance: ComponentPublicInstance | null, info: string) => {
    hasError.value = true;
    error.value = err;
    errorInfo.value = info;

    // Log the error using custom logger if provided
    if (props.logError) {
      try {
        props.logError(err, info, instance);
      } catch (logErr) {
        // eslint-disable-next-line no-console
        console.error('Error occurred in logError callback:', logErr);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary Captured Error]:', err, info);
    }

    // Emit event
    emit('error', { error: err, info });

    // Return false to prevent error from propagating further
    return false;
  });

  const reset = async () => {
    hasError.value = false;
    error.value = null;
    errorInfo.value = null;
    detailsOpen.value = false;
    await nextTick();
    emit('reset');
  };

  defineExpose({
    reset,
    hasError,
    error,
    errorInfo,
  });
</script>

<template>
  <slot v-if="!hasError" />

  <!-- Custom Fallback Slot -->
  <slot
    v-else-if="$slots.fallback"
    name="fallback"
    :error="error"
    :info="errorInfo"
    :reset="reset"
  />

  <ExceptionState
    v-else
    image="@/assets/images/internal-server-error.png"
    :title="fallbackTitle"
    :description="fallbackDescription"
    button-label="Try again"
    :button-action="reset"
  />
</template>
