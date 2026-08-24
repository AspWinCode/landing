"use client";

import { useEffect } from "react";
import { useTrialModal } from "./TrialModalContext";

const TRIAL_PATH = "/besplatnyj-probnyj-urok";

export function TrialClickInterceptor() {
  const { open } = useTrialModal();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.location.pathname === TRIAL_PATH) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.pathname !== TRIAL_PATH) return;

      e.preventDefault();
      open();
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [open]);

  return null;
}
