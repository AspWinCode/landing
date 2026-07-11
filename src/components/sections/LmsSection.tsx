import Link from "next/link";
import { ArrowRight, ChartBar, Medal, BookBookmark, ChatTeardropText } from "@phosphor-icons/react/dist/ssr";

const FEATURE_ICONS = [ChartBar, Medal, BookBookmark, ChatTeardropText];

const DEFAULT_HEADING = "Ежемесячная характеристика прогресса";
const DEFAULT_DESCRIPTION = "Каждый месяц родитель получает подробный отчёт: что изучил, что вызвало трудности, что получается лучше всего. Не «занимался хорошо» — а «написал первый класс на Python, освоил рекурсию».";
const DEFAULT_FEATURES = [
  "График прогресса по темам",
  "Достижения и бейджи",
  "Домашние задания и проекты",
  "Обратная связь от ментора",
];
const DEFAULT_CTA_TEXT = "Войти в личный кабинет";
const DEFAULT_CTA_HREF = "https://lms.tirskix-academy.com";

interface LmsSectionProps {
  heading?: string;
  description?: string;
  features?: string[];
  cta_text?: string;
  cta_href?: string;
}

export function LmsSection({ heading, description, features, cta_text, cta_href }: LmsSectionProps) {
  const displayFeatures = (features && features.length > 0 ? features : DEFAULT_FEATURES)
    .map((label, i) => ({ label, Icon: FEATURE_ICONS[i % FEATURE_ICONS.length] }));

  return (
    <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-violet-100)] text-[var(--color-brand)] text-xs font-semibold mb-6">
              Личный кабинет · LMS
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
              {heading || DEFAULT_HEADING}
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
              {description || DEFAULT_DESCRIPTION}
            </p>

            <ul className="space-y-3 mb-8">
              {displayFeatures.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-violet-50)] flex items-center justify-center shrink-0">
                    <Icon size={16} weight="fill" className="text-[var(--color-brand)]" />
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
                </li>
              ))}
            </ul>

            <Link
              href={cta_href || DEFAULT_CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-brand)] font-semibold text-sm hover:gap-3 transition-all"
            >
              {cta_text || DEFAULT_CTA_TEXT}
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>

          {/* LMS Mockup */}
          <div className="relative">
            <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card-hover)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-[var(--color-bg-subtle)] rounded-md h-5 mx-4" />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-brand)] flex items-center justify-center text-white font-bold text-sm">
                    К
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-text-primary)]">Кирилл, 15 лет</div>
                    <div className="text-xs text-[var(--color-text-muted)]">Трек: ТехноЛаб · Месяц 18</div>
                  </div>
                </div>

                {[
                  { label: "Алгоритмы", pct: 82 },
                  { label: "ООП", pct: 71 },
                  { label: "Математика", pct: 90 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
                      <span>{label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--color-bg-muted)]">
                      <div className="h-2 rounded-full bg-[var(--color-brand)]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}

                <div className="mt-4 p-3 rounded-xl bg-[var(--color-violet-50)] text-xs text-[var(--color-brand)] font-medium">
                  🏆 Новое достижение: «Мастер рекурсии»
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
