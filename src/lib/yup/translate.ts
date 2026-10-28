export interface YupMessageParams {
  path?: string;
  label?: string;
  type?: string;
  values?: unknown;
  min?: unknown;
  max?: unknown;
  less?: unknown;
  more?: unknown;
  length?: unknown;
  regex?: unknown;
  unknown?: unknown;
  properties?: unknown;
  precision?: unknown;
  value?: unknown;
}

export function yupFieldPath(params: YupMessageParams): string {
  return params.label || params.path || '';
}

export function yupParamText(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (Array.isArray(value)) return value.map((item) => String(item)).join(', ');
  if (value instanceof RegExp) return value.toString();
  if (value == null) return '';
  return String(value);
}
