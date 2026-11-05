/**
 * Resolves a URL to a normalized string with an http/https scheme.
 */
const resolveSafeUrl = (url?: string | null) => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href;
    }
    return null;
  } catch {
    try {
      const parsed = new URL(`https://${trimmed}`);
      if (parsed.protocol === 'https:') {
        return parsed.href;
      }
      return null;
    } catch {
      return null;
    }
  }
};

/**
 * Checks whether a URL uses a safe web scheme (http or https).
 */
export const isSafeUrl = (url?: string | null) => resolveSafeUrl(url) !== null;

/**
 * Opens a URL in a new browser tab securely with noopener,noreferrer.
 * Only permits safe web schemes (http:, https:).
 * @param link - The external URL to open.
 */
export const openExternalLink = (link?: string | null) => {
  const targetUrl = resolveSafeUrl(link);
  if (!targetUrl) return;

  window.open(targetUrl, '_blank', 'noopener,noreferrer');
};
