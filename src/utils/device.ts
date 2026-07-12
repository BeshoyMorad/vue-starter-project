import { useLocalStorage } from '@vueuse/core';

const DEVICE_ID_STORAGE_KEY = 'device_id';

export function getDeviceId(): string {
  const deviceId = useLocalStorage(DEVICE_ID_STORAGE_KEY, '');

  if (!deviceId.value) {
    // Generate a secure UUID if available, otherwise fall back to a random string
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      deviceId.value = crypto.randomUUID();
    } else {
      deviceId.value =
        'web-' +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }
  }

  return deviceId.value;
}
