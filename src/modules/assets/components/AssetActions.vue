<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { ConfirmDialog, Field } from '@/components';
  import type { AssetVault } from '@/modules/assets/types';
  import { TEST_IDS } from '@/lib/test-ids';
  import { useToggleAssetStatus } from '@/modules/assets/composables/useToggleAssetStatus';
  import { usePermissionStore } from '@/stores/permissions';

  const props = defineProps<{
    asset: AssetVault;
  }>();

  const { can } = usePermissionStore();
  const canUpdate = computed(() => can('assets.update'));

  const showHoldDialog = ref(false);
  const showActivateDialog = ref(false);

  const { mutate: toggleStatus, isPending: isToggling } = useToggleAssetStatus();

  const handleHold = () => {
    toggleStatus(props.asset.id, {
      onSuccess: () => {
        showHoldDialog.value = false;
      },
    });
  };

  const handleActivate = () => {
    toggleStatus(props.asset.id, {
      onSuccess: () => {
        showActivateDialog.value = false;
      },
    });
  };

  const handleToggle = (checked: boolean) => {
    if (checked) {
      showActivateDialog.value = true;
    } else {
      showHoldDialog.value = true;
    }
  };

  const status = computed(() => props.asset.status === 'ACTIVE');
  const switchKey = ref(0);

  watch([showHoldDialog, showActivateDialog], (newVals, oldVals) => {
    const becameClosed = newVals.some((val, i) => !val && oldVals[i]);
    if (becameClosed) {
      switchKey.value++;
    }
  });
</script>

<template>
  <Field.Switch
    v-if="canUpdate"
    :key="switchKey"
    :model-value="status"
    :test-id="TEST_IDS.assets.toggleStatus.replace('{id}', props.asset.id.toString())"
    :disabled="isToggling"
    size="small"
    @update:model-value="handleToggle"
  />

  <ConfirmDialog
    v-model:open="showHoldDialog"
    :test-id="props.asset.name"
    :title="`You are about to Hold ${props.asset.name}`"
    description="This action will restrict access to use this asset."
    icon="hugeicons--unavailable"
    icon-class="text-danger size-14"
    confirm-label="Hold"
    confirm-variant="danger"
    :loading="isToggling"
    :auto-close="false"
    @confirm="handleHold"
  />

  <ConfirmDialog
    v-model:open="showActivateDialog"
    :test-id="props.asset.name"
    :title="`You are about to Activate ${props.asset.name}`"
    description="This action will restore access to use this asset."
    icon="hugeicons--tick-01"
    icon-class="text-success size-14"
    confirm-label="Activate"
    confirm-variant="success"
    :loading="isToggling"
    :auto-close="false"
    @confirm="handleActivate"
  />
</template>
