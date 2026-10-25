import { onBeforeUnmount } from 'vue';
import type { MediaValue } from '@/types/media';

/**
 * Owns the blob URLs created for upload previews and revokes them when the component unmounts.
 *
 * A form can keep a `MediaValue` (and its `tempUrl`) after the field unmounts, e.g. between
 * multi-step form steps. `adopt` re-creates a preview URL from `file` when the incoming
 * `tempUrl` was not created by this instance, so remounted fields never show a dead URL.
 */
export function useObjectUrls() {
  const owned = new Set<string>();

  const create = (file: Blob) => {
    const url = URL.createObjectURL(file);
    owned.add(url);
    return url;
  };

  const revoke = (url?: string | null) => {
    if (!url) return;
    URL.revokeObjectURL(url);
    owned.delete(url);
  };

  const adopt = (media: MediaValue): MediaValue =>
    media.file && media.tempUrl && !owned.has(media.tempUrl)
      ? { ...media, tempUrl: create(media.file) }
      : media;

  onBeforeUnmount(() => {
    owned.forEach((url) => URL.revokeObjectURL(url));
    owned.clear();
  });

  return { create, revoke, adopt };
}
