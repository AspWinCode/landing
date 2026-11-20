import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const CORE_STEPS = [
  {
    title: "Новичок",
    age: "с 3 класса",
    href: "/game-studio",
    color: "var(--color-track-studio)",
    colorLight: "var(--color-track-studio-light)",
    directions: ["Snap! 3–4 класс", "GDevelop", "Roblox Studio ×2", "Turtle"],
  },
  {
    title: "Программист",
    age: "с 6 класса",
    href: "/programmist",
    color: "var(--color-track-kodeks)",
    colorLight: "var(--color-track-kodeks-light)",
    directions: ["Python-база", "Анализ данных"],
  },
  {
    title: "Эксперт",
    age: "7–8 класс",
    href: "/ekspert",
    color: "var(--color-track-technolab)",
    colorLight: "var(--color-track-technolab-light)",
    directions: ["Git, ООП", "Алгоритмы", "Arcade"],
  },
];

const BRANCHES = [
  {
    title: "Backend",
    desc: "Прикладная специализация с нуля: база и портфолио для старта.",
    href: "/backend-razrabotka",
  },
  {
    title: "Frontend",
    desc: "Прикладная специализация в веб-интерфейсах: база и портфолио для старта.",
    href: "/frontend-razrabotka",
  },
  {
    title: "ОГЭ / ЕГЭ",
    desc: "Целевая подготовка к экзамену по информатике с диагностикой и пробниками.",
    href: "/podgotovka-k-oge-po-informatike",
  },
  {
    title: "Олимпиады",
    desc: "Олимпиадное программирование с 5 класса — индивидуальный темп и цель.",
    href: "/napravleniya-razrabotki",
  },
];

export function GrowthMapSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
            Карта роста
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Три этапа — и у каждого своя развилка направлений. Подбираем старт по классу
            и способностям ребёнка, дальше усложняем постепенно, не теряя прогресс.
          </p>
        </div>

        {/* Основная траектория: 3 этапа */}
        <div className="flex flex-wrap items-stretch justify-center gap-3 mb-10">
          {CORE_STEPS.map((step, i) => (
            <div key={step.title} className="flex items-center gap-3">
              <Link
                href={step.href}
                className="flex flex-col items-center gap-2 rounded-2xl px-5 py-4 border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-[var(--shadow-card-hover)] transition-shadow min-w-[160px]"
              >
                <span
                  className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-full"
                  style={{ background: step.colorLight, color: step.color }}
                >
                  {step.title}
                  <span className="text-xs font-medium opacity-80">{step.age}</span>
                </span>
                <span className="text-xs text-[var(--color-text-muted)] text-center leading-snug">
                  {step.directions.join(" · ")}
                </span>
              </Link>
              {i < CORE_STEPS.length - 1 && (
                <ArrowRight size={18} weight="bold" className="text-[var(--color-text-muted)] shrink-0" />
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[var(--color-text-muted)] mb-10 max-w-lg mx-auto">
          На каждой развилке — выбор специализации или целевой подготовки без потери накопленного прогресса:
        </p>

        {/* Развилки */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {BRANCHES.map((branch) => (
            <Link
              key={branch.title}
              href={branch.href}
              className="group bg-[var(--color-surface)] rounded-2xl p-5 border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow flex flex-col"
            >
              <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2">{branch.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 flex-1">{branch.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand)]">
                Подробнее
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
