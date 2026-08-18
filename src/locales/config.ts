export type LocaleCode = 'en' | 'ar';
export type LocaleDirection = 'ltr' | 'rtl';

export interface LocaleMeta {
  code: LocaleCode;
  label: string;
  nativeLabel: string;
  direction: LocaleDirection;
  flag: string;
  dayjsLocale: string;
}

export const DEFAULT_LOCALE: LocaleCode = 'en';
export const FALLBACK_LOCALE: LocaleCode = 'en';
export const LOCALE_STORAGE_KEY = 'app_language_preference';

export const SUPPORTED_LOCALES: Record<LocaleCode, LocaleMeta> = {
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
    dayjsLocale: 'en',
  },
  ar: {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
    dayjsLocale: 'ar',
  },
};

export const SUPPORTED_LOCALE_CODES = Object.keys(SUPPORTED_LOCALES) as LocaleCode[];
