import { ref, onMounted, onUnmounted } from 'vue';
import router from '@/router';
import { paths } from '@/router/paths';
import { warn } from '@/utils/toast';

const OFFLINE_REDIRECT_KEY = 'offline_redirect_url';

export const isOnline = ref(navigator.onLine);

const getRedirectPath = (): string | null => {
  const route = router.currentRoute.value;
  const queryRedirect = route.query.redirect as string;
  if (queryRedirect) return queryRedirect;

  return sessionStorage.getItem(OFFLINE_REDIRECT_KEY);
};

const saveRedirectPath = (path: string) => {
  if (
    path &&
    !path.includes('/no-internet') &&
    !path.includes('/access-denied') &&
    !path.includes('/internal-server-error')
  ) {
    sessionStorage.setItem(OFFLINE_REDIRECT_KEY, path);
  }
};

const clearRedirectPath = () => {
  sessionStorage.removeItem(OFFLINE_REDIRECT_KEY);
};

export const handleOffline = (redirectPath?: string | Event) => {
  isOnline.value = false;
  const currentRoute = router.currentRoute.value;
  if (currentRoute.name !== paths.errors.noInternet) {
    const targetPath = typeof redirectPath === 'string' ? redirectPath : currentRoute.fullPath;
    saveRedirectPath(targetPath);
    router.push({
      name: paths.errors.noInternet,
      query: { redirect: targetPath },
    });
  }
};

export const handleOnline = () => {
  isOnline.value = true;
  const currentRoute = router.currentRoute.value;
  if (currentRoute.name === paths.errors.noInternet) {
    const redirect = getRedirectPath();
    router.push(redirect || { name: paths.dashboard.root });
    clearRedirectPath();
  }
};

export const tryAgain = () => {
  if (navigator.onLine) {
    handleOnline();
  } else {
    warn('You are still offline. Please check your connection.');
  }
};

export const useNetwork = () => {
  const initListeners = () => {
    onMounted(() => {
      window.addEventListener('offline', handleOffline);
      window.addEventListener('online', handleOnline);

      if (!navigator.onLine) {
        handleOffline();
      }
    });

    onUnmounted(() => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    });
  };

  return {
    isOnline,
    handleOffline,
    handleOnline,
    tryAgain,
    initListeners,
  };
};
