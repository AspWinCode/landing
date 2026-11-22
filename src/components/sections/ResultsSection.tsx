const REVIEW_COLORS = [
  "var(--color-track-studio)",
  "var(--color-track-kodeks)",
  "var(--color-track-technolab)",
  "var(--color-brand)",
];

interface StatItem { value: string; label: string; highlight?: boolean }
interface ReviewItem { name: string; role: string; text: string; initials: string; source?: string }

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
    name: "Ольга Ш.",
    role: "Мама ученика",
    text: "Хочу поблагодарить Академию WinCode Кирилла и его команду тренеров. Ответственный подход и квалифицированные специалисты. Сын занимался несколько месяцев и сдал ЕГЭ на 93 балла — благодаря умному подходу к каждому ребёнку. Буду рекомендовать всем!",
    initials: "ОШ",
  },
  {
    name: "Олег К.",
    role: "Папа ученицы",
    text: "Дочь занимается здесь уже несколько лет, и результат превзошёл все ожидания: в этом году она получила сразу 2 БВИ в вузы — стала призёром одной Всероссийской олимпиады и победителем другой. Отдельно отмечу гибкий подход: когда ребёнок вырастает из группового формата, предлагают перейти на индивидуальные занятия.",
    initials: "ОК",
  },
  {
    name: "Людмила К.",
    role: "Мама ученика",
    text: "Хочу выразить огромную благодарность лично руководителю школы за качественную подготовку сына по информатике. За короткий срок, доступно, профессионально, с постоянной обратной связью. Результат — уверенная пятёрка по ОГЭ и первое место за проект среди десятых классов лицея.",
    initials: "ЛК",
  },
  {
    name: "Т. Р.",
    role: "Мама ученика",
    text: "Занимаемся с ноября 2024 года, до этого обучались в других школах. И эта — лучшая! Жаль, раньше о ней не узнала. Предоставляют план обучения и отчёт о достижениях.",
    initials: "ТР",
  },
  {
    name: "Миля Ф.",
    role: "Выпускница · Backend → Frontend",
    text: "Занималась полтора года: сначала в группе по Backend, потом перешла на Frontend. Все преподаватели очень отзывчивые — если что-то не понимала, объясняли и понятно разбирали материал.",
    initials: "МФ",
  },
  {
    name: "Татьяна Е.",
    role: "Мама ученика",
    text: "Ребёнок в восторге от занятий, ждёт каждое с нетерпением. Виден реальный прогресс в программировании и логике. Педагоги внимательные, материал — понятный.",
    initials: "ТЕ",
  },
  {
    name: "Алёна В.",
    role: "Мама ученика",
    text: "У сына загорелись глаза с первого дня, и каждое занятие он ждёт с удовольствием. Огромная благодарность за профессионализм, индивидуальный подход и удобное расписание.",
    initials: "АВ",
    source: "ВКонтакте",
  },
  {
    name: "Наталия П.",
    role: "Мама ученика",
    text: "Учителя внимательные, хорошо и доходчиво объясняют. Каждый ребёнок работает в своём удобном ритме. После 6 месяцев занятий ребёнок начал успешно участвовать в олимпиадах по информатике.",
    initials: "НП",
    source: "ВКонтакте",
  },
];

const REVIEWS_SOURCE_URL = "https://2gis.ru/irkutsk/firm/70000001081829055/tab/reviews";
const VK_REVIEWS_SOURCE_URL = "https://vk.ru/reviews-223501247";

function ReviewCard({ review, color }: { review: ReviewItem; color: string }) {
  return (
    <figure className="w-[320px] shrink-0 bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] flex flex-col">
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
            {review.source ? ` · ${review.source}` : ""}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

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
        <div className="text-center mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a
            href={REVIEWS_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors"
          >
            <span className="text-yellow-400">★</span>
            <span>5,0 · 39 оценок на 2ГИС</span>
          </a>
          <a
            href={VK_REVIEWS_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors"
          >
            <span className="text-yellow-400">★</span>
            <span>5,0 · 2 отзыва во ВКонтакте</span>
          </a>
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
          <div className="flex w-max gap-6 animate-[reviews-marquee_70s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
            <div className="flex gap-6 shrink-0">
              {reviews.map((review, i) => (
                <ReviewCard key={`a-${i}`} review={review} color={REVIEW_COLORS[i % REVIEW_COLORS.length]} />
              ))}
            </div>
            <div className="flex gap-6 shrink-0 motion-reduce:hidden" aria-hidden="true">
              {reviews.map((review, i) => (
                <ReviewCard key={`b-${i}`} review={review} color={REVIEW_COLORS[i % REVIEW_COLORS.length]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
