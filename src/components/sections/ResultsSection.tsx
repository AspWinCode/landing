const REVIEW_COLORS = [
  "var(--color-track-studio)",
  "var(--color-track-kodeks)",
  "var(--color-track-technolab)",
  "var(--color-brand)",
];

interface StatItem { value: string; label: string; highlight?: boolean }
interface ReviewItem { name: string; role: string; text: string; initials: string }

interface ResultsProps {
  stats?: StatItem[];
  reviews?: ReviewItem[];
}

const DEFAULT_STATS: StatItem[] = [
  { value: "2 БВИ", label: "без вступительных испытаний в вузы", highlight: true },
  { value: "19/21", label: "ОГЭ с нуля за 6 месяцев", highlight: false },
  { value: "98", label: "баллов ЕГЭ — лучший результат", highlight: false },
  { value: "ICPC", label: "полуфинал международной олимпиады", highlight: true },
];

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    name: "Мария К.",
    role: "Мама Димы, 14 лет",
    text: "Сын в восторге от занятий. Раньше надо было уговаривать делать уроки, теперь сам напоминает, что скоро урок программирования. За 8 месяцев написал три игры!",
    initials: "МК",
  },
  {
    name: "Алексей П.",
    role: "Папа Кирилла, 16 лет",
    text: "Кирилл занимается третий год. Начал с нуля — сейчас готовится к олимпиадам. ЕГЭ по информатике написал на 93 балла. Очень доволен результатом.",
    initials: "АП",
  },
  {
    name: "Светлана В.",
    role: "Мама Ани, 17 лет",
    text: "Аня стала призёром Всероссийской олимпиады и получила БВИ в два вуза. Это не случайность — три года упорной работы с менторами TirSkix Academy.",
    initials: "СВ",
  },
];

export function ResultsSection({ stats = DEFAULT_STATS, reviews = DEFAULT_REVIEWS }: ResultsProps = {}) {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
            Результаты
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Не обещания — реальные достижения реальных учеников.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={[
                "rounded-2xl p-6 text-center border",
                stat.highlight
                  ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-white"
                  : "bg-[var(--color-surface)] border-[var(--color-border)]",
              ].join(" ")}
            >
              <div
                className={[
                  "text-3xl md:text-4xl font-extrabold mb-1",
                  stat.highlight ? "text-white" : "text-[var(--color-brand)]",
                ].join(" ")}
              >
                {stat.value}
              </div>
              <div
                className={[
                  "text-xs leading-snug",
                  stat.highlight ? "text-white/80" : "text-[var(--color-text-muted)]",
                ].join(" ")}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {reviews.map((review, i) => {
            const color = REVIEW_COLORS[i % REVIEW_COLORS.length];
            return (
              <figure
                key={i}
                className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] flex flex-col"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} className="text-yellow-400 text-base">★</span>
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-1">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: color }}
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {review.name}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {review.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
