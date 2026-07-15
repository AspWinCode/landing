import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { EditableSlot } from "@/components/edit/EditableSlot";
import { LayerZone } from "@/components/edit/LayerZone";
import { HeroRightSlot } from "@/components/edit/HeroRightSlot";

const CODE_LINES = [
  { indent: 0, content: "def solve_mystery(clues):", color: "text-[var(--color-track-kodeks)]" },
  { indent: 1, content: "suspects = []", color: "text-[var(--color-violet-300)]" },
  { indent: 1, content: "for clue in clues:", color: "text-[var(--color-track-kodeks)]" },
  { indent: 2, content: "if clue.matches():", color: "text-[var(--color-track-kodeks)]" },
  { indent: 3, content: "suspects.append(", color: "text-[var(--color-violet-300)]" },
  { indent: 4, content: "clue.suspect", color: "text-[var(--color-track-studio)]" },
  { indent: 3, content: ")", color: "text-[var(--color-violet-300)]" },
  { indent: 1, content: "return suspects[0]", color: "text-[var(--color-track-kodeks)]" },
];

interface HeroProps {
  badge?: string;
  h1?: string;
  h1Accent?: string;
  subtitle?: string;
  bullets?: string[];
  ctaPrimary?: string;
  ctaSecondary?: string;
  rightImageUrl?: string;
}

export function HeroSection({
  badge = "Набор открыт · Пробный урок бесплатно",
  h1 = "От хобби —",
  h1Accent = "к вершинам IT",
  subtitle = "Три мира программирования для детей 10–18 лет. Не курсы — путешествие: от первой игры до олимпиад и поступления в лучшие вузы.",
  bullets = ["Онлайн, в удобное время", "Менторы-практики из IT", "Результаты уже через 3 месяца"],
  ctaPrimary = "Оставить заявку",
  ctaSecondary = "Узнать о треках",
  rightImageUrl,
}: HeroProps = {}) {
  return (
    <LayerZone sectionId="hero">
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-[var(--color-violet-100)] opacity-30 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-[var(--color-violet-50)] opacity-60 blur-2xl" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-brand)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--color-track-studio)] animate-pulse" />
              <EditableSlot slotId="hero.badge" defaultValue={badge} />
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-6">
              <EditableSlot slotId="hero.h1" defaultValue={h1} /><br />
              <span className="text-[var(--color-brand)]">
                <EditableSlot slotId="hero.h1Accent" defaultValue={h1Accent} />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-lg">
              <EditableSlot slotId="hero.subtitle" defaultValue={subtitle} />
            </p>

            <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-10 text-sm text-[var(--color-text-muted)]">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle size={16} weight="fill" className="text-[var(--color-track-studio)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group")}>
                <EditableSlot slotId="hero.ctaPrimary" defaultValue={ctaPrimary} />
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/programmirovanie-dlya-detej" className={buttonClass("secondary", "lg")}>
                <EditableSlot slotId="hero.ctaSecondary" defaultValue={ctaSecondary} />
              </Link>
            </div>

            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
              Ответим в течение часа. Без спама.
            </p>
          </div>

          {/* Right: code mockup or custom image */}
          <div className="hidden lg:block" aria-hidden="true">
            <HeroRightSlot serverUrl={rightImageUrl} fallback={
              <div className="relative">
                {/* Floating badge: achievement */}
                <div className="absolute -top-4 -right-4 z-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl px-4 py-3 shadow-[var(--shadow-card-hover)]">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <div className="text-xs font-bold text-[var(--color-text-primary)]">2 БВИ в вузы</div>
                      <div className="text-[10px] text-[var(--color-text-muted)]">ученица TirSkix Academy</div>
                    </div>
                  </div>
                </div>

                {/* Code editor mockup */}
                <div className="bg-[#1A0A2E] rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(127,35,204,0.4)] border border-[var(--color-violet-900)]">
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#150821] border-b border-[var(--color-violet-950)]">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 text-center text-xs text-[var(--color-violet-400)] font-mono">
                      mystery_solver.py
                    </div>
                  </div>
                  <div className="p-5 font-mono text-sm leading-7">
                    {CODE_LINES.map((line, i) => (
                      <div key={i} className={`${line.color} whitespace-pre`}>
                        {"  ".repeat(line.indent)}{line.content}
                      </div>
                    ))}
                  </div>
                  <div className="mx-4 mb-4 rounded-xl bg-black/40 px-4 py-3 border border-[var(--color-violet-950)]">
                    <div className="text-[10px] text-[var(--color-violet-400)] mb-1 font-mono uppercase tracking-widest">Вывод</div>
                    <div className="text-[var(--color-track-studio)] font-mono text-sm">
                      &gt; Дело раскрыто: профессор Немо
                    </div>
                  </div>
                </div>

                {/* Floating badge: progress */}
                <div className="absolute -bottom-4 -left-4 z-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl px-4 py-3 shadow-[var(--shadow-card-hover)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-brand)] flex items-center justify-center text-white text-xs font-bold">А</div>
                    <div>
                      <div className="text-xs font-bold text-[var(--color-text-primary)]">Арина, 13 лет</div>
                      <div className="text-[10px] text-[var(--color-track-studio)]">✓ Дело #47 раскрыто</div>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </div>
        </div>
      </div>
    </section>
    </LayerZone>
  );
}
