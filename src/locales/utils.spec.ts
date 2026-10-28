import { afterEach, describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from './config';
import { getStoredLocale } from './utils';

const originalLanguage = navigator.language;

function stubBrowserLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    configurable: true,
    value: language,
  });
}

describe('getStoredLocale', () => {
  afterEach(() => {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
    stubBrowserLanguage(originalLanguage);
  });

  it('returns the site default when no preference is stored and the browser language is unsupported', () => {
    stubBrowserLanguage('fr-FR');
    expect(getStoredLocale()).toBe(DEFAULT_LOCALE);
  });

  it('returns the stored preference when it is a supported locale', () => {
    stubBrowserLanguage('en-US');
    localStorage.setItem(LOCALE_STORAGE_KEY, 'ar');
    expect(getStoredLocale()).toBe('ar');
  });

  it('returns the site default when the stored value is not a supported locale', () => {
    stubBrowserLanguage('fr-FR');
    localStorage.setItem(LOCALE_STORAGE_KEY, 'fr');
    expect(getStoredLocale()).toBe(DEFAULT_LOCALE);
  });

  it('uses the browser language when no preference is stored', () => {
    stubBrowserLanguage('ar-SA');
    expect(getStoredLocale()).toBe('ar');
  });
});
