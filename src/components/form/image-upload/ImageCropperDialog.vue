<script setup lang="ts">
  import { ref } from 'vue';
  import { Cropper } from 'vue-advanced-cropper';
  import 'vue-advanced-cropper/dist/style.css';
  import { Button, Dialog } from '@/components';
  import { TEST_IDS } from '@/lib/test-ids';

  interface Props {
    image: string | null;
    aspectRatio?: number;
    header?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    aspectRatio: undefined,
    stencilComponent: undefined,
    header: 'Crop Image',
  });

  const emit = defineEmits<{
    (e: 'crop', blob: Blob): void;
    (e: 'cancel'): void;
  }>();

  const visible = defineModel<boolean>('visible', { default: false });
  const cropperRef = ref<InstanceType<typeof Cropper> | null>(null);

  const handleCrop = () => {
    if (!cropperRef.value) return;
    const { canvas } = cropperRef.value.getResult();
    if (canvas) {
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          emit('crop', blob);
          visible.value = false;
        }
      }, 'image/jpeg');
    }
  };

  const handleCancel = () => {
    visible.value = false;
    emit('cancel');
  };
</script>

<template>
  <Dialog
    v-model:open="visible"
    :title="props.header"
    :hide-close-icon="true"
    content-class="w-full rounded-2xl border border-border sm:max-w-3xl"
    body-class="p-0"
  >
    <Cropper
      ref="cropperRef"
      class="h-[45vh] w-3xl"
      :src="image"
      :stencil-props="{
        aspectRatio: aspectRatio,
      }"
      image-restriction="stencil"
    />

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <Button
          :test-id="TEST_IDS.imageCropperDialog.cancelButton"
          variant="outline"
          class="min-w-28 rounded-lg"
          type="button"
          @click="handleCancel"
        >
          Cancel
        </Button>

        <Button
          :test-id="TEST_IDS.imageCropperDialog.applyButton"
          variant="default"
          class="min-w-28 rounded-lg"
          type="button"
          @click="handleCrop"
        >
          Apply Crop
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
  .vue-advanced-cropper {
    background: transparent;
  }
  .checkered-bg {
    background-image:
      linear-gradient(45deg, var(--color-background-surface) 25%, transparent 25%),
      linear-gradient(-45deg, var(--color-background-surface) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--color-background-surface) 75%),
      linear-gradient(-45deg, transparent 75%, var(--color-background-surface) 75%);
    background-size: 20px 20px;
    background-position:
      0 0,
      0 10px,
      10px -10px,
      -10px 0px;
    background-color: var(--color-background);
  }
</style>
