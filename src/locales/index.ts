import { createI18n } from 'vue-i18n';
import { DEFAULT_LOCALE, FALLBACK_LOCALE, type LocaleCode } from './config';
import { datetimeFormats, numberFormats } from './formats';
import { getStoredLocale } from './utils';
import { enMessages, loadLocaleFileMessages } from './messages';

export * from './config';
export * from './formats';

export const i18n = createI18n({
  legacy: false,
  locale: getStoredLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    [DEFAULT_LOCALE]: enMessages,
  },
  datetimeFormats,
  numberFormats,
});

/**
 * Loads a locale message chunk on demand. English is bundled with the app.
 */
export async function loadLocaleMessages(locale: LocaleCode): Promise<void> {
  if (i18n.global.availableLocales.includes(locale)) return;

  const messages = await loadLocaleFileMessages(locale);
  i18n.global.setLocaleMessage(locale, messages);
}

export default i18n;
