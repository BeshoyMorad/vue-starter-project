import type { LoginRequest } from "../types";
import { api } from "@/lib/api/client";
import { apiRoute } from "@/lib/api/endpoints";

export const authServices = {
  login: async (payload: LoginRequest) => {
    const response = await api.post<ApiResponse<any>>(
      apiRoute("auth.login"),
      payload,
    );
    return response.data;
  },
};
