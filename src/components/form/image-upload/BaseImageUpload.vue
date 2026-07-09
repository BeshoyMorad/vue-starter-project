<script setup lang="ts">
  /* eslint-disable max-lines */
  import type { MediaValue } from '@/types/media';
  import { ref, computed, watch } from 'vue';
  import { cn } from '@/utils';
  import { Icon, Button } from '@/components';
  import { createMediaValue } from '@/composables/useFormMedia';
  import { error } from '@/utils/toast';
  import { DEFAULT_ALLOWED_TYPES, MIME_TO_EXTENSION } from './constants';
  import ImageCropperDialog from './ImageCropperDialog.vue';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: MediaValue | null;
    disabled?: boolean;
    placeholder?: string;
    sizePreset?: 'logo' | 'smallLogo' | 'avatar' | 'default';
    ariaInvalid?: boolean;
    allowedTypes?: string[];
    crop?: boolean;
    cropAspectRatio?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    disabled: false,
    placeholder: 'Upload image',
    sizePreset: 'default',
    ariaInvalid: false,
    allowedTypes: undefined,
    crop: false,
    cropAspectRatio: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: MediaValue | null): void;
  }>();

  // Cropper State
  const cropperVisible = ref(false);
  const selectedImage = ref<string | null>(null);
  const selectedFileMeta = ref<{ name: string; type: string } | null>(null);

  // DOM References
  const fileInputRef = ref<HTMLInputElement | null>(null);

  // Internal Media State
  const localMedia = ref<MediaValue>(createMediaValue(null));

  // Sync props.modelValue to localMedia
  watch(
    () => props.modelValue,
    (newVal) => {
      localMedia.value = newVal ? newVal : createMediaValue(null);
    },
    { immediate: true, deep: true }
  );

  // Computed Properties
  const previewUrl = computed(() => {
    if (localMedia.value.tempUrl) return localMedia.value.tempUrl;
    if (localMedia.value.initialUrl && !localMedia.value.wasRemoved) {
      return localMedia.value.initialUrl;
    }
    return null;
  });

  const hasMedia = computed(() =>
    Boolean(localMedia.value.file || (localMedia.value.initialUrl && !localMedia.value.wasRemoved))
  );

  const displayHint = computed(() => {
    const types = props.allowedTypes || DEFAULT_ALLOWED_TYPES;
    const extensions = types.map((t) => MIME_TO_EXTENSION[t] || t.split('/')[1] || t);
    if (extensions.length === 0) return '';
    if (extensions.length === 1) return `Allowed file type: ${extensions[0]}.`;
    const allButLast = extensions.slice(0, -1).join(', ');
    return `Allowed file types: ${allButLast}, and ${extensions[extensions.length - 1]}.`;
  });

  const acceptAttribute = computed(() => (props.allowedTypes || DEFAULT_ALLOWED_TYPES).join(','));

  const computedAspectRatio = computed(() => {
    if (props.cropAspectRatio !== undefined) {
      return props.cropAspectRatio;
    }
    if (props.sizePreset === 'avatar') {
      return 1;
    }
    if (props.sizePreset === 'logo') {
      return 64 / 24;
    }
    if (props.sizePreset === 'smallLogo') {
      return 2;
    }
    return undefined;
  });

  const sizeClasses = {
    avatar: 'size-24',
    logo: 'w-64 h-24',
    smallLogo: 'w-32 h-16',
    default: 'w-full h-40',
  } as const;

  // Handlers
  const triggerFileInput = () => {
    if (props.disabled) return;
    fileInputRef.value?.click();
  };

  const handleFileSelection = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    // 1. Restrict file name characters
    const invalidNamePattern = /[%<>:"'|?*\\/#&+\s]/;
    if (invalidNamePattern.test(file.name)) {
      error(
        'File name contains invalid characters. Avoid spaces or special characters like %, <, >, :, ", |, ?, *, \\, /, #, &, +.'
      );
      target.value = '';
      return;
    }

    // 2. Restrict file size (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      error('File size exceeds the 10MB limit.');
      target.value = '';
      return;
    }

    // 3. Restrict file type
    const types = props.allowedTypes || DEFAULT_ALLOWED_TYPES;
    if (!types.includes(file.type)) {
      error('Invalid file type.');
      target.value = '';
      return;
    }

    if (props.crop) {
      selectedFileMeta.value = { name: file.name, type: file.type };
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImage.value = e.target?.result as string;
        cropperVisible.value = true;
      };
      reader.readAsDataURL(file);
      target.value = '';
      return;
    }

    // Revoke old temp URL to prevent memory leaks
    if (localMedia.value.tempUrl) {
      URL.revokeObjectURL(localMedia.value.tempUrl);
    }

    const updatedMedia: MediaValue = {
      file,
      tempUrl: URL.createObjectURL(file),
      mediaId: null, // Reset mediaId so it re-uploads
      initialUrl: localMedia.value.initialUrl,
      isChanged: true,
      wasRemoved: true, // Mark initialUrl as needing removal since it's replaced
    };

    localMedia.value = updatedMedia;
    emits('update:modelValue', updatedMedia);

    // Reset input value so change event fires again if selecting the same file
    target.value = '';
  };

  const handleCrop = (blob: Blob) => {
    if (!selectedFileMeta.value) return;

    const file = new File([blob], selectedFileMeta.value.name, {
      type: selectedFileMeta.value.type,
    });

    if (localMedia.value.tempUrl) {
      URL.revokeObjectURL(localMedia.value.tempUrl);
    }

    const updatedMedia: MediaValue = {
      file,
      tempUrl: URL.createObjectURL(file),
      mediaId: null,
      initialUrl: localMedia.value.initialUrl,
      isChanged: true,
      wasRemoved: true,
    };

    localMedia.value = updatedMedia;
    emits('update:modelValue', updatedMedia);

    selectedImage.value = null;
    selectedFileMeta.value = null;
  };

  const handleCropCancel = () => {
    selectedImage.value = null;
    selectedFileMeta.value = null;
  };

  const clearMedia = (event: Event) => {
    event.stopPropagation();
    if (props.disabled) return;

    if (localMedia.value.tempUrl) {
      URL.revokeObjectURL(localMedia.value.tempUrl);
    }

    const updatedMedia: MediaValue = {
      file: null,
      tempUrl: '',
      mediaId: null,
      initialUrl: localMedia.value.initialUrl,
      isChanged: true,
      wasRemoved: true,
    };

    localMedia.value = updatedMedia;
    emits('update:modelValue', updatedMedia);
  };
