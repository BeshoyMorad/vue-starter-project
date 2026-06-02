// Truncate helper
export function excerpt(text: string, length = 100) {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '...' : text;
}
