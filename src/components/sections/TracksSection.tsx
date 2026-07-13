import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { EditableSlot } from "@/components/edit/EditableSlot";
import { LayerZone } from "@/components/edit/LayerZone";

const DEFAULT_HEADING = "Выбери свой мир";
const DEFAULT_SUBHEADING = "Три трека — один путь. Ученики начинают в Игровой студии и растут до ТехноЛаба.";

const TRACK_STYLES = [
  {
    slug: "game-studio",
    href: "/game-studio",
    colorClass: "text-[var(--color-track-studio)]",
    bgClass: "bg-[var(--color-track-studio-light)]",
    barClass: "bg-[var(--color-track-studio)]",
    hoverClass: "hover:bg-[var(--color-track-studio-light)]",
    emoji: "🎮",
  },
  {
    slug: "kodeks",
    href: "/kodeks",
    colorClass: "text-[var(--color-track-kodeks)]",
    bgClass: "bg-[var(--color-track-kodeks-light)]",
    barClass: "bg-[var(--color-track-kodeks)]",
    hoverClass: "hover:bg-[var(--color-track-kodeks-light)]",
    emoji: "🔍",
  },
  {
    slug: "technolab",
    href: "/technolab",
    colorClass: "text-[var(--color-track-technolab)]",
    bgClass: "bg-[var(--color-track-technolab-light)]",
    barClass: "bg-[var(--color-track-technolab)]",
    hoverClass: "hover:bg-[var(--color-track-technolab-light)]",
    emoji: "⚙️",
  },
];

const DEFAULT_TRACKS = [
  {
    title: "Игровая студия",
    narrative: "Открой свою игровую студию",
    description: "Первый мир — для тех, кто только начинает. Создаём настоящие игры в Snap и GDevelop. Ни строчки синтаксиса — только логика и творчество.",
    age: "10–12 лет",
    tags: ["Snap", "GDevelop", "Визуальное программирование"],
  },
  {
    title: "Кодэкс",
    narrative: "Стань цифровым следователем",
    description: "Python через детективные дела. Каждое занятие — новое дело: собираем улики, пишем код, раскрываем тайну. Включает модуль Data Science: numpy, pandas.",
    age: "12–15 лет",
    tags: ["Python", "Data Science", "numpy/pandas"],
  },
  {
    title: "ТехноЛаб",
    narrative: "Инженерные вызовы для тех, кто хочет большего",
    description: "Python, алгоритмы, ООП, математика, Arcade. Уровень олимпиад и поступления в лучшие вузы. Для тех, кто уже умеет мыслить как программист.",
    age: "14–18 лет",
    tags: ["Python", "Алгоритмы", "ООП", "Arcade"],
  },
];

interface TrackItem {
  title?: string;
  narrative?: string;
  description?: string;
  age?: string;
  tags?: string[];
  href?: string;
}

interface TracksSectionProps {
  heading?: string;
  subheading?: string;
  tracks?: TrackItem[];
}

export function TracksSection({ heading, subheading, tracks }: TracksSectionProps) {
  const displayTracks = TRACK_STYLES.map((style, i) => {
    const cms = tracks?.[i];
    const def = DEFAULT_TRACKS[i];
    return {
      ...style,
      href: cms?.href || style.href,
      title: cms?.title || def.title,
      narrative: cms?.narrative || def.narrative,
      description: cms?.description || def.description,
      age: cms?.age || def.age,
      tags: (cms?.tags && cms.tags.length > 0) ? cms.tags : def.tags,
    };
  });

  return (
    <LayerZone sectionId="tracks">
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-4">
            <EditableSlot slotId="tracks.heading" defaultValue={heading || DEFAULT_HEADING} />
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            <EditableSlot slotId="tracks.subheading" defaultValue={subheading || DEFAULT_SUBHEADING} />
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayTracks.map((track) => (
            <article
              key={track.slug}
              className="group bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className={`h-1.5 w-full ${track.barClass}`} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${track.bgClass} ${track.colorClass}`}>
                    {track.age}
                  </span>
                  <span className="text-2xl" role="img" aria-hidden="true">{track.emoji}</span>
                </div>

                <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-1">
                  {track.title}
                </h3>
                <p className={`text-sm font-medium mb-3 ${track.colorClass}`}>
                  {track.narrative}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5 flex-1">
                  {track.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={track.href}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${track.colorClass} ${track.hoverClass}`}
                  style={{ borderColor: "currentColor" }}
                >
                  Узнать подробнее
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </LayerZone>
  );
}
