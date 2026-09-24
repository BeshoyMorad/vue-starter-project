export const LOCALIZATION_DOM = {
  buttonLanguage: {
    title: 'Change Language with Button',
    description:
      'You can change the application language directly from any button by calling setLocale() from useAppLocale().',
    howToUse:
      'Get setLocale() from useAppLocale(), then pass the target locale code when the button is clicked.',
  },
  title: 'Localization',
  description:
    'A centralized localization system for translations, locale switching, number and date formatting, pluralization, and dynamic RTL/LTR support.',

  currentLocale: {
    title: 'Current Locale',
    description:
      'Use the application locale composable to access the active language, direction, and locale metadata. Changing the locale also updates the application direction.',
  },

  interpolation: {
    title: 'Interpolation',
    description:
      'Pass dynamic values into translation messages using named interpolation parameters.',
    howToUse:
      'Use t() with a translation key and provide the dynamic values required by the message.',
    inputLabel: 'Input Name:',
    inputPlaceholder: 'Enter name...',
    renderedLabel: 'Rendered:',
  },

  pluralization: {
    title: 'Pluralization',
    description:
      'Use locale-aware plural rules to automatically render the correct message based on a quantity.',
    howToUse:
      'Pass the quantity to t() and provide named values when the translation message needs the count.',
    quantityLabel: 'Quantity:',
    applesLabel: 'Apples Plural Rule:',
    membersLabel: 'Members Plural Rule:',
  },

  formatting: {
    title: 'Number & Currency Formatting',
    description: 'Format numbers, currencies, and percentages according to the active locale.',
    howToUse: 'Use n() with a number and the registered number format name.',
    currencyLabel: 'Currency',
    percentLabel: 'Percent',
  },

  dateTime: {
    title: 'Date & Relative Time',
    description:
      'Format dates using the application locale and display localized relative timestamps with Dayjs.',
    howToUse:
      'Use d() for localized date formatting and Dayjs with the current locale for relative timestamps.',
    dateLabel: 'Localized Date',
    relativeTimeLabel: 'Relative Time',
  },

  implementation: {
    title: 'Implementation Guide',
    description:
      'Use the application locale composable as the main entry point for translations, formatting, and locale switching.',
  },

  structure: {
    title: 'Structure',
    description:
      'Localization-related configuration, messages, and locale utilities are kept in a centralized structure so developers can easily find and extend them.',
  },
} as const;

export const LOCALIZATION_USAGE_CODE = {
  locale: `import { useAppLocale } from '@/composables/useAppLocale';
  import { LanguageSwitcher } from '@/components';

const {
  t,                  // Translate a message using its localization key
  d,                  // Format dates using the active locale
  n,                  // Format numbers, currencies, and percentages
  currentLocale,      // Get the currently active locale
  isRTL,              // Check whether the active locale uses RTL direction
  setLocale,          // Switch the application to another locale
} = useAppLocale();

const label = t('common.save');`,

  localeTemplate: `<template>
       <span
            class="border-primary-500/30 bg-primary-500/10 text-primary-600 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold"
          >
            <span>{{ currentLocaleMeta.flag }}</span>
            <span>
              {{ currentLocaleMeta.nativeLabel }}
              ({{ currentLocaleMeta.code.toUpperCase() }})
            </span>
            <span class="text-text-disabled">•</span>
            <span class="font-mono tracking-wider uppercase">
              {{ currentLocaleMeta.direction }}
            </span>
            <span class="text-text-disabled">•</span>
            <span class="text-[11px] font-normal"> isRTL: {{ isRTL ? 'true' : 'false' }} </span>
          </span>
    <LanguageSwitcher />
</template>`,
  buttonLanguage: `import { Button } from '@/components';
import { useAppLocale } from '@/composables/useAppLocale';

const {
  setLocale, // Change the application language
} = useAppLocale();

const changeLanguage = (locale: 'en' | 'ar') => {
  setLocale(locale); // Load and activate the selected locale
};`,

  buttonLanguageTemplate: `<Button
  test-id="change-language-en"
  @click="changeLanguage('en')"
>
  English
</Button>

<Button
  test-id="change-language-ar"
  @click="changeLanguage('ar')"
>
  العربية
</Button>`,

  steps: [
    {
      code: `import { useAppLocale } from '@/composables/useAppLocale';

const { t, d, n } = useAppLocale();

const label = t('common.save');`,
      header: 'Step 1 - Composable',
    },
    {
      code: `<template>
  <h1>{{ t('common.save') }}</h1>
  <p>{{ n(150, 'currency') }}</p>
  <p>{{ d(new Date(), 'short') }}</p>
</template>`,
      header: 'Step 2 - Template',
    },
    {
      code: `const { setLocale } = useAppLocale();

await setLocale('ar');

// Updates the active locale
// and document direction.`,
      header: 'Step 3 - Locale Switching',
    },
  ],
} as const;

export const LOCALIZATION_INTERPOLATION_CODE = `const { t } = useAppLocale();

const message = t('demo.interpolation.greeting', {
  name: 'Alex',
});

const stats = t('demo.interpolation.userStats', {
  count: 5,
  points: 240,
});`;

export const LOCALIZATION_PLURALIZATION_CODE = `const { t } = useAppLocale();

const count = 3;

const apples = t(
  'demo.pluralization.apples',
  count,
  {
    named: {
      count,
    },
  },
);

const members = t(
  'demo.pluralization.members',
  count,
  {
    named: {
      count,
    },
  },
);`;

export const LOCALIZATION_FORMATTING_CODE = `const { n } = useAppLocale();

const amount = n(1250.75, 'currency');

const percentage = n(0.85, 'percent');`;

export const LOCALIZATION_DATE_CODE = `import dayjs from 'dayjs';

const {
  d,
  currentLocale,
} = useAppLocale();

const formattedDate = d(
  new Date(),
  'short',
);

const relativeTime = dayjs()
  .subtract(3, 'hour')
  .locale(currentLocale.value)
  .fromNow();`;

export const LOCALIZATION_PROJECT_STRUCTURE = `📁 src/
├── 📁 composables/
│    └── 📄 useAppLocale.ts
│
├── 📁 locales/
│     │   ├── 📄 en.ts
│     │   └── 📄 ar.ts
│     │
│     ├── 📄 index.ts
│     └── 📄 schema.ts
│
└─ 📁 modules/
      └── 📁 feature/
          └──📁 locales/
               ├── 📄 en.ts
               └── 📄 ar.ts
`;
