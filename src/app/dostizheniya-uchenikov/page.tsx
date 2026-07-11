import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, Trophy, Medal, Star, GraduationCap } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: { absolute: "Достижения учеников — TirSkix Academy" },
  description:
    "Реальные результаты учеников TirSkix Academy: поступление в вузы без экзаменов, ОГЭ 19/21, ЕГЭ 98 баллов, победы на олимпиадах.",
  alternates: { canonical: "https://tirskix-academy.com/dostizheniya-uchenikov/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Достижения учеников TirSkix Academy",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "2 поступления без вступительных (БВИ)" },
    { "@type": "ListItem", position: 2, name: "ОГЭ по информатике 19/21 баллов" },
    { "@type": "ListItem", position: 3, name: "ЕГЭ по информатике 98 баллов" },
    { "@type": "ListItem", position: 4, name: "Полуфинал ICPC" },
  ],
};

const STATS = [
  { icon: Trophy, value: "2 БВИ", label: "поступления без вступительных", color: "var(--color-track-kodeks)" },
  { icon: Star, value: "98 б.", label: "ЕГЭ по информатике", color: "var(--color-brand)" },
  { icon: Medal, value: "19/21", label: "ОГЭ с нуля за 6 месяцев", color: "var(--color-track-studio)" },
  { icon: GraduationCap, value: "ICPC", label: "полуфинал олимпиады", color: "var(--color-track-technolab)" },
];

const STORIES = [
  {
    name: "Арина К.",
    age: "15 лет",
    track: "Кодэкс",
    trackColor: "var(--color-track-kodeks)",
    period: "6 месяцев",
    achievement: "ОГЭ по информатике — 19/21",
    tag: "ОГЭ",
    quote:
      "Я вообще не умела программировать. После Кодэкса мы начали разбирать задания ОГЭ — оказалось, это совсем не страшно. Написала всю вторую часть на Python и получила 19.",
    detail: "Пришла без опыта. За 3 месяца освоила Python через нарратив Кодэкса, ещё 3 месяца целенаправленно готовилась к ОГЭ. Результат — 19/21, одна из лучших в регионе.",
  },
  {
    name: "Максим Т.",
    age: "17 лет",
    track: "ТехноЛаб",
    trackColor: "var(--color-track-technolab)",
    period: "1,5 года",
    achievement: "2 БВИ — МФТИ и ВШЭ",
    tag: "БВИ",
    quote:
      "Думал, что программирование — это скучно. ТехноЛаб изменил взгляд. Алгоритмы стали интересными задачами, а не формулами из учебника. Оба БВИ — результат олимпиад.",
    detail: "Прошёл полный ТехноЛаб за полтора года. Победил на двух региональных олимпиадах по информатике, что дало право поступить в МФТИ и ВШЭ без вступительных экзаменов.",
  },
  {
    name: "Никита Р.",
    age: "17 лет",
    track: "ТехноЛаб",
    trackColor: "var(--color-track-technolab)",
    period: "2 года",
    achievement: "ЕГЭ — 98 баллов",
    tag: "ЕГЭ",
    quote:
      "Задание 27 по ЕГЭ — самое страшное для большинства. Для меня после ТехноЛаба это была обычная задача. Написал за час, проверил — всё ок.",
    detail: "Пришёл в ТехноЛаб с базовым Python. Два года занятий — алгоритмы, динамическое программирование, ООП. На ЕГЭ взял полный балл за программирование.",
  },
  {
    name: "Даша В.",
    age: "10 лет",
    track: "Игровая студия",
    trackColor: "var(--color-track-studio)",
    period: "8 месяцев",
    achievement: "Первая игра опубликована на itch.io",
    tag: "Проект",
    quote:
      "Я всегда хотела сделать свою игру. Теперь она есть — называется «Побег из замка». Сделала её сама, только ментор иногда помогал с ошибками.",
    detail: "В 10 лет Даша создала полноценную платформер-игру в GDevelop. Опубликована на itch.io, набрала 200+ скачиваний за первый месяц.",
  },
  {
    name: "Иван П.",
    age: "16 лет",
    track: "Кодэкс → ТехноЛаб",
    trackColor: "var(--color-brand)",
    period: "3 года",
    achievement: "Полуфинал ICPC (студенческая команда)",
    tag: "Олимпиада",
    quote:
      "Начал с Кодэкса в 13. К 16 уже участвовал в ICPC — это студенческая олимпиада, я попал туда раньше времени. Без TirSkix такого прогресса не было бы.",
    detail: "Прошёл оба трека подряд — Кодэкс, потом ТехноЛаб. В 16 лет вошёл в студенческую команду и дошёл до полуфинала ICPC — одного из крупнейших соревнований по программированию в мире.",
  },
];

const TAG_COLORS: Record<string, string> = {
  "ОГЭ": "var(--color-track-kodeks)",
  "ЕГЭ": "var(--color-track-technolab)",
  "БВИ": "var(--color-brand)",
  "Проект": "var(--color-track-studio)",
  "Олимпиада": "var(--color-track-technolab)",
};

export default function AchievementsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[var(--color-violet-100)] opacity-30 blur-3xl" />
          </div>
          <div className="container relative max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[var(--color-brand)] font-medium">Достижения учеников</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-5">
              Результаты, которые<br />
              <span className="text-[var(--color-brand)]">говорят сами</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Не обещания — реальные истории реальных учеников. БВИ, олимпиады, высокие баллы
              и первые собственные игры.
            </p>
          </div>
        </section>

        {/* Stats strip */}
        <section className="py-12 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {STATS.map(({ icon: Icon, value, label, color }) => (
                <div key={value} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}>
                    <Icon size={24} weight="fill" style={{ color }} />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold" style={{ color }}>{value}</div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Истории */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3 text-center">
              Истории учеников
            </h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-12 max-w-xl mx-auto">
              Каждая история — реальная. Имена изменены частично по просьбе семей.
            </p>
            <div className="space-y-6">
              {STORIES.map((s) => (
                <article
                  key={s.name}
                  className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden"
                  itemScope itemType="https://schema.org/Review"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                          style={{ background: s.trackColor }}
                        >
                          {s.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-extrabold text-[var(--color-text-primary)]" itemProp="author">{s.name}</div>
                          <div className="text-xs text-[var(--color-text-muted)]">{s.age} · {s.track} · {s.period}</div>
                        </div>
                      </div>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full shrink-0"
                        style={{ background: `color-mix(in srgb, ${TAG_COLORS[s.tag]} 12%, transparent)`, color: TAG_COLORS[s.tag] }}
                      >
                        {s.tag}
                      </span>
                    </div>

                    <div className="mb-4 p-4 rounded-xl" style={{ background: `color-mix(in srgb, ${s.trackColor} 6%, transparent)`, borderLeft: `3px solid ${s.trackColor}` }}>
                      <p className="text-sm font-semibold" style={{ color: s.trackColor }}>{s.achievement}</p>
                    </div>

                    <blockquote className="text-[var(--color-text-secondary)] leading-relaxed mb-4 italic" itemProp="reviewBody">
                      «{s.quote}»
                    </blockquote>

                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)] pt-4">
                      {s.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
          <div className="container max-w-3xl">
            <p className="text-xs text-[var(--color-text-muted)] text-center leading-relaxed">
              Все результаты реальны и достигнуты учениками TirSkix Academy.
              Конкретные результаты зависят от индивидуальных усилий, регулярности занятий и исходного уровня ребёнка.
              Мы не гарантируем идентичных результатов для каждого ученика.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
              Ваш ребёнок — следующая история?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Запишитесь на пробный урок. Бесплатно, без обязательств.
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
