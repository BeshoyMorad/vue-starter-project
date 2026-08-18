<script setup lang="ts">
  /* eslint-disable max-lines */
  import type { MediaValue } from '@/types/media';
  import { ref, computed, watch } from 'vue';
  import { cn } from '@/utils';
  import { Icon, Button } from '@/components';
  import { error } from '@/utils/toast';
  import {
    DEFAULT_ALLOWED_FILE_TYPES,
    MIME_TO_EXTENSION,
    EXTENSION_TO_ICON,
    DEFAULT_FILE_ICON,
    isImageMimeType,
    isImageExtension,
    getFileExtension,
    formatFileSize,
  } from '@/constants/file-upload';
  import { createMediaValueList } from '@/composables';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: MediaValue[];
    disabled?: boolean;
    placeholder?: string;
    buttonLabel?: string;
    ariaInvalid?: boolean;
    allowedTypes?: string[];
    maxFiles?: number;
    maxSizeMb?: number;
    hasDisplayHint?: boolean;
    hasPlaceholder?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    disabled: false,
    placeholder: 'No files uploaded yet',
    buttonLabel: 'Upload files',
    ariaInvalid: false,
    allowedTypes: undefined,
    maxFiles: undefined,
    maxSizeMb: 10,
    hasDisplayHint: true,
    hasPlaceholder: true,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: MediaValue[]): void;
  }>();

  // DOM References
  const fileInputRef = ref<HTMLInputElement | null>(null);
  const isDragging = ref(false);

  // Internal Media State - full list including "wasRemoved" placeholders that still
  // need to be reported to the API as removed (mirrors single BaseImageUpload behavior)
  const localFiles = ref<MediaValue[]>(createMediaValueList([]));

  // Sync props.modelValue to localFiles
  watch(
    () => props.modelValue,
    (newVal) => {
      localFiles.value = newVal ? [...newVal] : createMediaValueList([]);
    },
    { immediate: true, deep: true }
  );

  // Computed Properties
  const visibleFiles = computed(() =>
    localFiles.value
      .map((mediaVal, index) => ({ mediaVal, index }))
      .filter(({ mediaVal }) => !mediaVal.wasRemoved)
  );

  const displayHint = computed(() => {
    const types = props.allowedTypes || DEFAULT_ALLOWED_FILE_TYPES;
    const extensions = types.map((t) => MIME_TO_EXTENSION[t] || t.split('/')[1] || t);
    if (extensions.length === 0) return '';
    const base =
      extensions.length === 1
        ? `Allowed file type: ${extensions[0]}.`
        : `Allowed file types: ${extensions.slice(0, -1).join(', ')}, and ${extensions[extensions.length - 1]}.`;
    return `${base} Max ${props.maxSizeMb}MB per file.`;
  });

  const acceptAttribute = computed(() =>
    (props.allowedTypes || DEFAULT_ALLOWED_FILE_TYPES).join(',')
  );

  const isAtMax = computed(() =>
    props.maxFiles ? visibleFiles.value.length >= props.maxFiles : false
  );

  // Helpers
  const iconForFile = (mediaVal: MediaValue): string => {
    const name = mediaVal.file?.name || mediaVal.fileName || mediaVal.initialUrl || '';
    const ext = getFileExtension(name);
    return EXTENSION_TO_ICON[ext] || DEFAULT_FILE_ICON;
  };

  const isImagePreview = (mediaVal: MediaValue): boolean => {
    if (mediaVal.file) return isImageMimeType(mediaVal.file.type);
    const name = mediaVal.fileName || mediaVal.initialUrl || '';
    return isImageExtension(name);
  };

  const previewSrc = (mediaVal: MediaValue): string | null => {
    if (mediaVal.tempUrl) return mediaVal.tempUrl;
    if (mediaVal.initialUrl && isImagePreview(mediaVal)) return mediaVal.initialUrl;
    return null;
  };

  const displayName = (mediaVal: MediaValue): string => {
    if (mediaVal.file) return mediaVal.file.name;
    if (mediaVal.fileName) return mediaVal.fileName;
    if (mediaVal.initialUrl) return mediaVal.initialUrl.split('/').pop() || mediaVal.initialUrl;
    return 'File';
  };

  const validateFile = (file: File): string | null => {
    const invalidNamePattern = /[%<>:"'|?*\\/#&+]/;
    if (invalidNamePattern.test(file.name)) {
      return 'File name contains invalid characters. Avoid characters like %, <, >, :, ", |, ?, *, \\, /, #, &, +.';
    }

    const maxSize = props.maxSizeMb * 1024 * 1024;
    if (file.size > maxSize) {
      return `File "${file.name}" exceeds the ${props.maxSizeMb}MB limit.`;
    }

    const types = props.allowedTypes || DEFAULT_ALLOWED_FILE_TYPES;
    if (!types.includes(file.type)) {
      return `File "${file.name}" has an invalid file type.`;
    }

    return null;
  };

  // Handlers
  const triggerFileInput = () => {
    if (props.disabled || isAtMax.value) return;
    fileInputRef.value?.click();
  };

  const processFiles = (selectedFiles: File[]) => {
    if (props.disabled || !selectedFiles.length) return;

    const remainingSlots = props.maxFiles
      ? props.maxFiles - visibleFiles.value.length
      : selectedFiles.length;

    if (remainingSlots <= 0) {
      error(`You can only upload up to ${props.maxFiles} files.`);
      return;
    }

    const filesToProcess = selectedFiles.slice(0, remainingSlots);
    if (selectedFiles.length > filesToProcess.length) {
      error(`Only ${remainingSlots} more file(s) can be added.`);
    }

    const newItems: MediaValue[] = [];
    for (const file of filesToProcess) {
      const validationError = validateFile(file);
      if (validationError) {
        error(validationError);
        continue;
      }

      newItems.push({
        file,
        tempUrl: isImageMimeType(file.type) ? URL.createObjectURL(file) : '',
        mediaId: null,
        initialUrl: null,
        isChanged: true,
        wasRemoved: false,
        fileName: file.name,
      });
    }

    if (newItems.length) {
      localFiles.value = [...localFiles.value, ...newItems];
      emits('update:modelValue', localFiles.value);
    }
  };

  const handleFileSelection = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selectedFiles = Array.from(target.files || []);
    if (!selectedFiles.length) return;

    processFiles(selectedFiles);

    // Reset input value so change event fires again if selecting the same file
    target.value = '';
  };

  const handleDrop = (event: DragEvent) => {
    isDragging.value = false;
    if (props.disabled) return;
    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length) {
      processFiles(files);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    if (props.disabled) return;
    event.preventDefault();
    isDragging.value = true;
  };

  const handleDragLeave = () => {
    isDragging.value = false;
  };

  const removeFile = (index: number) => {
    if (props.disabled) return;
    const item = localFiles.value[index];
    if (!item) return;

    if (item.tempUrl) {
      URL.revokeObjectURL(item.tempUrl);
    }

    const updated = [...localFiles.value];

    if (item.initialUrl) {
      // Existing server file - keep a removed placeholder so it's reported in mediaUrlsToRemove
      updated[index] = {
        ...item,
        file: null,
        tempUrl: '',
        mediaId: null,
        isChanged: true,
        wasRemoved: true,
      };
    } else {
      // Newly added, never persisted - just drop it
      updated.splice(index, 1);
    }

    localFiles.value = updated;
    emits('update:modelValue', localFiles.value);
  };
