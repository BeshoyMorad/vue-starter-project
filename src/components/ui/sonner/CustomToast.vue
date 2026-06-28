<script lang="ts">
  import { ref } from 'vue';

  const isGloballyPaused = ref(false);
</script>

<script setup lang="ts">
  import { TEST_IDS } from '@/lib/test-ids';
  import { onMounted, onUnmounted, ref as vueRef } from 'vue';

  defineProps<{
    title: string;
    body: string;
    duration?: number;
  }>();

  const toastRef = vueRef<HTMLElement | null>(null);
  let parentToast: Element | null = null;

  // When one toast is hovered, it pauses EVERY toast
  const handleMouseEnter = () => (isGloballyPaused.value = true);
  const handleMouseLeave = () => (isGloballyPaused.value = false);

  onMounted(() => {
    parentToast = toastRef.value?.closest('[data-sonner-toast]') || null;

    if (parentToast) {
      parentToast.addEventListener('mouseenter', handleMouseEnter);
      parentToast.addEventListener('mouseleave', handleMouseLeave);
    }
  });

  onUnmounted(() => {
    if (parentToast) {
      parentToast.removeEventListener('mouseenter', handleMouseEnter);
      parentToast.removeEventListener('mouseleave', handleMouseLeave);
    }
  });
</script>

<template>
  <div ref="toastRef" class="flex flex-col gap-1">
    <p class="text-base font-semibold" :data-test-id="TEST_IDS.toast.status">
      {{ title }}
    </p>
    <p class="text-sm font-normal" :data-test-id="TEST_IDS.toast.message">{{ body }}</p>

    <div class="absolute right-0 bottom-0 left-0 h-1 overflow-hidden rounded-b-lg bg-white/10">
      <div
        class="toast-progress-bar h-full origin-left bg-current opacity-40"
        :style="{
          animationDuration: `${duration ?? 5000}ms`,
          animationPlayState: isGloballyPaused ? 'paused' : 'running',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
  @keyframes toast-progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  .toast-progress-bar {
    animation: toast-progress linear forwards;
  }
</style>
