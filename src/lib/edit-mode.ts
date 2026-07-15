export const PORTAL_ORIGIN = "https://tirskix.space";

export type EntrancePreset =
  | "none"
  | "fade-up"
  | "fade-in"
  | "zoom-in"
  | "slide-left"
  | "slide-right";

export type HoverEffect = "none" | "scale" | "lift" | "glow";

export interface LayerDef {
  id: string;
  section: string;
  src: string;
  x: number;       // 0..1 relative to zone width
  y: number;       // 0..1 relative to zone height
  w: number;       // 0..1 relative to zone width
  opacity: number; // 0..1
  zIndex: number;
  hoverEffect?: HoverEffect;
}

export interface AnimationPreset {
  sectionId: string;
  entrance: EntrancePreset;
}

export type Breakpoint = "mobile" | "tablet" | "desktop";

export function getBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop";
}

export function deepMerge(
  base: Record<string, unknown>,
  overrides: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...base };
  for (const [k, v] of Object.entries(overrides)) {
    if (
      v !== null &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      result[k] !== null &&
      typeof result[k] === "object" &&
      !Array.isArray(result[k])
    ) {
      result[k] = deepMerge(result[k] as Record<string, unknown>, v as Record<string, unknown>);
    } else {
      result[k] = v;
    }
  }
  return result;
}

export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((cur, key) => {
    if (cur && typeof cur === "object" && !Array.isArray(cur)) {
      return (cur as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function patchNested(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  const keys = path.split(".");
  const result = { ...obj };
  let cur: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    cur[k] =
      cur[k] && typeof cur[k] === "object" && !Array.isArray(cur[k])
        ? { ...(cur[k] as Record<string, unknown>) }
        : {};
    cur = cur[k] as Record<string, unknown>;
  }
  cur[keys[keys.length - 1]] = value;
  return result;
}
