import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const CORE_STEPS = [
  { title: "Игровая студия", age: "10–12 лет", color: "var(--color-track-studio)", colorLight: "var(--color-track-studio-light)" },
  { title: "Программист", age: "12–15 лет", color: "var(--color-track-kodeks)", colorLight: "var(--color-track-kodeks-light)" },
  { title: "Эксперт", age: "14–18 лет", color: "var(--color-track-technolab)", colorLight: "var(--color-track-technolab-light)" },
];

const BRANCHES = [
  {
    title: "Backend",
    desc: "Прикладная специализация для тех, кто выбрал серверную разработку.",
    href: "/backend-razrabotka",
  },
  {
    title: "Frontend",
    desc: "Прикладная специализация в веб-интерфейсах и современном стеке.",
    href: "/frontend-razrabotka",
  },
  {
    title: "ОГЭ / ЕГЭ",
    desc: "Целевая подготовка к экзамену по информатике с диагностикой и пробниками.",
    href: "/podgotovka-k-oge-po-informatike",
  },
  {
    title: "Индивидуально",
    desc: "Персональный темп под конкретную цель — пробел, ускорение или олимпиаду.",
    href: "/individualnye-zanyatiya",
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
            Базовая траектория — три ступени. На каждой развилке можно выбрать специализацию
            или целевую подготовку, не теряя накопленный прогресс.
          </p>
        </div>

        {/* Основная траектория */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {CORE_STEPS.map((step, i) => (
            <div key={step.title} className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full"
                style={{ background: step.colorLight, color: step.color }}
              >
                {step.title}
                <span className="text-xs font-medium opacity-80">{step.age}</span>
              </span>
              {i < CORE_STEPS.length - 1 && (
                <ArrowRight size={18} weight="bold" className="text-[var(--color-text-muted)]" />
              )}
            </div>
          ))}
        </div>

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
