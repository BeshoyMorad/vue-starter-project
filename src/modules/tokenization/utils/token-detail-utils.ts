import type { Token } from '@/modules/tokenization/types';
import {
  truncateError,
  type DetailRow,
} from '@/modules/vaults/features/transactions/utils/transaction-detail-utils';
import { formatStatus } from '@/utils/format-status';
import { formatDate, formatNumber } from '@/utils/formatter';
import { truncate } from '@/utils/formatText';

function makeRow(
  label: string,
  opts: {
    value: string | null;
    valueToShow?: string | null;
    copy?: boolean;
    tooltip?: boolean;
    testId?: string;
  }
): DetailRow {
  const { value, valueToShow, copy = false, tooltip = false, testId } = opts;
  return {
    label,
    value,
    valueToShow: valueToShow !== undefined ? valueToShow : value,
    copy,
    tooltip,
    testId: testId ?? `token-details-label-${label.replace(/ /g, '-').toLowerCase()}`,
  };
}

/**
 * Builds the ordered array of `DetailRow` items to display in the token
 * detail accordion.
 *
 * @param token - Loaded token details from the API.
 */
// eslint-disable-next-line max-lines-per-function
export function buildTokenRows(token: Token): DetailRow[] {
  const rows: DetailRow[] = [
    makeRow('Status', {
      value: token.status,
      valueToShow: formatStatus(token.status),
      copy: false,
      tooltip: false,
    }),
    makeRow('Verification Status', {
      value: token.verificationStatus,
      valueToShow: formatStatus(token.verificationStatus),
      copy: false,
      tooltip: false,
    }),
  ];

  if (token.verificationStatus !== 'VERIFIED' && token.verificationMessage) {
    const { display: errorDisplay, full: errorFull } = truncateError(token.verificationMessage);

    rows.push(
      makeRow('Verification Message', {
        value: errorFull,
        valueToShow: errorDisplay,
        copy: !!errorFull,
        tooltip: !!errorFull && errorFull !== errorDisplay,
      })
    );
  }

  rows.push(
    makeRow('Owner Address', {
      value: token.ownerAddress,
      valueToShow: token.ownerAddress ? truncate(token.ownerAddress, 10, 10) : null,
      copy: !!token.ownerAddress,
      tooltip: !!token.ownerAddress,
    }),
    makeRow('Recipient Address', {
      value: token.recipientAddress,
      valueToShow: token.recipientAddress ? truncate(token.recipientAddress, 10, 10) : null,
      copy: !!token.recipientAddress,
      tooltip: !!token.recipientAddress,
    })
  );

  if (token.fees) {
    const numericFee = parseFloat(token.fees);
    rows.push(
      makeRow('Deployment Fees', {
        value: token.fees,
        valueToShow: isNaN(numericFee)
          ? token.fees
          : formatNumber(numericFee, { maximumFractionDigits: 8 }),
        copy: true,
        tooltip: true,
      })
    );
  }

  if (token.initialSupply) {
    const numericSupply = parseFloat(token.initialSupply);
    rows.push(
      makeRow('Initial Supply', {
        value: token.initialSupply,
        valueToShow: isNaN(numericSupply) ? token.initialSupply : formatNumber(numericSupply),
        copy: false,
        tooltip: false,
      })
    );
  }

  rows.push(
    ...[
      makeRow('Decimals', {
        value: String(token.decimals),
        copy: false,
        tooltip: false,
      }),
      makeRow('Created At', {
        value: token.createdAt,
        valueToShow: formatDate(token.createdAt, { mode: 'datetime' }),
        copy: false,
        tooltip: false,
      }),
    ]
  );

  return rows.filter((r) => r.value !== null || r.valueToShow !== null);
}
