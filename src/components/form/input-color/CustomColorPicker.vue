<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { hexToHsv, hsvToHex, hexToRgb, rgbToHex } from './colorUtils';

  const props = withDefaults(
    defineProps<{
      modelValue: string;
      testId?: string;
    }>(),
    {
      testId: 'color-picker',
    }
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  // Internal HSV representation
  const internalHue = ref(0);
  const internalSat = ref(1);
  const internalVal = ref(1);
  const inputMode = ref<'hex' | 'rgb'>('hex');

  const saturationBoxRef = ref<HTMLElement | null>(null);
  const hueSliderRef = ref<HTMLElement | null>(null);

  // Sync internal state when external modelValue changes
  watch(
    () => props.modelValue,
    (newHex) => {
      if (!newHex) return;
      const hsv = hexToHsv(newHex);
      // Preserve user-adjusted hue when color is desaturated or zero-brightness
      if (hsv.s > 0.02 && hsv.v > 0.02) {
        internalHue.value = hsv.h;
      }
      internalSat.value = hsv.s;
      internalVal.value = hsv.v;
    },
    { immediate: true }
  );

  const cleanHex = computed(() => {
    return (props.modelValue || '').replace(/^#/, '').toUpperCase();
  });

  const rgbValues = computed(() => {
    return hexToRgb(props.modelValue || '#000000');
  });

  function updateSaturationFromPointer(clientX: number, clientY: number) {
    if (!saturationBoxRef.value) return;
    const rect = saturationBoxRef.value.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const s = rect.width > 0 ? x / rect.width : 0;
    const v = rect.height > 0 ? 1 - y / rect.height : 0;

    internalSat.value = s;
    internalVal.value = v;

    const hex = hsvToHex(internalHue.value, s, v);
    emit('update:modelValue', hex);
  }

  function handleSaturationPointerDown(e: PointerEvent) {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    updateSaturationFromPointer(e.clientX, e.clientY);

    const onPointerMove = (moveEvent: PointerEvent) => {
      updateSaturationFromPointer(moveEvent.clientX, moveEvent.clientY);
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch {
        // Pointer capture release safeguard
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function updateHueFromPointer(clientX: number) {
    if (!hueSliderRef.value) return;
    const rect = hueSliderRef.value.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));

    const h = rect.width > 0 ? (x / rect.width) * 360 : 0;
    internalHue.value = Math.max(0, Math.min(360, h));

    const hex = hsvToHex(internalHue.value, internalSat.value, internalVal.value);
    emit('update:modelValue', hex);
  }

  function handleHuePointerDown(e: PointerEvent) {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    updateHueFromPointer(e.clientX);

    const onPointerMove = (moveEvent: PointerEvent) => {
      updateHueFromPointer(moveEvent.clientX);
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch {
        // Pointer capture release safeguard
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function handleHexInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const raw = input.value.trim().replace(/^#/, '');
    if (/^[0-9A-Fa-f]{6}$/.test(raw)) {
      emit('update:modelValue', `#${raw.toLowerCase()}`);
    }
  }

  function handleRgbInput(channel: 'r' | 'g' | 'b', e: Event) {
    const input = e.target as HTMLInputElement;
    const val = Math.max(0, Math.min(255, parseInt(input.value, 10) || 0));
    const current = { ...rgbValues.value };
    current[channel] = val;
    emit('update:modelValue', rgbToHex(current.r, current.g, current.b));
  }
</script>

<template>
  <div class="space-y-2.5">
    <!-- 2D Saturation & Brightness Palette -->
    <div
      ref="saturationBoxRef"
      :data-testid="`${testId}-saturation-box`"
      class="relative h-28 w-full cursor-crosshair overflow-hidden rounded-md border border-neutral-200 shadow-inner select-none dark:border-neutral-800"
      :style="{ backgroundColor: `hsl(${internalHue}, 100%, 50%)` }"
      @pointerdown="handleSaturationPointerDown"
    >
      <!-- Horizontal white gradient (saturation) -->
      <div class="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
      <!-- Vertical black gradient (value/brightness) -->
      <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <!-- Draggable pointer handle -->
      <div
        class="pointer-events-none absolute size-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md ring-1 ring-black/40"
        :style="{
          left: `${internalSat * 100}%`,
          top: `${(1 - internalVal) * 100}%`,
          backgroundColor: modelValue,
        }"
      />
    </div>

    <!-- 1D Hue Rainbow Slider -->
    <div
      ref="hueSliderRef"
      :data-testid="`${testId}-hue-slider`"
      class="relative h-3 w-full cursor-pointer rounded-full border border-neutral-200 shadow-2xs select-none dark:border-neutral-800"
      style="
        background: linear-gradient(
          to right,
          #ff0000 0%,
          #ffff00 17%,
          #00ff00 33%,
          #00ffff 50%,
          #0000ff 67%,
          #ff00ff 83%,
          #ff0000 100%
        );
      "
      @pointerdown="handleHuePointerDown"
    >
      <!-- Draggable thumb -->
      <div
        class="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-md ring-1 ring-black/30"
        :style="{
          left: `${(internalHue / 360) * 100}%`,
        }"
      />
    </div>

    <!-- Inputs Row: HEX / RGB -->
    <div class="flex items-center gap-1.5 pt-0.5">
      <template v-if="inputMode === 'hex'">
        <div class="relative flex-1">
          <span
            class="text-text-secondary pointer-events-none absolute inset-y-0 left-2 flex items-center font-mono text-xs select-none"
          >
            #
          </span>
          <input
            :value="cleanHex"
            type="text"
            maxlength="6"
            spellcheck="false"
            aria-label="Hex color value"
            class="text-text-default focus:border-primary-500 h-7 w-full rounded-md border border-neutral-200 bg-neutral-50 pr-2 pl-5 font-mono text-xs font-semibold uppercase focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:focus:bg-neutral-950"
            @input="handleHexInput"
          />
        </div>
      </template>

      <template v-else>
        <div class="grid flex-1 grid-cols-3 gap-1">
          <div
            class="flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-1 py-0.5 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span class="text-text-secondary pr-0.5 text-[10px] font-semibold">R</span>
            <input
              :value="rgbValues.r"
              type="number"
              min="0"
              max="255"
              aria-label="Red channel"
              class="text-text-default w-full bg-transparent font-mono text-xs outline-none"
              @input="handleRgbInput('r', $event)"
            />
          </div>
          <div
            class="flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-1 py-0.5 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span class="text-text-secondary pr-0.5 text-[10px] font-semibold">G</span>
            <input
              :value="rgbValues.g"
              type="number"
              min="0"
              max="255"
              aria-label="Green channel"
              class="text-text-default w-full bg-transparent font-mono text-xs outline-none"
              @input="handleRgbInput('g', $event)"
            />
          </div>
          <div
            class="flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-1 py-0.5 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span class="text-text-secondary pr-0.5 text-[10px] font-semibold">B</span>
            <input
              :value="rgbValues.b"
              type="number"
              min="0"
              max="255"
              aria-label="Blue channel"
              class="text-text-default w-full bg-transparent font-mono text-xs outline-none"
              @input="handleRgbInput('b', $event)"
            />
          </div>
        </div>
      </template>

      <!-- Toggle Mode Button -->
      <button
        type="button"
        class="text-text-secondary hover:text-text-default flex h-7 items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 font-mono text-[11px] font-medium transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        :title="inputMode === 'hex' ? 'Switch to RGB' : 'Switch to HEX'"
        @click="inputMode = inputMode === 'hex' ? 'rgb' : 'hex'"
      >
        {{ inputMode === 'hex' ? 'HEX' : 'RGB' }}
      </button>
    </div>
  </div>
</template>
