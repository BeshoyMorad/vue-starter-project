import { getCountries, getCountryCallingCode, type CountryCode } from 'libphonenumber-js';

export interface CountryOption {
  code: CountryCode;
  name: string;
  dialCode: string;
  flag: string;
}

/**
 * Convert an ISO 3166-1 alpha-2 country code to a flag emoji using
 * Unicode Regional Indicator Symbols. Works natively on all modern OSes
 * without any image assets.
 *
 * @example countryCodeToFlag('EG') → '🇪🇬'
 */
export function countryCodeToFlag(code: CountryCode): string {
  return [...code.toUpperCase()]
    .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)))
    .join('');
}

const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });

/**
 * Sorted list of all supported countries with their name, dial code and flag emoji.
 * Built once at module load — pure static data, no Vue reactivity needed.
 */
export const allCountries: CountryOption[] = getCountries()
  .map((code) => ({
    code,
    name: displayNames.of(code) ?? code,
    dialCode: `+${getCountryCallingCode(code)}`,
    flag: countryCodeToFlag(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