</script>

<template>
  <div class="w-fit" :data-test-id="testId">
    <!-- Hidden input -->
    <input
      ref="fileInputRef"
      type="file"
      :accept="acceptAttribute"
      class="hidden"
      :disabled="disabled"
      @change="handleFileSelection"
    />

    <slot
      :preview-url="previewUrl"
      :has-media="hasMedia"
      :display-hint="displayHint"
      :disabled="disabled"
      :local-media="localMedia"
      :trigger-file-input="triggerFileInput"
      :clear-media="clearMedia"
    >
      <!-- Default Preset: Horizontal Layout -->
      <div v-if="props.sizePreset === 'default'" class="group relative flex items-center gap-4">
        <div class="relative size-24 shrink-0">
          <div
            :class="
              cn(
                'relative flex size-full items-center justify-center overflow-hidden rounded-full border-[1.5px] transition-all duration-300',
                hasMedia
                  ? 'bg-background-surface'
                  : 'bg-background hover:bg-default-hovered cursor-pointer border-dashed',
                props.ariaInvalid
                  ? 'border-border-danger'
                  : hasMedia
                    ? 'border-border'
                    : 'border-border hover:border-border-primary',
                {
                  'pointer-events-none cursor-not-allowed opacity-50': disabled,
                }
              )
            "
            @click="triggerFileInput"
          >
            <template v-if="hasMedia">
              <!-- Image Preview -->
              <img
                :src="previewUrl || ''"
                alt="Upload preview"
                class="size-full object-cover select-none"
              />

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <Icon icon="hugeicons--pencil-edit-02" class="size-5 text-white" />
              </div>
            </template>

            <template v-else>
              <!-- Circular Placeholder Icon -->
              <Icon icon="hugeicons--image-add-01" class="text-text-disabled size-8" />
            </template>
          </div>

          <!-- Remove Button for Default Preset -->
          <button
            v-if="hasMedia"
            type="button"
            aria-label="Remove image"
            :data-test-id="`${testId}-remove`"
            class="absolute -top-1 -right-1 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-all duration-200 hover:scale-105 hover:bg-black/80"
            @click="clearMedia"
          >
            <Icon icon="hugeicons--cancel-01" class="size-4" />
          </button>
        </div>

        <div class="flex flex-col items-start gap-1.5">
          <Button
            type="button"
            variant="outline"
            :disabled="disabled"
            icon="hugeicons--upload-01"
            icon-size="sm"
            size="sm"
            :test-id="`${testId}-upload-btn`"
            class="cursor-pointer font-semibold"
            @click="triggerFileInput"
          >
            Upload Photo
          </Button>
          <span v-if="displayHint" class="text-foreground-caption text-xs">
            {{ displayHint }}
          </span>
        </div>
      </div>

      <!-- Other Presets: Block Layout -->
      <div v-else :class="cn('group relative', sizeClasses[props.sizePreset])">
        <div
          :class="
            cn(
              'relative flex size-full items-center justify-center overflow-hidden border-[1.5px] transition-all duration-300',
              props.sizePreset === 'avatar' ? 'rounded-full' : 'rounded-lg',
              hasMedia
                ? 'bg-background-surface'
                : 'bg-background hover:bg-default-hovered cursor-pointer border-dashed',
              props.ariaInvalid
                ? 'border-border-danger'
                : hasMedia
                  ? 'border-border-disabled'
                  : 'border-border-disabled hover:border-border-primary',
              {
                'pointer-events-none cursor-not-allowed opacity-50': disabled,
              }
            )
          "
          @click="triggerFileInput"
        >
          <template v-if="hasMedia">
            <!-- Image Preview -->
            <img
              :src="previewUrl || ''"
              alt="Upload preview"
              class="size-full object-cover select-none"
            />

            <!-- Hover Overlay -->
            <div
              class="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <div class="flex flex-col items-center gap-1 text-xs font-semibold text-white">
                <Icon icon="hugeicons--pencil-edit-02" class="size-5" />
                <span>Change</span>
              </div>
            </div>
          </template>

          <template v-else>
            <!-- Placeholder / Drag & Drop view -->
            <div class="flex flex-col items-center justify-center p-4 text-center select-none">
              <Icon icon="hugeicons--image-upload" class="text-text-disabled mb-2 size-6" />
              <span class="text-text-default text-xs font-medium">{{ placeholder }}</span>
            </div>
          </template>
        </div>

        <!-- Remove/Delete Button -->
        <button
          v-if="hasMedia"
          type="button"
          aria-label="Remove image"
          :data-test-id="`${testId}-remove`"
          :class="
            cn(
              'absolute z-10 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-all duration-200 hover:scale-105 hover:bg-black/80',
              props.sizePreset === 'avatar' ? '-top-1 -right-1' : 'top-1.5 right-1.5'
            )
          "
          @click="clearMedia"
        >
          <Icon icon="hugeicons--cancel-01" class="size-4" />
        </button>
      </div>
    </slot>

    <ImageCropperDialog
      v-model:visible="cropperVisible"
      :image="selectedImage"
      :aspect-ratio="computedAspectRatio"
      @crop="handleCrop"
      @cancel="handleCropCancel"
    />
  </div>
</template>
