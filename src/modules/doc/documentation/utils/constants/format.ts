import type { DocSection } from '@/modules/doc/shared/types';

export const UTILS_FORMAT_SECTIONS: DocSection[] = [
  {
    title: 'formatter: currency, number, percentage, list',
    description:
      'src/utils/formatter.ts. Every function accepts null or undefined and returns an em dash instead of "NaN" or "null", so you can pass API values straight in. Defaults: locale en-US, currency USD.',
    howToUse:
      'Rule: no inline formatting in components or columns (no toFixed, no toLocaleString, no manual dayjs). Pass a locale or currency through the options object only when the screen really needs it.',
    code: `import {
  formatCurrency, formatNumber, formatPercentage, formatList,
} from '@/utils/formatter';

formatCurrency(1234.5);                       // '$1,234.50'
formatCurrency(10, { currency: 'EGP', locale: 'en-EG' });
formatCurrency(null);                         // '—'
formatNumber(1234567.891, { maximumFractionDigits: 1 }); // '1,234,567.9'
formatPercentage(12.5);                       // '12.5%'  (value is 0-100, not 0-1)
formatList(['a', 'b', 'c']);                  // 'a, b, and c'
formatList([]);                               // '—'`,
    header: 'formatter',
  },
  {
    title: 'formatter: dates and time',
    description:
      'formatDate(value, { mode, skipConvert }) with modes date ("05 Nov, 2026"), datetime, month, time and apiDate ("2026-11-05"). convertToLocalDate treats a string without a trailing Z as UTC, because the backend sends UTC without the suffix. formatTime(value, options) uses Intl with 12 hour clock by default.',
    howToUse:
      'Use formatDate for everything the user reads. Use mode "apiDate" when you send a date back to the backend. Pass skipConvert: true only when the value is already a local date (for example one picked in a DatePicker) so it is not shifted by the UTC conversion.',
    code: `import { formatDate, formatTime } from '@/utils/formatter';

formatDate(user.createdAt);                          // '05 Nov, 2026'
formatDate(user.createdAt, { mode: 'datetime' });    // '05 Nov 2026, 02:30 pm'
formatDate(pickedDate, { mode: 'apiDate', skipConvert: true }); // '2026-11-05'
formatDate('');                                      // '—'
formatTime(user.createdAt, { hour12: false });       // '14:30'`,
    header: 'formatter',
  },
  {
    title: 'formatter: file size, crypto-style decimals',
    description:
      'formatFileSize(bytes, { decimals, binary }) returns "1.50 MB" (1000 base) or "1.43 MiB" with binary: true. formatSubscriptZeros shortens tiny prices (0.00000123 becomes 0.0₅123; with html: true it returns a sub tag). toPlainDecimalString expands scientific notation ("1e-7" becomes "0.0000001") so numbers are never shown as 1e-7.',
    howToUse:
      'Use formatFileSize in upload fields and file lists. Use the other two only for very small decimal values (prices, balances). Both return strings, so do not do maths on the result.',
    code: `import {
  formatFileSize, formatSubscriptZeros, toPlainDecimalString,
} from '@/utils/formatter';

formatFileSize(1_500_000);                   // '1.50 MB'
formatFileSize(1_500_000, { binary: true }); // '1.43 MiB'
formatSubscriptZeros(0.00000123);            // '0.0₅123'
toPlainDecimalString('1.5e-5');              // '0.000015'`,
    header: 'formatter',
  },
  {
    title: 'formatText and formatStatus',
    description:
      'truncate(text, start = 4, end = 4) shortens long ids and addresses to "0x12...abcd" and returns an empty string for null. formatPascalCase("detailedView") returns "Detailed View". formatStatus("HELD_BY_ADMIN") or "heldByAdmin" returns "Held By Admin".',
    howToUse:
      'Use formatStatus for every enum shown in a StatusBadge or table cell, and truncate when the full value is available through a copy button or tooltip. Do not translate enums here: if a status needs i18n, map it to a t() key.',
    code: `import { truncate, formatPascalCase } from '@/utils/formatText';
import { formatStatus } from '@/utils/formatStatus';

truncate('0x1234567890abcdef', 6, 4); // '0x1234...cdef'
formatPascalCase('detailedView');     // 'Detailed View'
formatStatus('HELD_BY_SUPER_ADMIN');  // 'Held By Super Admin'

// column cell
cell: ({ row }) => h(StatusBadge, { variant: 'success' }, () => formatStatus(row.original.status)),`,
    header: 'formatText / formatStatus',
  },
];
