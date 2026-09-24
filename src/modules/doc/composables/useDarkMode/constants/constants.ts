export const USE_DARK_THEME_DOM = {
  title: 'useDarkTheme',
  description:
    'A composable for managing the application theme and switching between light and dark modes.',

  import: {
    title: 'Import',
    description: 'Import useDarkTheme from the shared composables.',
  },

  whatIs: {
    title: 'What is useDarkTheme?',
    description:
      'Use useDarkTheme when you need to read the current theme or switch between light and dark modes.',
  },

  basicUsage: {
    title: 'Basic Usage',
    description:
      'Call useDarkTheme inside script setup to access the current theme state and the function used to toggle it.',
    howToUse:
      'Destructure isDark to read the current theme and toggleDark to switch between light and dark modes.',
  },

  persistence: {
    title: 'Theme Persistence',
    description:
      'The selected theme is automatically stored and restored when the application is loaded again.',
  },
};

export const USE_DARK_THEME_IMPORT_CODE = `import { useDarkTheme } from '@/composables';`;

export const USE_DARK_THEME_BASIC_CODE = `const { isDark, toggleDark } = useDarkTheme();`;

export const USE_DARK_THEME_TEMPLATE_CODE = `<Button @click="toggleDark()">
  {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
</Button>`;

export const USE_DARK_THEME_PERSISTENCE_CODE = `const { isDark } = useDarkTheme();

console.log(isDark); // Current theme state`;
