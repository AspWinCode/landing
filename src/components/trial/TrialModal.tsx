"use client";

import { X } from "@phosphor-icons/react";
import { useTrialModal } from "./TrialModalContext";
import { TrialForm } from "@/components/forms/TrialForm";

export function TrialModal() {
  const { isOpen, close } = useTrialModal();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-heading"
    >
      <div
        className="relative w-full max-w-md bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] shadow-[var(--shadow-card-hover)] p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-brand)] transition-colors"
        >
          <X size={18} weight="bold" />
        </button>
        <h2 id="trial-modal-heading" className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1 pr-8">
          Записаться на пробный урок
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Заполните форму — ответим в течение часа
        </p>
        <TrialForm />
      </div>
    </div>
  );
}
