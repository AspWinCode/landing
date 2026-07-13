import { BookOpen, ChartLineUp, Headset, Users } from "@phosphor-icons/react/dist/ssr";
import { EditableSlot } from "@/components/edit/EditableSlot";

const ICONS = [BookOpen, ChartLineUp, Users, Headset];

const DEFAULT_HEADING = "Не курсы. Миры.";
const DEFAULT_SUBHEADING = "Четыре принципа, которые превращают обучение из обязанности в увлечение.";
const DEFAULT_ITEMS = [
  { title: "Нарратив", description: "Каждый трек — это история. Дети раскрывают дела, строят игровые студии и решают инженерные вызовы. Они не учатся — они живут в мире кода." },
  { title: "LMS-прогресс", description: "Ежемесячная характеристика прогресса в личном кабинете. Родитель видит, чему научился ребёнок — конкретно, а не «хорошо старается»." },
  { title: "Адаптация", description: "Программа подстраивается под темп каждого ученика. Пропустил занятие — отработаешь. Продвинулся быстро — получишь задачу сложнее." },
  { title: "Связь", description: "Ментор всегда на связи. Обратная связь после каждого занятия, ответы на вопросы между уроками — без бюрократии." },
];

interface AdvItem { title: string; description: string; }

interface AdvantagesSectionProps {
  heading?: string;
  subheading?: string;
  items?: AdvItem[];
}

export function AdvantagesSection({ heading, subheading, items }: AdvantagesSectionProps) {
  const displayItems = (items && items.length > 0 ? items : DEFAULT_ITEMS)
    .map((item, i) => ({ ...item, Icon: ICONS[i % ICONS.length] }));

  return (
    <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
            <EditableSlot slotId="advantages.heading" defaultValue={heading || DEFAULT_HEADING} />
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            <EditableSlot slotId="advantages.subheading" defaultValue={subheading || DEFAULT_SUBHEADING} />
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-violet-50)] flex items-center justify-center mb-4">
                <Icon size={24} weight="fill" className="text-[var(--color-brand)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
