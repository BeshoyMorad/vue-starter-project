<script setup lang="ts">
  import { cn } from '@/utils';
  import { useField } from 'vee-validate';
  import type { MediaValue } from '@/types/media';
  import { error } from '@/utils/toast';
  import {
    DEFAULT_ALLOWED_FILE_TYPES,
    EXTENSION_TO_ICON,
    DEFAULT_FILE_ICON,
    isImageMimeType,
    isImageExtension,
    getFileExtension,
    formatFileSize,
  } from '@/constants/file-upload';
  import { computed, ref, watch } from 'vue';
  import { createMediaValueList } from '@/composables';
  import { Button, Field, Icon, Tooltip } from '@/components';

  const props = withDefaults(
    defineProps<{
      textAreaName: string;
      mediaName: string;
      placeholder?: string;
      submitLabel?: string;
      containerClass?: string;
      loading?: boolean;
      disabled?: boolean;
      testId: string;
      bordered?: boolean;
      hideAttachmentButton?: boolean;
      hideSaveButton?: boolean;
    }>(),
    {
      placeholder: 'Enter text...',
      submitLabel: 'Submit',
      containerClass: '',
      loading: false,
      disabled: false,
      bordered: true,
      hideAttachmentButton: false,
      hideSaveButton: false,
    }
  );

  const MAX_FILES = 5;
  const MAX_SIZE_MB = 10;

  const { handleChange, value, errorMessage } = useField<MediaValue[]>(props.mediaName);

  const fileInputRef = ref<HTMLInputElement | null>(null);

  const localFiles = ref<MediaValue[]>(createMediaValueList([]));

  // Sync form field state to localFiles
  watch(
    () => value.value,
    (newVal) => {
      localFiles.value = newVal ? [...newVal] : createMediaValueList([]);
    },
    { immediate: true, deep: true }
  );

  const visibleFiles = computed(() =>
    localFiles.value
      .map((mediaVal, index) => ({ mediaVal, index }))
      .filter(({ mediaVal }) => !mediaVal.wasRemoved)
  );

  const acceptAttribute = computed(() => DEFAULT_ALLOWED_FILE_TYPES.join(','));

  const isAtMax = computed(() => (MAX_FILES ? visibleFiles.value.length >= MAX_FILES : false));

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

    const maxSize = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > maxSize) {
      return `File "${file.name}" exceeds the ${MAX_SIZE_MB}MB limit.`;
    }

    if (!(DEFAULT_ALLOWED_FILE_TYPES as string[]).includes(file.type)) {
      return `File "${file.name}" has an invalid file type.`;
    }

    return null;
  };

  // Handlers
  const triggerFileInput = () => {
    if (props.disabled || isAtMax.value) return;
    fileInputRef.value?.click();
  };

  const handleFileSelection = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selectedFiles = Array.from(target.files || []);
    if (!selectedFiles.length) return;

    const remainingSlots = MAX_FILES ? MAX_FILES - visibleFiles.value.length : selectedFiles.length;

    if (remainingSlots <= 0) {
      error(`You can only upload up to ${MAX_FILES} files.`);
      target.value = '';
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

      handleChange(localFiles.value);
    }

    // Reset input value so change event fires again if selecting the same file
    target.value = '';
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
    handleChange(localFiles.value);
  };
</script>

<template>
  <div :class="cn('bg-background rounded-xl py-2 pr-4 pl-2', containerClass)">
    <div class="flex w-full justify-between gap-2">
      <Field.Textarea
        :test-id="`${testId}-text-content`"
        :name="textAreaName"
        container-class="flex-1"
        :class="
          cn('resize-none', {
            'border-none focus:ring-0 focus-visible:ring-0': !bordered,
          })
        "
        :placeholder="placeholder"
        :disabled="disabled"
      />

      <div class="flex items-center gap-5">
        <div class="w-full" :data-test-id="testId">
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

          <div v-if="!hideAttachmentButton" class="flex flex-col items-start gap-3">
            <Button
              :test-id="`${testId}-attachments-trigger`"
              icon="hugeicons--attachment"
              size="icon-sm"
              icon-size="lg"
              variant="ghost"
              type="button"
              :disabled="disabled || isAtMax"
              @click="triggerFileInput"
            />
          </div>
        </div>

        <Button
          v-if="!hideSaveButton"
          :test-id="`${testId}-submit-btn`"
          :loading="loading"
          :disabled="disabled"
          icon="hugeicons--sent-02"
          type="submit"
        >
          {{ submitLabel }}
        </Button>
      </div>
    </div>

    <!-- File preview -->
    <div
      v-if="visibleFiles.length"
      class="border-border/50 mt-2 flex w-full flex-wrap items-center gap-2 border-t pt-2"
    >
      <div
        v-for="{ mediaVal, index } in visibleFiles"
        :key="`${index}-${mediaVal.fileName || mediaVal.initialUrl}`"
        :data-test-id="`${testId}-item-${index}`"
        :class="
          cn(
            'bg-background-surface flex items-center gap-1 rounded-lg p-1',
            !!errorMessage && 'border-border-danger'
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
          <Tooltip>
            <template #trigger>
              <span class="max-w-30 truncate text-xs font-medium">
                {{ displayName(mediaVal) }}
              </span>
            </template>

            {{ displayName(mediaVal) }}
          </Tooltip>

          <span v-if="mediaVal.file" class="text-foreground-caption text-2xs">
            {{ formatFileSize(mediaVal.file.size) }}
          </span>
        </div>

        <!-- Remove Button -->
        <Button
          type="button"
          size="icon-sm"
          icon-size="sm"
          variant="ghost"
          class="text-foreground-danger ml-1 size-4 self-start"
          icon="hugeicons--cancel-01"
          :test-id="`${testId}-remove-${index}`"
          :disabled="disabled"
          @click="removeFile(index)"
        />
      </div>
    </div>
  </div>
</template>
