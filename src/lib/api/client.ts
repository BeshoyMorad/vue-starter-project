import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { paths } from '@/router/paths';
import { config } from '@/config/env';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

function onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const authStore = useAuthStore();
  config.headers.set('Accept', 'application/json');
  config.headers.set('Content-Type', 'application/json');

  if (authStore.accessToken) {
    config.headers.set('Authorization', `Bearer ${authStore.accessToken}`);
  }
  return config;
}

async function onResponseError(error: AxiosError) {
  const authStore = useAuthStore();
  const originalRequest = error.config as ExtendedAxiosRequestConfig;

  if (!error.response) {
    return Promise.reject(error);
  }

  const status = error.response.status;

  if (status === 401) {
    authStore.clearAuth();
    return Promise.reject(error);
  } else if (status === 403) {
    router.push({ name: paths.errors.accessDenied });
    return Promise.reject(error);
  } else if (status === 500) {
    router.push({ name: paths.errors.serverError });
    return Promise.reject(error);
  }

  // 419 status implies token expired/invalid
  if (status === 419 && originalRequest && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken: string) => {
          originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await authStore.getRefreshToken();
      const newToken = authStore.accessToken;
      if (!newToken) {
        throw new Error('Refresh failed - no valid token');
      }

      onTokenRefreshed(newToken);
      originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
      return api(originalRequest);
    } catch (refreshError) {
      refreshSubscribers = [];
      authStore.clearAuth();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
}

export const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.interceptors.request.use(onRequest, (err) => Promise.reject(err));
api.interceptors.response.use((res) => res, onResponseError);
