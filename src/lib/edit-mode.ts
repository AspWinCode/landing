export const PORTAL_ORIGIN = "https://portal.tirskix-academy.com";

export interface LayerDef {
  id: string;
  section: string;
  src: string;
  x: number;       // 0..1 relative to zone width
  y: number;       // 0..1 relative to zone height
  w: number;       // 0..1 relative to zone width
  opacity: number; // 0..1
  zIndex: number;
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