</script>

<template>
  <div
    class="w-full"
    :data-test-id="testId"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <!-- Hidden input -->
    <input
      ref="fileInputRef"
      type="file"
      multiple
      :accept="acceptAttribute"
      class="hidden"
      :disabled="disabled || isAtMax"
      @change="handleFileSelection"
    />

    <slot
      :files="visibleFiles"
      :disabled="disabled"
      :is-at-max="isAtMax"
      :is-dragging="isDragging"
      :display-hint="displayHint"
      :trigger-file-input="triggerFileInput"
      :process-files="processFiles"
      :handle-drop="handleDrop"
      :remove-file="removeFile"
    >
      <div class="flex flex-col items-start gap-3">
        <Button
          type="button"
          variant="outline"
          :disabled="disabled || isAtMax"
          icon="hugeicons--upload-01"
          icon-size="sm"
          size="sm"
          :test-id="`${testId}-upload-btn`"
          class="cursor-pointer font-semibold"
          @click="triggerFileInput"
        >
          {{ buttonLabel }}
        </Button>

        <span v-if="hasDisplayHint && displayHint" class="text-foreground-caption text-xs">
          {{ displayHint }}
        </span>

        <!-- TODO: MOVE THIS TO CUSTOM ATTACHMENTS -->
        <!-- File rows -->
        <div v-if="visibleFiles.length" class="flex w-full items-center gap-2">
          <div
            v-for="{ mediaVal, index } in visibleFiles"
            :key="`${index}-${mediaVal.fileName || mediaVal.initialUrl}`"
            :data-test-id="`${testId}-item-${index}`"
            :class="
              cn(
                'bg-background flex items-center gap-3 rounded-lg p-2',
                props.ariaInvalid && 'border-border-danger'
              )
            "
          >
            <!-- Thumbnail / Icon -->
            <div
              class="relative flex h-10 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md"
            >
              <img
                v-if="previewSrc(mediaVal)"
                :src="previewSrc(mediaVal) || ''"
                alt="File preview"
                class="size-full object-cover select-none"
              />
              <Icon v-else :icon="iconForFile(mediaVal)" class="size-5" />
            </div>

            <!-- Name / Size -->
            <div class="flex min-w-0 flex-1 flex-col">
              <span class="truncate text-xs font-medium">
                {{ displayName(mediaVal) }}
              </span>
              <span v-if="mediaVal.file" class="text-foreground-caption text-xs">
                {{ formatFileSize(mediaVal.file.size) }}
              </span>
            </div>

            <!-- Remove Button -->
            <button
              type="button"
              aria-label="Remove file"
              :data-test-id="`${testId}-remove-${index}`"
              :disabled="disabled"
              class="hover:bg-default-hovered flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50"
              @click="removeFile(index)"
            >
              <Icon icon="hugeicons--cancel-01" class="size-4" />
            </button>
          </div>
        </div>

        <span v-else-if="hasPlaceholder" class="text-foreground-caption text-xs">
          {{ placeholder }}
        </span>
      </div>
    </slot>
  </div>
</template>
