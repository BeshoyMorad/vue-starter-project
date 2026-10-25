<script setup lang="ts">
  import { cn } from '@/utils';
  import { useField } from 'vee-validate';
  import type { MediaValue } from '@/types/media';
  import { error } from '@/utils/toast';
  import {
    DEFAULT_ALLOWED_FILE_TYPES,
    isImageMimeType,
    formatFileSize,
  } from '@/constants/file-upload';
  import {
    validateFile,
    iconForFile,
    previewSrc,
    displayName,
    useObjectUrls,
  } from '@/components/form/shared';
  import { computed, ref, watch } from 'vue';
  import { createMediaValueList } from '@/composables';
  import { Button, Field, Icon, Tooltip } from '@/components';
  import type { TextAreaWithMediaProps } from './types';

  const props = withDefaults(defineProps<TextAreaWithMediaProps>(), {
    placeholder: 'Enter text...',
    submitLabel: 'Submit',
    containerClass: '',
    loading: false,
    disabled: false,
    bordered: true,
    hideAttachmentButton: false,
    hideSaveButton: false,
  });

  const MAX_FILES = 5;
  const MAX_SIZE_MB = 10;

  const { handleChange, value, errorMessage } = useField<MediaValue[]>(() => props.mediaName);

  const fileInputRef = ref<HTMLInputElement | null>(null);

  const localFiles = ref<MediaValue[]>(createMediaValueList([]));
  const objectUrls = useObjectUrls();

  // Sync form field state to localFiles
  watch(
    () => value.value,
    (newVal) => {
      localFiles.value = newVal ? newVal.map(objectUrls.adopt) : createMediaValueList([]);
    },
    { immediate: true, deep: true }
  );

  const visibleFiles = computed(() =>
    localFiles.value
      .map((mediaVal, index) => ({ mediaVal, index }))
      .filter(({ mediaVal }) => !mediaVal.wasRemoved)
  );

  const acceptAttribute = computed(() => DEFAULT_ALLOWED_FILE_TYPES.join(','));

  const isAtMax = computed(() => visibleFiles.value.length >= MAX_FILES);

  const validate = (file: File) =>
    validateFile(file, { maxSizeMb: MAX_SIZE_MB, allowedTypes: DEFAULT_ALLOWED_FILE_TYPES });

  // Handlers
  const triggerFileInput = () => {
    if (props.disabled || isAtMax.value) return;
    fileInputRef.value?.click();
  };

  const handleFileSelection = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const selectedFiles = Array.from(target.files || []);
    if (!selectedFiles.length) return;

    const remainingSlots = MAX_FILES - visibleFiles.value.length;

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
      const validationError = validate(file);
      if (validationError) {
        error(validationError);
        continue;
      }

      newItems.push({
        file,
        tempUrl: isImageMimeType(file.type) ? objectUrls.create(file) : '',
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
      objectUrls.revoke(item.tempUrl);
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
        :key="mediaVal.tempUrl || `${mediaVal.initialUrl}-${index}`"
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
