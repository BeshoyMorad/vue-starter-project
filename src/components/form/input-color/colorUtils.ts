export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSV {
  h: number; // 0 - 360
  s: number; // 0 - 1
  v: number; // 0 - 1
}

export function hexToRgb(hex: string): RGB {
  let h = hex.replace(/^#/, '').trim();
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6) {
    return { r: 0, g: 0, b: 0 };
  }
  const num = parseInt(h, 16);
  if (Number.isNaN(num)) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsv(r: number, g: number, b: number): HSV {
  const rNorm = Math.max(0, Math.min(255, r)) / 255;
  const gNorm = Math.max(0, Math.min(255, g)) / 255;
  const bNorm = Math.max(0, Math.min(255, b)) / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const diff = max - min;

  let h = 0;
  const s = max === 0 ? 0 : diff / max;
  const v = max;

  if (diff !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / diff) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / diff + 2;
    } else {
      h = (rNorm - gNorm) / diff + 4;
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
  }

  return { h, s, v };
}

export function hsvToRgb(h: number, s: number, v: number): RGB {
  const hClamped = ((h % 360) + 360) % 360;
  const sClamped = Math.max(0, Math.min(1, s));
  const vClamped = Math.max(0, Math.min(1, v));

  const c = vClamped * sClamped;
  const x = c * (1 - Math.abs(((hClamped / 60) % 2) - 1));
  const m = vClamped - c;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hClamped >= 0 && hClamped < 60) {
    rPrime = c;
    gPrime = x;
  } else if (hClamped >= 60 && hClamped < 120) {
    rPrime = x;
    gPrime = c;
  } else if (hClamped >= 120 && hClamped < 180) {
    gPrime = c;
    bPrime = x;
  } else if (hClamped >= 180 && hClamped < 240) {
    gPrime = x;
    bPrime = c;
  } else if (hClamped >= 240 && hClamped < 300) {
    rPrime = x;
    bPrime = c;
  } else {
    rPrime = c;
    bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const rgb = hsvToRgb(h, s, v);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export function hexToHsv(hex: string): HSV {
  const rgb = hexToRgb(hex);
  return rgbToHsv(rgb.r, rgb.g, rgb.b);
}
