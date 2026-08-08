<script setup lang="ts">
  import type { Token } from '@/modules/tokenization/types';
  import { ref } from 'vue';
  import { Button, ConfirmDialog } from '@/components';
  import { useVerifyTokenMutation } from '@/modules/tokenization/mutations/useVerifyTokenMutation';
  import { TEST_IDS } from '@/lib/test-ids';

  const props = defineProps<{
    token: Token;
  }>();

  const isConfirmOpen = ref(false);
  const { mutate: verifyToken, isPending } = useVerifyTokenMutation();

  const handleVerify = () => {
    verifyToken(props.token.id, {
      onSuccess: () => {
        isConfirmOpen.value = false;
      },
    });
  };
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <Button
      :test-id="TEST_IDS.tokenization.verifyBtn.replace('{id}', String(token.id))"
      variant="ghost"
      size="sm"
      icon="hugeicons--checkmark-circle-01"
      icon-class="text-success"
      :disabled="token.verificationStatus !== 'PENDING'"
      @click="isConfirmOpen = true"
    />

    <ConfirmDialog
      v-if="isConfirmOpen"
      v-model:open="isConfirmOpen"
      :test-id="`verify-token-confirm-${token.id}`"
      title="Verify Token"
      :description="`Are you sure you want to verify ${token.name}?`"
      confirm-label="Verify"
      confirm-variant="success"
      icon="hugeicons--checkmark-circle-01"
      icon-class="text-success size-14"
      :loading="isPending"
      :auto-close="false"
      @confirm="handleVerify"
      @cancel="isConfirmOpen = false"
    />
  </div>
</template>
