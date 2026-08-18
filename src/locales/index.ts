import { createI18n } from 'vue-i18n';
import { DEFAULT_LOCALE, FALLBACK_LOCALE, SUPPORTED_LOCALES, type LocaleCode } from './config';
import enMessages from './en';

// Static loader registry for explicit chunk splitting and clean bundle optimization
const localeLoaders: Record<LocaleCode, () => Promise<{ default: typeof enMessages }>> = {
  en: () => Promise.resolve({ default: enMessages }),
  ar: () => import('./ar'),
};

// Number formats with const assertions for strict Intl typing
export const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'USD',
      notation: 'standard',
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  ar: {
    currency: {
      style: 'currency',
      currency: 'SAR',
      notation: 'standard',
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
} as const;

// Datetime formats with const assertions for strict Intl typing
export const datetimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  ar: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
} as const;

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    [DEFAULT_LOCALE]: enMessages,
  },
  datetimeFormats,
  numberFormats,
});

/**
 * Dynamically loads and registers a locale's messages chunk on demand.
 * This guarantees minimum initial bundle size while enabling fast switching.
 */
export async function loadLocaleMessages(locale: LocaleCode): Promise<void> {
  if (!SUPPORTED_LOCALES[locale]) {
    // eslint-disable-next-line no-console
    console.warn(`[i18n]: Locale "${locale}" is not supported.`);
    return;
  }

  // Already loaded in i18n instance
  if (i18n.global.availableLocales.includes(locale)) {
    return;
  }

  const loader = localeLoaders[locale];
  if (!loader) {
    // eslint-disable-next-line no-console
    console.warn(`[i18n]: No loader found for locale "${locale}".`);
    return;
  }

  try {
    const messages = await loader();
    i18n.global.setLocaleMessage(locale, messages.default);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[i18n]: Failed to load locale messages chunk for "${locale}":`, error);
    throw error;
  }
}

export * from './config';
export default i18n;
