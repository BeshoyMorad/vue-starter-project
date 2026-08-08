import type { TokenStatus, TokenVerificationStatus } from '@/modules/tokenization/types';

export interface TokenStatusProperty {
  text: string;
  color: string;
  icon?: string;
}

export const TokenStatusProperties: Record<TokenStatus, TokenStatusProperty> = {
  PENDING: {
    text: 'Pending',
    color: '#ffca8c',
    icon: 'hugeicons--time-02',
  },
  DEPLOYED: {
    text: 'Deployed',
    color: '#86efac',
    icon: 'hugeicons--checkmark-circle-02',
  },
  REVERTED: {
    text: 'Reverted',
    color: '#e7626a',
    icon: 'hugeicons--cancel-circle',
  },
  INSUFFICIENT_GAS: {
    text: 'Insufficient Gas',
    color: '#e7626a',
    icon: 'hugeicons--alert-circle',
  },
};

export const TokenVerificationStatusProperties: Record<
  TokenVerificationStatus,
  TokenStatusProperty
> = {
  VERIFIED: {
    text: 'Verified',
    color: '#86efac',
    icon: 'hugeicons--checkmark-badge-01',
  },
  REJECTED: {
    text: 'Rejected',
    color: '#e7626a',
    icon: 'hugeicons--cancel-circle-02',
  },
  LimitReached: {
    text: 'Limit Reached',
    color: '#ffca8c',
    icon: 'hugeicons--alert-circle',
  },
};

export const TOKEN_STATUSES = [
  { id: 'PENDING', name: 'Pending' },
  { id: 'DEPLOYED', name: 'Deployed' },
  { id: 'REVERTED', name: 'Reverted' },
  { id: 'INSUFFICIENT_GAS', name: 'Insufficient Gas' },
];
