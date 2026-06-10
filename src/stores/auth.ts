import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '@/lib/api/token';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = useLocalStorage<string>(ACCESS_TOKEN_STORAGE_KEY, '');
  const refreshToken = useLocalStorage<string>(REFRESH_TOKEN_STORAGE_KEY, '');
  const authEmployee = ref<unknown>(null); // Replace with your exact User/Employee type

  const isAuthenticated = computed(() => !!accessToken.value);

  const login = async (payload: {
    access_token: string;
    refresh_token: string;
    employee: unknown;
  }) => {
    accessToken.value = payload.access_token;
    refreshToken.value = payload.refresh_token;
    authEmployee.value = payload.employee;
  };

  const clearAuth = () => {
    accessToken.value = '';
    refreshToken.value = '';
    authEmployee.value = null;
  };

  const getRefreshToken = async () => {
    try {
      // Execute token refresh API request here, for example:
      // const res = await api.post('/refresh-token', { refresh_token: refreshToken.value });
      // accessToken.value = res.data.access_token;
      // refreshToken.value = res.data.refresh_token;
    } catch {
      clearAuth();
    }
  };

  return {
    accessToken,
    refreshToken,
    authEmployee,
    isAuthenticated,
    login,
    clearAuth,
    getRefreshToken,
  };
});
