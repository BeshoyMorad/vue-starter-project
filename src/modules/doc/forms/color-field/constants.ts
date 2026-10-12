export const COLOR_IMPORT_CODE = `import { Field } from '@workspace/ui';
// Or standalone:
import { InputColor, BaseInputColor } from '@workspace/ui';`;

export const COLOR_BASIC_CODE = `<Field.Color v-model="selectedColor" test-id="color-basic" />`;

export const COLOR_WITH_LABEL_CODE = `<Field.Color
  v-model="brandColor"
  label="Primary Brand Color"
  description="Choose the primary accent hue for your application theme."
  test-id="color-with-label"
/>`;

export const COLOR_CUSTOM_PRESETS_CODE = `<Field.Color
  v-model="customPresetColor"
  label="Custom Palette"
  description="Restricted or curated color swatches for brand consistency."
  :presets="[
    '#6366f1', '#3b82f6', '#06b6d4', '#10b981',
    '#f59e0b', '#ef4444', '#ec4899', '#1e293b'
  ]"
  test-id="color-custom-presets"
/>`;

export const COLOR_DISABLED_CODE = `<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <Field.Color
    v-model="disabledColor"
    label="Disabled State"
    disabled
    test-id="color-disabled"
  />

  <Field.Color
    v-model="readonlyColor"
    label="Read-only State"
    readonly
    test-id="color-readonly"
  />
</div>`;

export const COLOR_LIVE_PREVIEW_CODE = `<div class="flex flex-col gap-4 w-full">
  <Field.Color
    v-model="cardColor"
    label="Card Accent Preview"
    test-id="color-preview"
  />

  <div
    class="flex items-center justify-between rounded-xl p-5 border transition-all duration-300 shadow-sm"
    :style="{
      backgroundColor: cardColor + '18',
      borderColor: cardColor,
      boxShadow: '0 4px 20px ' + cardColor + '20'
    }"
  >
    <div class="space-y-1">
      <p class="font-semibold text-sm" :style="{ color: cardColor }">
        Dynamic Theme Card
      </p>
      <p class="text-xs text-text-secondary">
        Active Color: {{ cardColor }}
      </p>
    </div>
    <div
      class="size-8 rounded-full shadow-inner"
      :style="{ backgroundColor: cardColor }"
    />
  </div>
</div>`;

export const COLOR_EYE_DROPPER_CODE = `<Field.Color
  v-model="eyedropperColor"
  label="With Screen Eye Dropper"
  description="The eye dropper is optional (disabled by default). Enable it with show-eye-dropper."
  show-eye-dropper
  test-id="color-eyedropper"
/>`;

export const COLOR_DOC = {
  title: 'Color Input',
  description:
    'A specialized color picker input combining a live swatch preview, popover preset palette, system picker sync, optional screen eyedropper, and direct hex input with clipboard copying.',

  import: {
    title: 'Import',
    description: 'Import the Color field from the Field namespace or directly from @workspace/ui.',
  },

  examples: {
    title: 'Examples',
    description:
      'Explore interactive examples demonstrating different configurations and use cases.',
  },

  basic: {
    title: 'Basic Usage',
    description: 'Standard color input with two-way v-model binding.',
    howToUse: 'Bind v-model to a reactive color string (hex format like #3b82f6).',
  },

  withLabel: {
    title: 'With Label & Description',
    description: 'Form field presentation with accessible label and helper text.',
    howToUse: 'Pass label and description props to provide context for the form field.',
  },

  eyeDropper: {
    title: 'Optional Eye Dropper',
    description:
      'The eye dropper feature is disabled by default. Pass show-eye-dropper to enable it.',
    howToUse:
      'Pass :show-eye-dropper="true" (or simply show-eye-dropper) to activate the screen sampling eyedropper tool.',
  },

  customPresets: {
    title: 'Curated Palette Presets',
    description: 'Customize the swatch choices available in the popover palette.',
    howToUse: 'Provide an array of hex color strings to the presets prop.',
  },

  states: {
    title: 'Disabled & Readonly States',
    description: 'Prevent interaction when the field is locked or non-editable.',
    howToUse: 'Use the disabled or readonly boolean props.',
  },

  livePreview: {
    title: 'Interactive Theme Preview',
    description: 'See live reactive theme updates driven by the Color Input.',
    howToUse: 'Use the color input value in component styles or dynamic CSS variables.',
  },
};
