import { computed, ref, getCurrentInstance, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import {
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
  SUPPORTED_LOCALE_CODES,
  type LocaleCode,
  type LocaleMeta,
} from '@/locales/config';
import { i18n, loadLocaleMessages } from '@/locales';

const currentLocaleState = ref<LocaleCode>(DEFAULT_LOCALE);
const isLoadingLocale = ref(false);

async function syncDayjsLocale(dayjsLocale: string): Promise<void> {
  try {
    if (dayjsLocale === 'ar') {
      await import('dayjs/locale/ar');
    } else if (dayjsLocale === 'en') {
      await import('dayjs/locale/en');
    }
    dayjs.locale(dayjsLocale);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`[i18n]: Failed to sync dayjs locale "${dayjsLocale}":`, err);
  }
}

function updateDocumentAttributes(meta: LocaleMeta): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', meta.code);
    document.documentElement.setAttribute('dir', meta.direction);
  }
}

function getStoredOrDefaultLocale(): LocaleCode {
  try {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as LocaleCode | null;
    if (savedLocale && SUPPORTED_LOCALE_CODES.includes(savedLocale)) {
      return savedLocale;
    }
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0] as LocaleCode;
      if (SUPPORTED_LOCALE_CODES.includes(browserLang)) {
        return browserLang;
      }
    }
  } catch {
    // Fallback on error
  }
  return DEFAULT_LOCALE;
}

async function applyLocaleChange(locale: LocaleCode): Promise<void> {
  await loadLocaleMessages(locale);
  const meta = SUPPORTED_LOCALES[locale];
  await syncDayjsLocale(meta.dayjsLocale);

  const globalLocale = i18n.global.locale as unknown as Ref<string>;
  if (typeof globalLocale === 'object' && 'value' in globalLocale) {
    globalLocale.value = locale;
  }
  currentLocaleState.value = locale;
  updateDocumentAttributes(meta);

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Safe fallback if localStorage is unavailable
  }
}

function getI18nTranslators() {
  const composer = getCurrentInstance() ? useI18n({ useScope: 'global' }) : i18n.global;

  return {
    t: composer.t,
    d: composer.d,
    n: composer.n,
    tm: composer.tm,
    rt: composer.rt,
  };
}

export function useAppLocale() {
  const { t, d, n, tm, rt } = getI18nTranslators();

  const currentLocale = computed(() => currentLocaleState.value);
  const currentLocaleMeta = computed<LocaleMeta>(
    () => SUPPORTED_LOCALES[currentLocaleState.value] || SUPPORTED_LOCALES[FALLBACK_LOCALE]
  );
  const isRTL = computed(() => currentLocaleMeta.value.direction === 'rtl');
  const supportedLocales = computed(() => Object.values(SUPPORTED_LOCALES));

  const setLocale = async (locale: LocaleCode): Promise<void> => {
    if (!SUPPORTED_LOCALES[locale] || currentLocaleState.value === locale) return;
    isLoadingLocale.value = true;
    try {
      await applyLocaleChange(locale);
    } finally {
      isLoadingLocale.value = false;
    }
  };

  const initLocale = async (): Promise<void> => {
    const targetLocale = getStoredOrDefaultLocale();
    await setLocale(targetLocale);
  };

  return {
    t,
    d,
    n,
    tm,
    rt,
    currentLocale,
    currentLocaleMeta,
    isRTL,
    supportedLocales,
    isLoadingLocale: computed(() => isLoadingLocale.value),
    setLocale,
    initLocale,
  };
}
