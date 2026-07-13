import { EditableSlot } from "@/components/edit/EditableSlot";

const DEFAULT_HEADING = "Путь ученика";
const DEFAULT_SUBHEADING = "От первой строчки кода до поступления в лучшие IT-вузы страны — три последовательных мира.";

const STEP_STYLES = [
  { step: "01", color: "var(--color-track-studio)", colorLight: "var(--color-track-studio-light)" },
  { step: "02", color: "var(--color-track-kodeks)", colorLight: "var(--color-track-kodeks-light)" },
  { step: "03", color: "var(--color-track-technolab)", colorLight: "var(--color-track-technolab-light)" },
];

const DEFAULT_STEPS = [
  { track: "Игровая студия", age: "10–12 лет", description: "Первые шаги: создаём игры без синтаксиса. Логика, творчество, первая гордость от «моя игра работает»." },
  { track: "Кодэкс", age: "12–15 лет", description: "Python через детективные расследования. Алгоритмическое мышление, первые реальные программы, Data Science." },
  { track: "ТехноЛаб", age: "14–18 лет", description: "Глубокое программирование: алгоритмы, ООП, математика. Олимпиады, поступление в вузы, первые проекты в портфолио." },
];

interface StepItem { track?: string; age?: string; description?: string; }

interface PathSectionProps {
  heading?: string;
  subheading?: string;
  steps?: StepItem[];
}

export function PathSection({ heading, subheading, steps }: PathSectionProps) {
  const displaySteps = STEP_STYLES.map((style, i) => {
    const cms = steps?.[i];
    const def = DEFAULT_STEPS[i];
    return {
      ...style,
      track: cms?.track || def.track,
      age: cms?.age || def.age,
      description: cms?.description || def.description,
    };
  });

  return (
    <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
            <EditableSlot slotId="path.heading" defaultValue={heading || DEFAULT_HEADING} />
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            <EditableSlot slotId="path.subheading" defaultValue={subheading || DEFAULT_SUBHEADING} />
          </p>
        </div>

        {/* Desktop: horizontal track */}
        <div className="hidden md:flex items-start gap-0 relative">
          <div className="absolute top-10 left-[calc(33.33%-1px)] right-[calc(33.33%-1px)] h-0.5 bg-[var(--color-border)] z-0" />

          {displaySteps.map((step) => (
            <div key={step.step} className="flex-1 flex flex-col items-center text-center px-6 relative z-10">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-xl font-black border-4 border-[var(--color-bg-subtle)] shadow-md"
                style={{ background: step.color, color: "#fff" }}
              >
                {step.step}
              </div>

              <span
                className="text-xs font-semibold px-3 py-1 rounded-full mb-2"
                style={{ background: step.colorLight, color: step.color }}
              >
                {step.age}
              </span>

              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{step.track}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[220px]">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden flex flex-col gap-6 relative">
          <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

          {displaySteps.map((step) => (
            <div key={step.step} className="flex gap-4 relative">
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center shrink-0 text-lg font-black border-4 border-[var(--color-bg-subtle)] shadow z-10"
                style={{ background: step.color, color: "#fff" }}
              >
                {step.step}
              </div>

              <div className="pt-2">
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: step.colorLight, color: step.color }}
                >
                  {step.age}
                </span>
                <h3 className="text-base font-bold text-[var(--color-text-primary)] mt-1 mb-1">{step.track}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
