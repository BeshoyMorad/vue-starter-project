import type { Network } from '@/types/network';

// ----------------------------------------------------------------
// APIs
// ----------------------------------------------------------------
export type AssetType = 'COIN' | 'TOKEN' | 'CUSTOM_TOKEN' | 'ORDER';

export type AssetVaultStatus = 'active' | 'deactivated';

export type AssetStatus = 'ACTIVE' | 'PENDING' | 'HELD_BY_CORPORATE' | 'HELD_BY_SUPER_ADMIN';

export interface Asset {
  id: number;
  name: string;
  symbol: string;
  contractAddress: string | null;
  network: Network;
  logo: string;
  decimals: number;
}

export interface AssetVault extends Asset {
  status: AssetStatus;
  vaultStatus: AssetVaultStatus;
  isHidden: boolean;
  type: AssetType;
}

// ----------------------------------------------------------------

// ----------------------------------------------------------------
// Forms
// ----------------------------------------------------------------
export interface AssetFilter {
  networkId?: number;
  status?: AssetStatus;
}

export interface CreateCustomTokenPayload {
  name: string;
  symbol: string;
  contractAddress: string;
  decimals: number;
  networkId: number;
  mediaIdsToAdd?: string[];
}

export interface AddAvailableAssetsPayload {
  assetsIds: number[];
  totalAssetsCount: number;
}
// ----------------------------------------------------------------
