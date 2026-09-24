<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';
  import type { MediaValue } from '@/types/media';

  import {
    IMAGE_UPLOAD_IMPORT_CODE,
    IMAGE_UPLOAD_BASIC_CODE,
    IMAGE_UPLOAD_AVATAR_CROP_CODE,
    IMAGE_UPLOAD_LOGO_CROP_CODE,
    IMAGE_UPLOAD_FREE_CROP_CODE,
    IMAGE_UPLOAD_ASPECT_RATIO_CODE,
    IMAGE_UPLOAD_ALLOWED_TYPES_CODE,
    IMAGE_UPLOAD_DISABLED_CODE,
    IMAGE_UPLOAD_V_MODEL_CODE,
    IMAGE_UPLOAD_DOC,
  } from '../constants/constants';

  const directMedia = ref<MediaValue | null>(null);
  const directMediaCropped = ref<MediaValue | null>(null);
  const customCropMedia = ref<MediaValue | null>(null);
  const restrictedMedia = ref<MediaValue | null>(null);
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ IMAGE_UPLOAD_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ IMAGE_UPLOAD_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="IMAGE_UPLOAD_DOC.import.title"
      :description="IMAGE_UPLOAD_DOC.import.description"
      :code="IMAGE_UPLOAD_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ IMAGE_UPLOAD_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ IMAGE_UPLOAD_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="IMAGE_UPLOAD_DOC.basic.title"
          :description="IMAGE_UPLOAD_DOC.basic.description"
          :how-to-use="IMAGE_UPLOAD_DOC.basic.howToUse"
          :code="IMAGE_UPLOAD_BASIC_CODE"
          :usage-label="IMAGE_UPLOAD_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.ImageUpload v-model="directMedia" test-id="direct-image-upload" />
          </template>
        </Card>

        <!-- Avatar Crop -->
        <Card
          :title="IMAGE_UPLOAD_DOC.avatarCrop.title"
          :description="IMAGE_UPLOAD_DOC.avatarCrop.description"
          :how-to-use="IMAGE_UPLOAD_DOC.avatarCrop.howToUse"
          :code="IMAGE_UPLOAD_AVATAR_CROP_CODE"
          :usage-label="IMAGE_UPLOAD_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.ImageUpload
              v-model="directMediaCropped"
              size-preset="avatar"
              crop
              test-id="direct-avatar-crop-upload"
            />
          </template>
        </Card>

        <!-- Logo Crop -->
        <Card
          :title="IMAGE_UPLOAD_DOC.logoCrop.title"
          :description="IMAGE_UPLOAD_DOC.logoCrop.description"
          :how-to-use="IMAGE_UPLOAD_DOC.logoCrop.howToUse"
          :code="IMAGE_UPLOAD_LOGO_CROP_CODE"
          :usage-label="IMAGE_UPLOAD_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.ImageUpload
              v-model="directMediaCropped"
              size-preset="logo"
              crop
              test-id="direct-logo-crop-upload"
            />
          </template>
        </Card>

        <!-- Free Crop -->
        <Card
          :title="IMAGE_UPLOAD_DOC.freeCrop.title"
          :description="IMAGE_UPLOAD_DOC.freeCrop.description"
          :how-to-use="IMAGE_UPLOAD_DOC.freeCrop.howToUse"
          :code="IMAGE_UPLOAD_FREE_CROP_CODE"
          :usage-label="IMAGE_UPLOAD_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.ImageUpload
              v-model="directMediaCropped"
              size-preset="default"
              crop
              test-id="direct-default-crop-upload"
            />
          </template>
        </Card>

        <!-- Custom Aspect Ratio -->
        <Card
          :title="IMAGE_UPLOAD_DOC.aspectRatio.title"
          :description="IMAGE_UPLOAD_DOC.aspectRatio.description"
          :how-to-use="IMAGE_UPLOAD_DOC.aspectRatio.howToUse"
          :code="IMAGE_UPLOAD_ASPECT_RATIO_CODE"
          :usage-label="IMAGE_UPLOAD_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.ImageUpload
              v-model="customCropMedia"
              size-preset="default"
              crop
              :crop-aspect-ratio="16 / 9"
              test-id="direct-custom-ratio-upload"
            />
          </template>
        </Card>

        <!-- Allowed Types -->
        <Card
          :title="IMAGE_UPLOAD_DOC.allowedTypes.title"
          :description="IMAGE_UPLOAD_DOC.allowedTypes.description"
          :how-to-use="IMAGE_UPLOAD_DOC.allowedTypes.howToUse"
          :code="IMAGE_UPLOAD_ALLOWED_TYPES_CODE"
          :usage-label="IMAGE_UPLOAD_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.ImageUpload
              v-model="restrictedMedia"
              size-preset="avatar"
              :allowed-types="['.jpeg', '.png']"
              test-id="direct-restricted-upload"
            />
          </template>
        </Card>

        <!-- Disabled -->
        <Card
          :title="IMAGE_UPLOAD_DOC.disabled.title"
          :description="IMAGE_UPLOAD_DOC.disabled.description"
          :how-to-use="IMAGE_UPLOAD_DOC.disabled.howToUse"
          :code="IMAGE_UPLOAD_DISABLED_CODE"
          :usage-label="IMAGE_UPLOAD_DOC.howToUseTitle"
        >
          <template #preview>
            <Field.ImageUpload size-preset="avatar" disabled test-id="direct-disabled-upload" />
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="IMAGE_UPLOAD_DOC.vModel.title"
          :description="IMAGE_UPLOAD_DOC.vModel.description"
          :how-to-use="IMAGE_UPLOAD_DOC.vModel.howToUse"
          :code="IMAGE_UPLOAD_V_MODEL_CODE"
          :usage-label="IMAGE_UPLOAD_DOC.howToUseTitle"
        >
          <template #preview>
            <div class="flex flex-col items-center justify-center space-y-4">
              <Field.ImageUpload
                v-model="directMedia"
                size-preset="avatar"
                test-id="direct-v-model-upload"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ IMAGE_UPLOAD_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{
                    directMedia
                      ? IMAGE_UPLOAD_DOC.vModel.uploadedValue
                      : IMAGE_UPLOAD_DOC.vModel.emptyValue
                  }}
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
