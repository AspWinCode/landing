import { BookOpen, ChartLineUp, Headset, Users } from "@phosphor-icons/react/dist/ssr";

const ADVANTAGES = [
  {
    icon: BookOpen,
    title: "Нарратив",
    description:
      "Каждый трек — это история. Дети раскрывают дела, строят игровые студии и решают инженерные вызовы. Они не учатся — они живут в мире кода.",
  },
  {
    icon: ChartLineUp,
    title: "LMS-прогресс",
    description:
      "Ежемесячная характеристика прогресса в личном кабинете. Родитель видит, чему научился ребёнок — конкретно, а не «хорошо старается».",
  },
  {
    icon: Users,
    title: "Адаптация",
    description:
      "Программа подстраивается под темп каждого ученика. Пропустил занятие — отработаешь. Продвинулся быстро — получишь задачу сложнее.",
  },
  {
    icon: Headset,
    title: "Связь",
    description:
      "Ментор всегда на связи. Обратная связь после каждого занятия, ответы на вопросы между уроками — без бюрократии.",
  },
];

export function AdvantagesSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
            Не курсы. Миры.
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Четыре принципа, которые превращают обучение из обязанности в увлечение.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-violet-50)] flex items-center justify-center mb-4">
                <Icon size={24} weight="fill" className="text-[var(--color-brand)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
