import dayjs from 'dayjs';

// ==============================================================================
// Currency
// ==============================================================================

const DEFAULT_LOCALE = 'en-US';
const DEFAULT_CURRENCY = 'USD';

export interface FormatCurrencyOptions {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  value: number | null | undefined,
  options?: FormatCurrencyOptions
): string {
  if (value == null || Number.isNaN(value)) return '—';
  const {
    locale = DEFAULT_LOCALE,
    currency = DEFAULT_CURRENCY,
    minimumFractionDigits,
    maximumFractionDigits,
  } = options ?? {};
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    ...(minimumFractionDigits !== undefined && { minimumFractionDigits }),
    ...(maximumFractionDigits !== undefined && { maximumFractionDigits }),
  }).format(value);
}

// ==============================================================================
// Date Time
// ==============================================================================

export function convertToLocalDate(date: Date | string) {
  const dateString = String(date);
  if (dateString.endsWith('Z')) {
    return new Date(dateString);
  }

  return new Date(`${dateString}Z`);
}

export type FormatDateMode = 'date' | 'datetime' | 'month' | 'apiDate' | 'time';

export interface FormatDateOptions {
  mode?: FormatDateMode;
}

const DATE_FORMAT_MAP: Record<FormatDateMode, string> = {
  date: 'DD MMM, YYYY',
  month: 'MMM, YYYY',
  datetime: 'DD MMM YYYY, hh:mm a',
  time: 'HH:mm A',
  apiDate: 'YYYY-MM-DD',
};

export function formatDate(
  dateStr: string | Date | null | undefined,
  options?: FormatDateOptions
): string {
  if (dateStr == null || dateStr === '') return '—';
  const date = dayjs(convertToLocalDate(dateStr));
  if (!date.isValid()) return '—';
  const { mode = 'date' } = options ?? {};
  return date.format(DATE_FORMAT_MAP[mode]);
}

export interface FormatTimeOptions {
  locale?: string;
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  hour12?: boolean;
}

export function formatTime(
  dateStr: string | Date | null | undefined,
  options?: FormatTimeOptions
): string {
  if (dateStr == null || dateStr === '') return '—';
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  if (Number.isNaN(date.getTime())) return '—';
  const {
    locale = DEFAULT_LOCALE,
    hour = '2-digit',
    minute = '2-digit',
    second,
    hour12 = true,
  } = options ?? {};
  return convertToLocalDate(date).toLocaleTimeString(locale, {
    hour,
    minute,
    ...(second !== undefined && { second }),
    hour12,
  });
}

// ==============================================================================
// Percentage
// ==============================================================================

export interface FormatPercentageOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatPercentage(
  value: number | null | undefined,
  options?: FormatPercentageOptions
): string {
  if (value == null || Number.isNaN(value)) return '—';
  const {
    locale = DEFAULT_LOCALE,
    minimumFractionDigits,
    maximumFractionDigits = 2,
  } = options ?? {};
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100);
}

// ==============================================================================
// Number
// ==============================================================================

export interface FormatNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/** Plain number with locale-aware grouping (e.g. thousands separators every 3 digits). */
export function formatNumber(
  value: number | null | undefined,
  options?: FormatNumberOptions
): string {
  if (value == null || Number.isNaN(value)) return '—';
  const { locale = DEFAULT_LOCALE, minimumFractionDigits, maximumFractionDigits } = options ?? {};
  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

// ==============================================================================
// List
// ==============================================================================

export interface FormatListOptions {
  locale?: string;
  type?: Intl.ListFormatType;
  style?: Intl.ListFormatStyle;
}

export function formatList(
  items: readonly string[] | null | undefined,
  options?: FormatListOptions
): string {
  if (items == null) return '—';
  const list = items.map((s) => s.trim()).filter(Boolean);
  if (list.length === 0) return '—';
  const { locale = DEFAULT_LOCALE, type = 'conjunction', style = 'long' } = options ?? {};
  return new Intl.ListFormat(locale, { type, style }).format(list);
}

// ==============================================================================
// File Size
// ==============================================================================

export function formatFileSize(
  bytes: number,
  options?: {
    decimals?: number;
    binary?: boolean;
  }
): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return '0 B';
  }

  if (bytes === 0) {
    return '0 B';
  }

  const { decimals = 2, binary = false } = options ?? {};

  const base = binary ? 1024 : 1000;

  const units = binary ? ['B', 'KiB', 'MiB', 'GiB', 'TiB'] : ['B', 'KB', 'MB', 'GB', 'TB'];

  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(base)), units.length - 1);

  const value = bytes / Math.pow(base, exponent);

  return `${value.toFixed(decimals)} ${units[exponent]}`;
}

// ==============================================================================
// Subscript Zeros
// ==============================================================================

const SUBSCRIPTS = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];

function toSubscript(num: number): string {
  return String(num)
    .split('')
    .map((digit) => SUBSCRIPTS[parseInt(digit, 10)] || digit)
    .join('');
}

export interface FormatSubscriptZerosOptions {
  maxDigits?: number;
  html?: boolean;
}

export function formatSubscriptZeros(
  valueStr: string | number,
  options?: FormatSubscriptZerosOptions
): string {
  const num = Number(valueStr);
  if (isNaN(num) || num === 0) return String(valueStr);

  const { maxDigits = 4, html = false } = options ?? {};

  // First convert to a high precision fixed string to calculate zero count
  const str = num.toFixed(18).replace(/0+$/, '');
  const match = str.match(/^0\.(0{4,})([1-9]\d*)$/);

  if (match) {
    const zeroCount = match[1].length;

    // Round to (zeroCount + maxDigits) decimal places
    const roundedStr = num.toFixed(zeroCount + maxDigits).replace(/0+$/, '');
    const roundedMatch = roundedStr.match(/^0\.(0{4,})([1-9]\d*)$/);

    if (roundedMatch) {
      const newZeroCount = roundedMatch[1].length;
      const remainingDigits = roundedMatch[2];
      if (html) {
        return `0.0<sub class="text-sm font-semibold align-baseline relative -bottom-1 mx-0.5">${newZeroCount}</sub>${remainingDigits}`;
      }
      return `0.0${toSubscript(newZeroCount)}${remainingDigits}`;
    }
    return roundedStr;
  }

  // Fallback for normal decimals (e.g. 0.00123)
  if (str.includes('.')) {
    const parts = str.split('.');
    if (parts[1].length > maxDigits) {
      return num.toFixed(maxDigits).replace(/0+$/, '');
    }
  }

  return str;
}
