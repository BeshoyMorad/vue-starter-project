export const DEFAULT_PRESETS: string[] = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#10b981',
  '#06b6d4',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#d946ef',
  '#ec4899',
  '#64748b',
  '#000000',
];

export const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

export function isValidHexColor(color: string): boolean {
  if (!color) return false;
  return HEX_COLOR_REGEX.test(color.trim());
}
