"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface TrialModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const TrialModalContext = createContext<TrialModalContextValue | null>(null);

export function TrialModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <TrialModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </TrialModalContext.Provider>
  );
}

export function useTrialModal() {
  const ctx = useContext(TrialModalContext);
  if (!ctx) throw new Error("useTrialModal must be used within TrialModalProvider");
  return ctx;
}
