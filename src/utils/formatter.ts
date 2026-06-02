import dayjs from "dayjs";

const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";

export type FormatCurrencyOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  value: number | null | undefined,
  options?: FormatCurrencyOptions,
): string {
  if (value == null || Number.isNaN(value)) return "—";
  const {
    locale = DEFAULT_LOCALE,
    currency = DEFAULT_CURRENCY,
    minimumFractionDigits,
    maximumFractionDigits,
  } = options ?? {};
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...(minimumFractionDigits !== undefined && { minimumFractionDigits }),
    ...(maximumFractionDigits !== undefined && { maximumFractionDigits }),
  }).format(value);
}

export type FormatDateMode = "date" | "datetime" | "month";

export type FormatDateOptions = {
  mode?: FormatDateMode;
};

const DATE_FORMAT_MAP: Record<FormatDateMode, string> = {
  date: "DD MMM, YYYY",
  month: "MMM, YYYY",
  datetime: "DD MMM YYYY, hh:mm a",
};

export function formatDate(
  dateStr: string | Date | null | undefined,
  options?: FormatDateOptions,
): string {
  if (dateStr == null || dateStr === "") return "—";
  const date = dayjs(dateStr);
  if (!date.isValid()) return "—";
  const { mode = "date" } = options ?? {};
  return date.format(DATE_FORMAT_MAP[mode]);
}

export type FormatTimeOptions = {
  locale?: string;
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  hour12?: boolean;
};

export function formatTime(
  dateStr: string | Date | null | undefined,
  options?: FormatTimeOptions,
): string {
  if (dateStr == null || dateStr === "") return "—";
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (Number.isNaN(date.getTime())) return "—";
  const {
    locale = DEFAULT_LOCALE,
    hour = "2-digit",
    minute = "2-digit",
    second,
    hour12 = true,
  } = options ?? {};
  return date.toLocaleTimeString(locale, {
    hour,
    minute,
    ...(second !== undefined && { second }),
    hour12,
  });
}

export type FormatPercentageOptions = {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatPercentage(
  value: number | null | undefined,
  options?: FormatPercentageOptions,
): string {
  if (value == null || Number.isNaN(value)) return "—";
  const {
    locale = DEFAULT_LOCALE,
    minimumFractionDigits,
    maximumFractionDigits = 2,
  } = options ?? {};
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100);
}

export type FormatNumberOptions = {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

/** Plain number with locale-aware grouping (e.g. thousands separators every 3 digits). */
export function formatNumber(
  value: number | null | undefined,
  options?: FormatNumberOptions,
): string {
  if (value == null || Number.isNaN(value)) return "—";
  const {
    locale = DEFAULT_LOCALE,
    minimumFractionDigits,
    maximumFractionDigits,
  } = options ?? {};
  return new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export type FormatListOptions = {
  locale?: string;
  type?: Intl.ListFormatType;
  style?: Intl.ListFormatStyle;
};

export function formatList(
  items: readonly string[] | null | undefined,
  options?: FormatListOptions,
): string {
  if (items == null) return "—";
  const list = items.map((s) => s.trim()).filter(Boolean);
  if (list.length === 0) return "—";
  const {
    locale = DEFAULT_LOCALE,
    type = "conjunction",
    style = "long",
  } = options ?? {};
  return new Intl.ListFormat(locale, { type, style }).format(list);
}

export function formatFileSize(
  bytes: number,
  options?: {
    decimals?: number;
    binary?: boolean;
  },
): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "0 B";
  }

  if (bytes === 0) {
    return "0 B";
  }

  const { decimals = 2, binary = false } = options ?? {};

  const base = binary ? 1024 : 1000;

  const units = binary
    ? ["B", "KiB", "MiB", "GiB", "TiB"]
    : ["B", "KB", "MB", "GB", "TB"];

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(base)),
    units.length - 1,
  );

  const value = bytes / Math.pow(base, exponent);

  return `${value.toFixed(decimals)} ${units[exponent]}`;
}
