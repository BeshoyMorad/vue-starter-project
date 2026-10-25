<script setup lang="ts">
  import { ref } from 'vue';
  import { Icon } from '@/components';
  import CustomColorPicker from './CustomColorPicker.vue';

  withDefaults(
    defineProps<{
      color: string;
      rgbDisplay: string;
      presets?: string[];
      showPresets?: boolean;
      showCustomPicker?: boolean;
      showEyeDropper?: boolean;
      hasEyeDropper?: boolean;
      testId: string;
      isCopied: boolean;
    }>(),
    {
      presets: () => [],
      showPresets: true,
      showCustomPicker: true,
      showEyeDropper: false,
      hasEyeDropper: false,
    }
  );

  const emit = defineEmits<{
    (e: 'selectPreset', color: string): void;
    (e: 'copyColor'): void;
    (e: 'openNativePicker'): void;
    (e: 'openEyeDropper'): void;
  }>();

  const isPickerExpanded = ref(true);
</script>

<template>
  <div class="space-y-3">
    <!-- Live Preview & Values -->
    <div
      class="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div
        class="size-8 shrink-0 rounded-md border border-neutral-300 shadow-xs dark:border-neutral-700"
        :style="{ backgroundColor: color }"
      />
      <div class="min-w-0 flex-1">
        <p class="text-text-default text-xs font-semibold uppercase">
          {{ color }}
        </p>
        <p class="text-text-secondary text-[11px]">
          {{ rgbDisplay }}
        </p>
      </div>
      <button
        type="button"
        class="text-text-secondary hover:text-text-default flex size-7 items-center justify-center rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800"
        title="Copy Color"
        @click="emit('copyColor')"
      >
        <Icon :icon="isCopied ? 'hugeicons--tick-01' : 'hugeicons--copy-01'" class="size-4" />
      </button>
    </div>

    <!-- Color Presets ("array of colors") -->
    <div v-if="showPresets && presets?.length" class="space-y-1.5">
      <label class="text-text-secondary text-[11px] font-medium tracking-wider uppercase">
        Presets
      </label>
      <div class="grid grid-cols-6 gap-1.5">
        <button
          v-for="presetColor in presets"
          :key="presetColor"
          type="button"
          :data-test-id="`${testId}-preset-${presetColor}`"
          class="group focus:ring-primary-500 relative flex size-7 cursor-pointer items-center justify-center rounded-md border border-neutral-300 shadow-2xs transition-transform hover:scale-110 focus:ring-2 focus:outline-none dark:border-neutral-700"
          :style="{ backgroundColor: presetColor }"
          :title="presetColor"
          @click="emit('selectPreset', presetColor)"
        >
          <Icon
            v-if="color.toLowerCase() === presetColor.toLowerCase()"
            icon="hugeicons--tick-01"
            class="size-3.5 text-white drop-shadow-md"
          />
        </button>
      </div>
    </div>

    <!-- Custom Picker at the bottom of the array of colors -->
    <div
      v-if="showCustomPicker"
      class="space-y-2 border-t border-neutral-200 pt-2.5 dark:border-neutral-800"
    >
      <div class="flex items-center justify-between">
        <button
          type="button"
          :data-test-id="`${testId}-picker-btn`"
          class="text-text-secondary hover:text-text-default flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase transition-colors"
          @click="isPickerExpanded = !isPickerExpanded"
        >
          <Icon icon="hugeicons--color-picker" class="size-3.5" />
          <span>Custom Picker</span>
          <Icon
            :icon="isPickerExpanded ? 'hugeicons--arrow-up-01' : 'hugeicons--arrow-down-01'"
            class="size-3 text-neutral-400"
          />
        </button>

        <button
          v-if="showEyeDropper"
          type="button"
          :data-test-id="`${testId}-eyedropper-btn`"
          class="text-text-secondary hover:text-text-default flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          title="Pick from Screen"
          @click="emit('openEyeDropper')"
        >
          <Icon icon="hugeicons--dropper" class="size-3.5" />
          <span>Eye Dropper</span>
        </button>
      </div>

      <!-- Embedded Custom Picker Component -->
      <CustomColorPicker
        v-if="isPickerExpanded"
        :model-value="color"
        :test-id="testId"
        @update:model-value="emit('selectPreset', $event)"
      />
    </div>
  </div>
</template>
