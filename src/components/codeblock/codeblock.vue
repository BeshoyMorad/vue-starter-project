<script setup lang="ts">
  const { code, header } = defineProps<{
    code: string;
    header?: string;
  }>();
  import { ref } from 'vue';
  import { success } from '@/utils/toast';

  const copied = ref(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    success('Copied to clipboard');
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
</script>

<template>
  <div
    class="bg-surface-secondary border-primary-500 max-h-[250px] overflow-hidden rounded-xl border"
  >
    <div class="border-primary-500 flex items-center justify-between border-b px-4 py-2">
      <span class="text-xs font-medium text-zinc-400">
        {{ header ? header : 'Code' }}
      </span>

      <button
        type="button"
        class="outline-secondary rounded-md px-2.5 py-0.5 text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        @click="copyCode"
      >
        {{ copied ? '✓ Copied' : 'Copy' }}
      </button>
    </div>

    <pre
      class="text-primary-900 dark:text-primary-100 bg-primary-100/20 dark:bg-primary-900 [&::-webkit-scrollbar-thumb]:bg-primary-500/45 h-full max-h-[205px] overflow-auto px-4 py-2 font-mono text-[11px] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5"
    ><code>{{ code }}</code></pre>
  </div>
</template>
