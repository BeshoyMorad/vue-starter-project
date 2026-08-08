import type { Network } from '@/types/network';

// ----------------------------------------------------------------------
// APIs
// ----------------------------------------------------------------------

export type TokenType = 'ERC20' | 'TOKEN' | 'NFT';

export type TokenStatus = 'PENDING' | 'DEPLOYED' | 'REVERTED' | 'INSUFFICIENT_GAS';

export type TokenVerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'LimitReached';

export interface TokenNetwork {
  network: Network;
  types: {
    type: number;
    name: string;
  }[];
}

export interface Token {
  id: number;
  name: string;
  symbol: string;
  image: string;
  assetId: number;
  networkId: number;
  vaultId: number;
  network: Network;
  type: TokenType;
  status: TokenStatus;
  initialSupply: string;
  decimals: number;
  fees: string | null;
  contractAddress: string | null;
  ownerAddress: string;
  recipientAddress: string;
  verificationStatus: TokenVerificationStatus;
  verificationMessage: string | null;
  tokenExplorerUrl: string | null;
  createdAt: string;
  config: {
    canBurn?: boolean;
    canMint: boolean;
    canPause: boolean;
    metadataUrl?: string;
    document?: string;
    additional?: Record<string, string>;
  };
}

// ----------------------------------------------------------------------

export interface TokenFilter {
  networkId?: number;
  status?: TokenStatus;
}

export interface MetaKVPair {
  key: string;
  value: string;
}

export interface CreateTokenPayload {
  name: string;
  symbol: string;
  networkId: number;
  type: number;
  gasStationCategoryId: number;
  ownerAddress: string;
  mediaIdsToAdd: string[];
  initialSupply?: number;
  decimals?: number;
  isCollection?: boolean;
  parentId?: number;
  recipientAddress?: string;
  config: {
    canBurn?: boolean;
    canMint?: boolean;
    canPause?: boolean;
    document?: string;
    additional?: Record<string, string>;
  };
}
