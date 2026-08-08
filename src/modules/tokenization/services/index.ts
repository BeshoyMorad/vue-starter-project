import { api } from '@/lib/api/client';
import { apiRoute } from '@/lib/api/endpoints';
import type { Token, TokenNetwork, CreateTokenPayload } from '@/modules/tokenization/types';

export const tokenizationServices = {
  getTokenDetails: async (id: number) => {
    const { data } = await api.get<ApiResponse<Token>>(apiRoute('tokenization.show', { id }));
    return data.data;
  },
  verifyToken: async (id: number) => {
    const { data } = await api.patch<ApiResponse>(apiRoute('tokenization.verify', { id }));
    return data;
  },
  getTokenNetworks: async () => {
    const { data } = await api.get<ApiResponse<TokenNetwork[]>>(apiRoute('tokenization.networks'));
    return data.data;
  },
  createToken: async (payload: CreateTokenPayload) => {
    const { data } = await api.post<ApiResponse<Token>>(apiRoute('tokenization.create'), payload);
    return data;
  },
};
