import { describe, it, expect, beforeEach } from 'vitest';
import { useAppLocale } from './useAppLocale';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '@/locales/config';

describe('useAppLocale', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default locale values and metadata', () => {
    const { currentLocale, isRTL, supportedLocales } = useAppLocale();

    expect(currentLocale.value).toBe(DEFAULT_LOCALE);
    expect(isRTL.value).toBe(false);
    expect(supportedLocales.value.length).toBeGreaterThanOrEqual(2);
  });

  it('switches to Arabic locale, sets RTL and persists to localStorage', async () => {
    const { setLocale, currentLocale, isRTL } = useAppLocale();

    await setLocale('ar');

    expect(currentLocale.value).toBe('ar');
    expect(isRTL.value).toBe(true);
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('ar');
  });

  it('switches back to English locale and sets LTR', async () => {
    const { setLocale, currentLocale, isRTL } = useAppLocale();

    await setLocale('en');

    expect(currentLocale.value).toBe('en');
    expect(isRTL.value).toBe(false);
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en');
  });
});
