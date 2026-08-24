declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
    __YM_ID__?: string;
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  if (window.ym && window.__YM_ID__) {
    window.ym(window.__YM_ID__, "reachGoal", name, params);
  }
}
