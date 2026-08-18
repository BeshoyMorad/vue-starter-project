export function formatStatus(text: string) {
  // 1) Split camelCase: detailedView -> detailed View
  const spaced = text.replace(/([a-z])([A-Z])/g, '$1 $2');

  // 2) Replace underscores with spaces
  const underscored = spaced.replaceAll('_', ' ');

  // 3) Convert to lowercase
  const lower = underscored.toLowerCase();

  // 4) Title Case each word: detailed View -> Detailed View
  return lower
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
