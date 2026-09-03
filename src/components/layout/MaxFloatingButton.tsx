"use client";

import { ChatCircleDots } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/analytics";

const MAX_URL = "https://max.ru/214190953";

export function MaxFloatingButton() {
  return (
    <a
      href={MAX_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("max_click", { location: "floating_button" })}
      aria-label="Написать в мессенджере MAX"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full bg-[var(--color-brand)] text-white shadow-[var(--shadow-cta)] hover:bg-[var(--color-brand-hover)] active:bg-[var(--color-brand-active)] transition-all duration-200"
    >
      <ChatCircleDots size={22} weight="fill" />
      <span className="text-sm font-semibold hidden sm:inline">Написать в MAX</span>
    </a>
  );
}
