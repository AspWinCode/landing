import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import type { TrackData } from "@/lib/tracks";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";

interface Props {
  track: TrackData;
}

export function TrackPage({ track }: Props) {
  const accentStyle = { color: track.color };
  const accentBgStyle = { background: track.colorLight };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
            style={{ background: track.color }}
          />
        </div>

        <div className="container relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
            <span>/</span>
            <span style={accentStyle} className="font-medium">{track.title}</span>
          </nav>

          <div className="max-w-3xl">
            {/* Age / format badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[track.age, track.format, track.start].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: track.colorLight, color: track.color }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              {track.narrativeH1}
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl">
              {track.subtitle}
            </p>

            {/* Tools */}
            <div className="flex flex-wrap gap-2 mb-10">
              {track.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group")}>
                Записаться на пробный урок
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/programmirovanie-dlya-detej" className={buttonClass("secondary", "lg")}>
                Все направления
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Как устроено ── */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
              Как устроено обучение
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-lg mx-auto">
              Программа разбита на модули — каждый строится на предыдущем.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {track.howItWorks.map((item, i) => (
              <div
                key={i}
                className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)]"
              >
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-3"
                  style={accentStyle}
                >
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Чему научится ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
                Чему научится ребёнок
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8">
                После прохождения трека ученик умеет не «немного разбирается», а реально делает.
              </p>
              <ul className="space-y-3">
                {track.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="shrink-0 mt-0.5"
                      style={accentStyle}
                    />
                    <span className="text-[var(--color-text-secondary)]">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual: skill card */}
            <div
              className="rounded-3xl p-8 md:p-10"
              style={accentBgStyle}
            >
              <div className="text-5xl mb-4">{track.emoji}</div>
              <div
                className="text-2xl font-extrabold mb-2"
                style={accentStyle}
              >
                {track.title}
              </div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-6">
                {track.age} · {track.skills.length} навыков
              </div>
              <div className="flex flex-wrap gap-2">
                {track.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm"
                    style={accentStyle}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Для кого ── */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
            Для кого этот трек
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* YES */}
            <div className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]">
              <div
                className="text-sm font-bold uppercase tracking-wide mb-4"
                style={accentStyle}
              >
                ✓ Подойдёт, если
              </div>
              <ul className="space-y-3">
                {track.forWhom.yes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} weight="fill" className="shrink-0 mt-0.5" style={accentStyle} />
                    <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* NO */}
            <div className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]">
              <div className="text-sm font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-4">
                ✗ Не подойдёт, если
              </div>
              <ul className="space-y-3">
                {track.forWhom.no.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle size={18} weight="fill" className="shrink-0 mt-0.5 text-[var(--color-text-muted)]" />
                    <span className="text-sm text-[var(--color-text-muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Отзыв ── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-2xl">
          <figure className="bg-[var(--color-surface)] rounded-3xl p-8 md:p-10 border border-[var(--color-border)] shadow-[var(--shadow-card-hover)] text-center">
            <div className="flex justify-center gap-0.5 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <blockquote className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 italic">
              &ldquo;{track.review.text}&rdquo;
            </blockquote>
            <figcaption className="flex items-center justify-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: track.color }}
              >
                {track.review.initials}
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--color-text-primary)]">{track.review.name}</div>
                <div className="text-sm text-[var(--color-text-muted)]">{track.review.role}</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
            Частые вопросы
          </h2>

          <div className="space-y-3">
            {track.faq.map((item, i) => (
              <details
                key={i}
                className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] transition-colors">
                  {item.q}
                  <CaretDown
                    size={18}
                    weight="bold"
                    className="shrink-0 text-[var(--color-text-muted)] transition-transform group-open:rotate-180"
                    style={{ color: track.color }}
                  />
                </summary>
                <div className="px-6 pb-5 text-[var(--color-text-secondary)] leading-relaxed text-sm border-t border-[var(--color-border)] pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            style={{ background: track.colorLight, color: track.color }}
          >
            {track.emoji} {track.title} · {track.age}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
            Готов попробовать?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Первый урок бесплатно. Без обязательств — просто посмотри, как это работает.
          </p>
          <Link
            href="/besplatnyj-probnyj-urok"
            className={buttonClass("primary", "lg", "group inline-flex")}
          >
            Записаться на пробный урок
            <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-4 text-xs text-[var(--color-text-muted)]">Ответим в течение часа. Без спама.</p>
        </div>
      </section>
    </>
  );
}
