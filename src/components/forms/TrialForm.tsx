"use client";

import { useState, useRef } from "react";
import { ArrowRight, CheckCircle, Warning } from "@phosphor-icons/react";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const TRACKS = [
  { value: "", label: "Не знаю — помогите выбрать" },
  { value: "game-studio", label: "🎮 Игровая студия (10–12 лет)" },
  { value: "kodeks", label: "🔍 Кодэкс — Python (12–15 лет)" },
  { value: "technolab", label: "⚙️ ТехноЛаб — алгоритмы (14–18 лет)" },
  { value: "oge", label: "📗 Подготовка к ОГЭ" },
  { value: "ege", label: "📒 Подготовка к ЕГЭ" },
  { value: "individual", label: "👤 Индивидуальные занятия" },
];

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--color-text-primary)]">
        {label}
        {required && <span className="text-[var(--color-brand)] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <Warning size={12} weight="fill" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  cn(
    "w-full px-4 py-3 rounded-xl border text-[var(--color-text-primary)] bg-[var(--color-surface)] text-sm transition-colors placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-1",
    hasError
      ? "border-red-400 focus:ring-red-400"
      : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
  );

export function TrialForm() {
  const [fields, setFields] = useState({ name: "", contact: "", track: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const hpRef = useRef<HTMLInputElement>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((err) => ({ ...err, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim() || fields.name.trim().length < 2) e.name = "Введите имя (минимум 2 символа)";
    if (!fields.contact.trim() || fields.contact.trim().length < 5) e.contact = "Введите телефон или e-mail";
    if (!consent) e.consent = "Необходимо согласие на обработку персональных данных";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          _hp: hpRef.current?.value ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error || "Ошибка сервера"); setStatus("error"); return; }
      setStatus("success");
    } catch {
      setServerError("Не удалось отправить заявку. Попробуйте позже или напишите нам напрямую.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-8 gap-4">
        <div className="w-16 h-16 rounded-full bg-[var(--color-track-studio-light)] flex items-center justify-center">
          <CheckCircle size={36} weight="fill" className="text-[var(--color-track-studio)]" />
        </div>
        <h3 className="text-xl font-extrabold text-[var(--color-text-primary)]">Заявка отправлена!</h3>
        <p className="text-[var(--color-text-secondary)] max-w-xs">
          Мы свяжемся с вами в течение часа. Проверьте телефон или e-mail.
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">Без спама. Обещаем.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — скрыто от людей, видно ботам */}
      <input
        ref={hpRef}
        name="_hp"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute opacity-0 h-0 w-0 pointer-events-none"
      />

      <Field label="Ваше имя" required error={errors.name}>
        <input
          type="text"
          placeholder="Например: Елена"
          autoComplete="name"
          value={fields.name}
          onChange={set("name")}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Телефон или e-mail" required error={errors.contact}>
        <input
          type="text"
          placeholder="+7 900 000-00-00 или mail@example.com"
          autoComplete="tel"
          value={fields.contact}
          onChange={set("contact")}
          className={inputClass(!!errors.contact)}
        />
      </Field>

      <Field label="Какой трек интересует?" error={errors.track}>
        <select
          value={fields.track}
          onChange={set("track")}
          className={inputClass(!!errors.track)}
        >
          {TRACKS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </Field>

      <Field label="Комментарий (необязательно)" error={errors.message}>
        <textarea
          placeholder="Возраст ребёнка, опыт, вопросы..."
          rows={3}
          value={fields.message}
          onChange={set("message")}
          className={cn(inputClass(!!errors.message), "resize-none")}
        />
      </Field>

      {/* Consent */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => { setConsent(e.target.checked); if (errors.consent) setErrors((err) => ({ ...err, consent: "" })); }}
              className="sr-only"
            />
            <div className={cn(
              "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors",
              consent
                ? "bg-[var(--color-brand)] border-[var(--color-brand)]"
                : errors.consent
                  ? "border-red-400"
                  : "border-[var(--color-border)] group-hover:border-[var(--color-brand)]"
            )}>
              {consent && <CheckCircle size={14} weight="fill" className="text-white" />}
            </div>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            Согласен(а) на обработку персональных данных в соответствии с{" "}
            <a href="/legal/privacy" className="text-[var(--color-brand)] hover:underline" target="_blank">
              Политикой конфиденциальности
            </a>{" "}
            (152-ФЗ)
          </span>
        </label>
        {errors.consent && (
          <p className="flex items-center gap-1.5 text-xs text-red-500 ml-8">
            <Warning size={12} weight="fill" />
            {errors.consent}
          </p>
        )}
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
            Записаться на пробный урок
            <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </button>

      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Ответим в течение часа. Без спама.
      </p>
    </form>
  );
}
