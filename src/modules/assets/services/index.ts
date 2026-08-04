import { api } from '@/lib/api/client';
import { apiRoute } from '@/lib/api/endpoints';
import type {
  AddAvailableAssetsPayload,
  AssetVault,
  CreateCustomTokenPayload,
} from '@/modules/assets/types';

export const assetsServices = {
  toggleAssetStatus: async (id: number) => {
    const response = await api.patch(apiRoute('assets.toggle-status', { id }));
    return response.data;
  },

  createCustomToken: async (payload: CreateCustomTokenPayload) => {
    const response = await api.post(apiRoute('assets.create-custom-token'), payload);
    return response.data;
  },

  getContractDetails: async (networkId: number, contractAddress: string) => {
    const response = await api.get<ApiResponse<AssetVault>>(
      apiRoute('assets.contract-details', {
        networkId,
        contractAddress,
      })
    );
    return response.data;
  },

  addAvailableAssets: async (payload: AddAvailableAssetsPayload, networkId?: number) => {
    const route = networkId
      ? apiRoute('assets.add-available', { 'filters[networkId]': networkId })
      : apiRoute('assets.add-available');
    const response = await api.post(route, payload);
    return response.data;
  },
};
