export const IMAGE_UPLOAD_IMPORT_CODE = `import { Field } from '@/components';`;

export const IMAGE_UPLOAD_BASIC_CODE = `<Field.ImageUpload
  v-model="media"
  test-id="direct-image-upload"
/>`;

export const IMAGE_UPLOAD_AVATAR_CROP_CODE = `<Field.ImageUpload
  v-model="media"
  size-preset="avatar"
  crop
  test-id="direct-avatar-crop-upload"
/>`;

export const IMAGE_UPLOAD_LOGO_CROP_CODE = `<Field.ImageUpload
  v-model="media"
  size-preset="logo"
  crop
  test-id="direct-logo-crop-upload"
/>`;

export const IMAGE_UPLOAD_FREE_CROP_CODE = `<Field.ImageUpload
  v-model="media"
  size-preset="default"
  crop
  test-id="direct-default-crop-upload"
/>`;

export const IMAGE_UPLOAD_ASPECT_RATIO_CODE = `<Field.ImageUpload
  v-model="media"
  size-preset="default"
  crop
  :crop-aspect-ratio="16 / 9"
  test-id="direct-custom-ratio-upload"
/>`;

export const IMAGE_UPLOAD_ALLOWED_TYPES_CODE = `<Field.ImageUpload
  v-model="media"
  size-preset="avatar"
  :allowed-types="['.jpeg', '.png']"
  test-id="direct-restricted-upload"
/>`;

export const IMAGE_UPLOAD_DISABLED_CODE = `<Field.ImageUpload
  size-preset="avatar"
  disabled
  test-id="direct-disabled-upload"
/>`;

export const IMAGE_UPLOAD_V_MODEL_CODE = `<script setup lang="ts">
import { ref } from 'vue';
import type { MediaValue } from '@/types/media';

const media = ref<MediaValue | null>(null);
</script>

<template>
  <Field.ImageUpload
    v-model="media"
    size-preset="avatar"
    test-id="direct-v-model-upload"
  />
</template>`;

export const IMAGE_UPLOAD_DOC = {
  title: 'Image Upload',

  description:
    'An image upload field that supports image selection, predefined sizes, cropping, custom aspect ratios, file type restrictions, and form integration.',

  howToUseTitle: 'How to use',

  import: {
    title: 'Import',
    description: 'Import the ImageUpload field from the components library.',
  },

  examples: {
    title: 'Examples',
    description: 'Different ways to configure and use the ImageUpload field.',
  },

  basic: {
    title: 'Basic',
    description: 'Upload an image without enabling cropping.',
    howToUse: 'Use Field.ImageUpload with a size preset. The crop option is disabled by default.',
  },

  avatarCrop: {
    title: 'Avatar Crop',
    description: 'Enable circular cropping for avatar images.',
    howToUse: 'Set crop to true and use the avatar size preset to create an avatar-style upload.',
  },

  logoCrop: {
    title: 'Logo Crop',
    description: 'Enable rectangular cropping for logo images.',
    howToUse: 'Use the logo size preset together with crop to provide a rectangular crop area.',
  },

  freeCrop: {
    title: 'Free Crop',
    description: 'Enable cropping without specifying a fixed aspect ratio.',
    howToUse: 'Set crop to true with the default size preset to allow flexible image cropping.',
  },

  aspectRatio: {
    title: 'Custom Aspect Ratio',
    description: 'Define a custom aspect ratio for the crop area.',
    howToUse:
      'Use crop-aspect-ratio to define the desired crop ratio. For example, 16 / 9 creates a widescreen crop area.',
  },

  allowedTypes: {
    title: 'Allowed Types',
    description: 'Restrict the types of images that can be uploaded.',
    howToUse: 'Pass an array of MIME types to allowed-types to limit the accepted image formats.',
  },

  disabled: {
    title: 'Disabled',
    description: 'Disable the image upload field to prevent user interaction.',
    howToUse: 'Set disabled to true when image uploading should not be available.',
  },

  vModel: {
    title: 'v-model',
    description: 'Bind the uploaded image value to reactive component state.',
    howToUse: 'Use v-model with a MediaValue or null ref to access and manage the uploaded media.',
    currentValueLabel: 'Current value:',
    uploadedValue: 'Image uploaded',
    emptyValue: 'No image uploaded',
  },
};
