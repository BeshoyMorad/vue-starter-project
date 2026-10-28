import { createI18n } from 'vue-i18n';
import { FALLBACK_LOCALE, type LocaleCode } from './config';
import { datetimeFormats, numberFormats } from './formats';
import { getStoredLocale } from './utils';
import { loadLocaleFileMessages } from './messages';

export * from './config';
export * from './formats';

const initialLocale = getStoredLocale();

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {},
  datetimeFormats,
  numberFormats,
});

/**
 * Loads a locale message chunk on demand. The active locale is loaded at bootstrap.
 */
export async function loadLocaleMessages(locale: LocaleCode): Promise<void> {
  if (i18n.global.availableLocales.includes(locale)) return;

  const messages = await loadLocaleFileMessages(locale);
  i18n.global.setLocaleMessage(locale, messages);
}

/** Loads the stored locale, browser language, or site default. */
export async function bootstrapI18n(): Promise<void> {
  await loadLocaleMessages(initialLocale);
}

export default i18n;
