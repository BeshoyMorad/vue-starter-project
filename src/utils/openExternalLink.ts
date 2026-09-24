/**
 * Opens a URL in a new browser tab securely.
 * @param link - The external URL to open.
 */
export const openExternalLink = (link: string) => {
  if (!link || typeof link !== 'string') return;
  // If the link doesn't start with http or https, prepend https://
  if (!/^https?:\/\//i.test(link)) {
    link = `https://${link}`;
  }
  window.open(link, '_blank', 'noopener,noreferrer');
};
