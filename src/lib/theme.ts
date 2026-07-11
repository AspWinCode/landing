/** Generates CSS variable overrides from a single brand hex color. */

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, v));
}

export function generateThemeCss(brandHex: string): string {
  const rgb = hexToRgb(brandHex);
  if (!rgb) return "";

  const [h, s, l] = rgbToHsl(...rgb);
  const st = Math.min(s, 80); // capped saturation for tints

  const lHover  = clamp(l - 10, 15, 70);
  const lActive = clamp(l - 20, 10, 60);

  return `
:root,[data-theme="light"]{
  --color-brand:${brandHex};
  --color-brand-hover:${hslToHex(h, s, lHover)};
  --color-brand-active:${hslToHex(h, s, lActive)};
  --color-bg-subtle:${hslToHex(h, clamp(st * 0.8, 8, 50), 98)};
  --color-bg-muted:${hslToHex(h, clamp(st * 0.7, 6, 45), 94)};
  --color-surface-raised:${hslToHex(h, clamp(st * 0.8, 8, 50), 96)};
  --color-border:${hslToHex(h, clamp(st * 0.6, 6, 40), 91)};
  --color-border-strong:${hslToHex(h, clamp(st * 0.5, 5, 35), 78)};
  --color-text-primary:${hslToHex(h, clamp(st * 0.9, 25, 75), 11)};
  --color-text-secondary:${hslToHex(h, clamp(st * 0.6, 15, 55), 33)};
  --color-text-muted:${hslToHex(h, clamp(st * 0.3, 8, 35), 52)};
}
[data-theme="dark"]{
  --color-brand:${hslToHex(h, clamp(s * 0.9, 30, 80), clamp(l + 15, 50, 75))};
  --color-brand-hover:${hslToHex(h, clamp(s * 0.8, 25, 70), clamp(l + 25, 60, 85))};
  --color-brand-active:${hslToHex(h, clamp(s * 0.7, 20, 60), clamp(l + 35, 70, 92))};
  --color-bg:${hslToHex(h, clamp(st * 0.9, 25, 70), 6)};
  --color-bg-subtle:${hslToHex(h, clamp(st * 0.7, 18, 55), 9)};
  --color-bg-muted:${hslToHex(h, clamp(st * 0.6, 14, 45), 12)};
  --color-surface:${hslToHex(h, clamp(st * 0.8, 22, 60), 8)};
  --color-surface-raised:${hslToHex(h, clamp(st * 0.6, 18, 50), 11)};
  --color-border:${hslToHex(h, clamp(st * 0.5, 14, 40), 18)};
  --color-border-strong:${hslToHex(h, clamp(st * 0.5, 18, 45), 32)};
  --color-text-primary:${hslToHex(h, clamp(st * 0.5, 12, 40), 94)};
  --color-text-secondary:${hslToHex(h, clamp(st * 0.5, 16, 45), 77)};
  --color-text-muted:${hslToHex(h, clamp(st * 0.3, 8, 30), 55)};
  --color-text-inverse:${hslToHex(h, clamp(st * 0.9, 25, 75), 11)};
}`.trim();
}
