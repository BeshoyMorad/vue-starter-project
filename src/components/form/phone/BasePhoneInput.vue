<script setup lang="ts">
  import { ref, computed, watch, nextTick } from 'vue';
  import { type CountryCode } from 'libphonenumber-js';
  import { cn } from '@/utils';
  import { allCountries } from '@/utils/countries';
  import { inputVariants } from '@/components/ui/input';
  import { Popover } from '@/components/ui/popover';
  import { Icon } from '@/components';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string;
    defaultCountry?: CountryCode;
    placeholder?: string;
    disabled?: boolean;
    showClear?: boolean;
  }

  // ─── Props & Emits ────────────────────────────────────────────────────────────

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    defaultCountry: 'US',
    placeholder: '000 000 0000',
    disabled: false,
    showClear: false,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  // ─── State ────────────────────────────────────────────────────────────────────

  const isOpen = ref(false);
  const searchQuery = ref('');
  const selectedCountry = ref<CountryCode>(props.defaultCountry);
  const localNumber = ref('');

  /** Filtered list based on search query */
  const filteredCountries = computed(() => {
    const q = searchQuery.value.toLowerCase().trim();
    if (!q) return allCountries;
    return allCountries.filter((c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q));
  });

  const selectedCountryData = computed(
    () => allCountries.find((c) => c.code === selectedCountry.value) ?? allCountries[0]
  );

  // ─── Emitted value: full E.164 "{dialCode}{localNumber}" ──────────────────────

  const fullPhone = computed(() => {
    const n = localNumber.value.replace(/\D/g, '');
    if (!n) return '';
    return `${selectedCountryData.value.dialCode}${n}`;
  });

  watch(fullPhone, (val) => emits('update:modelValue', val));

  // When the parent sets an initial value, parse it back into country + local number.
  watch(
    () => props.modelValue,
    (val) => {
      if (!val || val === fullPhone.value) return;
      const match = allCountries
        .slice()
        .sort((a, b) => b.dialCode.length - a.dialCode.length) // longest prefix first
        .find((c) => val.startsWith(c.dialCode));

      if (match) {
        selectedCountry.value = match.code;
        localNumber.value = val.slice(match.dialCode.length);
      }
    },
    { immediate: true }
  );

  // ─── Refs ──────────────────────────────────────────────────────────────────────

  const searchInputRef = ref<HTMLInputElement | null>(null);

  // Auto-focus the search input every time the popover opens.
  watch(isOpen, async (opened) => {
    if (opened) {
      await nextTick();
      searchInputRef.value?.focus();
    } else {
      searchQuery.value = '';
    }
  });

  const hasValue = computed(() => localNumber.value.trim().length > 0);

  function clearField() {
    localNumber.value = '';
    emits('update:modelValue', '');
  }

  // ─── Handlers ─────────────────────────────────────────────────────────────────

  function selectCountry(code: CountryCode) {
    selectedCountry.value = code;
    isOpen.value = false;
  }
</script>

<template>
  <!--
    Outer wrapper styled exactly like Input.vue so the full field matches the
    design system. The left side (country trigger) and right side (number input)
    share one unified border via the wrapper.
  -->
  <div
    :class="
      cn(
        inputVariants(),
        'focus-within:ring-border-primary flex w-full items-center gap-0 overflow-hidden p-0 focus-within:ring-2 focus-within:outline-0',
        { 'pointer-events-none opacity-50': disabled }
      )
    "
    v-bind="$attrs"
  >
    <Popover
      v-model:open="isOpen"
      :show-arrow="false"
      align="start"
      class="w-72 overflow-hidden p-0"
      :side-offset="6"
    >
      <template #trigger>
        <button
          type="button"
          :data-test-id="`${testId}-country-trigger`"
          :disabled="disabled"
          class="border-border-disabled hover:bg-default-hovered flex h-full shrink-0 cursor-pointer items-center gap-1.5 border-r px-3 py-2 transition-colors duration-200 focus:outline-none"
        >
          <span class="text-2xl leading-none select-none">{{ selectedCountryData.flag }}</span>

          <span class="text-foreground text-sm font-medium tabular-nums">
            {{ selectedCountryData.dialCode }}
          </span>

          <Icon
            icon="hugeicons--arrow-down-01"
            class="text-foreground-disabled size-3.5 shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
          />
        </button>
      </template>

      <div>
        <!-- Search — borderless, matching Combobox search style -->
        <div class="relative px-2 pt-2 pb-1">
          <div class="relative">
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search country or code..."
              :data-test-id="`${testId}-country-search`"
              class="border-border-disabled text-foreground placeholder:text-foreground-placeholder enabled:hover:border-border-primary enabled:focus:border-border-primary w-full appearance-none rounded-md border py-1 ps-3 pe-10 text-sm shadow-sm outline-hidden transition-colors duration-200"
            />
            <span class="pointer-events-none absolute top-1/2 right-3 z-1 -mt-2 leading-none">
              <Icon icon="hugeicons--search-02" class="text-foreground-disabled size-4" />
            </span>
          </div>
        </div>

        <!-- Options list — styled like ComboboxViewport + ComboboxItem -->
        <div class="hide-scrollbar max-h-60 overflow-y-auto overscroll-contain p-1">
          <template v-if="filteredCountries.length">
            <button
              v-for="country in filteredCountries"
              :key="country.code"
              type="button"
              :data-test-id="`${testId}-country-option-${country.code}`"
              :class="
                cn(
                  'relative flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-sm border-none bg-transparent px-2 py-2 text-sm font-normal whitespace-nowrap transition-colors duration-200',
                  'hover:bg-default-hovered',
                  {
                    'bg-background font-medium': country.code === selectedCountry,
                  }
                )
              "
              @click="selectCountry(country.code)"
            >
              <div class="flex items-center gap-1">
                <span class="w-7 shrink-0 text-center text-2xl leading-none">
                  {{ country.flag }}
                </span>

                <span class="text-foreground flex-1 truncate">{{ country.name }}</span>
              </div>

              <span class="text-foreground-disabled ml-auto shrink-0 tabular-nums">
                {{ country.dialCode }}
              </span>
            </button>
          </template>

          <p v-else class="text-foreground-disabled py-6 text-center text-sm">No countries found</p>
        </div>
      </div>
    </Popover>

    <!-- ── Phone Number Input ────────────────────────────────────────────────── -->
    <input
      v-model="localNumber"
      type="tel"
      inputmode="numeric"
      :placeholder="placeholder"
      :disabled="disabled"
      :data-test-id="testId"
      class="text-foreground placeholder:text-foreground-placeholder min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none"
    />

    <!-- Clear button -->
    <button
      v-if="showClear && hasValue"
      type="button"
      :data-test-id="`${testId}-clear`"
      aria-label="Clear phone number"
      class="text-foreground-placeholder flex cursor-pointer items-center px-2 transition-colors duration-200 focus:outline-none"
      @click="clearField"
    >
      <Icon icon="hugeicons--cancel-01" class="text-text-placeholder cursor-pointer" />
    </button>
  </div>
</template>
