<script setup lang="ts">
  import { ref } from 'vue';
  import { Button, Field } from '@/components';

  import Card from '@/components/card/ExampleCard.vue';

  import {
    IMAGE_UPLOAD_DOM,
    IMAGE_UPLOAD_IMPORT_CODE,
    IMAGE_UPLOAD_BASIC_CODE,
    IMAGE_UPLOAD_TEMPLATE_CODE,
    IMAGE_UPLOAD_PRESIGNED_URL_CODE,
    IMAGE_UPLOAD_REQUEST_CODE,
    IMAGE_UPLOAD_RESPONSE_CODE,
    IMAGE_UPLOAD_STORAGE_CODE,
    IMAGE_UPLOAD_MEDIA_ID_CODE,
    IMAGE_UPLOAD_MULTIPLE_CODE,
  } from '../constants/constants';
  import type { MediaValue } from '@/types/media';

  const media = ref<MediaValue | null>(null);

  const isUploading = ref(false);
  const mediaId = ref('');

  const handleUpload = async () => {
    if (!media.value?.file) return;

    isUploading.value = true;
    mediaId.value = '';

    await new Promise((resolve) => setTimeout(resolve, 1000));

    mediaId.value = `media-${Date.now()}`;

    isUploading.value = false;
  };
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ IMAGE_UPLOAD_DOM.title }}
      </h1>

      <p class="text-text-secondary max-w-3xl text-sm leading-6">
        {{ IMAGE_UPLOAD_DOM.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="IMAGE_UPLOAD_DOM.import.title"
      :description="IMAGE_UPLOAD_DOM.import.description"
      :code="IMAGE_UPLOAD_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- What is useUploadImage? -->
    <Card
      :title="IMAGE_UPLOAD_DOM.whatIs.title"
      :description="IMAGE_UPLOAD_DOM.whatIs.description"
      :code="IMAGE_UPLOAD_BASIC_CODE"
      :show-preview="false"
    />

    <!-- Basic Usage -->
    <Card
      :title="IMAGE_UPLOAD_DOM.basicUsage.title"
      :description="IMAGE_UPLOAD_DOM.basicUsage.description"
      :how-to-use="IMAGE_UPLOAD_DOM.basicUsage.howToUse"
      header="Usage"
      :code-arr="[
        { code: IMAGE_UPLOAD_BASIC_CODE, header: 'script' },
        { code: IMAGE_UPLOAD_TEMPLATE_CODE, header: 'template' },
      ]"
    >
      <template #preview>
        <div class="flex flex-col items-center justify-center gap-4">
          <div>
            <span>Selected image :</span>
            <span v-if="media?.file">{{ media.file.name }}</span>
            <span v-else>None</span>
          </div>
          <Field.ImageUpload
            v-model="media"
            size-preset="avatar"
            crop
            test-id="direct-avatar-crop-upload"
          />

          <Button
            test-id="image-upload-button"
            :disabled="!media?.file || isUploading"
            @click="handleUpload"
          >
            {{ isUploading ? 'Uploading...' : 'Upload Image' }}
          </Button>

          <p v-if="mediaId" class="text-text-secondary text-sm">Media ID: {{ mediaId }}</p>
        </div>
      </template>
    </Card>

    <!-- Presigned URL -->
    <Card
      :title="IMAGE_UPLOAD_DOM.presignedUrl.title"
      :description="IMAGE_UPLOAD_DOM.presignedUrl.description"
      :code-arr="[
        { code: IMAGE_UPLOAD_REQUEST_CODE, header: 'request' },
        { code: IMAGE_UPLOAD_RESPONSE_CODE, header: 'response' },
        { code: IMAGE_UPLOAD_STORAGE_CODE, header: 'storage upload' },
      ]"
      :show-preview="false"
    />

    <!-- Upload Flow -->
    <Card
      title="Upload Flow"
      description="The complete upload flow from selecting the file to receiving the mediaId."
      :code="IMAGE_UPLOAD_PRESIGNED_URL_CODE"
      :show-preview="false"
    />

    <!-- mediaId -->
    <Card
      :title="IMAGE_UPLOAD_DOM.mediaId.title"
      :description="IMAGE_UPLOAD_DOM.mediaId.description"
      :code="IMAGE_UPLOAD_MEDIA_ID_CODE"
      :show-preview="false"
    />

    <!-- Multiple Files -->
    <Card
      :title="IMAGE_UPLOAD_DOM.multipleFiles.title"
      :description="IMAGE_UPLOAD_DOM.multipleFiles.description"
      :how-to-use="IMAGE_UPLOAD_DOM.multipleFiles.howToUse"
      :code="IMAGE_UPLOAD_MULTIPLE_CODE"
      :show-preview="false"
    />
  </div>
</template>
