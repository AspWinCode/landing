"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle, Warning } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const inputClass = (hasError: boolean) =>
  cn(
    "w-full px-4 py-3 rounded-xl border text-[var(--color-text-primary)] bg-[var(--color-surface)] text-sm transition-colors placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-1",
    hasError ? "border-red-400" : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
  );

export function ContactForm() {
  const [fields, setFields] = useState({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [hp, setHp] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((err) => ({ ...err, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!fields.name.trim() || fields.name.trim().length < 2) errs.name = "Введите имя";
    if (!fields.contact.trim() || fields.contact.trim().length < 5) errs.contact = "Введите телефон или e-mail";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, _hp: hp, track: "contact-form" }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error || "Ошибка"); setStatus("error"); return; }
      setStatus("success");
    } catch {
      setServerError("Не удалось отправить. Напишите нам в Telegram.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-6 gap-3">
        <div className="w-12 h-12 rounded-full bg-[var(--color-track-studio-light)] flex items-center justify-center">
          <CheckCircle size={28} weight="fill" className="text-[var(--color-track-studio)]" />
        </div>
        <h3 className="font-extrabold text-[var(--color-text-primary)]">Сообщение отправлено!</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">Ответим в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {/* Honeypot */}
      <input
        name="_hp"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="absolute opacity-0 h-0 w-0 pointer-events-none"
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          Имя <span className="text-[var(--color-brand)]">*</span>
        </label>
        <input
          type="text"
          placeholder="Ваше имя"
          autoComplete="name"
          value={fields.name}
          onChange={set("name")}
          className={inputClass(!!errors.name)}
        />
        {errors.name && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <Warning size={12} weight="fill" />{errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          Телефон или e-mail <span className="text-[var(--color-brand)]">*</span>
        </label>
        <input
          type="text"
          placeholder="+7 900 000-00-00 или mail@example.com"
          autoComplete="tel"
          value={fields.contact}
          onChange={set("contact")}
          className={inputClass(!!errors.contact)}
        />
        {errors.contact && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <Warning size={12} weight="fill" />{errors.contact}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          Вопрос или комментарий
        </label>
        <textarea
          placeholder="Опишите вашу ситуацию..."
          rows={4}
          value={fields.message}
          onChange={set("message")}
          className={cn(inputClass(false), "resize-none")}
        />
      </div>

      {serverError && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">
          <Warning size={16} weight="fill" className="shrink-0 mt-0.5" />
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={buttonClass("primary", "lg", "w-full group")}
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Отправляем...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Отправить
            <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </button>

      <p className="text-xs text-center text-[var(--color-text-muted)]">
        Нажимая «Отправить», вы соглашаетесь с{" "}
        <Link href="/legal/privacy" className="text-[var(--color-brand)] hover:underline">
          политикой конфиденциальности
        </Link>
      </p>
    </form>
  );
}
