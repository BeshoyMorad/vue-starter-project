import dayjs from 'dayjs';
import { unref, watch } from 'vue';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALE_CODES,
  SUPPORTED_LOCALES,
  type LocaleCode,
} from './config';

/**
 * Gets the stored language preference, then the browser language, or returns the default locale.
 */
export function getStoredLocale(): LocaleCode {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as LocaleCode | null;
    if (saved && SUPPORTED_LOCALE_CODES.includes(saved)) {
      return saved;
    }

    const browserLang = navigator.language.split('-')[0] as LocaleCode;
    if (SUPPORTED_LOCALE_CODES.includes(browserLang)) {
      return browserLang;
    }
  } catch {
    // Fallback if localStorage or navigator is inaccessible
  }
  return DEFAULT_LOCALE;
}

/**
 * Saves the selected locale code to localStorage.
 */
export function setStoredLocale(locale: LocaleCode): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Fallback if localStorage is inaccessible
  }
}

/**
 * Updates the document <html> tag with the corresponding lang and dir attributes.
 */
export function syncDocumentLocale(locale: LocaleCode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('lang', locale);
  document.documentElement.setAttribute('dir', SUPPORTED_LOCALES[locale].direction);
}

/**
 * Dynamically loads and activates the Dayjs locale.
 */
export async function syncDayjsLocale(locale: LocaleCode): Promise<void> {
  try {
    if (locale === 'ar') {
      await import('dayjs/locale/ar');
    } else if (locale === 'en') {
      await import('dayjs/locale/en');
    }
    dayjs.locale(SUPPORTED_LOCALES[locale].dayjsLocale);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`[i18n]: Failed to sync dayjs locale "${locale}":`, err);
  }
}

/**
 * Watches the i18n locale and keeps the rest of the app in sync:
 * 1. Optional message chunk loader (e.g. dynamic import)
 * 2. Document <html> lang and dir attributes
 * 3. Day.js locale
 * 4. LocalStorage persistence
 */
export function setupLocaleSync(
  i18nInstance: { global: { locale: unknown } },
  onLocaleChange?: (locale: LocaleCode) => Promise<void> | void
): void {
  watch(
    () => unref(i18nInstance.global.locale) as LocaleCode,
    async (newLocale) => {
      if (onLocaleChange) {
        await onLocaleChange(newLocale);
      }
      syncDocumentLocale(newLocale);
      await syncDayjsLocale(newLocale);
      setStoredLocale(newLocale);
    },
    { immediate: true }
  );
}
