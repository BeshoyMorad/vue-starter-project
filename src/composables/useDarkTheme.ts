import { computed, watchEffect, type Ref, type WritableComputedRef } from 'vue';
import { usePreferredDark, useStorage } from '@vueuse/core';
import { THEME_STORAGE_KEY, type Theme } from '@/constants/theme';

// Module-level singleton so every useDarkTheme() call shares the same choice
const themeChoice = useStorage<Theme | null>(THEME_STORAGE_KEY, null);

watchEffect(() => {
  if (themeChoice.value) {
    document.documentElement.setAttribute('data-theme', themeChoice.value);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});

export interface UseDarkThemeReturn {
  theme: Ref<Theme | null>;
  isDark: WritableComputedRef<boolean>;
  toggleDark: () => void;
}

/**
 * Light / dark theme composable.
 * - `theme`: The user's explicit theme choice ('light' | 'dark' | null). null means follow the device.
 * - `isDark`: Reactive boolean reflecting whether the current applied mode is dark.
 * - `toggleDark`: Switches between light and dark modes (reversing current effective theme).
 */
export const useDarkTheme = (): UseDarkThemeReturn => {
  const preferredDark = usePreferredDark();

  const isDark = computed<boolean>({
    get: () => {
      if (themeChoice.value === 'dark') return true;
      if (themeChoice.value === 'light') return false;
      return preferredDark.value;
    },
    set: (val: boolean) => {
      themeChoice.value = val ? 'dark' : 'light';
    },
  });

  const toggleDark = () => {
    const current = themeChoice.value ?? (preferredDark.value ? 'dark' : 'light');
    themeChoice.value = current === 'dark' ? 'light' : 'dark';
  };

  return { theme: themeChoice, isDark, toggleDark };
};
