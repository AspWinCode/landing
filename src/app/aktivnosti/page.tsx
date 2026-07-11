import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, GameController, Trophy, Users, Calendar } from "@phosphor-icons/react/dist/ssr";
import { getCmsPage } from "@/lib/portal";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("aktivnosti") as unknown as Record<string, unknown>;
  return buildPageMetadata(cms, {
    title: "Мероприятия и активности — TirSkix Academy",
    description:
      "Игровые джемы, олимпиады, хакатоны и онлайн-соревнования для детей от TirSkix Academy. Участвуй, побеждай, создавай.",
    canonical: "https://tirskix-academy.com/aktivnosti/",
  });
}

const FORMATS = [
  {
    icon: GameController,
    title: "Игровые джемы",
    desc: "48-часовые соревнования: тема → игра за выходные. Дети делают игры в командах и соревнуются за призы.",
    href: "/igrovye-dzhemy",
    color: "var(--color-track-studio)",
    badge: "Ближайший: скоро",
  },
  {
    icon: Trophy,
    title: "Олимпиады по программированию",
    desc: "Внутренние соревнования по алгоритмам — подготовка к ВСОШ, Codeforces и региональным этапам.",
    href: "/aktivnosti",
    color: "var(--color-track-technolab)",
    badge: "Ежемесячно",
  },
  {
    icon: Users,
    title: "КодАрена",
    desc: "Еженедельные командные задачи внутри академии. Ученики решают задачи в парах и небольших группах.",
    href: "/aktivnosti",
    color: "var(--color-track-kodeks)",
    badge: "Каждую неделю",
  },
  {
    icon: Calendar,
    title: "Открытые уроки",
    desc: "Раз в месяц — публичный урок на интересную тему. Для учеников, их друзей и всех желающих.",
    href: "/aktivnosti",
    color: "var(--color-brand)",
    badge: "Раз в месяц",
  },
];

const JAMS_PAST = [
  {
    title: "Jam #5 «Время»",
    location: "Онлайн",
    participants: 24,
    games: 8,
    winner: "«Clockwork Run» — платформер с обратным временем",
  },
  {
    title: "Jam #4 «Под водой»",
    location: "Онлайн",
    participants: 18,
    games: 6,
    winner: "«DeepScan» — детективная аркада на дне океана",
  },
  {
    title: "Jam #3 «Один пиксель»",
    location: "Екатеринбург + Онлайн",
    participants: 30,
    games: 11,
    winner: "«Dot Heroes» — стратегия из одного пикселя",
  },
];

export default async function ActivitiesPage() {
  const cms = await getCmsPage('aktivnosti');
  const formats = Array.isArray(cms.formats) && cms.formats.length > 0 ? cms.formats as typeof FORMATS : FORMATS;
  const jamsPast = Array.isArray(cms.jams_past) && cms.jams_past.length > 0 ? cms.jams_past as typeof JAMS_PAST : JAMS_PAST;
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--color-track-studio-light)] opacity-30 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Мероприятия</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Мероприятия<br />
              <span style={{ color: "var(--color-track-studio)" }}>и активности</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Джемы, олимпиады, командные задачи и открытые уроки.
              Учёба — это хорошо, но соревнования делают её незабываемой.
            </p>
          </div>
        </section>

        {/* Форматы */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-5xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
              Форматы активностей
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {formats.map(({ icon: Icon, title, desc, color, badge }) => (
                <div key={title} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}>
                      <Icon size={22} weight="fill" style={{ color }} />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]">
                      {badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[var(--color-text-primary)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Игровые джемы подробнее */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-2">
                  Игровые джемы
                </h2>
                <p className="text-[var(--color-text-secondary)] max-w-xl">
                  Наш флагманский формат. 48 часов, одна тема — и дети делают игру с нуля.
                  Без готовых шаблонов. Командой или соло.
                </p>
              </div>
              <Link href="/igrovye-dzhemy" className={buttonClass("outline", "sm")}>
                Подробнее о джемах →
              </Link>
            </div>

            <h3 className="text-lg font-extrabold text-[var(--color-text-primary)] mb-5">Прошедшие джемы</h3>
            <div className="space-y-4">
              {jamsPast.map((jam) => (
                <div key={jam.title} className="bg-[var(--color-surface)] rounded-2xl p-5 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-extrabold text-[var(--color-text-primary)]">{jam.title}</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">{jam.location}</p>
                    </div>
                    <div className="flex gap-4 text-center">
                      <div>
                        <div className="text-lg font-extrabold" style={{ color: "var(--color-track-studio)" }}>{jam.participants}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">участников</div>
                      </div>
                      <div>
                        <div className="text-lg font-extrabold" style={{ color: "var(--color-brand)" }}>{jam.games}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">игр</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-subtle)] rounded-lg px-3 py-2">
                    🏆 Победитель: <span className="font-medium text-[var(--color-text-secondary)]">{jam.winner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Хотите участвовать?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Мероприятия открыты для учеников TirSkix Academy.
              Запишитесь на пробный урок — и присоединяйтесь к следующему джему.
            </p>
            <Link href="/besplatnyj-probnyj-urok" className={buttonClass("primary", "lg", "group inline-flex")}>
              Записаться на пробный урок
              <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
