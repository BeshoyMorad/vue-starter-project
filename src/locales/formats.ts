// Number formats with const assertions for strict Intl typing
export const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'USD',
      notation: 'standard',
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  ar: {
    currency: {
      style: 'currency',
      currency: 'SAR',
      notation: 'standard',
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
} as const;

// Datetime formats with const assertions for strict Intl typing
export const datetimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  ar: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
} as const;
