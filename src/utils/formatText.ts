// Truncate helper
export function truncate(text: string | null, startLength: number = 4, endLength: number = 4) {
  if (!text) return '';
  if (text.length <= startLength + endLength) {
    return text;
  }
  const start = text.slice(0, startLength);
  const end = endLength > 0 ? text.slice(-endLength) : '';
  return `${start}...${end}`;
}

export function formatPascalCase(str: string) {
  // 1) split camelCase: detailedView -> detailed View
  const spaced = str.replace(/([a-z])([A-Z])/g, '$1 $2');

  // 2) Title Case each word: detailed View -> Detailed View
  return spaced
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
