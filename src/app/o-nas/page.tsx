import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: { absolute: "О нас — TirSkix Academy" },
  description:
    "TirSkix Academy — онлайн-школа программирования для детей 10–18 лет. Миссия, ценности, команда менторов-практиков. Работаем с 2020 года.",
  alternates: { canonical: "https://tirskix-academy.com/o-nas/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "TirSkix Academy",
  url: "https://tirskix-academy.com",
  foundingDate: "2020",
  description: "Онлайн-школа программирования для детей и подростков 10–18 лет",
  address: { "@type": "PostalAddress", addressCountry: "RU" },
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", availableLanguage: "Russian" },
};

const TEAM = [
  {
    name: "Кирилл Тирских",
    role: "Основатель и директор",
    initials: "КТ",
    color: "var(--color-brand)",
    bio: "Разработчик с 10-летним опытом. Создал академию, чтобы дети учились программированию через истории и вызовы — а не через скучные учебники.",
    specialization: "Python, алгоритмы, архитектура",
  },
  {
    name: "Анна М.",
    role: "Ментор · Игровая студия",
    initials: "АМ",
    color: "var(--color-track-studio)",
    bio: "Геймдизайнер и разработчик игр. Ведёт Игровую студию — помогает детям создавать первые игры с горящими глазами.",
    specialization: "GDevelop, Snap!, игровой дизайн",
  },
  {
    name: "Дмитрий К.",
    role: "Ментор · Кодэкс и ТехноЛаб",
    initials: "ДК",
    color: "var(--color-track-kodeks)",
    bio: "Backend-разработчик, Data Scientist. Придумал детективный нарратив Кодэкса — теперь ученики раскрывают дела вместо скучного заучивания синтаксиса.",
    specialization: "Python, Data Science, numpy/pandas",
  },
  {
    name: "Светлана Р.",
    role: "Ментор · ТехноЛаб",
    initials: "СР",
    color: "var(--color-track-technolab)",
    bio: "Олимпиадный программист, призёр ICPC. Готовит учеников к соревнованиям и поступлению в топ-вузы. Объясняет алгоритмы так, что даже сложное становится очевидным.",
    specialization: "Алгоритмы, ООП, математика",
  },
];

const VALUES = [
  {
    emoji: "🔍",
    title: "Любопытство",
    desc: "Мы культивируем вопрос «А что будет, если...». Лучший код рождается из интереса, а не из требования сдать задание.",
  },
  {
    emoji: "💪",
    title: "Упорство",
    desc: "Баги — это нормально. Не сдаться, когда что-то не работает, — это навык. Мы учим доводить до конца.",
  },
  {
    emoji: "🎨",
    title: "Творчество",
    desc: "Программирование — это ремесло и искусство одновременно. Мы поощряем нестандартные решения и собственные проекты.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--color-violet-100)] opacity-30 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">О нас</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Мы учим детей<br />
              <span className="text-[var(--color-brand)]">думать как разработчики</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              TirSkix Academy — онлайн-школа программирования для детей и подростков 10–18 лет.
              С 2020 года помогаем ребятам найти свой путь в IT — через нарратив, реальные задачи и живых менторов.
            </p>
          </div>
        </section>

        {/* ── Как начинали ── */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-6">Как мы начинали</h2>
            <div className="prose-like space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                В 2020 году Кирилл Тирских провёл первый урок программирования для детей соседей —
                просто потому что увидел, как скучно им было на стандартных курсах. Дети засыпали над учебниками,
                копировали примеры из интернета и не понимали, зачем это нужно.
              </p>
              <p>
                Он попробовал иначе: дал ребятам задачу — написать детективную программу, которая ищет подозреваемого
                по уликам. Через час они не хотели уходить. Так родился нарратив Кодэкса.
              </p>
              <p>
                Сегодня в TirSkix Academy три трека, команда менторов-практиков из IT и сотни учеников,
                которые пишут игры, раскрывают детективные дела и побеждают на олимпиадах.
              </p>
            </div>
          </div>
        </section>

        {/* ── Ценности ── */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-10 text-center">
              Три ценности академии
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)] shadow-[var(--shadow-card)] text-center">
                  <div className="text-4xl mb-4">{v.emoji}</div>
                  <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] mb-3">{v.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Команда (E-E-A-T) ── */}
        <section className="py-16 md:py-24 bg-[var(--color-bg-subtle)]">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
                Команда
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                Менторы-практики — не просто преподаватели. Каждый из них активный разработчик,
                который работает в IT прямо сейчас.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] shadow-[var(--shadow-card)] flex flex-col">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 shrink-0"
                    style={{ background: member.color }}
                    itemProp="image"
                    aria-label={member.name}
                  >
                    {member.initials}
                  </div>
                  <div itemScope itemType="https://schema.org/Person">
                    <h3 className="font-extrabold text-[var(--color-text-primary)] mb-0.5" itemProp="name">{member.name}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: member.color }} itemProp="jobTitle">{member.role}</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3" itemProp="description">{member.bio}</p>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium bg-[var(--color-bg-subtle)] rounded-lg px-3 py-1.5" itemProp="knowsAbout">
                      {member.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Тизер статистики ── */}
        <section className="py-16 md:py-20">
          <div className="container max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Результаты говорят сами
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Несколько фактов — полная история на странице достижений.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { v: "4 года", l: "средний срок обучения" },
                { v: "2 БВИ", l: "без вступительных в вузы" },
                { v: "98 б.", l: "ЕГЭ по информатике" },
                { v: "ICPC", l: "полуфинал олимпиады" },
              ].map((s) => (
                <div key={s.v} className="bg-[var(--color-bg-subtle)] rounded-2xl p-5 border border-[var(--color-border)]">
                  <div className="text-2xl font-extrabold text-[var(--color-brand)] mb-1">{s.v}</div>
                  <div className="text-xs text-[var(--color-text-muted)] leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
            <Link href="/dostizheniya-uchenikov" className={buttonClass("outline", "md")}>
              Все достижения учеников →
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-[var(--color-bg-subtle)]">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Хотите познакомиться ближе?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Запишитесь на пробный урок — ребёнок познакомится с ментором и форматом. Бесплатно.
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
