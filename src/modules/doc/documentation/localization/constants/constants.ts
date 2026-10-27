export const LOCALIZATION_DOM = {
  buttonLanguage: {
    title: 'Change Language with Button',
    description:
      "You can change the application language directly from any button by setting locale.value from useI18n({ useScope: 'global' }).",
    howToUse:
      "Get locale from useI18n({ useScope: 'global' }), then set locale.value to the target locale code when the button is clicked.",
  },
  title: 'Localization',
  description:
    'A centralized localization system for translations, locale switching, number and date formatting, pluralization, and dynamic RTL/LTR support.',

  currentLocale: {
    title: 'Current Locale',
    description:
      'Use useI18n() to read the active language. Changing locale.value also updates the application direction.',
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
      'Use useI18n() as the main entry point for translations, formatting, and locale switching.',
  },

  structure: {
    title: 'Structure',
    description:
      'All UI copy lives in src/locales/{locale}/{namespace}.json. The filename is the key prefix. TypeScript in this folder is wiring only (loader, config, formats, types).',
    howToUse:
      'Add matching en and ar JSON files for every namespace, with no extra wrapper object. Register the namespace on MessageSchema in messages.ts. Do not colocate locale files next to components.',
  },
} as const;

export const LOCALIZATION_USAGE_CODE = {
  locale: `import { useI18n } from 'vue-i18n';
  import { LanguageSwitcher } from '@/components';

const {
  t,                  // Translate a message using its localization key
  d,                  // Format dates using the active locale
  n,                  // Format numbers, currencies, and percentages
  locale,             // Get or set the active locale
} = useI18n({ useScope: 'global' });

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
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' });

const changeLanguage = (code: 'en' | 'ar') => {
  locale.value = code; // Load and activate the selected locale
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
      code: `import { useI18n } from 'vue-i18n';

const { t, d, n } = useI18n();

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
      code: `const { locale } = useI18n({ useScope: 'global' });

locale.value = 'ar';

// Updates the active locale
// and document direction.`,
      header: 'Step 3 - Locale Switching',
    },
  ],
} as const;

export const LOCALIZATION_INTERPOLATION_CODE = `const { t } = useI18n();

const message = t('demo.interpolation.greeting', {
  name: 'Alex',
});

const stats = t('demo.interpolation.userStats', {
  count: 5,
  points: 240,
});`;

export const LOCALIZATION_PLURALIZATION_CODE = `const { t } = useI18n();

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

export const LOCALIZATION_FORMATTING_CODE = `const { n } = useI18n();

const amount = n(1250.75, 'currency');

const percentage = n(0.85, 'percent');`;

export const LOCALIZATION_DATE_CODE = `import dayjs from 'dayjs';

const {
  d,
  locale,
} = useI18n();

const formattedDate = d(
  new Date(),
  'short',
);

const relativeTime = dayjs()
  .subtract(3, 'hour')
  .locale(locale.value)
  .fromNow();`;

export const LOCALIZATION_PROJECT_STRUCTURE = `📁 src/locales/
├── 📁 en/
│     ├── 📄 common.json
│     ├── 📄 nav.json
│     ├── 📄 demo.json
│     └── 📄 …
├── 📁 ar/
│     ├── 📄 common.json
│     └── 📄 …
├── 📄 messages.ts
├── 📄 config.ts
├── 📄 formats.ts
├── 📄 utils.ts
├── 📄 index.ts
└── 📄 schema.d.ts
`;

export const LOCALIZATION_ADD_NAMESPACE_CODE = `// src/locales/en/errors.json  (and ar/errors.json)
{
  "title": "Access Denied"
}

// src/locales/messages.ts — add the namespace to MessageSchema
import type errors from './en/errors.json';

export interface MessageSchema {
  // ...existing namespaces
  errors: typeof errors;
}

// In a component
const { t } = useI18n();
t('errors.title');`;
